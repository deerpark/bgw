import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { SectionHead } from "@/components/sections/SectionHead";

/**
 * 면역 허브 FAQ — docs/03-compliance-and-copy.md §2.4 가드레일.
 * "면역", "기력 회복" 표현 OK · "감기·바이러스 예방 보장" 단정 금지.
 */

const FAQ_ITEMS = [
	{
		q: "면역 한약과 일반 보약은 어떻게 다른가요?",
		a: "면역 한약은 기력·체력·회복을 다스리는 처방의 통칭이며, 공진단·경옥고·녹용보약 등이 대표적입니다. 한의사가 환자의 체질·기력·복약 이력을 살핀 뒤 어떤 처방이 적합한지 결정합니다.",
	},
	{
		q: "감기·바이러스 예방에 효과가 있나요?",
		a: "면역 한약은 일반적으로 기력 회복과 체력 보강을 돕도록 설계됩니다. 다만 특정 질환의 예방을 단정적으로 보장하지는 않으며, 효과는 체질·생활 환경에 따라 개인차가 있습니다.",
	},
	{
		q: "다른 약과 함께 먹어도 되나요?",
		a: "현재 복용 중인 처방약·영양제·보조제가 있다면 진료 시 모두 알려주세요. 한의사가 상호작용 가능성을 살핀 뒤 한약 처방 가부와 시점을 안내해 드립니다.",
	},
	{
		q: "효과는 언제부터 느낄 수 있나요?",
		a: "개인차가 있어 일률적으로 말씀드리기 어렵습니다. 한의사 처방에 따라 일반적으로 ○주 차부터 변화를 체감하시는 분이 있으나, 체질·생활 환경에 따라 다를 수 있습니다.",
	},
	{
		q: "비용은 얼마인가요?",
		a: "한약은 처방의 약재 구성·기간에 따라 비용이 달라지므로, 정확한 견적은 진료 시 안내해 드립니다. 사향·녹용 등 약재의 가용성도 영향을 줍니다.",
	},
] as const;

export function ImmuneHubFAQ() {
	return (
		<section className="bg-bg-base px-6 lg:px-12 py-16 lg:py-24">
			<SectionHead
				eyebrow="03 · 자주 묻는 질문"
				title="시작 전에 가장 많이 물으시는 것들."
				align="center"
				className="mb-10 lg:mb-12"
			/>
			<FAQAccordion items={FAQ_ITEMS} />
		</section>
	);
}
