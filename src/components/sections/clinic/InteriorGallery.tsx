import Image from "next/image";
import { SectionHead } from "@/components/sections/SectionHead";
import { type ClinicPhotoSlug, clinicPhoto } from "@/data/clinic-photos";

/**
 * 한의원 내부 사진 갤러리 — mockups/clinic.html #interior.
 *
 * Phase 1 Week 6: 실제 사진 6장 (`/public/photos/clinic/<slug>.webp`).
 *   원본은 reference/images/, 변환은 scripts/optimize-clinic-photos.mjs.
 *
 * Below-fold 섹션이므로 모두 `loading="lazy"` 기본값. 첫 카드만 priority 부여
 * 하지 않는다 — InteriorGallery는 RevealOnScroll 안에서만 노출된다고 가정.
 *
 * 외부 전경 사진은 운영자 측 추가 업로드 후 별도 PR.
 */

interface PhotoSlot {
	slug: ClinicPhotoSlug;
	caption: string;
}

const PHOTOS: readonly PhotoSlot[] = [
	{ slug: "interior", caption: "실내 전경" },
	{ slug: "waiting-room", caption: "대기실" },
	{ slug: "reception-2", caption: "안내데스크" },
	{ slug: "consult-3", caption: "진료실" },
	{ slug: "dispensary-1", caption: "원내 탕전실" },
	{ slug: "chuna-room", caption: "추나 치료실" },
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
				{PHOTOS.map((slot) => {
					const meta = clinicPhoto(slot.slug);
					return (
						<figure
							key={slot.slug}
							className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-100"
						>
							<Image
								src={`/photos/clinic/${meta.slug}.webp`}
								alt={slot.caption}
								fill
								sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
								className="object-cover"
							/>
							<figcaption className="absolute left-4 bottom-4 px-3 py-1 bg-cream-50/85 backdrop-blur-sm text-brown-700 text-[11px] font-mono tracking-[0.04em] rounded">
								{slot.caption}
							</figcaption>
						</figure>
					);
				})}
			</div>
		</section>
	);
}
