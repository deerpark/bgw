import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
	const base = env.SITE_URL();

	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/admin", "/api", "/og"],
			},
		],
		sitemap: new URL("/sitemap.xml", base).toString(),
		host: new URL(base).host,
	};
}
