"use client";

/**
 * 분석 이벤트 정의 + 헬퍼.
 *
 * 핵심 5종 (docs/01-blueprint.md §5.4):
 *   - cta_telemedicine_click  · 비대면 진료 접수 CTA 클릭
 *   - kakao_chat_open         · 카카오 채널 1:1 상담 열기
 *   - naver_form_open         · 네이버폼 열기
 *   - phone_call_click        · tel: 클릭
 *   - $pageview               · 라우트 변경 시 (PostHogProvider)
 *
 * Phase 1 Week 6 Lighthouse 최적화:
 *   PostHog SDK는 첫 호출 시 dynamic import로 lazy load → 초기 JS 번들에서 ~180KB 제거.
 *   첫 호출 전에 발생한 이벤트는 큐에 쌓아뒀다가 init 완료 후 flush.
 *
 * SSR 안전: 서버에서 호출되면 no-op.
 */

import type PostHog from "posthog-js";

export const EVENT = {
	CTA_TELEMEDICINE_CLICK: "cta_telemedicine_click",
	KAKAO_CHAT_OPEN: "kakao_chat_open",
	NAVER_FORM_OPEN: "naver_form_open",
	PHONE_CALL_CLICK: "phone_call_click",
	EXTERNAL_CHANNEL_CLICK: "external_channel_click",
} as const;

export type EventName = (typeof EVENT)[keyof typeof EVENT];

export type CtaLocation =
	| "header"
	| "hero"
	| "mobile_menu"
	| "floating_dock"
	| "final_cta"
	| "footer"
	| "clinic_info_bar";

export interface CtaProps {
	location: CtaLocation;
	/** "naver_form" | "kakao" | "phone" — 비대면 진료 접수 CTA 채널. */
	channel?: "naver_form" | "kakao" | "phone";
	/** 외부 채널 식별자. external_channel_click에서 사용. */
	external?: "naver_place" | "naver_blog" | "kakao_channel";
}

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
	process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

/**
 * dynamic import → 첫 capture 호출이 일어나야 PostHog 번들이 다운로드된다.
 * 따라서 LCP 직전에는 PostHog JS가 critical path에 없음.
 */
type PostHogClient = typeof PostHog;
let posthogPromise: Promise<PostHogClient | null> | null = null;

function loadPostHog(): Promise<PostHogClient | null> {
	if (typeof window === "undefined") return Promise.resolve(null);
	if (!POSTHOG_KEY) return Promise.resolve(null);
	if (!posthogPromise) {
		posthogPromise = import("posthog-js")
			.then((mod) => {
				const ph = mod.default;
				if (!ph.__loaded) {
					ph.init(POSTHOG_KEY, {
						api_host: POSTHOG_HOST,
						capture_pageview: false,
						capture_pageleave: true,
						person_profiles: "identified_only",
						autocapture: false,
						disable_session_recording: true,
						disable_surveys: true,
					});
				}
				(window as Window & { posthog?: PostHogClient }).posthog = ph;
				return ph;
			})
			.catch((err) => {
				console.warn("[posthog] load failed", err);
				return null;
			});
	}
	return posthogPromise;
}

/**
 * 분석 이벤트 발생. 서버에서 호출하면 no-op.
 * PostHog가 아직 로드되지 않았으면 import 후 fire-and-forget.
 */
export function track(event: EventName, props?: CtaProps): void {
	if (typeof window === "undefined") return;
	if (!POSTHOG_KEY) return;
	loadPostHog().then((ph) => {
		try {
			ph?.capture(event, props);
		} catch {
			// 분석 실패는 사용자 동작을 막지 않는다.
		}
	});
}

/**
 * 페이지뷰 캡처 — PostHogProvider의 PageviewTracker가 호출.
 */
export function capturePageview(url: string): void {
	if (typeof window === "undefined") return;
	if (!POSTHOG_KEY) return;
	loadPostHog().then((ph) => {
		try {
			ph?.capture("$pageview", { $current_url: url });
		} catch {
			// noop
		}
	});
}
