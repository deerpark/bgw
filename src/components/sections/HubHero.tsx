import Link from "next/link";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button } from "@/components/ui/button";
import type { ProductCategory } from "@/data/products";
import type { CtaLocation } from "@/lib/analytics";
import { getCategoryTone } from "@/lib/category-tone";
import { buildNaverFormUrl } from "@/lib/settings";
import { cn } from "@/lib/utils";

interface HubHeroProps {
	/** sage(diet) / vermilion(immune) 톤 분기 */
	category: ProductCategory;
	/** 3개의 한자 뱃지 (left, center, right). center가 강조됨. */
	chrs: [string, string, string];
	eyebrow: string;
	title: React.ReactNode;
	sub: string;
	/** UTM source — 분석 location. */
	utmSource: CtaLocation;
	/** 보조 CTA href. 기본 /telemedicine. */
	secondaryCtaHref?: string;
	secondaryCtaLabel?: string;
}

/**
 * 다이어트·면역 허브 페이지 Hero — mockups/diet-hub.html .hub-hero 1:1.
 *
 * 3개의 한자 뱃지 (가운데 강조) + eyebrow + 제목 + sub + 2 CTA. center align.
 * category prop으로 sage/vermilion 톤 전환.
 */
export function HubHero({
	category,
	chrs,
	eyebrow,
	title,
	sub,
	utmSource,
	secondaryCtaHref = "/telemedicine",
	secondaryCtaLabel = "절차 자세히 보기",
}: HubHeroProps) {
	const tone = getCategoryTone(category);
	const formUrl = buildNaverFormUrl({
		source: utmSource,
		content: "hero",
	});

	return (
		<section className="relative px-6 lg:px-12 pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-cream-50 to-cream-100">
			<div className="mx-auto max-w-[880px] text-center">
				<div
					className="flex justify-center gap-4 lg:gap-6 mb-6 lg:mb-7"
					aria-hidden="true"
				>
					<span
						className={cn(
							"size-12 lg:size-16 rounded-full bg-surface border border-border-subtle flex items-center justify-center font-serif font-bold text-xl lg:text-[26px]",
							tone.chrText,
						)}
					>
						{chrs[0]}
					</span>
					<span
						className={cn(
							"size-12 lg:size-16 rounded-full text-cream-50 flex items-center justify-center font-serif font-bold text-xl lg:text-[26px] shadow-md",
							tone.hubAccentBg,
						)}
					>
						{chrs[1]}
					</span>
					<span
						className={cn(
							"size-12 lg:size-16 rounded-full bg-surface border border-border-subtle flex items-center justify-center font-serif font-bold text-xl lg:text-[26px]",
							tone.chrText,
						)}
					>
						{chrs[2]}
					</span>
				</div>

				<span
					className={cn(
						"inline-block px-3.5 py-1.5 rounded-full text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase mb-5",
						tone.eyebrowBg,
						tone.eyebrowText,
					)}
				>
					{eyebrow}
				</span>

				<h1 className="font-display font-bold tracking-[-0.04em] leading-[1.15] text-ink-primary text-[32px] sm:text-[44px] lg:text-[56px] [word-break:keep-all]">
					{title}
				</h1>

				<p className="mt-4 lg:mt-5 text-base lg:text-[19px] leading-[1.75] text-ink-secondary max-w-[720px] mx-auto [word-break:keep-all]">
					{sub}
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
						<Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
