import { cn } from "@/lib/utils";

interface SectionHeadProps {
	eyebrow: string;
	title: React.ReactNode;
	sub?: React.ReactNode;
	className?: string;
	align?: "left" | "center";
	/** h-tag level. 페이지 heading 순서에 맞춰 지정. 기본 h2. */
	as?: "h2" | "h3";
}

/**
 * 섹션 헤더 — eyebrow + 제목 + 선택적 부제목.
 * mockups의 .sec__head 패턴을 따른다.
 */
export function SectionHead({
	eyebrow,
	title,
	sub,
	className,
	align = "left",
	as = "h2",
}: SectionHeadProps) {
	const Tag = as;
	return (
		<header
			className={cn(
				"max-w-[720px]",
				align === "center" && "mx-auto text-center",
				className,
			)}
		>
			<span className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] text-brand uppercase">
				{eyebrow}
			</span>
			<Tag className="mt-3 font-display text-3xl lg:text-[40px] font-bold tracking-[-0.03em] leading-[1.2] text-ink-primary [word-break:keep-all]">
				{title}
			</Tag>
			{sub && (
				<p className="mt-3 text-base lg:text-[17px] leading-[1.75] text-ink-secondary [word-break:keep-all]">
					{sub}
				</p>
			)}
		</header>
	);
}
