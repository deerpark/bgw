import { cn } from "@/lib/utils";

const SIZE_MAP = {
	sm: "w-7 h-7 text-[13px] border",
	md: "w-9 h-9 text-base border-2",
	lg: "w-12 h-12 text-xl border-2",
} as const;

type Size = keyof typeof SIZE_MAP;

interface LogoMarkProps {
	size?: Size;
	className?: string;
	/** 동그라미 안에 들어갈 한자. 기본은 부개원의 "梄". */
	glyph?: string;
}

/**
 * 부개원 한의원 로고 마크 — 한자 "梄"를 원형 보더 안에 배치.
 * 배경 없이 currentColor 보더로 그려져, 부모의 `text-*` 클래스로 색을 지정.
 *
 * @example
 *   <LogoMark className="text-brand" />
 *   <LogoMark size="lg" className="text-cream-50" />
 */
export function LogoMark({
	size = "md",
	className,
	glyph = "梄",
}: LogoMarkProps) {
	return (
		<span
			aria-hidden="true"
			className={cn(
				"inline-flex items-center justify-center rounded-full font-serif font-bold leading-none border-current",
				SIZE_MAP[size],
				className,
			)}
		>
			{glyph}
		</span>
	);
}
