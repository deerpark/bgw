import { CheckCircle2, FileText, ListChecks } from "lucide-react";
import { SectionHead } from "@/components/sections/SectionHead";
import type { Treatment } from "@/data/treatments";

interface InsuranceNoticeProps {
	notice: NonNullable<Treatment["insuranceNotice"]>;
}

/**
 * 자동차보험 페이지 전용 — 보험 적용 + 필요 서류 + 체크리스트.
 * compliance §2.6: 자동차보험 페이지엔 추가 노출 의무.
 */
export function InsuranceNotice({ notice }: InsuranceNoticeProps) {
	return (
		<section className="bg-surface-alt px-6 lg:px-12 py-16 lg:py-24">
			<div className="mx-auto max-w-[var(--container-xl)]">
				<SectionHead
					eyebrow="04 · 자동차보험 안내"
					title="진료 전 알아두시면 편한 정보"
					align="center"
					className="mb-10 lg:mb-12"
				/>
				<div className="grid gap-5 lg:grid-cols-3 max-w-[1080px] mx-auto">
					{/* Coverage */}
					<article className="bg-surface border border-border-subtle rounded-2xl p-7 lg:p-8">
						<CheckCircle2
							className="size-7 text-sage-500 mb-4"
							aria-hidden="true"
						/>
						<h3 className="text-lg font-semibold tracking-[-0.02em] mb-3 [word-break:keep-all]">
							보험 적용 안내
						</h3>
						<ul className="flex flex-col gap-2 text-sm leading-[1.7] text-ink-secondary">
							{notice.coverage.map((item) => (
								<li key={item} className="flex gap-2.5 [word-break:keep-all]">
									<span
										className="text-sage-500 font-bold flex-shrink-0"
										aria-hidden="true"
									>
										✓
									</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</article>

					{/* Documents */}
					<article className="bg-surface border border-border-subtle rounded-2xl p-7 lg:p-8">
						<FileText className="size-7 text-brand mb-4" aria-hidden="true" />
						<h3 className="text-lg font-semibold tracking-[-0.02em] mb-3 [word-break:keep-all]">
							필요 서류
						</h3>
						<dl className="flex flex-col gap-3 text-sm">
							{notice.documents.map((d) => (
								<div key={d.title}>
									<dt className="font-semibold text-ink-primary mb-0.5">
										{d.title}
									</dt>
									<dd className="m-0 text-[13px] leading-[1.6] text-ink-secondary [word-break:keep-all]">
										{d.body}
									</dd>
								</div>
							))}
						</dl>
					</article>

					{/* Checklist */}
					<article className="bg-surface border border-border-subtle rounded-2xl p-7 lg:p-8">
						<ListChecks
							className="size-7 text-vermilion mb-4"
							aria-hidden="true"
						/>
						<h3 className="text-lg font-semibold tracking-[-0.02em] mb-3 [word-break:keep-all]">
							연락 시 알려주실 것
						</h3>
						<ul className="flex flex-col gap-2 text-sm leading-[1.7] text-ink-secondary">
							{notice.checklist.map((item) => (
								<li key={item} className="flex gap-2.5 [word-break:keep-all]">
									<span
										className="text-vermilion font-bold flex-shrink-0"
										aria-hidden="true"
									>
										·
									</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</article>
				</div>
			</div>
		</section>
	);
}
