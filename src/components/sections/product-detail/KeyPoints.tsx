import { SectionHead } from "@/components/sections/SectionHead";
import type { ProductCategory } from "@/data/products";
import { getCategoryTone } from "@/lib/category-tone";

interface KeyPointsProps {
	productName: string;
	items: { title: string; body: string }[];
	eyebrow?: string;
	category?: ProductCategory;
}

/**
 * 한약 상세 KEY POINTS (5종 카드).
 * mockups/product-detail.html .keypoints 1:1.
 */
export function KeyPoints({
	productName,
	items,
	eyebrow = "02 · KEY POINTS",
	category = "diet",
}: KeyPointsProps) {
	const tone = getCategoryTone(category);
	return (
		<section
			id="key-points"
			className="bg-surface-alt px-6 lg:px-12 py-16 lg:py-24"
		>
			<div className="mx-auto max-w-[var(--container-xl)]">
				<SectionHead
					eyebrow={eyebrow}
					title={`${productName}의 핵심 다섯`}
					align="center"
					className="mb-10 lg:mb-12"
				/>
				<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
					{items.map((item, i) => (
						<article
							key={item.title}
							className="bg-surface border border-border-subtle rounded-2xl p-6 text-center"
						>
							<div
								className={`font-serif font-bold text-[28px] mb-3 ${tone.numberText}`}
							>
								{String(i + 1).padStart(2, "0")}
							</div>
							<h3 className="text-[15px] font-semibold tracking-[-0.02em] mb-2 leading-[1.45] [word-break:keep-all]">
								{item.title}
							</h3>
							<p className="text-xs text-ink-muted leading-[1.6] [word-break:keep-all]">
								{item.body}
							</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
