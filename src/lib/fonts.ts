import { IBM_Plex_Sans_KR, Inter, Noto_Serif_KR } from "next/font/google";
import localFont from "next/font/local";

/**
 * 부개원 한의원 폰트 — 모두 self-host (LCP 최적화).
 *
 * - Pretendard: src/fonts/PretendardVariable.woff2 (~2MB, variable 100–900).
 * - IBM Plex Sans KR / Noto Serif KR / Inter: next/font/google → Vercel build에서
 *   자동 self-host. 외부 origin RTT 0.
 *
 * Weight는 실제 사용분만 import (번들 사이즈 최소화).
 *  - IBM Plex Sans KR: 700 (display 헤딩)
 *  - Noto Serif KR: 400 / 500 / 700 (인용·인장·책등)
 *  - Inter: 600 (eyebrow uppercase)
 *
 * font-display: swap → fallback 즉시 렌더, LCP 폰트 swap 대기 없음.
 */

export const pretendard = localFont({
	src: "../fonts/PretendardVariable.woff2",
	variable: "--font-pretendard",
	weight: "100 900",
	style: "normal",
	display: "swap",
	fallback: [
		"-apple-system",
		"BlinkMacSystemFont",
		"system-ui",
		"Apple SD Gothic Neo",
		"Noto Sans KR",
		"sans-serif",
	],
});

export const ibmPlexSansKr = IBM_Plex_Sans_KR({
	subsets: ["latin"],
	weight: ["700"],
	variable: "--font-ibm-plex-sans-kr",
	display: "swap",
});

export const notoSerifKr = Noto_Serif_KR({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-noto-serif-kr",
	display: "swap",
});

export const inter = Inter({
	subsets: ["latin"],
	weight: ["600"],
	variable: "--font-inter",
	display: "swap",
});

/** <html> className에 합쳐서 적용. */
export const fontVariables = [
	pretendard.variable,
	ibmPlexSansKr.variable,
	notoSerifKr.variable,
	inter.variable,
].join(" ");
