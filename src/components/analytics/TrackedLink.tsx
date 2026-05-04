"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { type CtaProps, EVENT, type EventName, track } from "@/lib/analytics";
import { isKakaoChatUrl, kakaoChatAppScheme } from "@/lib/settings";

type LinkBaseProps = Omit<ComponentProps<typeof Link>, "onClick">;

interface TrackedLinkProps extends LinkBaseProps {
	event: EventName;
	eventProps?: CtaProps;
}

/**
 * Next.js `<Link>` 래퍼 — 클릭 시 PostHog 이벤트 발사.
 *
 * Server Component 안에서 자유롭게 사용 (이 파일은 client, 자식 위치에 들어가면
 * 자동으로 클라이언트 경계 형성).
 *
 * shadcn `<Button asChild>` 와 함께:
 *   <Button asChild>
 *     <TrackedLink event="cta_telemedicine_click" eventProps={{ location: "hero", channel: "naver_form" }}
 *                  href={url} target="_blank" rel="noopener">
 *       비대면 진료 접수 →
 *     </TrackedLink>
 *   </Button>
 *
 * 카카오 채팅 URL 자동 감지: href가 `https://pf.kakao.com/_<id>/chat`이면 Android에서
 *   `kakaoplus://` 앱 스킴을 먼저 시도하고 1.5s 내 페이지가 가려지지 않으면 웹 URL로 fallback.
 *   iOS는 pf.kakao.com 자체가 Universal Link라 별도 처리 불필요.
 */
export function TrackedLink({
	event,
	eventProps,
	onClick: _ignored,
	children,
	...rest
}: TrackedLinkProps & { onClick?: never }) {
	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		track(event, eventProps);

		// 카카오 chat URL + Android면 앱 스킴 우선 시도
		if (
			event === EVENT.KAKAO_CHAT_OPEN &&
			typeof window !== "undefined" &&
			/Android/i.test(navigator.userAgent)
		) {
			const href = typeof rest.href === "string" ? rest.href : "";
			if (isKakaoChatUrl(href)) {
				const appUrl = kakaoChatAppScheme();
				if (appUrl) {
					e.preventDefault();
					// 1.5s 내 페이지가 hidden 되지 않으면(=앱 전환 실패) 웹 URL로 fallback.
					const fallback = window.setTimeout(() => {
						window.location.href = href;
					}, 1500);
					const onVisChange = () => {
						if (document.hidden) window.clearTimeout(fallback);
					};
					document.addEventListener("visibilitychange", onVisChange, {
						once: true,
					});
					window.location.href = appUrl;
					return;
				}
			}
		}
		// 그 외는 Link 기본 네비게이션 (preventDefault 호출 안 함)
	};

	return (
		<Link {...rest} onClick={handleClick}>
			{children}
		</Link>
	);
}
