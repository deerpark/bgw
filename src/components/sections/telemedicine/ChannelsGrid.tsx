import { MessageCircle, Phone, Stethoscope } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button } from "@/components/ui/button";
import { buildNaverFormUrl, clinic, kakaoChatUrl } from "@/lib/settings";

/**
 * 비대면 진료 안내 페이지 전용 3채널 카드 — mockups/telemedicine.html .channels.
 *
 * TelemedicineCTA의 컴팩트 버전과 달리, 이 그리드는:
 *  - 큰 아이콘 + 리드 문장 + 3 bullet 리스트 + 큰 CTA + 힌트
 *  - 네이버폼은 ring-vermilion으로 강조
 *  - PostHog 이벤트 동일하게 부착
 */
export function ChannelsGrid() {
	const formUrl = buildNaverFormUrl({
		source: "telemedicine",
		content: "channels_naver",
	});

	return (
		<section className="bg-bg-base px-6 lg:px-12 py-12 lg:py-16">
			<div className="mx-auto max-w-[var(--container-xl)] grid gap-5 lg:grid-cols-3">
				<article className="bg-surface border-2 border-vermilion rounded-3xl p-7 lg:p-8 flex flex-col gap-3 shadow-sm">
					<div
						className="size-14 rounded-2xl bg-vermilion text-cream-50 flex items-center justify-center"
						aria-hidden="true"
					>
						<Stethoscope className="size-7" />
					</div>
					<h3 className="text-xl lg:text-[22px] font-bold tracking-[-0.02em] text-ink-primary">
						네이버폼 문진표 작성
					</h3>
					<p className="text-sm lg:text-[15px] leading-[1.75] text-ink-secondary [word-break:keep-all]">
						가장 빠르고 정확하게 진료에 필요한 정보가 정리됩니다. 한의사가
						사전에 환자분의 상황을 충분히 파악할 수 있어 통화가 짧아져요.
					</p>
					<ul className="text-[13px] leading-[1.7] text-ink-secondary list-disc pl-4 space-y-1 mb-2">
						<li>접수 평균 소요 4분</li>
						<li>한의사 사전 검토 가능</li>
						<li>영업시간 내 ○시간 안에 확인 통화</li>
					</ul>
					<Button
						asChild
						size="lg"
						className="w-full bg-vermilion text-cream-50 hover:bg-vermilion-hover [a]:hover:bg-vermilion-hover"
					>
						<TrackedLink
							event="cta_telemedicine_click"
							eventProps={{ location: "hero", channel: "naver_form" }}
							href={formUrl}
							target="_blank"
							rel="noopener"
						>
							네이버폼 문진표 시작 →
						</TrackedLink>
					</Button>
					<p className="text-xs text-ink-muted text-center">
						새 탭으로 네이버폼이 열립니다
					</p>
				</article>

				<article className="bg-surface border border-border-subtle rounded-3xl p-7 lg:p-8 flex flex-col gap-3">
					<div
						className="size-14 rounded-2xl bg-[#FEE500] text-[#3C1E1E] flex items-center justify-center"
						aria-hidden="true"
					>
						<MessageCircle className="size-7" />
					</div>
					<h3 className="text-xl lg:text-[22px] font-bold tracking-[-0.02em] text-ink-primary">
						카카오톡 채널 1:1 상담
					</h3>
					<p className="text-sm lg:text-[15px] leading-[1.75] text-ink-secondary [word-break:keep-all]">
						먼저 가볍게 묻고 싶거나, 채팅으로 편하게 진행하고 싶은 분께. 부개원
						채널을 추가하시면 1:1로 상담 가능합니다.
					</p>
					<ul className="text-[13px] leading-[1.7] text-ink-secondary list-disc pl-4 space-y-1 mb-2">
						<li>채널 추가 후 1:1 채팅</li>
						<li>운영자 직접 응대</li>
						<li>상담 후 문진표 안내</li>
					</ul>
					<Button asChild size="lg" variant="secondary" className="w-full">
						<TrackedLink
							event="kakao_chat_open"
							eventProps={{ location: "hero" }}
							href={kakaoChatUrl()}
							target="_blank"
							rel="noopener"
						>
							카카오톡 채널 열기 →
						</TrackedLink>
					</Button>
					<p className="text-xs text-ink-muted text-center">
						@부개원한의원으로 검색
					</p>
				</article>

				<article className="bg-surface border border-border-subtle rounded-3xl p-7 lg:p-8 flex flex-col gap-3">
					<div
						className="size-14 rounded-2xl bg-brand-soft text-brand flex items-center justify-center"
						aria-hidden="true"
					>
						<Phone className="size-7" />
					</div>
					<h3 className="text-xl lg:text-[22px] font-bold tracking-[-0.02em] text-ink-primary">
						전화 진료 예약
					</h3>
					<p className="text-sm lg:text-[15px] leading-[1.75] text-ink-secondary [word-break:keep-all]">
						통화로 직접 진료 예약을 잡고 싶은 분. 평일 09:00–20:00 사이에 직접
						통화하실 수 있습니다.
					</p>
					<ul className="text-[13px] leading-[1.7] text-ink-secondary list-disc pl-4 space-y-1 mb-2">
						<li>평일 {clinic.hours.weekday}</li>
						<li>토 {clinic.hours.saturday}</li>
						<li>대표 {clinic.phone.display}</li>
					</ul>
					<Button asChild size="lg" variant="outline" className="w-full">
						<TrackedLink
							event="phone_call_click"
							eventProps={{ location: "hero" }}
							href={clinic.phone.tel}
						>
							전화 걸기
						</TrackedLink>
					</Button>
					<p className="text-xs text-ink-muted text-center">
						국번 없이 전화 가능
					</p>
				</article>
			</div>
		</section>
	);
}
