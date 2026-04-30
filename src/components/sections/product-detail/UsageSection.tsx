import { SectionHead } from "@/components/sections/SectionHead";

interface UsageSectionProps {
	items: { icon: string; title: string; body: string }[];
	eyebrow?: string;
	title?: React.ReactNode;
}

/**
 * 복용 안내 섹션 — mockups/product-detail.html (when-grid 재사용 패턴).
 * 3개 카드: 시간/물/보관.
 */
export function UsageSection({
	items,
	eyebrow = "05 · 복용 안내",
	title = "기본 복용법 (정확한 안내는 진료 후)",
}: UsageSectionProps) {
	return (
		<section id="usage" className="bg-bg-base px-6 lg:px-12 py-16 lg:py-24">
			<div className="mx-auto max-w-[var(--container-xl)]">
				<SectionHead
					eyebrow={eyebrow}
					title={title}
					align="center"
					className="mb-10 lg:mb-12"
				/>
				<div className="grid gap-4 grid-cols-1 lg:grid-cols-3 max-w-[1080px] mx-auto">
					{items.map((item) => (
						<article
							key={item.title}
							className="flex gap-4 items-start bg-surface-alt rounded-2xl p-7"
						>
							<span
								className="flex-shrink-0 size-11 rounded-xl bg-cream-50 flex items-center justify-center text-xl"
								aria-hidden="true"
							>
								{item.icon}
							</span>
							<div className="flex-1 min-w-0">
								<h3 className="text-base font-semibold tracking-[-0.02em] mb-1.5 [word-break:keep-all]">
									{item.title}
								</h3>
								<p className="text-[13px] leading-[1.7] text-ink-secondary [word-break:keep-all]">
									{item.body}
								</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
