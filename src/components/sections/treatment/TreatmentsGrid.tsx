import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Treatment } from "@/data/treatments";
import { cn } from "@/lib/utils";

interface TreatmentsGridProps {
	treatments: readonly Treatment[];
}

const TONE_STYLES: Record<
	Treatment["tone"],
	{ chipBg: string; chipText: string; iconBg: string; arrowText: string }
> = {
	vermilion: {
		chipBg: "bg-vermilion-100",
		chipText: "text-vermilion-700",
		iconBg: "bg-vermilion-100",
		arrowText: "text-vermilion-600",
	},
	sage: {
		chipBg: "bg-sage-100",
		chipText: "text-sage-600",
		iconBg: "bg-sage-100",
		arrowText: "text-sage-500",
	},
	brown: {
		chipBg: "bg-cream-200",
		chipText: "text-brown-700",
		iconBg: "bg-cream-200",
		arrowText: "text-brown-600",
	},
};

/**
 * 진료과목 허브의 5개 카드 그리드 — 각 진료과목 상세로 이동.
 * tone(vermilion/sage/brown) 별로 chip·아이콘 배경색 분기.
 *
 * 카드 컴포지션:
 *   - 좌상: tone-colored emoji 아이콘
 *   - 본문: nameKo · essence · 작은 chip(visit/online)
 *   - 우하: "자세히 보기 →" 화살표
 */
export function TreatmentsGrid({ treatments }: TreatmentsGridProps) {
	return (
		<ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1080px] mx-auto m-0 p-0 list-none">
			{treatments.map((t) => {
				const style = TONE_STYLES[t.tone];
				return (
					<li key={t.slug}>
						<Link
							href={`/treatments/${t.slug}`}
							className="group block h-full bg-surface border border-border-subtle rounded-2xl p-6 lg:p-7 hover:-translate-y-0.5 hover:shadow-md transition-all duration-[240ms] ease-[cubic-bezier(0.2,0,0,1)]"
						>
							<div className="flex items-start gap-4 mb-4">
								<span
									className={cn(
										"flex-shrink-0 size-12 lg:size-14 rounded-2xl flex items-center justify-center text-2xl lg:text-3xl",
										style.iconBg,
									)}
									aria-hidden="true"
								>
									{t.icon}
								</span>
								<div className="flex-1 min-w-0">
									<span
										className={cn(
											"inline-block text-[10px] font-eyebrow font-semibold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full",
											style.chipBg,
											style.chipText,
										)}
									>
										{t.visitOnly ? "방문 진료" : "비대면 가능"}
									</span>
									<h3 className="mt-2 text-base lg:text-lg font-semibold tracking-[-0.02em] text-ink-primary leading-snug [word-break:keep-all]">
										{t.nameKo}
									</h3>
								</div>
							</div>
							<p className="text-[13px] lg:text-sm leading-[1.7] text-ink-secondary [word-break:keep-all] mb-5">
								{t.essence}
							</p>
							<span
								className={cn(
									"inline-flex items-center gap-1.5 text-[13px] font-semibold transition-transform group-hover:translate-x-0.5",
									style.arrowText,
								)}
							>
								자세히 보기
								<ArrowRight className="size-3.5" aria-hidden="true" />
							</span>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
