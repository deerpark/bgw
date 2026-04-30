import Link from "next/link";
import { RelatedProductCard } from "@/components/sections/RelatedProductCard";
import { SectionHead } from "@/components/sections/SectionHead";
import { Button } from "@/components/ui/button";
import type {
	DietProduct,
	ImmuneProduct,
	ProductCategory,
} from "@/data/products";

interface PreparingNoticeProps {
	others: (DietProduct | ImmuneProduct)[];
	category?: ProductCategory;
}

/**
 * 한약 상세 콘텐츠가 아직 채워지지 않은 경우의 안내 섹션.
 *
 * Phase 1 시드: 감비탕·디톡스·경옥고·녹용 detail 미포함 → 이 섹션 노출.
 * Hub로 돌아가는 CTA + 다른 한약 카드 노출.
 */
export function PreparingNotice({
	others,
	category = "diet",
}: PreparingNoticeProps) {
	const hubHref = category === "diet" ? "/diet" : "/immune";
	const hubLabel =
		category === "diet" ? "3종 비교로 돌아가기" : "면역 한약 3종 보기";
	const featuredHref =
		category === "diet" ? "/diet/gambihwan" : "/immune/gongjindan";
	const featuredLabel =
		category === "diet" ? "부개 감비환 자세히 보기" : "공진단 자세히 보기";
	const otherTitle =
		category === "diet" ? "다른 다이어트 한약" : "다른 면역 한약";

	return (
		<section className="bg-bg-base px-6 lg:px-12 py-16 lg:py-24">
			<div className="mx-auto max-w-[var(--container-xl)]">
				<div className="bg-cream-100 border border-border-subtle rounded-3xl px-7 py-9 lg:px-10 lg:py-12 text-center max-w-[720px] mx-auto">
					<span className="inline-block px-3 py-1.5 bg-vermilion-100 text-vermilion-700 rounded-full text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase">
						준비 중
					</span>
					<h2 className="mt-4 font-display text-2xl lg:text-3xl font-bold tracking-[-0.03em] text-ink-primary [word-break:keep-all]">
						이 한약의 상세 페이지를 준비하고 있어요.
					</h2>
					<p className="mt-3 text-base leading-[1.75] text-ink-secondary [word-break:keep-all]">
						비대면 진료 시 한의사가 직접 처방·복용·기간을 안내해 드립니다.
						이메일·카카오 채널로 먼저 문의하실 수도 있습니다.
					</p>
					<div className="mt-7 flex flex-col sm:flex-row gap-2.5 justify-center">
						<Button asChild size="lg">
							<Link href={hubHref}>{hubLabel}</Link>
						</Button>
						<Button asChild size="lg" variant="outline">
							<Link href={featuredHref}>{featuredLabel}</Link>
						</Button>
					</div>
				</div>

				<div className="mt-12 lg:mt-16">
					<SectionHead
						eyebrow={otherTitle}
						title="함께 살펴보세요"
						align="center"
						className="mb-8"
					/>
					<div className="grid gap-5 lg:grid-cols-2 max-w-[1080px] mx-auto">
						{others.map((p) => (
							<RelatedProductCard
								key={p.slug}
								product={p}
								category={category}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
