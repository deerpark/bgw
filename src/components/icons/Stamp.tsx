import { cn } from "@/lib/utils";

interface StampProps {
	className?: string;
	/** 인장 한자. 기본 "富梄開印" (부개원 인). */
	text?: string;
	/** "vert"는 세로 라벨, "square"는 정사각 인장. */
	variant?: "vert" | "square";
}

/**
 * 단청 적색 인장(印章) — 한약방 전통 모티프.
 * 상세 페이지 헤더, 원장 메시지 곁들이로 사용.
 *
 * @example
 *   <Stamp text="富梄開印" />
 *   <Stamp variant="square" text="梄" />
 */
export function Stamp({
	className,
	text = "富梄開印",
	variant = "vert",
}: StampProps) {
	if (variant === "square") {
		return (
			<span
				className={cn(
					"inline-grid place-items-center bg-vermilion text-cream-50 rounded-md font-serif font-bold leading-tight text-center w-14 h-14 text-[11px] shadow-md",
					className,
				)}
				role="img"
				aria-label={`인장: ${text}`}
			>
				{text}
			</span>
		);
	}

	// vert: 세로쓰기 인장 라벨.
	// writing-mode: vertical-rl + transform: rotate(180deg) 조합으로
	// 한자가 위→아래로 자연스럽게 읽히도록 처리 (mockups/_base.css .stamp 참조).
	return (
		<span
			className={cn(
				"inline-flex items-center justify-center bg-vermilion text-cream-50 rounded font-serif font-bold text-[11px] leading-[1.05]",
				"px-2 py-1.5 [writing-mode:vertical-rl] [transform:rotate(180deg)]",
				className,
			)}
			role="img"
			aria-label={`인장: ${text}`}
		>
			{text}
		</span>
	);
}
