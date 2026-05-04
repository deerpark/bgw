import { SectionHead } from "@/components/sections/SectionHead";
import type { Modality } from "@/data/treatments";

interface ModalitiesSectionProps {
	items: readonly Modality[];
	/** 자동차보험 페이지는 안 (보험 안내 섹션이 그 자리), 그 외는 03 단계. */
	eyebrowNumber: string;
}

/**
 * 진료과목 페이지 — "진료 방법" 섹션.
 *
 * 한의원이 사용하는 모달리티(침·약침·봉침·추나·체외충격파·자기장·물리치료 등)를
 * 그리드로 노출. 각 카드는 한자 마크 + 분류 배지 + 설명.
 *
 * 콘텐츠는 [TREATMENTS](src/data/treatments.ts)의 modalities 배열에서 주입.
 * 단정형 효능 표현 회피 — "도움이 될 수 있도록 설계", "활용".
 */
export function ModalitiesSection({
	items,
	eyebrowNumber,
}: ModalitiesSectionProps) {
	return (
		<section
			id="modalities"
			className="bg-bg-base px-6 lg:px-12 py-16 lg:py-24"
		>
			<div className="mx-auto max-w-[var(--container-xl)]">
				<SectionHead
					eyebrow={`${eyebrowNumber} · 진료 방법`}
					title="환자분의 상태에 맞춰 단계적으로 운영합니다"
					sub="한의사가 진료 결과에 따라 아래 모달리티 중 적절한 항목을 결정합니다."
					align="center"
					className="mb-10 lg:mb-12"
				/>
				<ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1080px] mx-auto m-0 p-0 list-none">
					{items.map((m) => (
						<li
							key={m.title}
							className="bg-surface border border-border-subtle rounded-2xl p-6 lg:p-7 flex flex-col gap-3"
						>
							<div className="flex items-center justify-between">
								<span
									className="font-serif font-bold text-2xl text-vermilion-700"
									aria-hidden="true"
								>
									{m.mark}
								</span>
								<span className="text-[10px] font-eyebrow font-semibold tracking-[0.12em] uppercase text-ink-muted bg-surface-alt border border-border-subtle px-2 py-0.5 rounded-full">
									{m.kind}
								</span>
							</div>
							<h3 className="text-base lg:text-lg font-semibold tracking-[-0.02em] text-ink-primary [word-break:keep-all]">
								{m.title}
							</h3>
							<p className="text-[13px] lg:text-sm leading-[1.7] text-ink-secondary [word-break:keep-all]">
								{m.body}
							</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
