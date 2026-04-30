import { SectionHead } from "@/components/sections/SectionHead";

/**
 * 다이어트 허브 "어떤 분께 권장하나요" 섹션 — mockups/diet-hub.html .when-grid.
 *
 * 3개 카드: 큰 serif 숫자 + 상황 제목 + 안내 문구. 추천 한약을 강조.
 */

const SCENARIOS = [
	{
		num: "01",
		title: "매일 외식·야근으로 식이가 흔들려요",
		body: "정기적인 식이 관리가 어려운 직장인이라면, 휴대 가능한",
		recommended: "부개 감비환",
		bodyTail: "이 부담이 적습니다.",
	},
	{
		num: "02",
		title: "근본 체질부터 차분히 바꾸고 싶어요",
		body: "호르몬·대사·식욕을 함께 다루는 정밀 처방이 필요하다면,",
		recommended: "부개 감비탕",
		bodyTail: "이 추천됩니다.",
	},
	{
		num: "03",
		title: "먼저 속을 비우고 시작하고 싶어요",
		body: "부기·소화 문제 동반이거나 다이어트 시작 단계에는",
		recommended: "부개 디톡스",
		bodyTail: "로 정비하세요.",
	},
] as const;

export function WhenToUseDiet() {
	return (
		<section className="bg-surface-alt px-6 lg:px-12 py-16 lg:py-24">
			<SectionHead
				eyebrow="02 · 어떤 분께 권장하나요"
				title={
					<>
						상황과 목표에 맞춰
						<br />
						가장 잘 맞는 처방을 찾아보세요.
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
						<div className="font-serif font-bold text-[36px] text-sage-500 leading-none mb-4">
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
