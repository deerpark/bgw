import { ExternalLink } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { channels, clinic } from "@/lib/settings";

/**
 * 한의원 지도 임베드 — `/clinic > Access` 섹션 상단.
 *
 * Phase 1: OpenStreetMap iframe (API key 불필요, 임베드 허용).
 *   네이버/카카오/T맵 deeplink는 [AccessSection](src/components/sections/clinic/AccessSection.tsx)
 *   하단 버튼 행에 이미 배치됨. 이 컴포넌트는 시각적 컨텍스트 + Naver Place 진입 CTA만 담당.
 *
 * Phase 2 검토:
 *   - Naver Maps JavaScript API + Client ID 도입 시 자체 마커·로드뷰·정확한 거리 표시.
 *   - Naver Place 정식 임베드는 X-Frame-Options/CSP 제약으로 iframe 불가 → JS API가 사실상 유일한 길.
 *
 * SSR 안전: server component, 외부 fetch 없음 (iframe URL 자체만 출력).
 */

const PADDING = 0.0035; // 위경도 ±0.0035 ≈ 약 400m 박스 (부개역까지 보이는 적정 줌)

function buildOsmEmbedUrl(): string {
	const { lat, lng } = clinic.geo;
	const bbox = [
		(lng - PADDING).toFixed(5),
		(lat - PADDING).toFixed(5),
		(lng + PADDING).toFixed(5),
		(lat + PADDING).toFixed(5),
	].join(",");
	const params = new URLSearchParams({
		bbox,
		layer: "mapnik",
		marker: `${lat},${lng}`,
	});
	return `https://www.openstreetmap.org/export/embed.html?${params.toString()}`;
}

export function ClinicMap() {
	const embedUrl = buildOsmEmbedUrl();

	return (
		<div className="mb-6 lg:mb-8 rounded-2xl border border-border-subtle bg-surface overflow-hidden">
			<div className="relative aspect-[16/9] sm:aspect-[2/1] bg-cream-100">
				<iframe
					src={embedUrl}
					title={`${clinic.nameKo} 위치 지도`}
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					className="absolute inset-0 size-full border-0"
				/>
			</div>
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-t border-border-subtle">
				<div className="text-[13px] leading-[1.6] text-ink-secondary">
					<span className="font-semibold text-ink-primary">
						{clinic.address.short}
					</span>
					<span className="mx-2 text-ink-muted">·</span>
					<span>{clinic.address.landmark}</span>
				</div>
				<TrackedLink
					event="external_channel_click"
					eventProps={{ location: "clinic_info_bar", external: "naver_place" }}
					href={channels.naverPlaceUrl}
					target="_blank"
					rel="noopener"
					className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-hover whitespace-nowrap"
				>
					네이버 지도에서 보기
					<ExternalLink className="size-3.5" aria-hidden="true" />
				</TrackedLink>
			</div>
		</div>
	);
}
