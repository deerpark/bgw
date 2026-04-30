import { SectionHead } from "@/components/sections/SectionHead";

/**
 * 면역 허브 "어떤 분께 권장하나요" — 다이어트 허브 WhenToUseDiet의 면역 버전.
 * 큰 vermilion serif 숫자 + 상황 + 추천 한약 강조.
 */

const SCENARIOS = [
	{
		num: "01",
		title: "기력이 떨어지고 집중이 어려워요",
		body: "야근·공부·육아 병행으로 기력이 떨어지신 분께",
		recommended: "공진단",
		bodyTail: "이 일반적으로 권장됩니다.",
	},
	{
		num: "02",
		title: "호흡·기관지가 약하고 잔병이 잦아요",
		body: "마른 체형·잦은 감기·잔기침 등 진액 보강이 필요하다면,",
		recommended: "경옥고",
		bodyTail: "가 추천됩니다.",
	},
	{
		num: "03",
		title: "체력 보강·회복이 필요해요",
		body: "성장기·갱년기·산후 회복 시기에 단계적 케어가 필요하다면",
		recommended: "녹용보약",
		bodyTail: "을 살펴보세요.",
	},
] as const;

export function WhenToUseImmune() {
	return (
		<section className="bg-surface-alt px-6 lg:px-12 py-16 lg:py-24">
			<SectionHead
				eyebrow="02 · 어떤 분께 권장하나요"
				title={
					<>
						기력·체질의 상태에 맞춰
						<br />
						어울리는 보약을 살펴보세요.
					</>
				}
				align="center"
				className="mb-10 lg:mb-12"
			/>

			<div className="mx-auto max-w-[var(--container-xl)] grid gap-4 lg:grid-cols-3">
				{SCENARIOS.map((s) => (
					<article
						key={s.num}
						className="bg-surface border border-border-subtle rounded-3xl p-7 lg:p-8"
					>
						<div className="font-serif font-bold text-[36px] text-vermilion-600 leading-none mb-4">
							{s.num}
						</div>
						<h3 className="text-lg font-semibold tracking-[-0.02em] text-ink-primary mb-2 [word-break:keep-all]">
							{s.title}
						</h3>
						<p className="text-sm leading-[1.7] text-ink-secondary [word-break:keep-all]">
							{s.body}{" "}
							<strong className="text-brand font-semibold">
								{s.recommended}
							</strong>
							{s.bodyTail}
						</p>
					</article>
				))}
			</div>
		</section>
	);
}
