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
			</body>
		</html>
	);
}
