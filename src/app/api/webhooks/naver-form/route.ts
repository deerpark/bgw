import "server-only";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type {
	IntakeStatus,
	TelemedicineIntakeInsert,
} from "@/lib/supabase/types";

/**
 * 네이버폼 → Supabase 웹훅.
 *
 * 동선 (docs/01-blueprint.md §5.1):
 *   네이버폼 응답 → 운영자 메일 / Naver Works / Google Sheet
 *   → Apps Script(또는 Naver Works workflow)
 *   → POST /api/webhooks/naver-form
 *
 * 인증: 공유 비밀(NAVER_FORM_WEBHOOK_SECRET)을
 *   1) Authorization: Bearer <secret>  또는
 *   2) x-webhook-secret: <secret>
 * 헤더로 검증.
 *
 * 멱등성: source_external_id(네이버폼 응답 ID)로 upsert. 같은 응답이 두 번
 * 들어와도 한 번만 적재된다.
 *
 * Phase 1: 수기 운영 + 자동화 시범. Phase 2 Week 11에서 운영자 메일/카톡 알림 hook 추가.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface NaverFormWebhookPayload {
	/** 네이버폼 응답 ID — 멱등 키. */
	responseId?: string;
	formId?: string;
	submittedAt?: string;

	/** 네이버폼 필드값. 키 이름은 운영 폼 라벨에 맞춰 정해진다. */
	answers?: Record<string, unknown>;

	/** 클릭 시점에 부착된 utm. */
	utm?: Record<string, string>;
	referrer?: string;

	/** 디버깅용 원본. */
	raw?: unknown;
}

export async function POST(request: NextRequest) {
	// 1) 시크릿 검증
	const secret = env.NAVER_FORM_WEBHOOK_SECRET();
	const auth = request.headers.get("authorization");
	const headerSecret =
		request.headers.get("x-webhook-secret") ??
		(auth?.startsWith("Bearer ") ? auth.slice("Bearer ".length) : null);

	if (!headerSecret || !timingSafeEqual(headerSecret, secret)) {
		return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
	}

	// 2) JSON 파싱
	let payload: NaverFormWebhookPayload;
	try {
		payload = (await request.json()) as NaverFormWebhookPayload;
	} catch {
		return NextResponse.json(
			{ ok: false, error: "invalid_json" },
			{ status: 400 },
		);
	}

	// 3) 정규화 (네이버폼 필드명 → telemedicine_intakes 컬럼)
	const normalized = normalizePayload(payload);
	if (!normalized) {
		return NextResponse.json(
			{ ok: false, error: "missing_required" },
			{ status: 422 },
		);
	}

	// 4) 멱등 적재 — source_external_id가 있으면 upsert, 없으면 insert
	const supabase = createSupabaseAdminClient();
	const insert: TelemedicineIntakeInsert = {
		source: "naver_form",
		source_external_id: payload.responseId ?? null,
		raw_payload: payload as unknown,
		status: "new" satisfies IntakeStatus,
		...normalized,
	};

	const query = payload.responseId
		? supabase
				.from("telemedicine_intakes")
				.upsert(insert, { onConflict: "source_external_id" })
				.select("id")
				.single()
		: supabase
				.from("telemedicine_intakes")
				.insert(insert)
				.select("id")
				.single();

	const { data, error } = await query;

	if (error) {
		console.error("[naver-form webhook] insert failed", error);
		return NextResponse.json(
			{ ok: false, error: "db_error" },
			{ status: 500 },
		);
	}

	return NextResponse.json({ ok: true, id: data?.id });
}

/**
 * 운영 폼 라벨 → DB 컬럼 매핑.
 * 폼 라벨이 변경되면 여기만 수정. 라벨이 없을 때(누락)도 적재되도록 너그럽게.
 */
