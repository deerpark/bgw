import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type {
	DietProduct,
	ImmuneProduct,
	ProductCategory,
} from "@/data/products";
import { getCategoryTone } from "@/lib/category-tone";
import { cn } from "@/lib/utils";

interface RelatedProductCardProps {
	product: DietProduct | ImmuneProduct;
	category?: ProductCategory;
	className?: string;
}

/**
 * 한약 상세 페이지의 "다른 옵션" 섹션에서 사용되는 가로형 카드.
 * mockups/product-detail.html .related-card 1:1.
 */
export function RelatedProductCard({
	product,
	category = "diet",
	className,
}: RelatedProductCardProps) {
	const tone = getCategoryTone(category);
	return (
		<Link
			href={product.href}
			className={cn(
				"group flex items-center gap-4 lg:gap-5 p-5 lg:p-6 bg-surface border border-border-subtle rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] border-l-[3px]",
				tone.cardLeftBorder,
				className,
			)}
		>
			<span
				className={cn(
					"flex-shrink-0 size-14 lg:size-16 rounded-2xl flex items-center justify-center font-serif font-bold text-2xl lg:text-3xl",
					tone.chrBg,
					tone.chrText,
				)}
				aria-hidden="true"
			>
				{product.chr}
			</span>
			<div className="flex-1 min-w-0">
				<h4 className="text-lg font-semibold tracking-[-0.02em] text-ink-primary">
					{product.nameKo}
				</h4>
				<p className="mt-1 text-[13px] leading-[1.6] text-ink-muted [word-break:keep-all]">
					{product.heroDesc}
				</p>
			</div>
			<ArrowRight
				className="size-5 text-brand group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0"
				aria-hidden="true"
			/>
		</Link>
	);
}
