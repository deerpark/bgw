import "server-only";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import type { Database } from "./types";

/**
 * service-role 키를 사용하는 관리자 Supabase 클라이언트.
 * RLS를 우회하므로 절대 클라이언트 번들에 포함되어선 안 된다.
 *
 * 사용처: 네이버폼 webhook 핸들러, 관리자 작업, 시스템 작업.
 * 보호 장치:
 *   1. `import "server-only"` — 클라이언트 컴포넌트가 import하면 빌드 실패.
 *   2. biome.json `noRestrictedImports` — `@supabase/supabase-js` 직접 import 차단.
 */
export function createSupabaseAdminClient() {
	return createClient<Database>(
		env.SUPABASE_URL(),
		env.SUPABASE_SERVICE_ROLE_KEY(),
		{
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		},
	);
}
