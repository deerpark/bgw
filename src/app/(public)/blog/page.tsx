import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { SectionHead } from "@/components/sections/SectionHead";
import { Button } from "@/components/ui/button";
import { type NaverBlogPost, getNaverBlogPosts } from "@/lib/naver-blog";
import { buildMetadata } from "@/lib/seo";
import { channels } from "@/lib/settings";

export const metadata = buildMetadata({
	title: "블로그 — 부개원 한의원",
	description:
		"부개원 한의원 공식 블로그. 통증·교통사고·맞춤한약 등 한의사가 직접 정리하는 글을 모아 보세요. 단정형 효능 보장보다 원리·주의사항 중심.",
	path: "/blog",
	og: {
		category: "블로그",
		title: "부개원 노트",
		subtitle: "한의사가 정리하는 통증·교통사고·맞춤한약 이야기",
	},
});

/**
 * 블로그 인덱스 (P-08).
 *
 * 운영 블로그 [blog.naver.com/bgwon9991](https://blog.naver.com/bgwon9991)의
 * RSS 상위 10개 글을 카드로 노출. 각 카드 클릭은 외부 네이버 블로그 글로 이동.
 *
 * Phase 2 자체 블로그 도입 시 자체 posts 테이블과 합치는 방식 검토.
 *
 * RSS fetch 실패(네트워크/서버 장애) 폴백 — 메시지 + 외부 블로그 링크 노출.
 *
 * 캐싱: lib/naver-blog.ts의 fetch가 ISR 30분 revalidate.
 */
export default async function BlogIndexPage() {
	const posts = await getNaverBlogPosts(10);

	return (
		<>
			{/* Hero */}
			<section className="relative px-6 lg:px-12 pt-20 lg:pt-24 pb-12 lg:pb-16 bg-gradient-to-b from-cream-50 to-cream-100">
				<div className="mx-auto max-w-[880px] text-center">
					<span className="inline-block px-3.5 py-1.5 rounded-full text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase mb-5 bg-cream-200 text-brown-700">
						BUGAEWON NOTES · 부개원 노트
					</span>
					<h1 className="font-display font-bold tracking-[-0.04em] leading-[1.15] text-ink-primary text-[32px] sm:text-[40px] lg:text-[48px] [word-break:keep-all]">
						통증·교통사고·맞춤한약,
						<br />
						한의사가 정리하는 글.
					</h1>
					<p className="mt-4 lg:mt-5 text-base lg:text-[17px] leading-[1.75] text-ink-secondary max-w-[640px] mx-auto [word-break:keep-all]">
						단정형 효능 보장보다는 원리·주의사항·일상 가이드 중심으로 정리합니다.
						{" "}
						<TrackedLink
							event="external_channel_click"
							eventProps={{ location: "hero", external: "naver_blog" }}
							href={channels.naverBlogUrl}
							target="_blank"
							rel="noopener"
							className="text-brand font-medium underline underline-offset-2"
						>
							네이버 블로그에서 전체 보기
						</TrackedLink>
					</p>
				</div>
			</section>

			{/* 글 그리드 */}
			<section className="bg-bg-base px-6 lg:px-12 py-12 lg:py-16">
				<div className="mx-auto max-w-[var(--container-xl)]">
					<SectionHead
						eyebrow={`최근 ${posts.length || 0}개`}
						title="최신 글"
						align="center"
						className="mb-10 lg:mb-12"
					/>

					{posts.length > 0 ? (
						<ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto m-0 p-0 list-none">
							{posts.map((post) => (
								<li key={post.link}>
									<BlogPostCard post={post} />
								</li>
							))}
						</ul>
					) : (
						<EmptyState />
					)}

					{/* "전체 보기" 외부 링크 — 글 있을 때만 */}
					{posts.length > 0 && (
						<div className="mt-12 lg:mt-16 text-center">
							<Button
								asChild
								size="lg"
								variant="outline"
								className="border-1.5 border-brand text-brand hover:bg-brand-soft hover:text-brand h-12 px-6 text-base"
							>
								<TrackedLink
									event="external_channel_click"
									eventProps={{
										location: "final_cta",
										external: "naver_blog",
									}}
									href={channels.naverBlogUrl}
									target="_blank"
									rel="noopener"
								>
									네이버 블로그에서 전체 글 보기
									<ArrowUpRight className="ml-1.5 size-4" aria-hidden="true" />
								</TrackedLink>
							</Button>
						</div>
					)}
				</div>
			</section>
		</>
	);
}

function BlogPostCard({ post }: { post: NaverBlogPost }) {
	return (
		<Link
			href={post.link}
			target="_blank"
			rel="noopener noreferrer"
			className="group block h-full bg-surface border border-border-subtle rounded-2xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all duration-[240ms] ease-[cubic-bezier(0.2,0,0,1)]"
		>
			{post.cover ? (
				<div className="aspect-[16/9] bg-cream-100 overflow-hidden">
					{/* biome-ignore lint/performance/noImgElement: 네이버 핫링크 정책 — referrerPolicy="no-referrer"로 우회 */}
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
				<div
					className="aspect-[16/9] bg-gradient-to-br from-brown-200 to-cream-200 flex items-center justify-center"
					aria-hidden="true"
				>
					<span className="font-serif font-bold text-2xl text-brown-700">
						BUGAEWON
					</span>
				</div>
			)}
			<div className="p-6 lg:p-7">
				<div className="flex items-center justify-between gap-2 mb-2">
					<span className="text-[11px] font-eyebrow font-semibold tracking-[0.08em] text-vermilion-600">
						{post.category || "부개원 노트"}
					</span>
					{post.pubDateLabel && (
						<span className="text-[11px] font-mono text-ink-muted">
							{post.pubDateLabel}
						</span>
					)}
				</div>
				<h3 className="text-base lg:text-lg font-semibold tracking-[-0.02em] text-ink-primary leading-snug [word-break:keep-all] line-clamp-2 mb-2">
					{post.title}
				</h3>
				<p className="text-[13px] text-ink-muted leading-[1.6] [word-break:keep-all] line-clamp-2 mb-4">
					{post.excerpt}
				</p>
				<span className="inline-flex items-center gap-1 text-[12px] font-medium text-brand">
					네이버 블로그에서 보기
					<ExternalLink className="size-3" aria-hidden="true" />
				</span>
			</div>
		</Link>
	);
}

function EmptyState() {
	return (
		<div className="mx-auto max-w-md text-center py-12">
			<p className="text-base text-ink-secondary leading-[1.7] [word-break:keep-all] mb-5">
				지금 글을 가져올 수 없습니다. 네이버 블로그에서 직접 확인해 주세요.
			</p>
			<Button
				asChild
				size="lg"
				variant="outline"
				className="border-1.5 border-brand text-brand hover:bg-brand-soft hover:text-brand h-12 px-6 text-base"
			>
				<TrackedLink
					event="external_channel_click"
					eventProps={{ location: "hero", external: "naver_blog" }}
					href={channels.naverBlogUrl}
					target="_blank"
					rel="noopener"
				>
					네이버 블로그에서 전체 글 보기
					<ArrowUpRight className="ml-1.5 size-4" aria-hidden="true" />
				</TrackedLink>
			</Button>
		</div>
	);
}
