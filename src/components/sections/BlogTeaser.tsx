import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { getNaverBlogPosts, type NaverBlogPost } from "@/lib/naver-blog";

/**
 * 블로그 티저 — mockups/home.html .blog-grid / .blog-card.
 *
 * Phase 1 Week 5: 네이버 블로그 RSS(bgwon9991.xml) 상위 3개를 SSR-ISR로 노출.
 * fetch 실패 시 정적 폴백 카드로 자동 대체 — 외부 의존성으로 영역이 비지 않게.
 *
 * Phase 2: 자체 posts 테이블이 도입되면 자체 글 우선 + RSS는 보조로 합치는 방식 검토.
 *
 * 카피는 docs/03-compliance-and-copy.md §2 가드레일 통과 — "효능 단정" 금지.
 */

export async function BlogTeaser() {
	const posts = await getNaverBlogPosts(3);
	const cards = posts.length === 3 ? posts : null;

	return (
		<section className="bg-surface-alt px-6 lg:px-12 py-16 lg:py-24">
			<div className="mx-auto max-w-[var(--container-xl)]">
				<header className="max-w-[720px] mb-10 lg:mb-12">
					<span className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] text-brand uppercase">
						04 · 부개원 노트
					</span>
					<h2 className="mt-3 font-display text-3xl lg:text-[40px] font-bold tracking-[-0.03em] leading-[1.2] text-ink-primary">
						한방·다이어트, 자주 묻는 이야기.
					</h2>
					<p className="mt-3 text-base lg:text-[17px] leading-[1.75] text-ink-secondary [word-break:keep-all]">
						한의사가 직접 정리하는 글. 단정형 효능 보장보다는 원리와 주의사항을
						함께 안내합니다.
					</p>
				</header>

				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{cards
						? cards.map((post) => <RssBlogCard key={post.link} post={post} />)
						: FALLBACK_POSTS.map((post) => (
								<FallbackBlogCard key={post.href} post={post} />
							))}
				</div>
			</div>
		</section>
	);
}

function RssBlogCard({ post }: { post: NaverBlogPost }) {
	return (
		<Link
			href={post.link}
			target="_blank"
			rel="noopener noreferrer"
			className="group bg-surface border border-border-subtle rounded-2xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all duration-[240ms] ease-[cubic-bezier(0.2,0,0,1)]"
		>
			{post.cover ? (
				<div className="aspect-[16/9] bg-cream-100 overflow-hidden">
					{/*
					 * 네이버 썸네일(blogthumb.pstatic.net)은 핫링크 차단 — 외부 도메인 Referer면 403.
					 * referrerPolicy="no-referrer"로 Referer 헤더를 비우면 200 OK로 정상 응답.
					 *
					 * next/image는 remotePatterns + Referer 컨트롤이 까다로워 일단 native <img>.
					 */}
					{/* biome-ignore lint/performance/noImgElement: 네이버 핫링크 정책 — referrerPolicy 컨트롤 필요. */}
					<img
						src={post.cover}
						alt=""
						loading="lazy"
						decoding="async"
						referrerPolicy="no-referrer"
						className="size-full object-cover transition-transform duration-[320ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.03]"
					/>
				</div>
			) : (
				<CategoryCover category={post.category} />
			)}
			<div className="p-6 lg:p-7">
				<span className="text-[11px] font-eyebrow font-semibold tracking-[0.08em] text-vermilion-600 inline-flex items-center gap-1">
					{post.category || "부개원 노트"}
					<ExternalLink className="size-3 opacity-60" aria-hidden="true" />
				</span>
				<h3 className="mt-1.5 mb-2 text-lg font-semibold tracking-[-0.02em] text-ink-primary leading-snug [word-break:keep-all] line-clamp-2">
					{post.title}
				</h3>
				<p className="text-[13px] text-ink-muted leading-[1.6] [word-break:keep-all] line-clamp-2">
					{post.excerpt}
				</p>
			</div>
		</Link>
	);
}

/**
 * RSS 카테고리명 → 색조 매핑. 이미지 없는 글의 폴백 커버에 사용.
 */
function CategoryCover({ category }: { category: string }) {
	const variant = mapCategoryToVariant(category);
	return <BlogCover variant={variant} />;
}

