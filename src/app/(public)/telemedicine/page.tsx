import { TrackedLink } from "@/components/analytics/TrackedLink";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { SectionHead } from "@/components/sections/SectionHead";
import { ChannelsGrid } from "@/components/sections/telemedicine/ChannelsGrid";
import { FormPreview } from "@/components/sections/telemedicine/FormPreview";
import { LegalSection } from "@/components/sections/telemedicine/LegalSection";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { buildNaverFormUrl, kakaoChannelUrl } from "@/lib/settings";

export const metadata = buildMetadata({
	title: "비대면 진료 안내 — 부개원 한의원",
	description:
		"네이버폼·카카오톡·전화 3채널로 비대면 한의사 진료를 접수하세요. 5단계 절차·문진표 미리보기·자주 묻는 질문 안내.",
	path: "/telemedicine",
	og: {
		category: "비대면 진료",
		title: "비대면 진료 접수",
		subtitle: "네이버폼·카카오톡·전화 — 한의사 통화 진료 후 처방·택배",
	},
});

const FAQ_ITEMS = [
	{
		q: "비대면 진료의 법적 근거는 무엇인가요?",
		a: "한국의 한시적 비대면 진료 관련 제도에 따라 한의사가 환자의 체질·증상·복약 이력을 충분히 확인한 뒤 처방하실 수 있습니다. 부개원 한의원은 의료법과 보건복지부 가이드라인을 준수합니다.",
	},
	{
		q: "비용은 얼마나 들고, 결제는 언제 하나요?",
		a: "한약은 처방의 약재 구성·기간에 따라 비용이 달라지므로, 정확한 견적은 진료 시 안내해 드립니다. 결제 방법은 진료 후 안내되며, 환자분이 충분히 검토하신 뒤 결정하실 수 있습니다.",
	},
	{
		q: "한약은 어떻게 받나요?",
		a: "처방·조제 후 보냉 포장하여 자택 또는 지정 주소로 택배 발송해 드립니다. 발송 후 1–2일 내 수령하실 수 있으며, 카카오톡 채널로 운송장 번호를 안내해 드립니다.",
	},
	{
		q: "건강보험은 적용되나요?",
		a: "한약은 비급여 항목으로 건강보험이 적용되지 않습니다. 자세한 비용 안내는 진료 시 받으실 수 있습니다.",
	},
	{
		q: "접수 후 얼마 만에 연락이 오나요?",
		a: "평일 09:00–20:00 영업시간 내에 접수하시면 ○시간 안에 한의원에서 통화 예약 안내 메시지를 보내드립니다. 영업시간 외 접수는 다음 영업일 오전에 처리됩니다.",
	},
] as const;

const PROCESS_STEPS = [
	{ num: 1, title: "접수", body: "3채널 중 편한 방법으로 신청" },
	{
		num: 2,
		title: "확인 통화",
		body: "영업시간 내 ○시간 안에 한의원에서 통화 예약",
	},
	{
		num: 3,
		title: "유선 진료",
		body: "한의사가 1:1 유선으로 진료 (평균 12분)",
	},
	{ num: 4, title: "처방·조제", body: "체질·증상·복약 이력에 따라 한약 결정" },
	{ num: 5, title: "택배 발송", body: "자택 또는 지정 주소로 안전 포장 발송" },
] as const;

/**
 * 비대면 진료 안내 (P-04) — mockups/telemedicine.html 1:1.
 *
 * 섹션:
 *   1. Hero — center title
 *   2. ChannelsGrid — 3채널 (네이버폼 강조)
 *   3. ProcessTimeline — 5단계, custom steps
 *   4. FormPreview — 11 필드 미리보기
 *   5. FAQ — 5개
 *   6. LegalSection — 의료법 준수 안내
 *   7. FinalCTA — light cream 배경 (가운데)
 */
export default function TelemedicinePage() {
	const formUrl = buildNaverFormUrl({
		source: "telemedicine",
		content: "final_cta",
	});

	return (
		<>
			<section className="bg-gradient-to-b from-cream-50 to-cream-100 px-6 lg:px-12 pt-16 lg:pt-24 pb-12 lg:pb-16 text-center">
				<div className="mx-auto max-w-[880px]">
					<span className="inline-block px-3.5 py-1.5 bg-vermilion-100 text-vermilion-700 rounded-full text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase mb-5">
						Non-contact Care · 비대면 진료
					</span>
					<h1 className="font-display font-bold tracking-[-0.04em] leading-[1.15] text-ink-primary text-[32px] sm:text-[44px] lg:text-[56px] [word-break:keep-all]">
						한의원에 오시지 않아도, 안전하게.
					</h1>
					<p className="mt-4 lg:mt-5 text-base lg:text-[19px] leading-[1.75] text-ink-secondary max-w-[720px] mx-auto [word-break:keep-all]">
						부개원 한의원은 한의사 1:1 유선 진료를 통해 한약을 처방해 드립니다.
						아래 세 가지 채널 중 가장 편한 방법으로 시작해 주세요.
					</p>
				</div>
			</section>

			<RevealOnScroll>
				<ChannelsGrid />
			</RevealOnScroll>

			<RevealOnScroll>
				<ProcessTimeline
					eyebrow="02 · 비대면 진료 절차"
					title="접수에서 수령까지 5단계로 단순하게."
					sub="처음 비대면 진료를 받아보시는 분도 어렵지 않게 진행하실 수 있습니다."
					steps={PROCESS_STEPS}
					background="alt"
				/>
			</RevealOnScroll>

			<RevealOnScroll>
				<FormPreview />
			</RevealOnScroll>

			<RevealOnScroll>
				<section className="bg-surface-alt px-6 lg:px-12 py-16 lg:py-24">
					<SectionHead
						eyebrow="04 · 자주 묻는 질문"
						title="시작 전, 가장 많이 물으시는 것들."
						align="center"
						className="mb-10 lg:mb-12"
					/>
					<FAQAccordion items={FAQ_ITEMS} />
				</section>
			</RevealOnScroll>

			<RevealOnScroll>
				<LegalSection />
			</RevealOnScroll>

			<RevealOnScroll>
				<section className="bg-cream-100 px-6 lg:px-12 py-20 lg:py-24 text-center">
					<h2 className="font-display text-[28px] sm:text-[36px] lg:text-[40px] font-bold tracking-[-0.04em] leading-[1.2] max-w-[680px] mx-auto text-ink-primary [word-break:keep-all]">
						가장 편한 채널로 시작하세요.
					</h2>
					<p className="mt-3 mb-7 max-w-[560px] mx-auto text-ink-secondary text-base leading-[1.75] [word-break:keep-all]">
						처음이라도 어렵지 않습니다. 부개원 한의원이 함께합니다.
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
								href={formUrl}
								target="_blank"
								rel="noopener"
							>
								네이버폼 문진표 시작 →
							</TrackedLink>
						</Button>
						<Button
							asChild
							size="lg"
							variant="outline"
							className="border-1.5 border-brand text-brand hover:bg-brand-soft hover:text-brand h-12 lg:h-15 px-6 lg:px-8 text-base lg:text-lg"
						>
							<TrackedLink
								event="external_channel_click"
								eventProps={{
									location: "final_cta",
									external: "kakao_channel",
								}}
								href={kakaoChannelUrl()}
								target="_blank"
								rel="noopener"
							>
								카카오 채널 추가
							</TrackedLink>
						</Button>
					</div>
				</section>
			</RevealOnScroll>
		</>
	);
}
