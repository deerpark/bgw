import Link from "next/link";
import { IMMUNE_PRODUCTS } from "@/data/products";

/**
 * 면역 한약 3종 카드 — mockups/home.html .immune-grid / .immune-card.
 *
 * 데스크톱 3-column, 모바일 단일 컬럼. 다이어트 카드보다 컴팩트(가로 레이아웃).
 * 좌측 3px 보더는 category-immune · vermilion-500.
 */
export function ImmuneLineup() {
	return (
		<section className="bg-bg-base px-6 lg:px-12 py-16 lg:py-24">
			<div className="mx-auto max-w-[var(--container-xl)]">
				<header className="max-w-[720px] mb-10 lg:mb-12">
					<span className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] text-brand uppercase">
						02 · 면역 한약
					</span>
					<h2 className="mt-3 font-display text-3xl lg:text-[40px] font-bold tracking-[-0.03em] leading-[1.2] text-ink-primary">
						기력과 면역을 받쳐주는 한약.
					</h2>
					<p className="mt-3 text-base lg:text-[17px] leading-[1.75] text-ink-secondary">
						공진단·경옥고·녹용보약 — 비대면 진료를 통해 처방받으실 수 있습니다.
					</p>
				</header>

				<div className="grid gap-4 lg:grid-cols-3">
					{IMMUNE_PRODUCTS.map((product) => (
						<Link
							key={product.slug}
							href={product.href}
							className="flex gap-4 items-start bg-surface border border-border-subtle border-l-[3px] border-l-category-immune rounded-2xl p-7 hover:shadow-md transition-shadow duration-200"
						>
							<span
								className="flex-shrink-0 w-13 h-13 rounded-2xl bg-vermilion-100 text-vermilion-700 flex items-center justify-center font-serif font-bold text-[22px]"
								aria-hidden="true"
								style={{ width: "52px", height: "52px" }}
							>
								{product.chr}
							</span>
							<div className="flex-1 min-w-0">
								<h3 className="m-0 mb-1 text-[17px] font-semibold tracking-[-0.02em] text-ink-primary">
									{product.nameKo}
								</h3>
								<p className="m-0 text-[13px] leading-[1.6] text-ink-secondary">
									{product.essence}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
