import { TriangleAlert } from "lucide-react";

interface CautionsSectionProps {
	items: readonly string[];
}

/**
 * 주의사항 — mockups/product-detail.html .cautions 1:1.
 * 좌측 4px vermilion 보더 + bg-subtle, 경고 아이콘 + 헤딩 + bullet list.
 */
export function CautionsSection({ items }: CautionsSectionProps) {
	return (
		<section id="cautions" className="bg-bg-base px-6 lg:px-12 py-16 lg:py-24">
			<div className="mx-auto max-w-[880px]">
				<div className="bg-bg-subtle border-l-4 border-vermilion rounded-2xl px-7 py-8 lg:px-9 lg:py-9">
					<h2 className="flex items-center gap-2.5 text-lg lg:text-xl font-bold tracking-[-0.02em] text-ink-primary mb-4 lg:mb-5">
						<TriangleAlert
							className="size-5 text-vermilion"
							aria-hidden="true"
						/>
						복용 전 반드시 알려주세요 / 주의사항
					</h2>
					<ul className="flex flex-col gap-2 m-0 p-0 list-none">
						{items.map((item) => (
							<li
								key={item}
								className="flex gap-3 text-sm leading-[1.75] text-ink-secondary [word-break:keep-all]"
							>
								<span
									className="text-vermilion font-bold text-[22px] leading-none"
									aria-hidden="true"
								>
									·
								</span>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
