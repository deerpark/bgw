import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { clinicJsonLd } from "@/lib/seo";

/**
 * (public) 라우트 그룹 레이아웃 — 일반 방문자 페이지 공통 chrome.
 *
 * URL에 영향 없음 ((public)은 path에서 제외됨). 관리자 페이지는
 * 추후 (admin) 그룹에서 별도 레이아웃을 가진다.
 *
 * MedicalClinic JSON-LD를 모든 public 페이지에 일괄 박아 부평 한의원 로컬
 * SEO를 강화한다 (Google Rich Results, 네이버 검색 인식).
 */
export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-dvh flex-col">
			<script
				type="application/ld+json"
				// JSON-LD는 우리가 직접 빌드하므로 XSS 위험 없음. dangerouslySetInnerHTML가
				// 정석 패턴 (Next.js 공식 가이드).
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD 삽입에 필수
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(clinicJsonLd()),
				}}
			/>
			<Header />
			<main className="flex-1">{children}</main>
			<Footer />
			<FloatingCTA />
		</div>
	);
}
