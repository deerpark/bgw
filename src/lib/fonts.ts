import { Noto_Serif_KR } from "next/font/google";
import localFont from "next/font/local";

/**
 * 부개원 한의원 폰트 — self-host, LCP 최적화.
 *
 * Phase 1 Week 6 변경 (Lighthouse LCP 18s → 목표 < 2.5s):
 *   - Pretendard Variable woff2 (2MB 풀셋) → PretendardStdVariable woff2 (292KB 한글 subset)
 *     · 변수형 단일 파일로 모든 weight(100–900) 커버 = preload 단 1회로 끝
 *     · 한글 common subset이라 일반 한의원 콘텐츠 글리프 모두 포함
 *   - IBM Plex Sans KR 제거 → Pretendard Bold가 display 헤딩 대체
 *   - Inter 제거 → Pretendard Latin 글리프가 eyebrow uppercase 대체
 *   - Noto Serif KR 유지(한자 도장·책등 라벨에 필요), weight 500 제거(400+700만)
 *
 * 모든 폰트 `display: "swap"` — fallback 즉시 렌더, LCP 폰트 swap 대기 없음.
 *
 * 폰트 출처: orioncactus/pretendard v1.3.9 pretendard-std (한글 common subset).
 * OG 라우트(`/og`)는 satori가 woff2/Variable을 지원하지 않아 정적 OTF를 별도 사용
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

export const notoSerifKr = Noto_Serif_KR({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-noto-serif-kr",
	display: "swap",
});

/** <html> className에 합쳐서 적용. */
export const fontVariables = [pretendard.variable, notoSerifKr.variable].join(
	" ",
);
