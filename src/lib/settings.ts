/**
 * 부개원 한의원 운영 정보 — 단일 진실 (single source of truth).
 *
 * Phase 1: 코드에 박제. Phase 2 관리자 도입 시 Supabase `settings` 테이블로
 * 이관 (docs/01-blueprint.md §4.2 settings 참조).
 *
 * 외부 채널 URL/ID는 환경 변수가 우선이며, 미설정 시 기본값을 사용.
 */

import { env } from "@/lib/env";

export const clinic = {
	nameKo: "부개원 한의원",
	nameEn: "BUGAEWON Korean Medicine Clinic",
	tagline: "부평 비대면 한약 진료",

	/**
	 * 의료기관 사업자/대표자 표기 — 의료광고법 제 56조 + 부가가치세법 시행령에 따라 푸터 노출.
	 */
	business: {
		registrationNo: "435-09-02847",
		representative: "윤정호",
	},

	phone: {
		display: "032-361-9991",
		tel: "tel:0323619991",
	},
	email: "business@bugaewon.kr",

	address: {
		full: "인천광역시 부평구 부흥로 414, 모아빌딩 401호",
		short: "부흥로 414, 모아빌딩 401호",
		landmark: "파리바게뜨 4층 · 부개주공 5·7단지 사이",
		district: "인천광역시 부평구 부개동",
		zip: "21438",
	},
	/**
	 * 위경도 — ClinicMap iframe + JSON-LD geo 속성에서 사용.
	 * Phase 2 settings 테이블 이관 시 운영자 콘솔에서 보정 가능하게 한다.
	 * 좌표 출처: 부흥로 414 모아빌딩 (네이버 지도 기준 근사값).
	 */
	geo: {
		lat: 37.4929,
		lng: 126.7351,
	},

	transit: {
		subway: [
			{ line: "1호선 부개역", walk: "도보 12분" },
			{ line: "7호선 굴포천역", walk: "도보 14분" },
		],
		car: "고속도로 부평IC 5분",
	},

	hours: {
		weekday: "09:00–20:00",
		saturday: "09:00–14:00",
		sunday: "휴진",
		holiday: "휴진",
		lunch: "13:00–14:00",
	},

	director: {
		nameKo: "윤정호",
		title: "대표 한의사",
		/** 보건복지부 발급 한의사 면허번호 — 의료법 §17·§42에 따라 표기 의무. */
		licenseNo: "24721",
		memberships: [
			"한방비만학회 정회원",
			"대한한의학회 정회원",
			"한방재활의학과학회 정회원",
		],
	},
} as const;

export const channels = {
	naverFormUrl: "https://form.naver.com/response/nCxbZSt-zk2g3y8lTAYR1A",
	naverPlaceUrl: "https://map.naver.com/p/search/부개원%20한의원",
	naverBlogUrl: "https://blog.naver.com/bgwon9991",
	naverBlogRss: "https://rss.blog.naver.com/bgwon9991.xml",
} as const;

export function kakaoChatUrl(): string {
	const id = env.KAKAO_CHANNEL_ID();
	return id ? `https://pf.kakao.com/_${id}/chat` : "https://pf.kakao.com/";
}

/**
 * 카카오톡 앱 deeplink — 모바일 앱이 설치되어 있으면 즉시 채팅창으로 이동.
 *
 * iOS는 `pf.kakao.com` 자체가 Universal Link라 웹 URL만으로 앱 전환이 일어남.
 * Android는 별도 스킴이 필요. 클릭 시 [TrackedLink](src/components/analytics/TrackedLink.tsx)에서
 * UA 검사 후 이 스킴을 시도하고 1.5s 내 페이지가 안 가려지면 웹 URL로 fallback.
 *
 * Channel ID 미설정 시 `null` — TrackedLink는 fallback 없이 웹 URL만 사용.
 */
export function kakaoChatAppScheme(): string | null {
	const id = env.KAKAO_CHANNEL_ID();
	return id ? `kakaoplus://plusfriend/talk/chat/_${id}` : null;
}

/**
 * 카카오 채팅 웹 URL 판별 — TrackedLink 모바일 fallback 트리거.
 */
export function isKakaoChatUrl(href: string): boolean {
	return /^https:\/\/pf\.kakao\.com\/_[^/]+\/chat\b/.test(href);
}

/**
 * 카카오 채널 홈 (채널 추가 / 게시물 보기). 푸터·외부 채널 영역에서 사용.
 */
export function kakaoChannelUrl(): string {
	const id = env.KAKAO_CHANNEL_ID();
	return id ? `https://pf.kakao.com/_${id}` : "https://pf.kakao.com/";
}

/**
 * 네이버폼 URL에 추적 파라미터(utm_*) 부착.
 *
 * @example
 *   buildNaverFormUrl({ source: "home", content: "hero_cta" })
 */
export function buildNaverFormUrl(opts: {
	source: string;
	medium?: string;
	content?: string;
	campaign?: string;
}): string {
	const url = new URL(channels.naverFormUrl);
	url.searchParams.set("utm_source", opts.source);
	url.searchParams.set("utm_medium", opts.medium ?? "web");
	if (opts.content) url.searchParams.set("utm_content", opts.content);
	if (opts.campaign) url.searchParams.set("utm_campaign", opts.campaign);
	return url.toString();
}
