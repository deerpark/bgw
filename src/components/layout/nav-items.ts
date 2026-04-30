/**
 * 헤더 GNB 메뉴. CLAUDE.md §3 + docs/01-blueprint.md §1.1 의 7+1 구조.
 *
 * Phase 1 Week 2 시점에 / (메인) 외 페이지는 미구현 상태 — 링크는 404.
 * Week 3~5에 걸쳐 순차 구현된다.
 */

export interface NavItem {
	href: string;
	label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
	{ href: "/diet", label: "다이어트" },
	{ href: "/immune", label: "면역한약" },
	{ href: "/treatments", label: "진료과목" },
	{ href: "/clinic", label: "한의원 소개" },
	{ href: "/telemedicine", label: "비대면 진료" },
	{ href: "/blog", label: "블로그" },
];
