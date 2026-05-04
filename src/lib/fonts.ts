import localFont from "next/font/local";

/**
 * 부개원 한의원 폰트 — self-host, LCP 최적화.
 *
 * Phase 1 Week 6 변경 (Lighthouse LCP 18s → 9.8s → 목표 < 2.5s):
 *   1차) Pretendard Variable 2MB → PretendardStdVariable subset 284KB,
 *        IBM Plex Sans KR · Inter 제거. (LCP 18s → 9.8s)
 *   2차) Noto Serif KR 제거 — production CSS의 99.85%(~150KB)가 Noto Serif KR
 *        Unicode-range subset @font-face 선언이었고, 이것이 render-blocking critical
 *        path를 부풀렸다. 한자 도장·serif 라벨은 system serif fallback로 대체.
 *
 * 결과: 폰트 critical path Pretendard subset 284KB 단일. CSS 223KB → ~73KB.
 *
 * 모든 폰트 `display: "swap"` — fallback 즉시 렌더, LCP 폰트 swap 대기 없음.
 *
 * 폰트 출처: orioncactus/pretendard v1.3.9 pretendard-std (한글 common subset).
 * OG 라우트(`/og`)는 satori가 woff2/Variable을 지원하지 않아 정적 OTF 별도 사용
 * (`src/fonts/og/PretendardStd-{Regular|Bold}.otf`).
 */

export const pretendard = localFont({
	src: "../fonts/PretendardStdVariable.woff2",
	weight: "100 900",
	style: "normal",
	display: "swap",
	variable: "--font-pretendard",
	fallback: [
		"-apple-system",
		"BlinkMacSystemFont",
		"system-ui",
		"Apple SD Gothic Neo",
		"Noto Sans KR",
		"sans-serif",
	],
});

/** <html> className에 합쳐서 적용. */
export const fontVariables = pretendard.variable;
