"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealOnScrollProps {
	children: ReactNode;
	className?: string;
	/** 진입 지연 (ms). 같은 페이지에서 서로 다른 섹션을 stagger 처리할 때. */
	delay?: number;
	/** 진입 방향. 기본은 아래에서 위로(y). "x"는 왼쪽에서 오른쪽. */
	axis?: "y" | "x";
	/** viewport 안에 얼마나 들어와야 트리거할지 (0–1). 기본 0.15. */
	amount?: number;
}

/**
 * 스크롤 진입 시 fade-up reveal 래퍼.
 *
 * - 한 번만 트리거 (viewport.once)
 * - prefers-reduced-motion respect — 즉시 표시
 * - 모션 토큰: ease-standard cubic-bezier(0.2, 0, 0, 1) / duration-slow 320ms
 *
 * 사용법:
 *   <RevealOnScroll>
 *     <DirectorMessage />
 *   </RevealOnScroll>
 *
 *   <RevealOnScroll delay={0.08}>
 *     <ClinicInfoBar />
 *   </RevealOnScroll>
 */
export function RevealOnScroll({
	children,
	className,
	delay = 0,
	axis = "y",
	amount = 0.15,
}: RevealOnScrollProps) {
	const reduce = useReducedMotion();

	if (reduce) {
		return <div className={className}>{children}</div>;
	}

	const offset = axis === "y" ? { y: 24 } : { x: 24 };

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, ...offset }}
			whileInView={{ opacity: 1, x: 0, y: 0 }}
			viewport={{ once: true, amount }}
			transition={{
				duration: 0.48,
				ease: [0.2, 0, 0, 1],
				delay,
			}}
		>
			{children}
		</motion.div>
	);
}
