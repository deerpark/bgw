"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { capturePageview } from "@/lib/analytics";

/**
 * App Router의 SPA 페이지뷰 수동 트래킹.
 *
 * 변경 (Phase 1 Week 6 LCP 최적화):
 *   PostHog SDK는 lib/analytics.ts에서 dynamic import로 lazy load.
 *   초기 JS 번들에 SDK가 포함되지 않아 LCP critical path가 가벼워진다.
 *
 * useSearchParams 대신 window.location.href를 직접 읽어 정적 prerender 호환성을
 * 확보. (App Router + Next 16에서 useSearchParams가 Suspense 경계를 요구하기 때문.)
 */

export function PostHogProvider({ children }: { children: ReactNode }) {
	return (
		<>
			<PageviewTracker />
			{children}
		</>
	);
}

function PageviewTracker() {
	const pathname = usePathname();

	useEffect(() => {
		if (!pathname) return;
		capturePageview(window.location.href);
	}, [pathname]);

	return null;
}
