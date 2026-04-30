import { SectionHead } from "@/components/sections/SectionHead";

interface TargetAudienceProps {
	items: { icon: string; title: string; body: string }[];
	eyebrow?: string;
	title?: React.ReactNode;
}

/**
 * "어떤 분께 권해드리나요" — mockups/product-detail.html .target-grid.
 *
 * 3개 카드. 좌측 emoji 아이콘 + 가로 레이아웃.
 */
export function TargetAudience({
	items,
	eyebrow = "03 · 어떤 분께 권해드리나요",
	title = "생활과 체질이 이런 분께 적합합니다",
}: TargetAudienceProps) {
	return (
		<section id="target" className="bg-bg-base px-6 lg:px-12 py-16 lg:py-24">
			<div className="mx-auto max-w-[var(--container-xl)]">
				<SectionHead
					eyebrow={eyebrow}
					title={title}
					align="center"
					className="mb-10 lg:mb-12"
				/>
				<div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
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
