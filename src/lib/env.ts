/**
 * 환경 변수 접근 헬퍼.
 * 누락 시 명시적 에러를 던져 디버깅 시간을 줄인다.
 *
 * 클라이언트 코드에서 사용 가능한 변수는 NEXT_PUBLIC_ prefix만.
 * service-role 키 같은 서버 전용 변수는 server-only 모듈에서만 import해야 한다.
 */

function required(name: string): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(`Missing environment variable: ${name}`);
	}
	return value;
}

function optional(name: string): string | undefined {
	return process.env[name];
}

/**
 * 사이트 절대 URL.
 * 우선순위: NEXT_PUBLIC_SITE_URL → VERCEL_URL (preview/production) → localhost.
 * Vercel은 빌드 시 VERCEL_URL을 자동 주입한다.
 */
function siteUrl(): string {
	const explicit = optional("NEXT_PUBLIC_SITE_URL");
	if (explicit) return explicit;

	const vercel = optional("NEXT_PUBLIC_VERCEL_URL") ?? optional("VERCEL_URL");
	if (vercel) return `https://${vercel}`;

	return "http://localhost:3000";
}

export const env = {
	SUPABASE_URL: () => required("NEXT_PUBLIC_SUPABASE_URL"),
	SUPABASE_ANON_KEY: () => required("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
	SUPABASE_SERVICE_ROLE_KEY: () => required("SUPABASE_SERVICE_ROLE_KEY"),
	SITE_URL: siteUrl,
	RESEND_API_KEY: () => required("RESEND_API_KEY"),
	NAVER_FORM_WEBHOOK_SECRET: () => required("NAVER_FORM_WEBHOOK_SECRET"),
	KAKAO_CHANNEL_ID: () => optional("NEXT_PUBLIC_KAKAO_CHANNEL_ID"),
	POSTHOG_KEY: () => optional("NEXT_PUBLIC_POSTHOG_KEY"),
	POSTHOG_HOST: () =>
		optional("NEXT_PUBLIC_POSTHOG_HOST") ?? "https://us.i.posthog.com",
};
