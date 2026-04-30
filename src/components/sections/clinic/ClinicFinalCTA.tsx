import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button } from "@/components/ui/button";
import { buildNaverFormUrl, clinic } from "@/lib/settings";

/**
 * /clinic 마지막 CTA — light cream 변형.
 * 비대면 진료 접수 + 전화 걸기 (data 페이지에 와있는 분께 적합).
 */
export function ClinicFinalCTA() {
	const formUrl = buildNaverFormUrl({
		source: "clinic_info_bar",
		content: "final_cta",
	});

	return (
		<section className="bg-cream-100 px-6 lg:px-12 py-20 lg:py-24 text-center">
			<span className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase text-vermilion">
				Connect
			</span>
			<h2 className="mt-3 mb-3 font-display text-[28px] sm:text-[32px] lg:text-[36px] font-bold tracking-[-0.04em] leading-[1.2] max-w-[680px] mx-auto text-ink-primary [word-break:keep-all]">
				방문이 어려우시면 비대면 진료로.
			</h2>
			<p className="max-w-[560px] mx-auto mb-7 text-ink-secondary text-base leading-[1.75] [word-break:keep-all]">
				한의사 1:1 유선 진료 후 자택으로 한약을 보내드립니다.
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
					className="border-1.5 border-brand text-brand hover:bg-brand-soft hover:text-brand h-12 lg:h-15 px-6 lg:px-8 text-base lg:text-lg"
				>
					<TrackedLink
						event="phone_call_click"
						eventProps={{ location: "final_cta" }}
						href={clinic.phone.tel}
					>
						전화 걸기
					</TrackedLink>
				</Button>
			</div>
		</section>
	);
}
