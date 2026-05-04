import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { ClinicInfoBar } from "@/components/sections/ClinicInfoBar";
import { DietLineup } from "@/components/sections/DietLineup";
import { DirectorMessage } from "@/components/sections/DirectorMessage";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { HeroStrip } from "@/components/sections/HeroStrip";
import { ImmuneLineup } from "@/components/sections/ImmuneLineup";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
	title: "부개원 한의원 — 부평 비대면 한약 진료",
	description:
		"부개 감비환·감비탕·디톡스 다이어트 한약과 공진단·경옥고·녹용보약 면역 한약을 한의사 비대면 진료로 처방받고 자택에서 수령하세요.",
	path: "/",
	og: {
		category: "부평 한의원",
		title: "부평 비대면 한약 진료",
		subtitle: "다이어트·면역 한약을 한의사 비대면 진료 후 처방",
	},
});

/**
 * 메인 페이지 (P-01) — mockups/home.html 1:1 복제.
 *
 * 위→아래 섹션 순서:
 *   1. Hero (above-fold, 모션 없음)
 *   2. HeroStrip — 4-step 프로세스 요약
 *   3. DietLineup — 다이어트 3종
 *   4. ImmuneLineup — 면역 3종
 *   5. DirectorMessage — 원장 메시지 (다크)
 *   6. ClinicInfoBar — 한의원 정보 4-col
 *   7. ProcessTimeline — 5단계 절차
 *   8. BlogTeaser — 블로그 카드 3장
 *   9. FinalCTA — 마지막 전환 (다크)
 *
 * Below-fold 섹션은 [RevealOnScroll](src/components/motion/RevealOnScroll.tsx)
 * 로 감싸 진입 시 fade-up reveal. prefers-reduced-motion 자동 fallback.
 */
export default function Home() {
	return (
		<>
			<Hero />
			<HeroStrip />
			<RevealOnScroll>
				<DietLineup />
			</RevealOnScroll>
			<RevealOnScroll>
				<ImmuneLineup />
			</RevealOnScroll>
			<RevealOnScroll>
				<DirectorMessage />
			</RevealOnScroll>
			<RevealOnScroll>
				<ClinicInfoBar />
			</RevealOnScroll>
			<RevealOnScroll>
				<ProcessTimeline />
			</RevealOnScroll>
			<RevealOnScroll>
				<BlogTeaser />
			</RevealOnScroll>
			<RevealOnScroll>
				<FinalCTA />
			</RevealOnScroll>
		</>
	);
}
