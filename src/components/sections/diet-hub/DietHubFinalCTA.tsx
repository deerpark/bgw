import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button } from "@/components/ui/button";
import { buildNaverFormUrl, kakaoChatUrl } from "@/lib/settings";

/**
 * 다이어트 허브 마지막 CTA — mockups/diet-hub.html 마지막 섹션.
 * brown-700 다크 + 자율심의 안내 풋노트 포함.
 */
export function DietHubFinalCTA() {
	const formUrl = buildNaverFormUrl({
		source: "diet_hub",
		content: "final_cta",
	});

	return (
		<section className="bg-brown-700 text-cream-50 px-6 lg:px-12 py-20 lg:py-24 text-center">
			<span className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase text-vermilion-300">
				Start your diet care
			</span>
			<h2 className="mt-3 mb-3 font-display text-[28px] sm:text-[36px] lg:text-[40px] font-bold tracking-[-0.04em] leading-[1.2] max-w-[680px] mx-auto [word-break:keep-all]">
				한의사 진료 후 처방되는 한방 다이어트
			</h2>
			<p className="max-w-[560px] mx-auto mb-7 text-cream-200 text-base leading-[1.75] [word-break:keep-all]">
				가장 편한 채널로 시작하세요.
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
						비대면 진료 접수 →
					</TrackedLink>
				</Button>
				<Button
					asChild
					size="lg"
					variant="outline"
					className="bg-transparent text-cream-50 border-1.5 border-cream-200 hover:bg-cream-50/8 hover:text-cream-50 h-12 lg:h-15 px-6 lg:px-8 text-base lg:text-lg"
				>
					<TrackedLink
						event="kakao_chat_open"
						eventProps={{ location: "final_cta" }}
						href={kakaoChatUrl()}
						target="_blank"
						rel="noopener"
					>
						카카오 채널 상담
					</TrackedLink>
				</Button>
			</div>
			<p className="mt-12 text-[11px] text-brown-300 max-w-[600px] mx-auto leading-[1.7] [word-break:keep-all]">
				※ 한약은 한의사의 진료 후 체질·증상·복약 이력에 따라 개별 처방되며,
				개인에 따라 효과 및 반응은 다를 수 있습니다. 본 페이지는 의료광고 자율
				심의 기준을 준수합니다.
			</p>
		</section>
	);
}
