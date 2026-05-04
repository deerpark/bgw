import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { DietHubFAQ } from "@/components/sections/diet-hub/DietHubFAQ";
import { DietHubFinalCTA } from "@/components/sections/diet-hub/DietHubFinalCTA";
import { WhenToUseDiet } from "@/components/sections/diet-hub/WhenToUseDiet";
import { HubHero } from "@/components/sections/HubHero";
import { ProductCompareTable } from "@/components/sections/ProductCompareTable";
import { SectionHead } from "@/components/sections/SectionHead";
import { MedicalDisclaimer } from "@/components/ui/MedicalDisclaimer";
import { DIET_PRODUCTS } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
	title: "다이어트 한약 — 부개 감비환·감비탕·디톡스",
	description:
		"부개원 한의원의 한방 다이어트 3종(부개 감비환·감비탕·디톡스)을 한자리에서 비교해 보세요. 한의사 비대면 진료 후 체질·증상에 맞춰 처방됩니다.",
	path: "/diet",
	og: {
		category: "다이어트",
		title: "다이어트 한약 3종",
		subtitle: "부개 감비환·감비탕·디톡스 — 한의사 비대면 처방",
	},
});

/**
 * 다이어트 허브 (P-02) — mockups/diet-hub.html 1:1.
 *
 * 섹션 순서:
 *   1. HubHero — 3 chr 뱃지 + 큰 제목 + 2 CTA
 *   2. CompareSection — 3종 비교표 + 표 안내 문구
 *   3. WhenToUseDiet — 3가지 상황별 추천 카드
 *   4. DietHubFAQ — 5 질문 (안전성·약 병용·부작용·운동·비용)
 *   5. MedicalDisclaimer (의무 고지)
 *   6. DietHubFinalCTA — 다크 배경 마지막 전환
 */
export default function DietHubPage() {
	return (
		<>
			<HubHero
				category="diet"
				chrs={["減", "湯", "淨"]}
				eyebrow="Diet Care · 한방 다이어트"
				title={
					<>
						한방 다이어트,
						<br />
						무리하지 않는 방향으로.
					</>
				}
				sub="식욕·체질·기력을 함께 살피는 부개원 한방 다이어트 3종을 한자리에서 비교해 보세요. 어떤 한약이 맞을지는 한의사 진료 후 결정됩니다."
				utmSource="hero"
			/>

			<RevealOnScroll>
				<section className="px-6 lg:px-12 pb-16 lg:pb-24">
					<div className="mx-auto max-w-[var(--container-xl)] mb-10 lg:mb-12">
						<SectionHead
							eyebrow="01 · 3종 비교"
							title="형태·복용 편의·권장 대상이 어떻게 다른가요?"
						/>
					</div>
					<ProductCompareTable products={DIET_PRODUCTS} category="diet" />
				</section>
			</RevealOnScroll>

			<RevealOnScroll>
				<WhenToUseDiet />
			</RevealOnScroll>

			<RevealOnScroll>
				<DietHubFAQ />
			</RevealOnScroll>

			<RevealOnScroll>
				<section className="bg-bg-subtle px-6 lg:px-12 py-12 lg:py-16">
					<div className="mx-auto max-w-3xl">
						<MedicalDisclaimer />
					</div>
				</section>
			</RevealOnScroll>

			<RevealOnScroll>
				<DietHubFinalCTA />
			</RevealOnScroll>
		</>
	);
}
