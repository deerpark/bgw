import { notFound } from "next/navigation";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { SectionHead } from "@/components/sections/SectionHead";
import { ApproachSection } from "@/components/sections/treatment/ApproachSection";
import { InsuranceNotice } from "@/components/sections/treatment/InsuranceNotice";
import { ModalitiesSection } from "@/components/sections/treatment/ModalitiesSection";
import { SymptomsSection } from "@/components/sections/treatment/SymptomsSection";
import { TreatmentFinalCTA } from "@/components/sections/treatment/TreatmentFinalCTA";
import { TreatmentHero } from "@/components/sections/treatment/TreatmentHero";
import { MedicalDisclaimer } from "@/components/ui/MedicalDisclaimer";
import { TREATMENTS, type TreatmentSlug } from "@/data/treatments";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
	params: Promise<{ slug: string }>;
}

const VALID_SLUGS: TreatmentSlug[] = [
	"insurance",
	"chuna",
	"rhinitis",
	"growth",
	"womens",
];

function isValidSlug(slug: string): slug is TreatmentSlug {
	return (VALID_SLUGS as string[]).includes(slug);
}

export function generateStaticParams() {
	return TREATMENTS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	if (!isValidSlug(slug)) return {};
	const treatment = TREATMENTS.find((t) => t.slug === slug);
	if (!treatment) return {};
	return buildMetadata({
		title: `${treatment.nameKo} — 부개원 한의원`,
		description: treatment.essence,
		path: `/treatments/${treatment.slug}`,
		og: {
			category: "진료과목",
			title: treatment.nameKo,
			subtitle: treatment.essence,
		},
	});
}

/**
 * 진료과목 상세 (P-07) — docs/03-compliance-and-copy.md §2.6.
 *
 * 섹션 순서:
 *   1. Hero
 *   2. Symptoms (어떤 증상)
 *   3. Approach (부개원의 접근)
 *   4. Modalities (진료 방법) — Phase 1 Week 6 신규
 *   5. (자동차보험만) InsuranceNotice
 *   6. ProcessTimeline (진료 절차)
 *   7. FAQ
 *   8. MedicalDisclaimer
 *   9. FinalCTA
 *
 * visitOnly(자동차보험·추나)면 비대면 접수 대신 전화·카카오 강조.
 *
 * Eyebrow 번호는 자동차보험(InsuranceNotice 추가 섹션)일 때만 한 칸씩 밀린다.
 */
export default async function TreatmentDetailPage({ params }: PageProps) {
	const { slug } = await params;
	if (!isValidSlug(slug)) notFound();

	const treatment = TREATMENTS.find((t) => t.slug === slug);
	if (!treatment) notFound();

	const hasInsurance = !!treatment.insuranceNotice;
	const num = (n: number) => String(n).padStart(2, "0");
	// 1=Symptoms, 2=Approach, 3=Modalities, [4=InsuranceNotice], n=Process, n+1=FAQ
	const modalitiesNum = num(3);
	const processNum = num(hasInsurance ? 5 : 4);
	const faqNum = num(hasInsurance ? 6 : 5);

	return (
		<>
			<TreatmentHero treatment={treatment} />

			<RevealOnScroll>
				<SymptomsSection items={treatment.symptoms} />
			</RevealOnScroll>

			<RevealOnScroll>
				<ApproachSection items={treatment.approach} />
			</RevealOnScroll>

			<RevealOnScroll>
				<ModalitiesSection
					items={treatment.modalities}
					eyebrowNumber={modalitiesNum}
				/>
			</RevealOnScroll>

			{treatment.insuranceNotice && (
				<RevealOnScroll>
					<InsuranceNotice notice={treatment.insuranceNotice} />
				</RevealOnScroll>
			)}

			<RevealOnScroll>
				<ProcessTimeline
					eyebrow={`${processNum} · 진료 절차`}
					title="진료에서 회복까지 5단계"
					steps={treatment.process}
					background={hasInsurance ? "base" : "alt"}
				/>
			</RevealOnScroll>

			<RevealOnScroll>
				<section
					className={
						hasInsurance
							? "bg-surface-alt px-6 lg:px-12 py-16 lg:py-24"
							: "bg-bg-base px-6 lg:px-12 py-16 lg:py-24"
					}
				>
					<SectionHead
						eyebrow={`${faqNum} · 자주 묻는 질문`}
						title={`${treatment.nameKo} 자주 묻는 질문`}
						align="center"
						className="mb-10 lg:mb-12"
					/>
					<FAQAccordion items={treatment.faq} />
				</section>
			</RevealOnScroll>

			<RevealOnScroll>
				<section className="bg-bg-subtle px-6 lg:px-12 py-12 lg:py-16">
					<div className="mx-auto max-w-3xl">
						<MedicalDisclaimer productName={treatment.nameKo} />
					</div>
				</section>
			</RevealOnScroll>

			<RevealOnScroll>
				<TreatmentFinalCTA treatment={treatment} />
			</RevealOnScroll>
		</>
	);
}
