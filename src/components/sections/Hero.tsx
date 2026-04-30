import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button } from "@/components/ui/button";
import { DIET_PRODUCTS } from "@/data/products";
import { buildNaverFormUrl } from "@/lib/settings";

/**
 * 메인 페이지 Hero — mockups/home.html .hero-d / .hero-m 1:1 복제.
 *
 * 데스크톱: 2-col grid (1.1fr 0.9fr) — 좌 카피, 우 다이어트 3종 짧은 카드.
 * 모바일: 단일 컬럼 — 카피만 (다이어트 카드는 뒤 섹션에서 더 크게).
 *
 * 모션 통합은 Step 6b (Framer Motion entrance/reveal).
 */
export function Hero() {
	const formUrl = buildNaverFormUrl({
		source: "home",
		content: "hero_primary",
	});

	return (
		<section className="relative px-6 py-12 lg:px-12 lg:py-24 bg-[radial-gradient(circle_at_80%_20%,_color-mix(in_oklab,_var(--vermilion-500)_8%,_transparent),_transparent_40%),_linear-gradient(180deg,_var(--cream-50)_0%,_var(--cream-100)_100%)]">
			<div className="mx-auto max-w-[var(--container-xl)] grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:items-center">
				<div className="max-w-[580px]">
					<span className="inline-flex items-center gap-2 px-3 py-1.5 bg-vermilion-100 text-vermilion-700 rounded-full text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase">
						Diet · Immunity · Non-contact Care
					</span>
					<h1 className="mt-4 lg:mt-5 font-display font-bold tracking-[-0.04em] text-ink-primary text-[28px] leading-[1.2] sm:text-[36px] lg:text-[48px] lg:leading-[1.15] [word-break:keep-all]">
						체질을 살피는 한방 다이어트,
						<br />
						<span className="text-brand inline-block px-1 [background-image:linear-gradient(180deg,transparent_70%,var(--vermilion-100)_70%)]">
							비대면
						</span>
						으로 처방받으세요.
					</h1>
					<p className="mt-4 lg:mt-5 text-sm lg:text-lg leading-[1.7] lg:leading-[1.75] text-ink-secondary max-w-[480px] [word-break:keep-all]">
						부개 감비환·감비탕·디톡스를 비대면 진료를 통해 처방해 드립니다.
						한의사 1:1 유선 상담 후, 체질에 맞춰 조제된 한약을 자택으로
						보내드려요.
					</p>
					<div className="mt-6 lg:mt-7 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center">
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
								비대면 진료 접수 →
							</TrackedLink>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="border-1.5 border-brand text-brand hover:bg-brand-soft hover:text-brand h-12 lg:h-15 px-6 lg:px-8 text-base lg:text-lg"
						>
							<Link href="/clinic">한의원 둘러보기</Link>
						</Button>
					</div>
					<dl className="hidden lg:flex mt-9 gap-8 text-[13px] text-ink-muted">
						{TRUST_BADGES.map((badge) => (
							<div key={badge} className="inline-flex items-center gap-2">
								<span
									className="w-1.5 h-1.5 rounded-full bg-sage-400"
									aria-hidden="true"
								/>
								{badge}
							</div>
						))}
					</dl>
				</div>

				<aside
					aria-label="다이어트 한약 라인업 미리보기"
					className="hidden lg:flex flex-col gap-3"
				>
					{DIET_PRODUCTS.map((product) => (
						<Link
							key={product.slug}
							href={product.href}
							className="group flex items-center gap-4 p-4 lg:p-5 bg-surface border border-border-subtle rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] border-l-[3px] border-l-category-diet"
						>
							<span
								className="flex-shrink-0 w-14 h-14 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center font-serif font-bold text-2xl"
								aria-hidden="true"
							>
								{product.chr}
							</span>
							<div className="flex-1 min-w-0">
								<p className="text-[17px] font-semibold tracking-tight text-ink-primary">
									{product.nameKo}
								</p>
								<p className="mt-0.5 text-[13px] leading-snug text-ink-muted">
									{product.heroDesc}
								</p>
							</div>
							<ArrowRight
								className="size-4 text-ink-muted group-hover:translate-x-1 transition-transform duration-200"
								aria-hidden="true"
							/>
						</Link>
					))}
				</aside>
			</div>
		</section>
	);
}

const TRUST_BADGES = [
	"한의사 1:1 유선 진료",
	"자택 택배 발송",
	"부평 부개동",
] as const;
