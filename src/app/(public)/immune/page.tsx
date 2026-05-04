import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { HubHero } from "@/components/sections/HubHero";
import { ImmuneHubFAQ } from "@/components/sections/immune-hub/ImmuneHubFAQ";
import { ImmuneHubFinalCTA } from "@/components/sections/immune-hub/ImmuneHubFinalCTA";
import { WhenToUseImmune } from "@/components/sections/immune-hub/WhenToUseImmune";
import { ProductCompareTable } from "@/components/sections/ProductCompareTable";
import { SectionHead } from "@/components/sections/SectionHead";
import { MedicalDisclaimer } from "@/components/ui/MedicalDisclaimer";
import { IMMUNE_PRODUCTS } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
	title: "면역 한약 — 공진단·경옥고·녹용보약",
	description:
		"부개원 한의원의 면역 한약 3종(공진단·경옥고·녹용보약)을 한자리에서 비교해 보세요. 한의사 비대면 진료 후 체질·기력 상태에 맞춰 처방됩니다.",
	path: "/immune",
	og: {
		category: "면역",
		title: "면역 한약 3종",
		subtitle: "공진단·경옥고·녹용보약 — 한의사 비대면 처방",
	},
});

/**
 * 면역 한약 허브 — 다이어트 허브와 동일 구조, 카테고리 색만 vermilion으로 분기.
 *
 * 섹션 순서:
 *   1. HubHero (vermilion 강조)
 *   2. 3종 비교표
 *   3. WhenToUseImmune — 3가지 상황별 추천 카드
 *   4. ImmuneHubFAQ — 5 질문
 *   5. MedicalDisclaimer
 *   6. ImmuneHubFinalCTA — 다크 배경 마지막 전환
 */
export default function ImmuneHubPage() {
	return (
		<>
			<HubHero
				category="immune"
				chrs={["拱", "瓊", "鹿"]}
				eyebrow="Immune Care · 면역 한약"
				title={
					<>
						기력과 면역을
						<br />
						받쳐주는 한약.
					</>
				}
				sub="공진단·경옥고·녹용보약 — 부개원 한의원의 면역 한약 3종을 한자리에서 비교해 보세요. 어떤 한약이 맞을지는 한의사 진료 후 결정됩니다."
				utmSource="hero"
			/>

			<RevealOnScroll>
				<section className="px-6 lg:px-12 pb-16 lg:pb-24">
					<div className="mx-auto max-w-[var(--container-xl)] mb-10 lg:mb-12">
						<SectionHead
							eyebrow="01 · 3종 비교"
							title="형태·복용 편의·중점 케어가 어떻게 다른가요?"
						/>
					</div>
					<ProductCompareTable products={IMMUNE_PRODUCTS} category="immune" />
				</section>
			</RevealOnScroll>

			<RevealOnScroll>
				<WhenToUseImmune />
			</RevealOnScroll>

			<RevealOnScroll>
				<ImmuneHubFAQ />
			</RevealOnScroll>

			<RevealOnScroll>
				<section className="bg-bg-subtle px-6 lg:px-12 py-12 lg:py-16">
					<div className="mx-auto max-w-3xl">
						<MedicalDisclaimer />
					</div>
				</section>
			</RevealOnScroll>

			<RevealOnScroll>
				<ImmuneHubFinalCTA />
			</RevealOnScroll>
		</>
	);
}
