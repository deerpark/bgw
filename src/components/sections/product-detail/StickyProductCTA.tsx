import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button } from "@/components/ui/button";
import type {
	DietProduct,
	ImmuneProduct,
	ProductCategory,
} from "@/data/products";
import { getCategoryTone } from "@/lib/category-tone";
import { buildNaverFormUrl, kakaoChatUrl } from "@/lib/settings";
import { cn } from "@/lib/utils";

interface StickyProductCTAProps {
	product: DietProduct | ImmuneProduct;
	category?: ProductCategory;
}

/**
 * 한약 상세 페이지 sticky bottom CTA — mockups/product-detail.html .sticky-cta.
 *
 * 데스크톱 이상에서만 노출. 모바일은 layout의 FloatingCTA가 처리.
 * (FloatingCTA 위에 추가로 띄우면 영역 침범)
 */
export function StickyProductCTA({
	product,
	category = "diet",
}: StickyProductCTAProps) {
	const tone = getCategoryTone(category);
	const formUrl = buildNaverFormUrl({
		source: "sticky_cta",
		content: `product_${product.slug}`,
	});

	return (
		<div className="hidden lg:block sticky bottom-0 z-30 bg-bg-base/92 backdrop-blur-[18px] backdrop-saturate-[180%] border-t border-border-subtle">
			<div className="mx-auto max-w-[var(--container-xl)] px-6 lg:px-12 py-3.5 flex items-center justify-between gap-4">
				<div className="flex items-center gap-3.5 min-w-0">
					<span
						className={cn(
							"size-10 rounded-xl flex items-center justify-center font-serif font-bold text-lg flex-shrink-0",
							tone.chrBg,
							tone.chrText,
						)}
						aria-hidden="true"
					>
						{product.chr}
					</span>
					<div className="min-w-0">
						<p className="text-[15px] font-semibold tracking-[-0.02em] text-ink-primary truncate">
							{product.nameKo}
						</p>
						<small className="text-[11px] tracking-[0.04em] text-ink-muted">
							{product.nameEn} · {product.nameZh}
						</small>
					</div>
				</div>
				<div className="flex items-center gap-2.5 flex-shrink-0">
					<span className="text-[13px] text-ink-muted hidden xl:inline">
						상세 견적은 진료 후 안내
					</span>
					<Button
						asChild
						size="lg"
						variant="outline"
						className="border-1.5 border-brand text-brand hover:bg-brand-soft hover:text-brand"
					>
						<TrackedLink
							event="kakao_chat_open"
							eventProps={{ location: "final_cta" }}
							href={kakaoChatUrl()}
							target="_blank"
							rel="noopener"
						>
							카카오 문의
						</TrackedLink>
					</Button>
					<Button
						asChild
						size="lg"
						className="bg-vermilion text-cream-50 hover:bg-vermilion-hover [a]:hover:bg-vermilion-hover shadow-sm"
					>
						<TrackedLink
							event="cta_telemedicine_click"
							eventProps={{ location: "final_cta", channel: "naver_form" }}
							href={formUrl}
							target="_blank"
							rel="noopener"
						>
							비대면 진료 접수 →
						</TrackedLink>
					</Button>
				</div>
			</div>
		</div>
	);
}
