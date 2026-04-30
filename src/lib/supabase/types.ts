/**
 * Supabase Database 타입.
 *
 * 마이그레이션 후 다음 명령으로 자동 생성:
 *   pnpm dlx supabase gen types typescript --linked > src/lib/supabase/types.ts
 *
 * Phase 1 초기에는 빈 placeholder. Phase 2에서 `telemedicine_intakes`,
 * `products`, `banners`, `posts`, `events`, `settings` 등 실제 스키마로 채움.
 */
export type Database = {
	public: {
		Tables: Record<string, never>;
		Views: Record<string, never>;
		Functions: Record<string, never>;
		Enums: Record<string, never>;
		CompositeTypes: Record<string, never>;
	};
};
