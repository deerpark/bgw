import Link from "next/link";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button } from "@/components/ui/button";
import type {
	DietProduct,
	ImmuneProduct,
	ProductCategory,
} from "@/data/products";
import { getCategoryTone } from "@/lib/category-tone";
import { buildNaverFormUrl } from "@/lib/settings";
import { cn } from "@/lib/utils";

interface ProductHeroProps {
	product: DietProduct | ImmuneProduct;
	category: ProductCategory;
	/** 비교 페이지 링크 표시 여부. 다른 한약 비교 CTA. */
	compareHref?: string;
	compareLabel?: string;
}

/**
 * 한약 상세 Hero — mockups/product-detail.html .product-hero 1:1.
 *
 * 데스크톱: 2-col grid (1.1fr 0.9fr) — 좌 카피, 우 visual (큰 한자 + 알약 + 인장)
 * 모바일: 단일 컬럼 (visual 16/9 줄여서)
 */
export function ProductHero({
	product,
	category,
	compareHref,
	compareLabel,
}: ProductHeroProps) {
	const tone = getCategoryTone(category);
	const formUrl = buildNaverFormUrl({
		source: "hero",
		content: `product_${product.slug}`,
	});

	const fallbackChip =
		category === "diet"
			? `Diet Care · ${product.compare.formShort}`
			: `Immune Care · ${product.compare.formShort}`;
	const fallbackCompareHref = category === "diet" ? "/diet" : "/immune";
	const fallbackCompareLabel =
		category === "diet" ? "다른 한약과 비교" : "다른 보약과 비교";

	const meta = product.detail?.heroMeta ?? [
		{ label: "형태", value: product.compare.form },
		{ label: "중점 케어", value: product.compare.focus },
		{ label: "권장 기간", value: product.compare.duration },
		{ label: "견적", value: "진료 후 안내" },
	];

	return (
		<section className="px-6 lg:px-12 pt-16 lg:pt-24 pb-12 lg:pb-16 bg-gradient-to-b from-cream-50 to-cream-100">
			<div className="mx-auto max-w-[var(--container-xl)] grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:items-center">
				<div className="max-w-[580px]">
					<span
						className={cn(
							"inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase",
							tone.eyebrowBg,
							tone.eyebrowText,
						)}
					>
						{product.detail?.heroChip ?? fallbackChip}
					</span>
					<h1 className="mt-4 lg:mt-5 font-display font-bold tracking-[-0.04em] leading-[1.1] text-ink-primary text-[36px] sm:text-[44px] lg:text-[56px] [word-break:keep-all]">
						{product.nameKo}
					</h1>
					<p className="mt-1 font-serif text-base lg:text-[22px] text-brown-500 tracking-[0.06em]">
						{product.nameEn} · {product.nameZh}
					</p>
					<p className="mt-5 lg:mt-6 text-base lg:text-[22px] leading-[1.55] text-ink-primary font-medium tracking-[-0.02em] max-w-[520px] [word-break:keep-all]">
						{product.essence}
					</p>
					{product.detail?.heroSub && (
						<p className="mt-4 lg:mt-6 text-sm lg:text-base leading-[1.85] text-ink-secondary [word-break:keep-all]">
							{product.detail.heroSub}
						</p>
					)}

					<div className="mt-6 lg:mt-8 flex flex-col sm:flex-row gap-2.5">
						<Button
							asChild
							size="lg"
							className="bg-vermilion text-cream-50 hover:bg-vermilion-hover [a]:hover:bg-vermilion-hover h-12 lg:h-15 px-6 lg:px-8 text-base lg:text-lg shadow-sm"
						>
							<TrackedLink
								event="cta_telemedicine_click"
								eventProps={{ location: "hero", channel: "naver_form" }}
								href={formUrl}
								target="_blank"
								rel="noopener"
							>
								비대면 진료 접수 →
							</TrackedLink>
						</Button>
						<Button
							asChild
							size="lg"
							variant="outline"
							className="border-1.5 border-brand text-brand hover:bg-brand-soft hover:text-brand h-12 lg:h-15 px-6 lg:px-8 text-base lg:text-lg"
						>
							<Link href={compareHref ?? fallbackCompareHref}>
								{compareLabel ?? fallbackCompareLabel}
							</Link>
						</Button>
					</div>

					<dl className="mt-8 lg:mt-9 grid grid-cols-2 lg:flex lg:flex-wrap gap-x-6 gap-y-3 text-[13px] text-ink-muted">
						{meta.map((m) => (
							<div key={m.label} className="flex flex-col gap-0.5">
								<dt className="text-[11px] tracking-[0.04em] uppercase">
									{m.label}
								</dt>
								<dd className="m-0 text-ink-primary font-medium text-sm">
									{m.value}
								</dd>
							</div>
						))}
					</dl>
				</div>

				{/* Visual — 큰 한자 + 알약 동심원 + 인장 */}
				<aside
					aria-hidden="true"
					className={cn(
						"relative aspect-square rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br",
						tone.heroVisualGradient,
					)}
				>
					{/* dashed concentric rings */}
					<span className="absolute inset-[12%] rounded-full border border-dashed border-brown-700/18" />
					<span className="absolute inset-[28%] rounded-full border border-dashed border-brown-700/18" />
					{/* big han glyph */}
					<span className="absolute top-7 left-7 font-serif font-bold text-[40px] lg:text-[56px] text-brown-700/18">
						{product.chr}
					</span>
					{/* main pill */}
					<span className="absolute inset-[38%] rounded-full bg-brown-700 shadow-xl [box-shadow:0_24px_60px_rgba(73,46,20,0.14),inset_-10px_-10px_30px_rgba(0,0,0,0.3),inset_10px_10px_30px_rgba(255,253,249,0.1)]" />
					{/* secondary pills */}
					<span className="absolute left-[22%] top-[26%] size-[16%] rounded-full bg-brown-600 shadow-md" />
					<span className="absolute right-[18%] bottom-[24%] size-[12%] rounded-full bg-brown-800 shadow-sm" />
					{/* stamp */}
					<span className="absolute right-7 bottom-7 bg-vermilion text-cream-50 px-3 py-2.5 rounded-md font-serif font-bold text-xs leading-tight [writing-mode:vertical-rl] shadow-md">
						富梄
						<br />
						監製
					</span>
				</aside>
			</div>
		</section>
	);
}
