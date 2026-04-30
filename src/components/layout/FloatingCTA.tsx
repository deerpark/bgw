import { MessageCircle, Phone, Stethoscope } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { MedicalDisclaimer } from "@/components/ui/MedicalDisclaimer";
import { buildNaverFormUrl, clinic, kakaoChatUrl } from "@/lib/settings";

/**
 * 모바일 하단 sticky 3분할 CTA dock + 의무 고지 바.
 *
 * - 데스크톱 (≥ lg)에서는 숨김
 * - 좌: 카톡 상담 / 중: 비대면 진료 접수 (강조) / 우: 전화
 *
 * mockups/home.html disclaimer-bar + cta-dock 참조.
 */
export function FloatingCTA() {
	const formUrl = buildNaverFormUrl({
		source: "floating_dock",
		content: "naver_form",
	});

	return (
		<div className="lg:hidden sticky bottom-0 left-0 right-0 z-30">
			<MedicalDisclaimer variant="bar" />
			<nav
				aria-label="빠른 진료 접수 메뉴"
				className="grid grid-cols-3 gap-1.5 p-2.5 bg-bg-base/92 backdrop-blur-[20px] backdrop-saturate-[180%] border-t border-border-subtle"
			>
				<TrackedLink
					event="kakao_chat_open"
					eventProps={{ location: "floating_dock" }}
					href={kakaoChatUrl()}
					target="_blank"
					rel="noopener"
					className="h-12 rounded-md flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium bg-bg-subtle text-brand border border-border-subtle hover:bg-bg-muted transition-colors"
				>
					<MessageCircle className="size-4" aria-hidden="true" />
					카톡 상담
				</TrackedLink>
				<TrackedLink
					event="cta_telemedicine_click"
					eventProps={{ location: "floating_dock", channel: "naver_form" }}
					href={formUrl}
					target="_blank"
					rel="noopener"
					className="h-12 rounded-md flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium bg-vermilion text-cream-50 hover:bg-vermilion-hover transition-colors shadow-sm"
				>
					<Stethoscope className="size-4" aria-hidden="true" />
					비대면 접수
				</TrackedLink>
				<TrackedLink
					event="phone_call_click"
					eventProps={{ location: "floating_dock" }}
					href={clinic.phone.tel}
					aria-label={`전화 걸기 ${clinic.phone.display}`}
					className="h-12 rounded-md flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium bg-bg-subtle text-brand border border-border-subtle hover:bg-bg-muted transition-colors"
				>
					<Phone className="size-4" aria-hidden="true" />
					전화 걸기
				</TrackedLink>
			</nav>
		</div>
	);
}
