import "server-only";
import { channels } from "@/lib/settings";

/**
 * 네이버 블로그 RSS 페치 + 파서.
 *
 * 운영 블로그 — https://blog.naver.com/bgwon9991 (RSS: bgwon9991.xml)
 * RSS 2.0 + activity stream 확장. <item> 단위로 title/link/category/description/pubDate를 갖는다.
 *
 * Phase 1: 홈 BlogTeaser에서 3장. Phase 2 자체 블로그 도입 시 자체 posts 테이블과 합쳐 노출.
 *
 * 캐싱: Next.js fetch ISR — 30분 revalidate. 빌드 실패해도 BlogTeaser 폴백이 있다.
 */

const REVALIDATE_SECONDS = 1800;
const FETCH_TIMEOUT_MS = 6000;

export interface NaverBlogPost {
	title: string;
	link: string;
	category: string;
	excerpt: string;
	cover: string | null;
	pubDate: string | null;
}

/**
 * 네이버 블로그 RSS에서 상위 N개의 포스트를 가져온다.
 * 실패 시 빈 배열 반환 — 호출부에서 폴백 UI를 책임진다.
 */
export async function getNaverBlogPosts(limit = 3): Promise<NaverBlogPost[]> {
	try {
		const xml = await fetchRss();
		return parseRssItems(xml).slice(0, limit);
	} catch (error) {
		console.warn("[naver-blog] fetch failed", error);
		return [];
	}
}

async function fetchRss(): Promise<string> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

	try {
		const res = await fetch(channels.naverBlogRss, {
			signal: controller.signal,
			next: { revalidate: REVALIDATE_SECONDS, tags: ["naver-blog"] },
			headers: { Accept: "application/rss+xml,application/xml,text/xml" },
		});
		if (!res.ok) {
			throw new Error(`naver-blog RSS ${res.status}`);
		}
		return await res.text();
	} finally {
		clearTimeout(timeout);
	}
}

function parseRssItems(xml: string): NaverBlogPost[] {
	const items: NaverBlogPost[] = [];
	const itemRegex = /<item>([\s\S]*?)<\/item>/g;

	let match: RegExpExecArray | null = itemRegex.exec(xml);
	while (match !== null) {
		const block = match[1];
		const title = extractTag(block, "title");
		const link = cleanLink(extractTag(block, "link"));

		if (title && link) {
			const description = extractTag(block, "description") ?? "";
			items.push({
				title,
				link,
				category: extractTag(block, "category") ?? "",
				excerpt: stripHtml(description).slice(0, 110).trim(),
				cover: extractFirstImage(description),
				pubDate: extractTag(block, "pubDate"),
			});
		}
		match = itemRegex.exec(xml);
	}

	return items;
}

/**
 * <tag>값</tag> 또는 <tag><![CDATA[값]]></tag> 모두에서 내용 추출.
 */
function extractTag(block: string, tag: string): string | null {
	const re = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i");
	const m = block.match(re);
	if (!m) return null;
	const inner = m[1].trim();
	const cdata = inner.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
	return (cdata ? cdata[1] : inner).trim();
}

function extractFirstImage(html: string): string | null {
	const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
	if (!m) return null;
	// 네이버 RSS의 ?type=s3 류 파라미터는 작은 썸네일. 그대로 사용.
	return m[1];
}

function stripHtml(html: string): string {
	return html
		.replace(/<[^>]+>/g, " ")
		.replace(/&nbsp;/gi, " ")
		.replace(/&amp;/gi, "&")
		.replace(/&lt;/gi, "<")
		.replace(/&gt;/gi, ">")
		.replace(/&quot;/gi, '"')
		.replace(/\s+/g, " ")
		.trim();
}

/**
 * 네이버 RSS의 link는 ?fromRss=true&trackingCode=rss 파라미터가 붙어 있다.
 * 외부 노출용으로 깔끔한 URL을 만들기 위해 제거.
 */
function cleanLink(link: string | null): string | null {
	if (!link) return null;
	try {
		const url = new URL(link);
		url.searchParams.delete("fromRss");
		url.searchParams.delete("trackingCode");
		return url.toString();
	} catch {
		return link;
	}
}
