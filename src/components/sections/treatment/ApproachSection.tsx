import { SectionHead } from "@/components/sections/SectionHead";
import type { Treatment } from "@/data/treatments";

interface ApproachSectionProps {
	items: Treatment["approach"];
}

/**
 * "부개원의 접근" — 3 카드.
 * 한방 관점에서 어떻게 접근하는지 안내 (단정 효능 표현 금지).
 */
export function ApproachSection({ items }: ApproachSectionProps) {
	return (
		<section id="approach" className="bg-bg-base px-6 lg:px-12 py-16 lg:py-24">
			<div className="mx-auto max-w-[var(--container-xl)]">
				<SectionHead
					eyebrow="02 · 부개원의 접근"
					title="단순히 증상만이 아닌, 체질을 함께 살핍니다"
					align="center"
					className="mb-10 lg:mb-12"
				/>
				<ol className="grid gap-4 grid-cols-1 lg:grid-cols-3 max-w-[1080px] mx-auto m-0 p-0 list-none">
					{items.map((a, i) => (
						<li
							key={a.title}
							className="bg-surface border border-border-subtle rounded-2xl p-7 lg:p-8"
						>
							<span className="font-mono text-[11px] tracking-[0.1em] text-vermilion mb-3 block">
								{String(i + 1).padStart(2, "0")}
							</span>
							<h3 className="text-lg font-semibold tracking-[-0.02em] mb-2 [word-break:keep-all]">
								{a.title}
							</h3>
							<p className="text-sm leading-[1.7] text-ink-secondary [word-break:keep-all]">
								{a.body}
							</p>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
