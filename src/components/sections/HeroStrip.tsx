/**
 * Hero 아래 4-step 프로세스 strip — mockups/home.html .hero-strip 1:1.
 * 모바일에선 2x2 grid로 떨어진다 (mockup엔 미명세, UX 추정).
 *
 * Step 라벨 + 본문은 의미상 정의 리스트(`<dl>/<dt>/<dd>`).
 * heading 사용하면 페이지 heading 순서가 깨져 a11y 점수 떨어짐.
 */
const STEPS = [
	{ label: "Step 01", body: "접수 — 네이버폼·카톡·전화 중 편한 방법" },
	{ label: "Step 02", body: "유선 진료 — 한의사 1:1, 평균 12분" },
	{ label: "Step 03", body: "처방·조제 — 체질·증상별 맞춤" },
	{ label: "Step 04", body: "택배 발송 — 보냉포장, 1–2일 내 수령" },
] as const;

export function HeroStrip() {
	return (
		<aside
			aria-label="비대면 진료 프로세스 요약"
			className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border-subtle border-y border-border-subtle"
		>
			{STEPS.map((step) => (
				<dl
					key={step.label}
					className="bg-bg-base px-6 py-5 lg:px-7 lg:py-6 m-0"
				>
					<dt className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] text-vermilion-600 uppercase">
						{step.label}
					</dt>
					<dd className="m-0 mt-1 text-sm text-ink-secondary leading-[1.5]">
						{step.body}
					</dd>
				</dl>
			))}
		</aside>
	);
}
