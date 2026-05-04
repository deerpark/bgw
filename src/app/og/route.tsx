import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const alt = "BUGAEWON Korean Medicine Clinic";
export const size = { width: 1200, height: 630 } as const;
export const contentType = "image/png";

/**
 * 동적 OG 이미지 — 페이지별 query param으로 텍스트 삽입.
 *
 * 쿼리:
 *   title    — 메인 헤딩 (한글 가능). 미지정 시 정적 영문 OG로 폴백.
 *   subtitle — 서브 라인.
 *   category — 상단 eyebrow 라벨 (예: "다이어트", "면역", "진료과목").
 *
 * 한글 렌더링 폰트: PretendardStd Bold/Regular OTF (정적 weight, 한글 subset).
 *   - `src/fonts/og/PretendardStd-{Bold|Regular}.otf` (각 ~318KB)
 *   - Next 16 번들 satori는 woff2/가변 폰트를 지원하지 않음("Unsupported OpenType signature wOF2"). OTF만 가능.
 *   - 외부 폰트 CDN 의존 없음 → MITM/오프라인 환경 모두 동작, 모듈 캐시로 warm 호출 비용 0.
 *
 * Runtime: Vercel Fluid Compute(Node.js). fs 액세스가 가능해 외부 fetch보다 안정적.
 */

let fontsCache: Promise<{ bold: Buffer; regular: Buffer }> | null = null;
function loadFonts() {
	if (!fontsCache) {
		const dir = path.join(process.cwd(), "src", "fonts", "og");
		fontsCache = Promise.all([
			readFile(path.join(dir, "PretendardStd-Bold.otf")),
			readFile(path.join(dir, "PretendardStd-Regular.otf")),
		]).then(([bold, regular]) => ({ bold, regular }));
	}
	return fontsCache;
}

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const title = searchParams.get("title")?.trim();
	const subtitle = searchParams.get("subtitle")?.trim();
	const category = searchParams.get("category")?.trim();

	if (!title && !subtitle && !category) {
		return defaultOg();
	}

	let fonts: { bold: Buffer; regular: Buffer };
	try {
		fonts = await loadFonts();
	} catch (error) {
		console.warn("[og] font load failed, falling back to default", error);
		return defaultOg();
	}

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
				fontFamily: "Pretendard",
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
						fontWeight: 700,
						color: "#FFFDF9",
					}}
				>
					B
				</div>
				<span style={{ display: "flex" }}>
					{category ? `BUGAEWON · ${category}` : "BUGAEWON · Bupyeong"}
				</span>
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
				<div
					style={{
						fontSize: title && title.length > 18 ? "60px" : "72px",
						fontWeight: 700,
						letterSpacing: "-0.04em",
						lineHeight: 1.15,
						maxWidth: "1000px",
					}}
				>
					{title ?? "Korean Medicine Clinic"}
				</div>
				{subtitle ? (
					<div
						style={{
							fontSize: "26px",
							fontWeight: 400,
							color: "#E2D2BB",
							lineHeight: 1.5,
							maxWidth: "920px",
						}}
					>
						{subtitle}
					</div>
				) : null}
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
				<span>bugaewon.kr · 부평 부개원 한의원</span>
				<span
					style={{
						background: "#B0303A",
						color: "#FFFDF9",
						padding: "8px 14px",
						borderRadius: "6px",
						fontWeight: 700,
						letterSpacing: "0.18em",
					}}
				>
					BUGAEWON
				</span>
			</div>
		</div>,
		{
			...size,
			fonts: [
				{
					name: "Pretendard",
					data: fonts.regular,
					weight: 400,
					style: "normal",
				},
				{
					name: "Pretendard",
					data: fonts.bold,
					weight: 700,
					style: "normal",
				},
			],
		},
	);
}

/**
 * 기본 정적 영문 OG — 사이트 기본값, 폰트 fetch 없이 system-ui로 즉시 렌더.
 * 한글 text가 없으므로 system-ui로 충분.
 */
function defaultOg() {
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
