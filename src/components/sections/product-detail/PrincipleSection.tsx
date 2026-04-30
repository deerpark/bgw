import { SectionHead } from "@/components/sections/SectionHead";
import { cn } from "@/lib/utils";

interface PrincipleGroup {
	name: string;
	body: string;
	tone: "sage" | "brown" | "vermilion";
}

interface PrincipleSectionProps {
	headline: string;
	note: string;
	groups: PrincipleGroup[];
	eyebrow?: string;
}

/**
 * "처방의 원리" — mockups/product-detail.html .principle 1:1.
 *
 * 데스크톱: 좌측 conic-gradient 원형 다이어그램 + 우측 3개 컬러 보더 카드.
 * 모바일: 단일 컬럼 stack.
 */
export function PrincipleSection({
	headline,
	note,
	groups,
	eyebrow = "04 · 처방의 원리",
}: PrincipleSectionProps) {
	return (
		<section
			id="principle"
			className="bg-surface-alt px-6 lg:px-12 py-16 lg:py-24"
		>
			<div className="mx-auto max-w-[var(--container-xl)]">
				<SectionHead
					eyebrow={eyebrow}
					title={headline}
					sub={note}
					align="center"
					className="mb-10 lg:mb-12"
				/>

				<div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:items-center max-w-[1080px] mx-auto">
					<div className="bg-surface border border-border-subtle rounded-3xl p-8 lg:p-9">
						<div className="relative aspect-square max-w-[320px] mx-auto rounded-full bg-[conic-gradient(var(--sage-400)_0%_33%,var(--brown-400)_33%_67%,var(--vermilion-400)_67%_100%)]">
							<div className="absolute inset-[16%] rounded-full bg-surface" />
							{groups.map((g, i) => (
								<span
									key={g.name}
									className={cn(
										"absolute z-10 bg-surface px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.04em] text-ink-primary shadow-sm whitespace-nowrap",
										i === 0 && "top-[10%] left-1/2 -translate-x-1/2",
										i === 1 && "bottom-[22%] left-[6%]",
										i === 2 && "bottom-[22%] right-[6%]",
									)}
								>
									{g.name}
								</span>
							))}
						</div>
					</div>

					<ol className="flex flex-col gap-4">
						{groups.map((g, i) => (
							<li
								key={g.name}
								className={cn(
									"bg-surface border border-border-subtle rounded-2xl p-6 lg:px-7 lg:py-6 border-l-[3px]",
									g.tone === "sage" && "border-l-sage-500",
									g.tone === "brown" && "border-l-brown-500",
									g.tone === "vermilion" && "border-l-vermilion-500",
								)}
							>
								<div className="flex items-center gap-2.5 mb-1.5">
									<span
										className={cn(
											"font-mono text-[11px] px-1.5 py-0.5 rounded text-cream-50",
											g.tone === "sage" && "bg-sage-500",
											g.tone === "brown" && "bg-brown-500",
											g.tone === "vermilion" && "bg-vermilion-500",
										)}
									>
										{String(i + 1).padStart(2, "0")}
									</span>
									<h3 className="text-base font-semibold tracking-[-0.02em] text-ink-primary">
										{g.name}
									</h3>
								</div>
								<p className="text-[13px] leading-[1.7] text-ink-secondary [word-break:keep-all]">
									{g.body}
								</p>
							</li>
						))}
					</ol>
				</div>
			</div>
		</section>
	);
}
