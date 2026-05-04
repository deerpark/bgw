/**
 * Supabase Database 타입.
 *
 * 마이그레이션 후 다음 명령으로 자동 생성:
 *   pnpm dlx supabase gen types typescript --linked > src/lib/supabase/types.ts
 *
 * Phase 1 현재: telemedicine_intakes (Week 5 webhook용)만 수기 정의.
 * Phase 2 Week 8 이후 자동 생성으로 전환.
 */

export type IntakeSource = "naver_form" | "kakao" | "phone" | "web_form";

export type IntakeStatus =
	| "new"
	| "contacted"
	| "consulted"
	| "prescribed"
	| "shipped"
	| "completed"
	| "canceled";

export type TelemedicineIntakeRow = {
	id: string;
	code: string | null;
	source: IntakeSource;
	source_external_id: string | null;

	patient_name: string | null;
	patient_phone: string | null;
	patient_birth: string | null;
	patient_gender: "female" | "male" | "other" | null;

	height_cm: number | null;
	weight_kg: number | null;
	target_weight_kg: number | null;
	product_interest: string[];
	meal_pattern: string | null;
	exercise_freq: string | null;
	diet_history: string | null;
	concern: string | null;

	current_meds: string | null;
	allergies: string | null;
	chronic_conditions: string[];
	pregnancy_state: string | null;

	call_window: string | null;
	ship_postcode: string | null;
	ship_address1: string | null;
	ship_address2: string | null;
	ship_request: string | null;

	utm: Record<string, string> | null;
	referrer: string | null;
	user_agent: string | null;
	ip_hash: string | null;
	consent_privacy: boolean;
	consent_telemedicine: boolean;
	consent_record_retention: boolean;
	consent_marketing: boolean;

	status: IntakeStatus;
	status_changed_at: string;
	assigned_to: string | null;
	staff_note: string | null;
	call_log: unknown;
	prescription_summary: string | null;
	tracking_no: string | null;
	courier: string | null;

	raw_payload: unknown;

	created_at: string;
	updated_at: string;
}

export type TelemedicineIntakeInsert = Partial<TelemedicineIntakeRow> & {
	source: IntakeSource;
};

export type Database = {
	public: {
		Tables: {
			telemedicine_intakes: {
				Row: TelemedicineIntakeRow;
				Insert: TelemedicineIntakeInsert;
				Update: Partial<TelemedicineIntakeRow>;
				Relationships: [];
			};
		};
		Views: { [key: string]: never };
		Functions: { [key: string]: never };
		Enums: { [key: string]: never };
		CompositeTypes: { [key: string]: never };
	};
};
