import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/lib/env";
import type { Database } from "./types";

/**
 * 브라우저(클라이언트 컴포넌트) 전용 Supabase 클라이언트.
 * anon 키만 사용하며, RLS 정책에 종속된다.
 */
export function createSupabaseBrowserClient() {
	return createBrowserClient<Database>(
		env.SUPABASE_URL(),
		env.SUPABASE_ANON_KEY(),
	);
}
