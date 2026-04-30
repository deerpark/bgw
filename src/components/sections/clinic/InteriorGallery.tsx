import { SectionHead } from "@/components/sections/SectionHead";

/**
 * 한의원 내부 사진 갤러리 — mockups/clinic.html #interior.
 *
 * Phase 1: 6 photo placeholder (실제 사진 도입 전).
 * Phase 2에서 next/image로 교체.
 */

const PHOTOS = [
	{ label: "대기실", gradient: "from-brown-300 to-cream-200" },
	{ label: "진료실", gradient: "from-cream-300 to-brown-200" },
	{ label: "조제실", gradient: "from-sage-200 to-cream-200" },
	{ label: "입구", gradient: "from-brown-200 to-cream-100" },
	{ label: "추나 베드", gradient: "from-vermilion-200 to-cream-200" },
	{ label: "복도", gradient: "from-neutral-200 to-cream-100" },
] as const;

export function InteriorGallery() {
	return (
		<section id="interior" className="bg-bg-base px-6 lg:px-12 py-16 lg:py-24">
			<SectionHead
				eyebrow="03 · 한의원 내부"
				title="차분하게 머무를 수 있는 공간."
				align="center"
				className="mb-10 lg:mb-12"
			/>
			<div className="mx-auto max-w-[var(--container-xl)] grid gap-3 grid-cols-2 lg:grid-cols-3">
				{PHOTOS.map((p) => (
					<figure
						key={p.label}
						className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${p.gradient}`}
					>
						<figcaption className="absolute left-4 bottom-4 px-3 py-1 bg-cream-50/85 backdrop-blur-sm text-brown-700 text-[11px] font-mono tracking-[0.04em] rounded">
							{p.label}
						</figcaption>
					</figure>
				))}
			</div>
			<p className="text-center mt-8 text-[13px] text-ink-muted [word-break:keep-all]">
				※ 실제 사진은 운영자가 추후 보정 후 업데이트합니다.
			</p>
		</section>
	);
}
