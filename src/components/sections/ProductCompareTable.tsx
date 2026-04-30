import Link from "next/link";
import { Button } from "@/components/ui/button";
import type {
	DietProduct,
	ImmuneProduct,
	ProductCategory,
} from "@/data/products";
import { getCategoryTone } from "@/lib/category-tone";
import { cn } from "@/lib/utils";

interface ProductCompareTableProps {
	products: readonly (DietProduct | ImmuneProduct)[];
	category?: ProductCategory;
	className?: string;
}

const ROWS: {
	label: string;
	key: keyof DietProduct["compare"];
	stars?: keyof DietProduct["compare"];
	muted?: boolean;
}[] = [
	{ label: "형태", key: "form" },
	{ label: "복용 편의", key: "easeNote", stars: "easeStars" },
	{ label: "처방 정밀도", key: "precisionNote", stars: "precisionStars" },
	{ label: "중점 케어", key: "focus" },
	{ label: "권장 대상", key: "audience" },
	{ label: "복용 기간 (예시)", key: "duration" },
];

/**
 * 다이어트 한약 3종 비교 표 — mockups/diet-hub.html .compare 1:1.
 *
 * 데스크톱: 4-col grid (label + 3 products)
 * 모바일: 각 제품별 카드로 stack
 */
export function ProductCompareTable({
	products,
	category = "diet",
	className,
}: ProductCompareTableProps) {
	const tone = getCategoryTone(category);
	return (
		<div className={cn("max-w-[var(--container-xl)] mx-auto", className)}>
			{/* Desktop: grid table */}
			<div className="hidden lg:block">
				<div className="grid grid-cols-[200px_1fr_1fr_1fr] gap-px bg-border-subtle border border-border-subtle rounded-2xl overflow-hidden">
					{/* Header row */}
					<div className="bg-bg-base px-6 py-7">
						<h3 className="text-xl font-bold tracking-[-0.02em] text-ink-primary">
							3종 비교
						</h3>
						<p className="mt-2 text-[13px] leading-[1.7] text-ink-muted [word-break:keep-all]">
							한약 형태·복용 편의·권장 대상이 어떻게 다른지 한눈에 살펴보세요.
						</p>
					</div>
					{products.map((p) => (
						<div
							key={p.slug}
							className="bg-bg-base px-6 py-7 flex flex-col gap-2"
						>
							<span
								className={cn(
									"inline-flex items-center justify-center size-10 rounded-xl font-serif font-bold text-xl",
									tone.chrBg,
									tone.chrText,
								)}
								aria-hidden="true"
							>
								{p.chr}
							</span>
							<h4 className="text-lg font-bold tracking-[-0.02em] text-ink-primary">
								{p.nameKo}
							</h4>
							<small className="text-[11px] font-medium tracking-[0.06em] text-ink-muted">
								{p.nameEn} · {p.nameZh}
							</small>
							<p className="mt-2 text-[13px] leading-[1.7] text-ink-secondary [word-break:keep-all]">
								{p.essence}
							</p>
						</div>
					))}

					{/* Data rows */}
					{ROWS.map((row) => (
						<div key={row.label} className="contents">
							<div className="bg-bg-subtle px-6 py-4 text-[12px] font-eyebrow font-semibold tracking-[0.1em] text-ink-muted uppercase">
								{row.label}
							</div>
							{products.map((p) => {
								const value = p.compare[row.key];
								const stars = row.stars ? p.compare[row.stars] : undefined;
								return (
									<div
										key={`${p.slug}-${row.label}`}
										className="bg-bg-base px-6 py-4 text-sm leading-[1.6] text-ink-primary [word-break:keep-all]"
									>
										{stars !== undefined && typeof stars === "number" && (
											<span
												role="img"
												className="inline-block mr-2 text-vermilion font-semibold tracking-[0.15em]"
												aria-label={`정도 ${stars}/3`}
											>
												{"★".repeat(stars)}
											</span>
										)}
										{value}
									</div>
								);
							})}
						</div>
					))}

					{/* Estimate row */}
					<div className="bg-bg-subtle px-6 py-4 text-[12px] font-eyebrow font-semibold tracking-[0.1em] text-ink-muted uppercase">
						상세 견적
					</div>
					{products.map((p) => (
						<div
							key={`${p.slug}-est`}
							className="bg-bg-base px-6 py-4 text-sm text-ink-muted"
						>
							진료 후 안내
						</div>
					))}

					{/* CTA row */}
					<div className="bg-bg-base px-6 py-5"></div>
					{products.map((p) => (
						<div key={`${p.slug}-cta`} className="bg-bg-base px-6 py-5">
							<Button asChild variant="secondary" className="w-full">
								<Link href={p.href}>
									{p.nameKo.replace("부개 ", "")} 자세히 →
								</Link>
							</Button>
						</div>
					))}
				</div>
			</div>

			{/* Mobile: stacked cards */}
			<div className="lg:hidden flex flex-col gap-4">
				{products.map((p) => (
					<article
						key={p.slug}
						className="bg-surface border border-border-subtle rounded-2xl p-6"
					>
						<div className="flex items-center gap-3 mb-4">
							<span
								className={cn(
									"inline-flex items-center justify-center size-12 rounded-xl font-serif font-bold text-2xl",
									tone.chrBg,
									tone.chrText,
								)}
								aria-hidden="true"
							>
								{p.chr}
							</span>
							<div>
								<h4 className="text-lg font-bold tracking-[-0.02em] text-ink-primary">
									{p.nameKo}
								</h4>
								<small className="text-[11px] font-medium tracking-[0.06em] text-ink-muted">
									{p.nameEn} · {p.nameZh}
								</small>
							</div>
						</div>
						<p className="text-sm leading-[1.7] text-ink-secondary [word-break:keep-all] mb-4">
							{p.essence}
						</p>
						<dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-[13px] mb-5">
							{ROWS.map((row) => (
								<div key={row.label}>
									<dt className="text-[10px] font-eyebrow font-semibold tracking-[0.1em] text-ink-muted uppercase mb-0.5">
										{row.label}
									</dt>
									<dd className="m-0 text-ink-primary leading-[1.5] [word-break:keep-all]">
										{p.compare[row.key]}
									</dd>
								</div>
							))}
						</dl>
						<Button asChild variant="secondary" className="w-full">
							<Link href={p.href}>
								{p.nameKo.replace("부개 ", "")} 자세히 →
							</Link>
						</Button>
					</article>
				))}
			</div>

			<p className="text-center mt-8 max-w-[720px] mx-auto text-ink-muted text-[13px] leading-[1.85] [word-break:keep-all]">
				※ 위 표의 형태·기간·중점 케어는 일반적인 안내이며, 정확한 처방은
				한의사가 체질·증상·복약 이력을 살핀 뒤 결정됩니다.
			</p>
		</div>
	);
}
