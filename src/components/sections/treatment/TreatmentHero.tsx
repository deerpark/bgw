import Link from "next/link";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button } from "@/components/ui/button";
import type { Treatment } from "@/data/treatments";
import { buildNaverFormUrl, clinic, kakaoChatUrl } from "@/lib/settings";
import { cn } from "@/lib/utils";

interface TreatmentHeroProps {
	treatment: Treatment;
}

const TONE_CLASSES = {
	vermilion: {
		chip: "bg-vermilion-100 text-vermilion-700",
		icon: "bg-vermilion-100",
	},
	sage: { chip: "bg-sage-100 text-sage-600", icon: "bg-sage-100" },
	brown: { chip: "bg-brown-100 text-brown-700", icon: "bg-brown-100" },
} as const;

/**
 * 진료과목 Hero — eyebrow + title + essence + sub + 2 CTA.
 * visitOnly(자동차보험)면 비대면 접수 대신 전화 예약 강조.
 */
export function TreatmentHero({ treatment }: TreatmentHeroProps) {
	const tone = TONE_CLASSES[treatment.tone];
	const formUrl = buildNaverFormUrl({
		source: "hero",
		content: `treatment_${treatment.slug}`,
	});

	return (
		<section className="px-6 lg:px-12 pt-16 lg:pt-24 pb-12 lg:pb-16 bg-gradient-to-b from-cream-50 to-cream-100">
			<div className="mx-auto max-w-[var(--container-xl)] grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:items-center">
				<div className="max-w-[580px]">
					<span
						className={cn(
							"inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase",
							tone.chip,
						)}
					>
						{treatment.heroChip}
					</span>
					<h1 className="mt-4 lg:mt-5 font-display font-bold tracking-[-0.04em] leading-[1.15] text-ink-primary text-[32px] sm:text-[40px] lg:text-[48px] [word-break:keep-all]">
						{treatment.nameKo}
					</h1>
					<p className="mt-4 lg:mt-5 text-base lg:text-[20px] leading-[1.55] text-ink-primary font-medium tracking-[-0.02em] max-w-[520px] [word-break:keep-all]">
						{treatment.essence}
					</p>
					<p className="mt-4 lg:mt-5 text-sm lg:text-base leading-[1.85] text-ink-secondary [word-break:keep-all]">
						{treatment.heroSub}
					</p>

					<div className="mt-7 flex flex-col sm:flex-row gap-2.5">
						{treatment.visitOnly ? (
							<>
								<Button
									asChild
									size="lg"
									className="bg-vermilion text-cream-50 hover:bg-vermilion-hover [a]:hover:bg-vermilion-hover h-12 lg:h-15 px-6 lg:px-8 text-base lg:text-lg shadow-sm"
								>
									<TrackedLink
										event="phone_call_click"
										eventProps={{ location: "hero" }}
										href={clinic.phone.tel}
									>
										{treatment.primaryCtaLabel} → {clinic.phone.display}
									</TrackedLink>
								</Button>
								<Button
									asChild
									size="lg"
									variant="outline"
									className="border-1.5 border-brand text-brand hover:bg-brand-soft hover:text-brand h-12 lg:h-15 px-6 lg:px-8 text-base lg:text-lg"
								>
									<TrackedLink
										event="kakao_chat_open"
										eventProps={{ location: "hero" }}
										href={kakaoChatUrl()}
										target="_blank"
										rel="noopener"
									>
										카카오톡 문의
									</TrackedLink>
								</Button>
							</>
						) : (
							<>
								<Button
									asChild
									size="lg"
									className="bg-vermilion text-cream-50 hover:bg-vermilion-hover [a]:hover:bg-vermilion-hover h-12 lg:h-15 px-6 lg:px-8 text-base lg:text-lg shadow-sm"
								>
									<TrackedLink
										event="cta_telemedicine_click"
										eventProps={{ location: "hero", channel: "naver_form" }}
										href={formUrl}
										target="_blank"
										rel="noopener"
									>
										{treatment.primaryCtaLabel} →
									</TrackedLink>
								</Button>
								<Button
									asChild
									size="lg"
									variant="outline"
									className="border-1.5 border-brand text-brand hover:bg-brand-soft hover:text-brand h-12 lg:h-15 px-6 lg:px-8 text-base lg:text-lg"
								>
									<Link href="/clinic">한의원 둘러보기</Link>
								</Button>
							</>
						)}
					</div>
				</div>

				{/* Visual — 큰 emoji + 단아한 표시 */}
				<aside
					aria-hidden="true"
					className={cn(
						"relative aspect-square rounded-3xl overflow-hidden shadow-lg flex items-center justify-center bg-gradient-to-br",
						treatment.tone === "vermilion" && "from-vermilion-200 to-cream-200",
						treatment.tone === "sage" && "from-sage-200 to-cream-200",
						treatment.tone === "brown" && "from-brown-300 to-cream-200",
					)}
				>
					<span className="text-[140px] lg:text-[200px] leading-none drop-shadow-md">
						{treatment.icon}
					</span>
				</aside>
			</div>
		</section>
	);
}