function mapCategoryToVariant(
	category: string,
): "diet" | "insurance" | "custom" {
	const c = category.toLowerCase();
	if (c.includes("교통사고") || c.includes("자동차") || c.includes("통증"))
		return "insurance";
	if (c.includes("다이어트") || c.includes("감비")) return "diet";
	return "custom";
}

// ─── 폴백 (RSS fetch 실패 시) ─────────────────────────────────────────

const FALLBACK_POSTS = [
	{
		tag: "맞춤 한약",
		title: "맞춤 한약과 기성 한약의 차이, 제대로 알고 선택하세요",
		body: "같은 증상이라도 환자마다 다르게 처방되는 이유. 부개원의 한방 처방 원칙을 정리합니다.",
		href: "https://blog.naver.com/bgwon9991",
		cover: "custom" as const,
	},
	{
		tag: "자동차보험 · 통증",
		title: "교통사고 한의원 치료, 언제부터 받아야 할까요?",
		body: "사고 직후 어떻게 한방 치료를 시작해야 하는지, 부개동 한의원의 안내.",
		href: "https://blog.naver.com/bgwon9991",
		cover: "insurance" as const,
	},
	{
		tag: "DIET · 한약 이야기",
		title: "한방 다이어트, 체질에 따라 어떻게 다를까?",
		body: "환·탕약·디톡스의 선택 기준과 한의사 진료 흐름을 짧게 정리합니다.",
		href: "https://blog.naver.com/bgwon9991",
		cover: "diet" as const,
	},
] as const;

function FallbackBlogCard({
	post,
}: {
	post: (typeof FALLBACK_POSTS)[number];
}) {
	return (
		<Link
			href={post.href}
			target="_blank"
			rel="noopener noreferrer"
			className="group bg-surface border border-border-subtle rounded-2xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all duration-[240ms] ease-[cubic-bezier(0.2,0,0,1)]"
		>
			<BlogCover variant={post.cover} />
			<div className="p-6 lg:p-7">
				<span className="text-[11px] font-eyebrow font-semibold tracking-[0.08em] text-vermilion-600">
					{post.tag}
				</span>
				<h3 className="mt-1.5 mb-2 text-lg font-semibold tracking-[-0.02em] text-ink-primary leading-snug [word-break:keep-all]">
					{post.title}
				</h3>
				<p className="text-[13px] text-ink-muted leading-[1.6] [word-break:keep-all]">
					{post.body}
				</p>
			</div>
		</Link>
	);
}

function BlogCover({ variant }: { variant: "diet" | "insurance" | "custom" }) {
	if (variant === "diet") {
		return (
			<div className="aspect-[16/9] flex items-center justify-center bg-gradient-to-br from-sage-200 to-cream-200">
				<svg
					viewBox="0 0 80 80"
					width="48%"
					height="48%"
					className="text-sage-600"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<path d="M40 64c0-16 8-26 18-32-2 14-8 22-18 32z" />
					<path d="M40 64c0-16-8-26-18-32 2 14 8 22 18 32z" />
					<path d="M40 64v-32" />
					<path d="M30 50c4-2 8-2 10-2M50 50c-4-2-8-2-10-2" />
				</svg>
			</div>
		);
	}

	if (variant === "insurance") {
		return (
			<div className="aspect-[16/9] flex items-center justify-center bg-gradient-to-br from-vermilion-200 to-cream-200">
				<svg
					viewBox="0 0 80 80"
					width="48%"
					height="48%"
					className="text-vermilion-600"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<path
						d="M16 16l40 40M14 18l4-2 2 4-4 2z"
						fill="currentColor"
						fillOpacity="0.15"
					/>
					<circle cx="56" cy="56" r="6" />
					<path
						d="M56 50v-4M56 66v-4M50 56h-4M66 56h-4"
						strokeDasharray="2 2"
					/>
				</svg>
			</div>
		);
	}

	return (
		<div className="aspect-[16/9] flex items-center justify-center bg-gradient-to-br from-brown-200 to-cream-200">
			<svg
				viewBox="0 0 80 80"
				width="48%"
				height="48%"
				className="text-brown-700"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M16 22h22c2 0 4 2 4 4v34" />
				<path d="M64 22H42c-2 0-4 2-4 4v34" />
				<path d="M16 22v36h22" />
				<path d="M64 22v36H42" />
				<path d="M22 30h12M22 36h12M22 42h12" />
				<path d="M48 30h12M48 36h12M48 42h12" />
			</svg>
		</div>
	);
}
