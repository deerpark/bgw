import { Stamp } from "@/components/icons/Stamp";

/**
 * /clinic About Hero — mockups/clinic.html .about-hero 1:1.
 *
 * 좌: ABOUT US eyebrow + 큰 제목 + 인용 + 단락 2개
 * 우: photo placeholder (실제 사진 도입 전) + 인장 오버레이
 */
export function AboutSection() {
	return (
		<section
			id="about"
			className="px-6 lg:px-12 pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-cream-50 to-cream-100"
		>
			<div className="mx-auto max-w-[var(--container-xl)] grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:items-center">
				<div className="max-w-[580px]">
					<span className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase text-vermilion">
						About us
					</span>
					<h1 className="mt-3 font-display font-bold tracking-[-0.04em] leading-[1.15] text-ink-primary text-[36px] sm:text-[44px] lg:text-[56px] [word-break:keep-all]">
						체질을 살피는
						<br />
						한의학의 깊이.
					</h1>
					<blockquote className="mt-6 lg:mt-7 font-serif text-lg lg:text-xl leading-[1.55] tracking-[-0.02em] text-ink-primary font-medium [word-break:keep-all]">
						“한약은 표준 처방이 아니라, 환자 한 분 한 분의 체질 위에 다시 짜이는
						처방이라 믿습니다.”
					</blockquote>
					<p className="mt-6 text-base leading-[1.85] text-ink-secondary [word-break:keep-all]">
						부개원 한의원은 부평 부개동에서 지역 환자분들과 함께 온
						한의원입니다. 다이어트·면역·자동차보험 진료를 중심으로, 환자분
						개개인의 체질·증상·생활 환경을 깊이 살펴 처방하는 것이 우리의
						원칙입니다.
					</p>
					<p className="mt-4 text-base leading-[1.85] text-ink-secondary [word-break:keep-all]">
						방문이 어려운 분들도 안전하게 진료받으실 수 있도록 비대면 진료
						시스템을 운영하고 있으며, 모든 처방은 한의사의 유선 진료 이후
						결정됩니다.
					</p>
				</div>

				<aside
					aria-hidden="true"
					className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-brown-200 to-cream-200"
				>
					<div className="absolute inset-0 flex items-center justify-center">
						<span className="font-serif font-bold text-[80px] lg:text-[120px] text-brown-700/15">
							梄
						</span>
					</div>
					<div className="absolute bottom-6 right-6">
						<Stamp text="富梄開印" />
					</div>
				</aside>
			</div>
		</section>
	);
}
