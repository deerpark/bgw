import Link from "next/link";
import { DIET_PRODUCTS } from "@/data/products";

/**
 * 다이어트 한약 3종 카드 그리드 — mockups/home.html .diet-grid / .diet-card.
 *
 * 모바일은 단일 컬럼, 데스크톱은 3-column.
 * 좌측 3px 보더로 카테고리 색(category-diet · sage-500) 표시.
 */
export function DietLineup() {
	return (
		<section className="bg-surface-alt px-6 lg:px-12 py-16 lg:py-24">
			<div className="mx-auto max-w-[var(--container-xl)]">
				<header className="max-w-[720px] mb-10 lg:mb-12">
					<span className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] text-brand uppercase">
						01 · 다이어트 라인업
					</span>
					<h2 className="mt-3 font-display text-3xl lg:text-[40px] font-bold tracking-[-0.03em] leading-[1.2] text-ink-primary">
						한방 다이어트, 무리하지 않는 방향으로.
					</h2>
					<p className="mt-3 text-base lg:text-[17px] leading-[1.75] text-ink-secondary">
						식욕·체질·기력을 함께 살피는 부개원 한방 다이어트 3종. 어떤 한약이
						적합한지는 한의사 진료 후 결정됩니다.
					</p>
				</header>

				<div className="grid gap-5 lg:grid-cols-3">
					{DIET_PRODUCTS.map((product) => (
						<article
							key={product.slug}
							className="relative overflow-hidden flex flex-col gap-5 bg-surface border border-border-subtle rounded-3xl p-7 lg:p-8 shadow-sm hover:-translate-y-[3px] hover:shadow-md transition-all duration-[240ms] ease-[cubic-bezier(0.2,0,0,1)] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-category-diet"
						>
							<header className="flex items-center gap-3.5">
								<span
									className="w-14 h-14 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center font-serif font-bold text-2xl"
									aria-hidden="true"
								>
									{product.chr}
								</span>
								<h3 className="m-0 text-[22px] font-bold tracking-[-0.02em] text-ink-primary">
									{product.nameKo}
									<small className="block mt-0.5 text-[11px] font-medium text-ink-muted tracking-[0.08em]">
										{product.nameEn} · {product.nameZh}
									</small>
								</h3>
							</header>
							<p className="m-0 text-base leading-[1.65] text-ink-secondary">
								{product.essence}
							</p>
							<ul className="m-0 p-0 list-none flex flex-col gap-2">
								{product.points.map((point) => (
									<li
										key={point}
										className="flex gap-2.5 items-start text-sm leading-[1.6] text-ink-secondary"
									>
										<span
											className="text-sage-400 font-bold text-lg leading-none"
											aria-hidden="true"
										>
											·
										</span>
										{point}
									</li>
								))}
							</ul>
							<Link
								href={product.href}
								className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-brand hover:text-brand-hover transition-colors"
							>
								자세히 보기 <span aria-hidden="true">→</span>
							</Link>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
