import type { ReactNode } from "react";

/**
 * 법적 고지 페이지 공통 레이아웃 — `/privacy`, `/terms`.
 *
 * - 목차(TOC): 데스크톱은 좌측 sticky, 모바일은 상단 카드.
 * - 본문: prose-style 타이포 + 섹션 앵커.
 * - 갱신일: 헤더 우측 작게.
 *
 * 카피 작성 가이드:
 *   - "비대면 진료 접수" 표현 일관 사용 (docs/03-compliance-and-copy.md §1.1)
 *   - 처방·조제·결제·배송은 한의사 유선 진료 이후라는 점을 흐리지 않는다
 *   - 표현이 단정적이지 않도록 — 변경 가능 조항 명시
 */

interface Section {
	id: string;
	title: string;
	body: ReactNode;
}

interface LegalPageProps {
	eyebrow: string;
	title: string;
	intro: ReactNode;
	updatedAt: string;
	effectiveAt: string;
	sections: readonly Section[];
}

export function LegalPage({
	eyebrow,
	title,
	intro,
	updatedAt,
	effectiveAt,
	sections,
}: LegalPageProps) {
	return (
		<article className="bg-bg-base">
			<header className="bg-surface-alt border-b border-border-subtle px-6 lg:px-12 py-12 lg:py-20">
				<div className="mx-auto max-w-[1080px]">
					<span className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] text-brand uppercase">
						{eyebrow}
					</span>
					<h1 className="mt-3 font-display text-3xl lg:text-[44px] font-bold tracking-[-0.03em] leading-[1.2] text-ink-primary">
						{title}
					</h1>
					<div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-ink-muted">
						<span>시행일: {effectiveAt}</span>
						<span>최종 갱신: {updatedAt}</span>
					</div>
					<div className="mt-6 max-w-[68ch] text-[15px] leading-[1.85] text-ink-secondary [word-break:keep-all]">
						{intro}
					</div>
				</div>
			</header>

			<div className="mx-auto max-w-[1080px] px-6 lg:px-12 py-12 lg:py-16 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
				<aside className="lg:sticky lg:top-24 lg:self-start">
					<nav aria-label="목차" className="bg-surface border border-border-subtle rounded-2xl p-5">
						<p className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] text-ink-muted uppercase mb-3">
							목차
						</p>
						<ol className="flex flex-col gap-2 text-[13px] leading-[1.5] text-ink-secondary">
							{sections.map((s, idx) => (
								<li key={s.id}>
									<a
										href={`#${s.id}`}
										className="hover:text-brand [word-break:keep-all]"
									>
										<span className="text-ink-muted mr-1.5">
											{String(idx + 1).padStart(2, "0")}
										</span>
										{s.title}
									</a>
								</li>
							))}
						</ol>
					</nav>
				</aside>

				<div className="flex flex-col gap-10 [&_p]:text-[15px] [&_p]:leading-[1.85] [&_p]:text-ink-secondary [&_p]:[word-break:keep-all] [&_li]:text-[15px] [&_li]:leading-[1.85] [&_li]:text-ink-secondary [&_li]:[word-break:keep-all] [&_strong]:text-ink-primary [&_strong]:font-semibold [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 [&_table]:w-full [&_table]:text-[13px] [&_table]:border-collapse [&_th]:bg-surface-alt [&_th]:text-left [&_th]:font-semibold [&_th]:text-ink-primary [&_th]:p-2.5 [&_th]:border [&_th]:border-border-subtle [&_td]:p-2.5 [&_td]:border [&_td]:border-border-subtle [&_td]:align-top">
					{sections.map((s, idx) => (
						<section
							key={s.id}
							id={s.id}
							className="scroll-mt-24"
							aria-labelledby={`${s.id}-h`}
						>
							<h2
								id={`${s.id}-h`}
								className="font-display text-xl lg:text-2xl font-bold tracking-[-0.02em] text-ink-primary mb-4 [word-break:keep-all]"
							>
								<span className="text-brand mr-2 font-mono text-[15px] tracking-normal align-middle">
									{String(idx + 1).padStart(2, "0")}
								</span>
								{s.title}
							</h2>
							<div className="flex flex-col gap-3">{s.body}</div>
						</section>
					))}
				</div>
			</div>
		</article>
	);
}
