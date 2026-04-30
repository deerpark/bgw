import { SectionHead } from "@/components/sections/SectionHead";
import type { Treatment } from "@/data/treatments";

interface SymptomsSectionProps {
	items: Treatment["symptoms"];
}

/**
 * "어떤 증상에 도움이 됩니다" — 4 카드 (emoji 아이콘 + 제목 + 설명).
 *
 * 컴플라이언스: "치료됩니다" 단정 X → "도움이 될 수 있습니다", "권장됩니다" 사용.
 */
export function SymptomsSection({ items }: SymptomsSectionProps) {
	return (
		<section
			id="symptoms"
			className="bg-surface-alt px-6 lg:px-12 py-16 lg:py-24"
		>
			<div className="mx-auto max-w-[var(--container-xl)]">
				<SectionHead
					eyebrow="01 · 어떤 증상인가"
					title="이런 분께 도움이 될 수 있습니다"
					align="center"
					className="mb-10 lg:mb-12"
				/>
				<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-[1080px] mx-auto">
					{items.map((s) => (
						<article
							key={s.title}
							className="bg-surface border border-border-subtle rounded-2xl p-6 lg:p-7"
						>
							<span
								className="block text-3xl lg:text-4xl mb-3"
								aria-hidden="true"
							>
								{s.icon}
							</span>
							<h3 className="text-base lg:text-lg font-semibold tracking-[-0.02em] mb-2 [word-break:keep-all]">
								{s.title}
							</h3>
							<p className="text-[13px] leading-[1.7] text-ink-secondary [word-break:keep-all]">
								{s.body}
							</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
