"use client";

import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { type ReactNode, useEffect } from "react";

/**
 * PostHog 클라이언트 init + App Router의 SPA 페이지뷰 수동 트래킹.
 *
 * - NEXT_PUBLIC_POSTHOG_KEY 미설정 시 silent disable
 * - capture_pageview: false — App Router 자동 캡처가 부정확. pathname 변경 시 직접 발사
 *
 * Init은 모듈 평가 시점(브라우저)에 즉시 실행한다. useEffect 안에서 init하면
 * React가 child의 effect를 parent보다 먼저 실행하기 때문에, 첫 $pageview /
 * 빠른 클릭이 init 전에 발사되어 유실될 수 있다.
 *
 * 검색 파라미터는 useSearchParams 대신 window.location.search로 직접 읽는다.
 * useSearchParams는 Suspense 경계가 필요하고 정적 페이지 prerender에서 종종
 * hydration 문제를 일으킨다 (Next 16 + App Router).
 */

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
	process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

if (typeof window !== "undefined" && POSTHOG_KEY && !posthog.__loaded) {
	posthog.init(POSTHOG_KEY, {
		api_host: POSTHOG_HOST,
		capture_pageview: false,
		capture_pageleave: true,
		person_profiles: "identified_only",
		// 번들 슬림 + 불필요 캡처 노이즈 제거
		autocapture: false,
		disable_session_recording: true,
		disable_surveys: true,
		loaded: () => {
			if (process.env.NODE_ENV === "development") {
				console.info("[posthog] initialized →", POSTHOG_HOST);
			}
		},
	});
	// 디버그 편의: 콘솔에서 window.posthog 직접 검증
	(window as Window & { posthog?: typeof posthog }).posthog = posthog;
}

function PageviewTracker() {
	const pathname = usePathname();

	useEffect(() => {
		if (!POSTHOG_KEY || !pathname) return;
		posthog.capture("$pageview", {
			$current_url: window.location.href,
		});
	}, [pathname]);

	return null;
}

export function PostHogProvider({ children }: { children: ReactNode }) {
	return (
		<>
			<PageviewTracker />
			{children}
		</>
	);
}
