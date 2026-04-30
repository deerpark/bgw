import { MessageCircle, Phone, Stethoscope } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import type { CtaLocation } from "@/lib/analytics";
import { buildNaverFormUrl, clinic, kakaoChatUrl } from "@/lib/settings";
import { cn } from "@/lib/utils";

interface TelemedicineCTAProps {
	/** 분석 이벤트의 location 컨텍스트. */
	location: CtaLocation;
	/** UTM content 파라미터 — 어느 위치 CTA인지 구분. */
	utmContent?: string;
	/** 다크 배경 위에서 사용할지 여부. */
	dark?: boolean;
	className?: string;
}

/**
 * 비대면 진료 3채널 CTA 블록 — 네이버폼 / 카카오 / 전화.
 *
 * docs/01-blueprint.md §5.1~§5.2 + docs/03-compliance-and-copy.md §2.5.
 * "결제·구매" 동사 금지 — "접수" 동사만 사용.
 *
 * 사용처:
 *  - /telemedicine 메인 (Week 4)
 *  - 한약 상세 페이지 final CTA
 *  - 다이어트/면역 허브 final CTA
 */
export function TelemedicineCTA({
	location,
	utmContent,
	dark = false,
	className,
}: TelemedicineCTAProps) {
	const formUrl = buildNaverFormUrl({
		source: location,
		content: utmContent ?? `${location}_telemedicine_cta`,
	});

	const cardBase =
		"flex flex-col gap-3 p-6 lg:p-7 rounded-2xl border transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)]";
	const cardLight =
		"bg-surface border-border-subtle hover:shadow-md hover:-translate-y-0.5";
	const cardDark =
		"bg-cream-50/8 border-cream-50/12 hover:bg-cream-50/14 hover:-translate-y-0.5";

	const textPrimary = dark ? "text-cream-50" : "text-ink-primary";
	const textSecondary = dark ? "text-cream-200" : "text-ink-secondary";
	const textMuted = dark ? "text-brown-300" : "text-ink-muted";

	return (
		<div
			className={cn(
				"grid gap-4 sm:grid-cols-3 max-w-[1080px] mx-auto",
				className,
			)}
		>
			<TrackedLink
				event="cta_telemedicine_click"
				eventProps={{ location, channel: "naver_form" }}
				href={formUrl}
				target="_blank"
				rel="noopener"
				className={cn(
					cardBase,
					dark ? cardDark : cardLight,
					"sm:col-span-1 ring-1 ring-vermilion ring-offset-2 ring-offset-transparent",
				)}
			>
				<div className="flex items-center gap-3">
					<span className="inline-flex items-center justify-center size-10 rounded-xl bg-vermilion text-cream-50">
						<Stethoscope className="size-5" aria-hidden="true" />
					</span>
					<span className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase text-vermilion">
						권장
					</span>
				</div>
				<h3
					className={cn(
						"text-lg font-semibold tracking-[-0.02em]",
						textPrimary,
					)}
				>
					네이버폼 문진표
				</h3>
				<p className={cn("text-sm leading-[1.7]", textSecondary)}>
					가장 빠르고 정확하게 진료받을 수 있는 정보가 정리됩니다.
				</p>
				<span className={cn("mt-auto text-sm font-medium text-vermilion")}>
					바로 작성하기 →
				</span>
			</TrackedLink>

			<TrackedLink
				event="kakao_chat_open"
				eventProps={{ location }}
				href={kakaoChatUrl()}
				target="_blank"
				rel="noopener"
				className={cn(cardBase, dark ? cardDark : cardLight)}
			>
				<div className="flex items-center gap-3">
					<span className="inline-flex items-center justify-center size-10 rounded-xl bg-[#FEE500] text-[#3C1E1E]">
						<MessageCircle className="size-5" aria-hidden="true" />
					</span>
					<span
						className={cn(
							"text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase",
							textMuted,
						)}
					>
						카카오톡
					</span>
				</div>
				<h3
					className={cn(
						"text-lg font-semibold tracking-[-0.02em]",
						textPrimary,
					)}
				>
					1:1 채널 상담
				</h3>
				<p className={cn("text-sm leading-[1.7]", textSecondary)}>
					궁금한 점이 있다면 채팅으로 먼저 문의하세요.
				</p>
				<span
					className={cn(
						"mt-auto text-sm font-medium",
						dark ? "text-cream-50" : "text-brand",
					)}
				>
					채널 열기 →
				</span>
			</TrackedLink>

			<TrackedLink
				event="phone_call_click"
				eventProps={{ location }}
				href={clinic.phone.tel}
				className={cn(cardBase, dark ? cardDark : cardLight)}
			>
				<div className="flex items-center gap-3">
					<span className="inline-flex items-center justify-center size-10 rounded-xl bg-brand-soft text-brand">
						<Phone className="size-5" aria-hidden="true" />
					</span>
					<span
						className={cn(
							"text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase",
							textMuted,
						)}
					>
						전화
					</span>
				</div>
				<h3
					className={cn(
						"text-lg font-semibold tracking-[-0.02em]",
						textPrimary,
					)}
				>
					{clinic.phone.display}
				</h3>
				<p className={cn("text-sm leading-[1.7]", textSecondary)}>
					평일 {clinic.hours.weekday} · 토 {clinic.hours.saturday}
				</p>
				<span
					className={cn(
						"mt-auto text-sm font-medium",
						dark ? "text-cream-50" : "text-brand",
					)}
				>
					지금 전화 →
				</span>
			</TrackedLink>
		</div>
	);
}
