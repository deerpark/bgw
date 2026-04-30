import Link from "next/link";

/**
 * 블로그 티저 — mockups/home.html .blog-grid / .blog-card.
 *
 * Phase 1: 정적 dummy 카드 3장. Phase 2에서 네이버 블로그 RSS(bgwon9991.xml)
 * + 자체 posts 테이블 fetch로 교체.
 *
 * 카피는 docs/03-compliance-and-copy.md §2 가드레일 통과 — "효능 단정" 금지.
 */

const POSTS = [
	{
		tag: "DIET · 한약 이야기",
		title: "맞춤 한약과 기성 한약의 차이, 제대로 알고 선택하세요",
		body: "같은 증상이라도 환자마다 다르게 처방되는 이유. 부개원의 한방 처방 원칙을 정리합니다.",
		href: "/blog/custom-vs-otc",
		cover: "diet" as const,
	},
	{
		tag: "자동차보험 · 통증",
		title: "교통사고 한의원 치료, 언제부터 받아야 할까요?",
		body: "사고 직후 어떻게 한방 치료를 시작해야 하는지, 부개동 한의원의 안내.",
		href: "/blog/insurance-timing",
		cover: "insurance" as const,
	},
	{
		tag: "맞춤 한약",
		title: "부개동 한의원 맞춤한약, 왜 사람마다 다를까?",
		body: "한약은 표준 처방이 아닌, 환자의 체질 위에 다시 짜이는 처방. 그 원리를 풀어드립니다.",
		href: "/blog/personalized",
		cover: "custom" as const,
	},
] as const;

export function BlogTeaser() {
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
					{POSTS.map((post) => (
						<Link
							key={post.href}
							href={post.href}
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
					))}
				</div>
			</div>
		</section>
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
