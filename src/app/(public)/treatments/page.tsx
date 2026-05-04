import Link from "next/link";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { SectionHead } from "@/components/sections/SectionHead";
import { ModalitiesSection } from "@/components/sections/treatment/ModalitiesSection";
import { TreatmentsGrid } from "@/components/sections/treatment/TreatmentsGrid";
import { Button } from "@/components/ui/button";
import { MedicalDisclaimer } from "@/components/ui/MedicalDisclaimer";
import { TREATMENTS, getAllModalities } from "@/data/treatments";
import { buildMetadata } from "@/lib/seo";
import { buildNaverFormUrl, clinic } from "@/lib/settings";

export const metadata = buildMetadata({
	title: "진료과목 — 부개원 한의원",
	description:
		"부개원 한의원의 5개 진료과목(자동차보험·추나/통증·비염·성장·여성질환)을 한자리에서 안내합니다. 한의사가 침·약침·추나·한약 등을 환자분의 상태에 맞춰 단계적으로 운영합니다.",
	path: "/treatments",
	og: {
		category: "진료과목",
		title: "5개 진료과목 안내",
		subtitle: "자동차보험·추나·비염·성장·여성질환 한방 진료",
	},
});

/**
 * 진료과목 허브 (P-07-hub).
 *
 * 섹션 순서:
 *   1. Hero — eyebrow + 큰 제목 + 2 CTA (비대면 접수 / 전화 예약)
 *   2. TreatmentsGrid — 5 진료과목 카드 (tone별 색조 분기, 각 상세로 link)
 *   3. ModalitiesSection — 한의원 전체 운영 모달리티 (침·약침·봉침·추나·체외충격파·자기장·물리치료·안마)
 *   4. MedicalDisclaimer
 *   5. FinalCTA — 다크 배경 마지막 전환
 */
export default function TreatmentsHubPage() {
	const formUrl = buildNaverFormUrl({ source: "hero", content: "treatments_hub" });
	const allModalities = getAllModalities();

	return (
		<>
			{/* Hero */}
			<section className="relative px-6 lg:px-12 pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-cream-50 to-cream-100">
				<div className="mx-auto max-w-[880px] text-center">
					<div
						className="flex justify-center gap-4 lg:gap-6 mb-6 lg:mb-7"
						aria-hidden="true"
					>
						<span className="size-12 lg:size-16 rounded-full bg-surface border border-border-subtle flex items-center justify-center font-serif font-bold text-xl lg:text-[26px] text-brown-600">
							醫
						</span>
						<span className="size-12 lg:size-16 rounded-full bg-brown-700 text-cream-50 flex items-center justify-center font-serif font-bold text-xl lg:text-[26px] shadow-md">
							鍼
						</span>
						<span className="size-12 lg:size-16 rounded-full bg-surface border border-border-subtle flex items-center justify-center font-serif font-bold text-xl lg:text-[26px] text-brown-600">
							推
						</span>
					</div>

					<span className="inline-block px-3.5 py-1.5 rounded-full text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase mb-5 bg-cream-200 text-brown-700">
						Treatment Care · 진료과목
					</span>

					<h1 className="font-display font-bold tracking-[-0.04em] leading-[1.15] text-ink-primary text-[32px] sm:text-[44px] lg:text-[56px] [word-break:keep-all]">
						체질·통증·시기를
						<br />
						함께 살피는 한방 진료.
					</h1>

					<p className="mt-4 lg:mt-5 text-base lg:text-[19px] leading-[1.75] text-ink-secondary max-w-[720px] mx-auto [word-break:keep-all]">
						부개원 한의원은 자동차보험 협진·추나/통증·비염·성장·여성질환을
						중심으로 침·약침·추나·맞춤 한약을 환자분의 상태에 맞춰 단계적으로
						운영합니다. 모든 처방은 한의사 진료 후에 결정됩니다.
					</p>

					<div className="mt-7 flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
						<Button
							asChild
							size="lg"
							className="bg-vermilion text-cream-50 hover:bg-vermilion-hover [a]:hover:bg-vermilion-hover h-12 px-6 text-base shadow-sm"
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
							className="border-1.5 border-brand text-brand hover:bg-brand-soft hover:text-brand h-12 px-6 text-base"
						>
							<TrackedLink
								event="phone_call_click"
								eventProps={{ location: "hero", channel: "phone" }}
								href={clinic.phone.tel}
							>
								전화 {clinic.phone.display}
							</TrackedLink>
						</Button>
					</div>
				</div>
			</section>

			{/* 진료과목 카드 그리드 */}
			<RevealOnScroll>
				<section className="bg-bg-base px-6 lg:px-12 py-16 lg:py-24">
					<div className="mx-auto max-w-[var(--container-xl)]">
						<SectionHead
							eyebrow="01 · 진료과목"
							title="어떤 증상으로 오시는지 살펴보세요"
							sub="각 진료과목 카드를 누르시면 한의원의 접근·진료 방법·자주 묻는 질문을 확인하실 수 있습니다."
							align="center"
							className="mb-10 lg:mb-12"
						/>
						<TreatmentsGrid treatments={TREATMENTS} />
					</div>
				</section>
			</RevealOnScroll>

			{/* 전체 모달리티 */}
			<RevealOnScroll>
				<ModalitiesSection items={allModalities} eyebrowNumber="02" />
			</RevealOnScroll>

			{/* 의무 고지 */}
			<RevealOnScroll>
				<section className="bg-bg-subtle px-6 lg:px-12 py-12 lg:py-16">
					<div className="mx-auto max-w-3xl">
						<MedicalDisclaimer />
					</div>
				</section>
			</RevealOnScroll>

			{/* Final CTA — 다크 배경 */}
			<RevealOnScroll>
				<section className="bg-brown-700 text-cream-50 px-6 lg:px-12 py-20 lg:py-24 text-center">
					<span className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase text-vermilion-300">
						Care Pathway · 진료 시작
					</span>
					<h2 className="mt-3 mb-3 font-display text-[28px] sm:text-[36px] lg:text-[44px] font-bold tracking-[-0.04em] leading-[1.2] max-w-[680px] mx-auto [word-break:keep-all]">
						불편한 증상에 맞춰, 한의사와 시작하세요.
					</h2>
					<p className="max-w-[560px] mx-auto mb-7 text-cream-200 text-base leading-[1.75] [word-break:keep-all]">
						자동차사고·통증·비염·성장·여성질환 — 어떤 진료가 적합할지 한의사가
						결정해 드립니다. 가까운 채널로 시작해 보세요.
					</p>
					<div className="flex flex-col sm:flex-row gap-2.5 justify-center flex-wrap">
						<Button
							asChild
							size="lg"
							className="bg-vermilion text-cream-50 hover:bg-vermilion-hover [a]:hover:bg-vermilion-hover h-12 lg:h-15 px-6 lg:px-8 text-base lg:text-lg shadow-sm"
						>
							<TrackedLink
								event="cta_telemedicine_click"
								eventProps={{ location: "final_cta", channel: "naver_form" }}
								href={buildNaverFormUrl({
									source: "final_cta",
									content: "treatments_hub",
								})}
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
							className="bg-transparent text-cream-50 border-1.5 border-cream-200 hover:bg-cream-50/8 hover:text-cream-50 h-12 lg:h-15 px-6 lg:px-8 text-base lg:text-lg"
						>
							<Link href="/clinic">한의원 안내 보기</Link>
						</Button>
					</div>
				</section>
			</RevealOnScroll>
		</>
	);
}
