import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { env } from "@/lib/env";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(env.SITE_URL()),
	title: {
		default: "부개원 한의원 — 부평 비대면 한약 진료",
		template: "%s · 부개원 한의원",
	},
	description:
		"부개원 한의원은 다이어트·면역 한약을 한의사 비대면 진료 후 처방하는 부평 한의원입니다. 부개 감비환·감비탕·디톡스 라인업.",
};

export const viewport: Viewport = {
	themeColor: "#fffdf9",
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko" className={fontVariables} suppressHydrationWarning>
			<body className="min-h-dvh bg-background text-foreground antialiased">
				<PostHogProvider>{children}</PostHogProvider>
				{/*
				 * Vercel Analytics — 페이지뷰·트래픽. PostHog와 보완 관계:
				 *   PostHog          — 퍼널·코호트·커스텀 이벤트(CTA 클릭 5종)
				 *   Vercel Analytics — 라우트별 방문량/리퍼러 (Vercel 콘솔 통합)
				 *   Speed Insights   — Core Web Vitals(LCP/INP/CLS) 라우트별 측정
				 * Vercel 환경 외(로컬)에서는 자동 no-op.
				 */}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
