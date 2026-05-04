import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * 정적 sitemap. 미구현 페이지도 포함 — Phase 1 로드맵상 Week 3~5에 모두 ship.
 * 단기 404는 색인 신호로 약하지만, 발행 직후 빠른 색인을 위해 미리 등록.
 *
 * Phase 2 자체 블로그 / 한약 상세 동적 추가 시 Supabase 쿼리로 확장.
 */

const STATIC_ROUTES = [
	{ path: "/", priority: 1.0, changeFrequency: "weekly" as const },
	{ path: "/diet", priority: 0.95, changeFrequency: "weekly" as const },
	{
		path: "/diet/gambihwan",
		priority: 0.9,
		changeFrequency: "monthly" as const,
	},
	{
		path: "/diet/gambitang",
		priority: 0.9,
		changeFrequency: "monthly" as const,
	},
	{ path: "/diet/detox", priority: 0.9, changeFrequency: "monthly" as const },
	{ path: "/immune", priority: 0.85, changeFrequency: "weekly" as const },
	{
		path: "/immune/gongjindan",
		priority: 0.8,
		changeFrequency: "monthly" as const,
	},
	{
		path: "/immune/gyeongokgo",
		priority: 0.8,
		changeFrequency: "monthly" as const,
	},
	{
		path: "/immune/nokyong",
		priority: 0.8,
		changeFrequency: "monthly" as const,
	},
	{ path: "/clinic", priority: 0.85, changeFrequency: "monthly" as const },
	{ path: "/treatments", priority: 0.8, changeFrequency: "monthly" as const },
	{
		path: "/treatments/insurance",
		priority: 0.7,
		changeFrequency: "monthly" as const,
	},
	{
		path: "/treatments/chuna",
		priority: 0.7,
		changeFrequency: "monthly" as const,
	},
	{
		path: "/treatments/rhinitis",
		priority: 0.7,
		changeFrequency: "monthly" as const,
	},
	{
		path: "/treatments/growth",
		priority: 0.7,
		changeFrequency: "monthly" as const,
	},
	{
		path: "/treatments/womens",
		priority: 0.7,
		changeFrequency: "monthly" as const,
	},
	{
		path: "/telemedicine",
		priority: 0.95,
		changeFrequency: "monthly" as const,
	},
	{ path: "/blog", priority: 0.6, changeFrequency: "daily" as const },
	{ path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
	{ path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
	const base = env.SITE_URL();
	const lastModified = new Date();

	return STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
		url: new URL(path, base).toString(),
		lastModified,
		changeFrequency,
		priority,
	}));
}
