import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/lib/env";
import type { Database } from "./types";

/**
 * RSC / Route Handler / Server Action 전용 Supabase 클라이언트.
 * cookies()로 사용자 세션을 읽어 RLS 정책을 적용한다.
 *
 * Server Component에서 cookieStore.set 호출 시 throw가 날 수 있다 — try/catch로 무시.
 * 실제 세션 갱신은 middleware에서 처리해야 한다 (Phase 2 admin 도입 시 추가).
 */
export async function createSupabaseServerClient() {
	const cookieStore = await cookies();

	return createServerClient<Database>(
		env.SUPABASE_URL(),
		env.SUPABASE_ANON_KEY(),
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						for (const { name, value, options } of cookiesToSet) {
							cookieStore.set(name, value, options);
						}
					} catch {
						// RSC에서 set 호출 시 무시 — middleware가 이미 처리.
					}
				},
			},
		},
	);
}
