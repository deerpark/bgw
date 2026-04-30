/**
 * 분석 이벤트 정의 + 헬퍼.
 *
 * 핵심 5종 (docs/01-blueprint.md §5.4):
 *   - cta_telemedicine_click  · 비대면 진료 접수 CTA 클릭
 *   - kakao_chat_open         · 카카오 채널 1:1 상담 열기
 *   - naver_form_open         · 네이버폼 열기 (cta_telemedicine_click과 함께 발생)
 *   - phone_call_click        · tel: 클릭
 *   - $pageview               · PostHog가 자동
 *
 * SSR 안전: 서버에서 호출되면 no-op.
 */

import posthog from "posthog-js";

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

/**
 * 분석 이벤트 발생. 서버에서 호출하면 no-op.
 */
export function track(event: EventName, props?: CtaProps): void {
	if (typeof window === "undefined") return;
	if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
	try {
		posthog.capture(event, props);
	} catch {
		// 분석 실패는 사용자 동작을 막지 않는다.
	}
}
