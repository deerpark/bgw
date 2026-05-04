import type { Metadata } from "next";
import { env } from "@/lib/env";
import { channels, clinic } from "@/lib/settings";

/**
 * 페이지별 메타데이터 빌더.
 *
 * 각 페이지의 generateMetadata에서 호출하여 일관된 OG·Twitter·canonical을
 * 자동으로 채운다. metadataBase는 root layout에서 한 번만 설정.
 */
export interface OgImageParams {
	/** 메인 헤딩 — 한글 가능. 미지정 시 정적 영문 OG 폴백. */
	title?: string;
	/** 서브 라인. */
	subtitle?: string;
	/** 상단 eyebrow 라벨 (예: "다이어트", "면역", "진료과목"). */
	category?: string;
}

/**
 * 동적 OG 이미지 URL — `/og?title=...&subtitle=...&category=...`.
 * 모든 값이 비면 `/og` (정적 영문 OG)로 폴백.
 */
export function buildOgPath(params: OgImageParams = {}): string {
	const search = new URLSearchParams();
	if (params.title) search.set("title", params.title);
	if (params.subtitle) search.set("subtitle", params.subtitle);
	if (params.category) search.set("category", params.category);
	const query = search.toString();
	return query ? `/og?${query}` : "/og";
}

export function buildMetadata(opts: {
	/** 페이지 고유 제목. layout에 정의된 template("%s · 부개원 한의원")이 자동 적용. */
	title: string;
	description: string;
	/** 절대 또는 상대 경로 — sitemap/canonical에 사용. */
	path: string;
	/** OG 이미지 절대 URL 또는 경로. 우선순위: ogImage > og(객체) > 기본 /og. */
	ogImage?: string;
	/** 동적 OG 파라미터 — `/og?title=...&category=...`로 변환. */
	og?: OgImageParams;
	/** 검색 결과에 노출 안 시키려면 true. */
	noindex?: boolean;
}): Metadata {
	const url = new URL(opts.path, env.SITE_URL()).toString();
	const ogImage = opts.ogImage ?? buildOgPath(opts.og);

	return {
		title: opts.title,
		description: opts.description,
		alternates: {
			canonical: url,
		},
		openGraph: {
			type: "website",
			locale: "ko_KR",
			url,
			title: opts.title,
			description: opts.description,
			siteName: clinic.nameKo,
			images: [{ url: ogImage, width: 1200, height: 630 }],
		},
		twitter: {
			card: "summary_large_image",
			title: opts.title,
			description: opts.description,
			images: [ogImage],
		},
		robots: opts.noindex
			? { index: false, follow: false }
			: { index: true, follow: true },
	};
}

/**
 * MedicalClinic JSON-LD — 모든 (public) 페이지에 박혀 한의원 로컬 SEO 강화.
 *
 * Schema.org `MedicalClinic`은 `MedicalBusiness`의 서브타입.
 * medicalSpecialty는 enum이지만 한국의 한의학 전용 값이 없어 가까운 값 + 한국어 description.
 *
 * @see https://schema.org/MedicalClinic
 */
export function clinicJsonLd() {
	const baseUrl = env.SITE_URL();

	return {
		"@context": "https://schema.org",
		"@type": "MedicalClinic",
		"@id": `${baseUrl}#clinic`,
		name: clinic.nameKo,
		alternateName: clinic.nameEn,
		description:
			"부평 부개원 한의원 — 다이어트·면역 한약을 한의사 비대면 진료 후 처방하는 한의원.",
		url: baseUrl,
		telephone: "+82-32-361-9991",
		email: clinic.email,
		image: `${baseUrl}/og`,
		address: {
			"@type": "PostalAddress",
			streetAddress: clinic.address.short,
			addressLocality: "부평구",
			addressRegion: "인천광역시",
			postalCode: clinic.address.zip,
			addressCountry: "KR",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: clinic.geo.lat,
			longitude: clinic.geo.lng,
		},
		// 한국 한의학(Traditional Korean Medicine)은 Schema.org 표준 enum에 없어서
		// 가까운 값(`TraditionalChineseMedicine`) + 한글 설명으로 보완.
		medicalSpecialty: "TraditionalChineseMedicine",
		openingHoursSpecification: [
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
				opens: "09:00",
				closes: "20:00",
			},
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: "Saturday",
				opens: "09:00",
				closes: "14:00",
			},
		],
		sameAs: [channels.naverPlaceUrl, channels.naverBlogUrl],
		areaServed: {
			"@type": "City",
			name: "인천광역시",
		},
	} as const;
}

/**
 * 블로그 글 JSON-LD. Phase 2 자체 블로그 도입 시 사용.
 */
export function articleJsonLd(opts: {
	title: string;
	description: string;
	path: string;
	publishedAt: string | Date;
	modifiedAt?: string | Date;
	authorName?: string;
	imageUrl?: string;
}) {
	const baseUrl = env.SITE_URL();
	const url = new URL(opts.path, baseUrl).toString();

	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: opts.title,
		description: opts.description,
		url,
		datePublished: new Date(opts.publishedAt).toISOString(),
		dateModified: new Date(opts.modifiedAt ?? opts.publishedAt).toISOString(),
		author: {
			"@type": "Organization",
			name: opts.authorName ?? clinic.nameKo,
		},
		publisher: {
			"@type": "Organization",
			name: clinic.nameKo,
			logo: { "@type": "ImageObject", url: `${baseUrl}/og` },
		},
		image: opts.imageUrl ?? `${baseUrl}/og`,
		mainEntityOfPage: { "@type": "WebPage", "@id": url },
	} as const;
}
