import { Phone } from "lucide-react";
import Link from "next/link";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { LogoMark } from "@/components/icons/LogoMark";
import { Button } from "@/components/ui/button";
import { buildNaverFormUrl, clinic, kakaoChatUrl } from "@/lib/settings";
import { MobileMenu } from "./MobileMenu";
import { NAV_ITEMS } from "./nav-items";

/**
 * 공용 헤더 — 모든 (public) 페이지 상단 sticky.
 *
 * - Desktop (≥ lg): 좌 브랜드 / 중 GNB / 우 카톡·접수 CTA
 * - Mobile (< lg):  좌 브랜드 / 우 전화 + 햄버거
 *
 * Server Component — 인터랙션 부분만 [MobileMenu](./MobileMenu.tsx)에 위임.
 */
export function Header() {
	const formUrl = buildNaverFormUrl({
		source: "header",
		content: "primary_cta",
	});

	return (
		<header className="sticky top-0 z-40 bg-bg-base/85 backdrop-blur-[18px] backdrop-saturate-[180%] border-b border-border-subtle">
			<div className="mx-auto max-w-[var(--container-xl)] flex items-center justify-between gap-6 px-5 lg:px-12 h-16 lg:h-20">
				<Link
					href="/"
					aria-label={`${clinic.nameKo} 홈으로`}
					className="flex items-center gap-2 lg:gap-3 group"
				>
					<LogoMark size="sm" className="text-brand lg:hidden" />
					<LogoMark size="md" className="hidden lg:inline-flex text-brand" />
					<span className="flex flex-col leading-none">
						<strong className="font-display font-bold text-[14px] lg:text-[17px] tracking-tight text-ink-primary">
							{clinic.nameKo}
						</strong>
						<small className="hidden lg:block mt-0.5 text-[9px] font-medium text-ink-muted tracking-[0.18em]">
							{clinic.nameEn.toUpperCase()}
						</small>
					</span>
				</Link>

				<nav
					aria-label="주 메뉴"
					className="hidden lg:flex gap-7 text-sm font-medium text-ink-secondary"
				>
					{NAV_ITEMS.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="py-7 hover:text-brand transition-colors"
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className="hidden lg:flex items-center gap-2">
					<Button asChild variant="ghost" size="sm">
						<TrackedLink
							event="kakao_chat_open"
							eventProps={{ location: "header" }}
							href={kakaoChatUrl()}
							target="_blank"
							rel="noopener"
						>
							카카오 상담
						</TrackedLink>
					</Button>
					<Button
						asChild
						size="sm"
						className="bg-vermilion text-cream-50 hover:bg-vermilion-hover [a]:hover:bg-vermilion-hover shadow-sm"
					>
						<TrackedLink
							event="cta_telemedicine_click"
							eventProps={{ location: "header", channel: "naver_form" }}
							href={formUrl}
							target="_blank"
							rel="noopener"
						>
							비대면 진료 접수 →
						</TrackedLink>
					</Button>
				</div>

				<div className="flex lg:hidden items-center gap-1">
					<TrackedLink
						event="phone_call_click"
						eventProps={{ location: "header" }}
						href={clinic.phone.tel}
						aria-label={`전화 걸기 ${clinic.phone.display}`}
						className="inline-flex items-center justify-center w-10 h-10 rounded-md text-brand hover:bg-bg-muted transition-colors"
					>
						<Phone className="size-5" aria-hidden="true" />
					</TrackedLink>
					<MobileMenu formUrl={formUrl} />
				</div>
			</div>
		</header>
	);
}
