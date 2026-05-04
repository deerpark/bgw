"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Phase = "initial" | "hidden" | "visible";

interface RevealOnScrollProps {
	children: ReactNode;
	className?: string;
	/** viewport 안에 얼마나 들어와야 트리거할지 (0–1). 기본 0.15. */
	amount?: number;
}

/**
 * 스크롤 진입 시 fade-up reveal 래퍼 — CSS + 네이티브 IntersectionObserver.
 *
 * 동작 원칙(SSR 안전):
 *   1. SSR / 미하이드레이트: HTML이 항상 가시 상태로 직렬화된다. JS가 실패하거나
 *      늦게 hydrate되어도 콘텐츠가 보인다.
 *   2. 클라이언트 마운트 시점에 이미 뷰포트 안이면: 그대로 visible 유지(애니메이션 스킵, 깜빡임 없음).
 *   3. 마운트 시점에 뷰포트 밖이면: hidden 상태로 전환한 뒤 IntersectionObserver가 진입 시 visible로 트랜지션.
 *   4. prefers-reduced-motion: 즉시 visible(애니메이션 없음).
 *
 * 변경 이력 — 2026-05-04: framer-motion `whileInView`가 Windows Edge/Chrome 일부 환경에서
 *   초기 IntersectionObserver 등록 타이밍을 놓쳐 페이지 하단이 영구 비가시 상태로 남는 버그
 *   재발(`initial: { opacity: 0 }`을 SSR에 박아둔 게 원인). 네이티브 옵저버 + 가시 fallback으로 해결.
 */
export function RevealOnScroll({
	children,
	className,
	amount = 0.15,
}: RevealOnScrollProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [phase, setPhase] = useState<Phase>("initial");

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		// 1) reduce-motion 사용자 → 즉시 visible
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduceMotion) {
			setPhase("visible");
			return;
		}

		// 2) 마운트 시점에 이미 보이는 영역이면 애니메이션 없이 visible 고정 (깜빡임 방지)
		const rect = el.getBoundingClientRect();
		const vh = window.innerHeight;
		const visibleHeight = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
		if (visibleHeight > rect.height * amount) {
			setPhase("visible");
			return;
		}

		// 3) 뷰포트 밖이면 hidden → 진입 시 visible
		setPhase("hidden");
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setPhase("visible");
					observer.disconnect();
				}
			},
			{ threshold: amount },
		);
		observer.observe(el);

		return () => observer.disconnect();
	}, [amount]);

	return (
		<div
			ref={ref}
			data-reveal={phase}
			className={cn(
				"transition-[opacity,transform] duration-[480ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
				phase === "hidden" ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0",
				className,
			)}
		>
			{children}
		</div>
	);
}
