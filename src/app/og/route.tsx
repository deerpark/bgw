import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BUGAEWON Korean Medicine Clinic";
export const size = { width: 1200, height: 630 } as const;
export const contentType = "image/png";

/**
 * 사이트 공통 OG 이미지 — 정적이지만 ImageResponse로 빌드 시 생성된다.
 *
 * Phase 1: 영문 + 브랜드 컬러로 고정. Korean 폰트 로딩이 필요 없어
 * 엣지 콜드스타트 시간을 최소화한다.
 *
 * Phase 2: 페이지별 query param(?title=...&category=...)으로 동적 텍스트 삽입.
 */
export function GET() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: "72px 80px",
				background:
					"linear-gradient(135deg, #492E14 0%, #3A2613 60%, #2A1B0E 100%)",
				color: "#FFFDF9",
				fontFamily: "system-ui, -apple-system, sans-serif",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "16px",
					fontSize: "20px",
					letterSpacing: "0.18em",
					textTransform: "uppercase",
					color: "#C9B08C",
				}}
			>
				<div
					style={{
						width: "48px",
						height: "48px",
						borderRadius: "50%",
						border: "2px solid #C9B08C",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "24px",
						fontFamily: "Georgia, serif",
						color: "#FFFDF9",
					}}
				>
					B
				</div>
				BUGAEWON · Bupyeong
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
				<div
					style={{
						fontSize: "72px",
						fontWeight: 700,
						letterSpacing: "-0.04em",
						lineHeight: 1.1,
					}}
				>
					Korean Medicine Clinic
				</div>
				<div
					style={{
						fontSize: "26px",
						color: "#E2D2BB",
						lineHeight: 1.5,
						maxWidth: "880px",
					}}
				>
					Diet · Immunity · Non-contact telemedicine consultation
				</div>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
					fontSize: "16px",
					color: "#C9B08C",
				}}
			>
				<span>bugaewon.kr</span>
				<span
					style={{
						background: "#B0303A",
						color: "#FFFDF9",
						padding: "8px 14px",
						borderRadius: "6px",
						fontFamily: "Georgia, serif",
						fontWeight: 700,
						letterSpacing: "0.1em",
					}}
				>
					富 梄 開 印
				</span>
			</div>
		</div>,
		{ ...size },
	);
}
