import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { AnchorNav } from "@/components/sections/AnchorNav";
import { AboutSection } from "@/components/sections/clinic/AboutSection";
import { AccessSection } from "@/components/sections/clinic/AccessSection";
import { ClinicFinalCTA } from "@/components/sections/clinic/ClinicFinalCTA";
import { DoctorsSection } from "@/components/sections/clinic/DoctorsSection";
import { HoursSection } from "@/components/sections/clinic/HoursSection";
import { InteriorGallery } from "@/components/sections/clinic/InteriorGallery";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
	title: "한의원 소개 — 부개원 한의원",
	description:
		"부평 부개동 부개원 한의원 소개. 윤정호 원장의 학력·경력·소속 학회, 진료시간, 오시는길(1호선 부개역 도보 12분).",
	path: "/clinic",
});

const ANCHOR_ITEMS = [
	{ id: "about", label: "소개" },
	{ id: "doctors", label: "의료진" },
	{ id: "interior", label: "내부" },
	{ id: "access", label: "오시는길" },
	{ id: "hours", label: "진료시간" },
] as const;

/**
 * 한의원 소개 (P-05) — mockups/clinic.html 1:1 (커스텀 SVG 약도는 Phase 2).
 *
 * 섹션:
 *   1. About — eyebrow + 큰 제목 + 인용 + 단락 + 인장
 *   2. Doctors — 윤정호 원장 카드 + 인증·활동 카드
 *   3. Interior — 6 photo placeholder
 *   4. Access — 네이버/카카오/T맵 deeplink + 4 info card
 *   5. Hours — 7행 진료시간 테이블 + 안내
 *   6. FinalCTA — light cream
 *
 * Anchor nav는 5개 섹션 활성화 표시 (about/doctors/interior/access/hours).
 */
export default function ClinicPage() {
	return (
		<>
			<AboutSection />
			<AnchorNav items={ANCHOR_ITEMS} />
			<RevealOnScroll>
				<DoctorsSection />
			</RevealOnScroll>
			<RevealOnScroll>
				<InteriorGallery />
			</RevealOnScroll>
			<RevealOnScroll>
				<AccessSection />
			</RevealOnScroll>
			<RevealOnScroll>
				<HoursSection />
			</RevealOnScroll>
			<RevealOnScroll>
				<ClinicFinalCTA />
			</RevealOnScroll>
		</>
	);
}
