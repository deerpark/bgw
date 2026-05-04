import { notFound } from "next/navigation";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { AnchorNav } from "@/components/sections/AnchorNav";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CautionsSection } from "@/components/sections/product-detail/CautionsSection";
import { FinalDisclaimer } from "@/components/sections/product-detail/FinalDisclaimer";
import { KeyPoints } from "@/components/sections/product-detail/KeyPoints";
import { PreparingNotice } from "@/components/sections/product-detail/PreparingNotice";
import { PrincipleSection } from "@/components/sections/product-detail/PrincipleSection";
import { ProductHero } from "@/components/sections/product-detail/ProductHero";
import { RelatedSection } from "@/components/sections/product-detail/RelatedSection";
import { StickyProductCTA } from "@/components/sections/product-detail/StickyProductCTA";
import { TargetAudience } from "@/components/sections/product-detail/TargetAudience";
import { UsageSection } from "@/components/sections/product-detail/UsageSection";
import { SectionHead } from "@/components/sections/SectionHead";
import {
	DIET_PRODUCTS,
	type DietSlug,
	getOtherDietProducts,
} from "@/data/products";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
	params: Promise<{ slug: string }>;
}

const VALID_SLUGS: DietSlug[] = ["gambihwan", "gambitang", "detox"];

function isValidSlug(slug: string): slug is DietSlug {
	return (VALID_SLUGS as string[]).includes(slug);
}

export function generateStaticParams() {
	return DIET_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	if (!isValidSlug(slug)) return {};
	const product = DIET_PRODUCTS.find((p) => p.slug === slug);
	if (!product) return {};
	return buildMetadata({
		title: `${product.nameKo} — ${product.compare.formShort}`,
		description: `${product.essence} ${product.compare.audience}에 권장. 한의사 비대면 진료 후 처방됩니다.`,
		path: product.href,
		og: {
			category: "다이어트 한약",
			title: product.nameKo,
			subtitle: product.compare.formShort,
		},
	});
}

const ANCHOR_ITEMS = [
	{ id: "key-points", label: "핵심" },
	{ id: "target", label: "권장 대상" },
	{ id: "principle", label: "처방 원리" },
	{ id: "usage", label: "복용 안내" },
	{ id: "process", label: "비대면 절차" },
	{ id: "cautions", label: "주의사항" },
	{ id: "faq", label: "FAQ" },
] as const;

/**
 * 한약 상세 페이지 (P-03) — mockups/product-detail.html 1:1.
 *
 * `detail` 콘텐츠가 채워진 한약(현재 감비환)은 풀 9-section 페이지,
 * 미채움(감비탕·디톡스)은 [PreparingNotice] placeholder + Hub/감비환 CTA.
 */
export default async function ProductDetailPage({ params }: PageProps) {
	const { slug } = await params;
	if (!isValidSlug(slug)) notFound();

	const product = DIET_PRODUCTS.find((p) => p.slug === slug);
	if (!product) notFound();

	const others = getOtherDietProducts(slug);
	const detail = product.detail;

	if (!detail) {
		return (
			<>
				<ProductHero product={product} category="diet" />
				<RevealOnScroll>
					<PreparingNotice others={others} category="diet" />
				</RevealOnScroll>
				<RevealOnScroll>
					<FinalDisclaimer />
				</RevealOnScroll>
			</>
		);
	}

	return (
		<>
			<ProductHero product={product} category="diet" />
			<AnchorNav items={ANCHOR_ITEMS} />
			<RevealOnScroll>
				<KeyPoints
					productName={product.nameKo}
					items={detail.keyPoints}
					category="diet"
				/>
			</RevealOnScroll>
			<RevealOnScroll>
				<TargetAudience items={detail.targets} />
			</RevealOnScroll>
			<RevealOnScroll>
				<PrincipleSection
					headline={detail.principleHeadline}
					note={detail.principleNote}
					groups={detail.principleGroups}
				/>
			</RevealOnScroll>
			<RevealOnScroll>
				<UsageSection items={detail.usage} />
			</RevealOnScroll>
			<RevealOnScroll>
				<section id="process">
					<ProcessTimeline
						eyebrow="06 · 비대면 진료 절차"
						title="접수에서 수령까지 5단계"
						background="alt"
					/>
				</section>
			</RevealOnScroll>
			<RevealOnScroll>
				<CautionsSection items={detail.cautions} />
			</RevealOnScroll>
			<RevealOnScroll>
				<section
					id="faq"
					className="bg-surface-alt px-6 lg:px-12 py-16 lg:py-24"
				>
					<SectionHead
						eyebrow="07 · 자주 묻는 질문"
						title={`${product.nameKo}을 시작하기 전에`}
						align="center"
						className="mb-10 lg:mb-12"
					/>
					<FAQAccordion items={detail.faq} />
				</section>
			</RevealOnScroll>
			<RevealOnScroll>
				<RelatedSection
					currentProductName={product.nameKo}
					others={others}
					category="diet"
				/>
			</RevealOnScroll>
			<RevealOnScroll>
				<FinalDisclaimer />
			</RevealOnScroll>
			<StickyProductCTA product={product} category="diet" />
		</>
	);
}
