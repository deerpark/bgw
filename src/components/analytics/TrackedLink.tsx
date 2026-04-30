"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { type CtaProps, type EventName, track } from "@/lib/analytics";

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
 */
export function TrackedLink({
	event,
	eventProps,
	onClick: _ignored,
	children,
	...rest
}: TrackedLinkProps & { onClick?: never }) {
	const handleClick = (_e: MouseEvent<HTMLAnchorElement>) => {
		track(event, eventProps);
		// 네비게이션은 Link가 처리. preventDefault 호출 안 함.
	};

	return (
		<Link {...rest} onClick={handleClick}>
			{children}
		</Link>
	);
}