function normalizePayload(
	payload: NaverFormWebhookPayload,
): Partial<TelemedicineIntakeInsert> | null {
	const a = payload.answers ?? {};
	const pick = (...keys: string[]) => firstString(a, keys);
	const pickArr = (...keys: string[]) => firstStringArray(a, keys);
	const pickBool = (...keys: string[]) => firstBoolean(a, keys);
	const pickNum = (...keys: string[]) => firstNumber(a, keys);

	const name = pick("이름", "성함", "name");
	const phone = pick("연락처", "휴대전화", "전화번호", "phone");

	// 이름 또는 전화번호 중 하나는 있어야 의미 있는 접수.
	if (!name && !phone) return null;

	return {
		patient_name: name,
		patient_phone: normalizePhone(phone),
		patient_birth: pick("생년월일", "birth"),
		patient_gender: pickGender(pick("성별", "gender")),

		height_cm: pickNum("키", "신장", "height"),
		weight_kg: pickNum("몸무게", "체중", "weight"),
		target_weight_kg: pickNum("목표 체중", "target_weight"),
		product_interest: pickArr("관심 한약", "관심 제품", "product_interest"),
		meal_pattern: pick("식사 패턴", "식습관", "meal_pattern"),
		exercise_freq: pick("운동 빈도", "운동", "exercise"),
		diet_history: pick("다이어트 경험", "diet_history"),
		concern: pick("주요 고민", "고민", "concern"),

		current_meds: pick("복용 약", "복용중인 약", "current_meds"),
		allergies: pick("알레르기", "allergies"),
		chronic_conditions: pickArr("진단 질환", "chronic_conditions"),
		pregnancy_state: pick("임신/수유", "pregnancy_state"),

		call_window: pick("통화 가능 시간", "call_window"),
		ship_postcode: pick("우편번호", "postcode"),
		ship_address1: pick("주소", "address"),
		ship_address2: pick("상세 주소", "address2"),
		ship_request: pick("배송 요청사항", "ship_request"),

		consent_privacy: pickBool("개인정보 동의", "consent_privacy") ?? false,
		consent_telemedicine:
			pickBool("비대면 진료 동의", "consent_telemedicine") ?? false,
		consent_record_retention:
			pickBool("진료기록 보존 동의", "consent_record_retention") ?? false,
		consent_marketing: pickBool("마케팅 동의", "consent_marketing") ?? false,

		utm: payload.utm ?? null,
		referrer: payload.referrer ?? null,
	};
}

function firstString(
	obj: Record<string, unknown>,
	keys: string[],
): string | null {
	for (const k of keys) {
		const v = obj[k];
		if (typeof v === "string" && v.trim() !== "") return v.trim();
	}
	return null;
}

function firstStringArray(
	obj: Record<string, unknown>,
	keys: string[],
): string[] {
	for (const k of keys) {
		const v = obj[k];
		if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string");
		if (typeof v === "string" && v.includes(",")) {
			return v.split(",").map((s) => s.trim()).filter(Boolean);
		}
		if (typeof v === "string" && v.trim()) return [v.trim()];
	}
	return [];
}

function firstNumber(
	obj: Record<string, unknown>,
	keys: string[],
): number | null {
	for (const k of keys) {
		const v = obj[k];
		if (typeof v === "number" && Number.isFinite(v)) return v;
		if (typeof v === "string") {
			const n = Number.parseFloat(v.replace(/[^0-9.]/g, ""));
			if (Number.isFinite(n)) return n;
		}
	}
	return null;
}

function firstBoolean(
	obj: Record<string, unknown>,
	keys: string[],
): boolean | null {
	for (const k of keys) {
		const v = obj[k];
		if (typeof v === "boolean") return v;
		if (typeof v === "string") {
			const s = v.trim().toLowerCase();
			if (["true", "yes", "y", "동의", "예", "1"].includes(s)) return true;
			if (["false", "no", "n", "비동의", "아니오", "0"].includes(s)) return false;
		}
	}
	return null;
}

function pickGender(
	value: string | null,
): "female" | "male" | "other" | null {
	if (!value) return null;
	const s = value.trim();
	if (["여", "여성", "female", "F", "f"].includes(s)) return "female";
	if (["남", "남성", "male", "M", "m"].includes(s)) return "male";
	return "other";
}

/**
 * 010-1234-5678 / +82 10-1234-5678 / 01012345678 → 01012345678
 * 운영자 검색 편의를 위해 숫자만 남긴다.
 */
function normalizePhone(phone: string | null): string | null {
	if (!phone) return null;
	const digits = phone.replace(/[^\d]/g, "");
	if (digits.startsWith("82") && digits.length >= 11) {
		return `0${digits.slice(2)}`;
	}
	return digits || null;
}

/**
 * 비밀 검증용 timing-safe 비교 — Edge/Node 모두에서 안전.
 */
function timingSafeEqual(a: string, b: string): boolean {
	if (a.length !== b.length) return false;
	let mismatch = 0;
	for (let i = 0; i < a.length; i++) {
		mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
	}
	return mismatch === 0;
}
