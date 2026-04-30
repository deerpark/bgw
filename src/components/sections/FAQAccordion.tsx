import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
	q: string;
	a: string;
}

interface FAQAccordionProps {
	items: readonly FAQItem[];
	className?: string;
	/** 첫 항목 기본 열림 여부. */
	defaultOpenFirst?: boolean;
}

/**
 * FAQ 아코디언 — 네이티브 `<details>/<summary>` 기반.
 * JS 없이 동작 → 정적 페이지에서도 즉시 인터랙티브.
 *
 * Schema.org FAQPage JSON-LD가 필요하면 별도 빌더 추가 (Phase 2 자체 블로그 시점).
 */
export function FAQAccordion({
	items,
	className,
	defaultOpenFirst = true,
}: FAQAccordionProps) {
	return (
		<div className={cn("flex flex-col gap-3 max-w-3xl mx-auto", className)}>
			{items.map((item, idx) => (
				<details
					key={item.q}
					open={defaultOpenFirst && idx === 0}
					className="group bg-surface border border-border-subtle rounded-xl overflow-hidden transition-shadow duration-200 hover:shadow-sm open:shadow-sm"
				>
					<summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-base font-semibold tracking-[-0.01em] text-ink-primary [word-break:keep-all]">
						<span>{item.q}</span>
						<Plus
							className="size-5 flex-shrink-0 text-ink-muted group-open:rotate-45 transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)]"
							aria-hidden="true"
						/>
					</summary>
					<p className="px-6 pb-5 -mt-1 text-[15px] leading-[1.75] text-ink-secondary [word-break:keep-all]">
						{item.a}
					</p>
				</details>
			))}
		</div>
	);
}
