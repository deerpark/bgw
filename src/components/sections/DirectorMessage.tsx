import Image from "next/image";
import { clinicPhoto } from "@/data/clinic-photos";
import { clinic } from "@/lib/settings";

/**
 * 원장 메시지 섹션 — mockups/home.html "원장의 말".
 * brown-900 다크 배경 · 좌 사진(실제 진료실 책장 포함) / 우 인용+이름+소속.
 *
 * Phase 1 Week 6: 실제 원장 사진(/photos/clinic/director.webp)으로 교체.
 *   사진 자체에 진료실 책장이 함께 담겨 SVG 책장 backdrop 불필요.
 */

const PORTRAIT = clinicPhoto("director");

export function DirectorMessage() {
	return (
		<section className="relative overflow-hidden bg-brown-900 text-cream-100 px-6 lg:px-12 py-20 lg:py-24">
			<div
				aria-hidden="true"
				className="absolute inset-0 opacity-40 bg-[radial-gradient(at_20%_30%,rgba(206,61,69,0.18),transparent_40%),radial-gradient(at_80%_70%,rgba(255,253,249,0.04),transparent_50%)]"
			/>

			<div className="relative mx-auto max-w-[1280px] grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:items-center">
				<figure className="relative">
					<div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl bg-brown-950">
						<Image
							src={`/photos/clinic/${PORTRAIT.slug}.webp`}
							alt={`${clinic.director.nameKo} ${clinic.director.title}`}
							fill
							sizes="(max-width: 1024px) 90vw, 45vw"
							className="object-cover object-[58%_center]"
						/>
						{/* Stamp overlay — 사진 우하단 인장 */}
						<div
							className="absolute bottom-4 right-4 bg-vermilion text-cream-50 px-2.5 py-2 rounded font-serif font-bold text-[10px] leading-[1.2] [writing-mode:vertical-rl] shadow-md"
							aria-label="인장: 富梄開印"
							role="img"
						>
							富梄
							<br />
							開印
						</div>
					</div>
					<figcaption className="mt-3.5 font-mono text-xs text-brown-300 tracking-[0.04em]">
						PORTRAIT · BUGAEWON KMC
					</figcaption>
				</figure>

				<div>
					<span className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase text-vermilion-300">
						From the Director · 원장의 말
					</span>
					<blockquote className="mt-4 mb-6 font-serif text-[24px] lg:text-[32px] xl:text-[36px] leading-[1.45] tracking-[-0.03em] text-cream-50 font-medium [word-break:keep-all]">
						“한약은 표준 처방이 아니라,
						<br className="hidden sm:inline" /> 환자 한 분 한 분의 체질 위에{" "}
						<em className="not-italic text-vermilion-300">다시 짜이는 처방</em>
						이라 믿습니다.”
					</blockquote>
					<p className="text-base lg:text-[16px] leading-[1.85] text-brown-200 mb-7 max-w-[56ch] [word-break:keep-all]">
						부개원 한의원은 부평 부개동에서 지역 환자분들과 함께 자라온
						한의원입니다. 다이어트·면역·자동차보험 진료를 중심으로, 환자분
						개개인의 체질·증상·생활 환경을 깊이 살펴 처방하는 것이 우리의
						원칙입니다.
					</p>
					<div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 pt-6 border-t border-cream-50/12">
						<div>
							<p className="text-lg font-semibold tracking-[-0.02em] text-cream-50">
								{clinic.director.nameKo}{" "}
								<span className="font-serif text-brown-300 text-sm font-normal">
									尹正鎬
								</span>
							</p>
							<p className="text-[13px] text-brown-300 mt-0.5">
								{clinic.director.title} · 한의사 KMD
							</p>
						</div>
						<ul className="flex flex-wrap gap-2 sm:ml-auto">
							{clinic.director.memberships.slice(0, 2).map((m) => (
								<li
									key={m}
									className="bg-cream-50/8 border border-cream-50/18 text-cream-100 px-3 py-1 rounded-full text-[11px] tracking-[0.04em]"
								>
									{m}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
