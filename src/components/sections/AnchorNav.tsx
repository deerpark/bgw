"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface AnchorItem {
	id: string;
	label: string;
}

interface AnchorNavProps {
	items: readonly AnchorItem[];
	className?: string;
}

/**
 * 상세 페이지 sticky 인-페이지 네비.
 *
 * - IntersectionObserver로 현재 보이는 섹션 활성 표시
 * - 모바일에선 가로 스크롤
 * - 클릭 시 smooth-scroll (CSS scroll-behavior 또는 scrollIntoView)
 * - sticky top: header 높이만큼 offset
 */
export function AnchorNav({ items, className }: AnchorNavProps) {
	const [active, setActive] = useState<string>(items[0]?.id ?? "");
	const navRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const observers: IntersectionObserver[] = [];
		const handleEntry = (entries: IntersectionObserverEntry[]) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					setActive(entry.target.id);
				}
			}
		};

		for (const item of items) {
			const el = document.getElementById(item.id);
			if (!el) continue;
			const obs = new IntersectionObserver(handleEntry, {
				// 헤더 높이 80px + anchor nav 높이 64px = 144px 위쪽 여유
				rootMargin: "-160px 0px -50% 0px",
				threshold: 0,
			});
			obs.observe(el);
			observers.push(obs);
		}

		return () => {
			for (const obs of observers) obs.disconnect();
		};
	}, [items]);

	return (
		<nav
			ref={navRef}
			aria-label="페이지 내 섹션"
			className={cn(
				"sticky top-16 lg:top-20 z-30 bg-bg-base/85 backdrop-blur-[18px] backdrop-saturate-[180%] border-b border-border-subtle",
				className,
			)}
		>
			<div className="mx-auto max-w-[var(--container-xl)] px-6 lg:px-12">
				<ul className="flex gap-1 lg:gap-2 overflow-x-auto scrollbar-none -mx-2 px-2 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
					{items.map((item) => (
						<li key={item.id} className="flex-shrink-0">
							<a
								href={`#${item.id}`}
								aria-current={active === item.id ? "true" : undefined}
								className={cn(
									"inline-block px-3 lg:px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
									active === item.id
										? "bg-brand text-cream-50"
										: "text-ink-secondary hover:bg-bg-muted",
								)}
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
