export interface ProcessStep {
	num: number;
	title: string;
	body: string;
}

interface ProcessTimelineProps {
	eyebrow?: string;
	title?: string;
	sub?: string;
	steps?: readonly ProcessStep[];
	/** "alt"는 surface-alt 배경 (상세 페이지에서 사용). */
	background?: "base" | "alt";
}

/**
 * 5단계 비대면 진료 절차 — mockups/home.html .process / .process-step,
 * mockups/product-detail.html .process-detail, mockups/telemedicine.html.
 *
 * 데스크톱: 5-col grid + 가로 line connector (top: 24px)
 * 모바일: 단일 컬럼 stack + 좌측 vertical line connector
 *
 * eyebrow/title/sub/steps는 props로 override (홈/상세/안내 페이지마다 다른 번호·문구).
 */
const DEFAULT_STEPS: readonly ProcessStep[] = [
	{ num: 1, title: "접수", body: "네이버폼·카카오·전화" },
	{ num: 2, title: "확인 통화", body: "영업시간 내 연락" },
	{ num: 3, title: "유선 진료", body: "한의사 1:1 상담" },
	{ num: 4, title: "처방·조제", body: "체질에 맞춰 조제" },
	{ num: 5, title: "택배 수령", body: "자택 안전 포장 발송" },
];

export function ProcessTimeline({
	eyebrow = "03 · 비대면 진료 절차",
	title = "접수에서 수령까지, 5단계로 단순하게.",
	sub,
	steps = DEFAULT_STEPS,
	background = "base",
}: ProcessTimelineProps = {}) {
	const STEPS = steps;
	const bgClass = background === "alt" ? "bg-surface-alt" : "bg-bg-base";
	const stepBg = background === "alt" ? "bg-surface-alt" : "bg-bg-base";
	const borderClass =
		background === "alt" ? "border-surface-alt" : "border-bg-base";
	return (
		<section className={`${bgClass} px-6 lg:px-12 py-16 lg:py-24`}>
			<div className="mx-auto max-w-[var(--container-xl)]">
				<header className="max-w-[720px] mb-10 lg:mb-12">
					<span className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] text-brand uppercase">
						{eyebrow}
					</span>
					<h2 className="mt-3 font-display text-3xl lg:text-[40px] font-bold tracking-[-0.03em] leading-[1.2] text-ink-primary">
						{title}
					</h2>
					{sub && (
						<p className="mt-3 text-base lg:text-[17px] leading-[1.75] text-ink-secondary [word-break:keep-all]">
							{sub}
						</p>
					)}
				</header>

				{/* Desktop: 5-col with horizontal connector */}
				<ol className="hidden lg:grid lg:grid-cols-5 gap-4 relative before:content-[''] before:absolute before:left-6 before:right-6 before:top-6 before:h-px before:bg-border-default">
					{STEPS.map((step) => (
						<li
							key={step.num}
							className={`${stepBg} relative px-2 text-center`}
						>
							<div
								className={`w-12 h-12 rounded-full bg-brand text-ink-inverse flex items-center justify-center font-bold text-[17px] mx-auto mb-3.5 border-4 ${borderClass}`}
								aria-hidden="true"
							>
								{step.num}
							</div>
							<h3 className="text-sm font-semibold tracking-[-0.01em] text-ink-primary mb-1">
								{step.title}
							</h3>
							<p className="text-xs text-ink-muted leading-[1.6]">
								{step.body}
							</p>
						</li>
					))}
				</ol>

				{/* Mobile: vertical stack */}
				<ol className="lg:hidden flex flex-col gap-3.5 relative pl-1.5">
					{STEPS.map((step, idx) => (
						<li key={step.num} className="flex gap-3.5 items-start relative">
							<div className="flex flex-col items-center flex-shrink-0">
								<div
									className="w-8 h-8 rounded-full bg-brand text-ink-inverse flex items-center justify-center font-bold text-[13px]"
									aria-hidden="true"
								>
									{step.num}
								</div>
								{idx < STEPS.length - 1 && (
									<div
										className="w-px flex-1 bg-border-default mt-1.5 mb-[-14px] min-h-4"
										aria-hidden="true"
									/>
								)}
							</div>
							<div className="pt-1 pb-2.5">
								<h3 className="text-sm font-semibold tracking-[-0.01em] text-ink-primary mb-0.5">
									{step.title}
								</h3>
								<p className="text-xs text-ink-muted leading-[1.55]">
									{step.body}
								</p>
							</div>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
