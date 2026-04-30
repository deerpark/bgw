import { RelatedProductCard } from "@/components/sections/RelatedProductCard";
import { SectionHead } from "@/components/sections/SectionHead";
import type {
	DietProduct,
	ImmuneProduct,
	ProductCategory,
} from "@/data/products";

interface RelatedSectionProps {
	currentProductName: string;
	others: (DietProduct | ImmuneProduct)[];
	category?: ProductCategory;
}

/**
 * 다른 옵션 — mockups/product-detail.html .related-grid 1:1.
 * 2-column grid (다른 한약 2종).
 */
export function RelatedSection({
	currentProductName,
	others,
	category = "diet",
}: RelatedSectionProps) {
	const productLabel = currentProductName.replace("부개 ", "");
	return (
		<section className="bg-bg-base px-6 lg:px-12 py-16 lg:py-24">
			<div className="mx-auto max-w-[var(--container-xl)]">
				<SectionHead
					eyebrow="08 · 다른 옵션"
					title={`${productLabel}과 함께 살펴보세요`}
					align="center"
					className="mb-10 lg:mb-12"
				/>
				<div className="grid gap-5 lg:grid-cols-2 max-w-[1080px] mx-auto">
					{others.map((p) => (
						<RelatedProductCard key={p.slug} product={p} category={category} />
					))}
				</div>
			</div>
		</section>
	);
}
