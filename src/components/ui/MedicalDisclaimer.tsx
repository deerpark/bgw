import { cn } from "@/lib/utils";

interface MedicalDisclaimerProps {
	/** 한약 또는 진료과목 이름. 미지정 시 "본 한약"으로 일반화. */
	productName?: string;
	className?: string;
	/** 콤팩트 스타일 — 푸터 위 disclaimer-bar 형태. */
	variant?: "default" | "bar";
}

/**
 * 의무 고지 — 보건의료법·자율심의 가드레일.
 *
 * 모든 한약 상세 페이지(/diet/*, /immune/*) + 진료과목 페이지 + 메인 final CTA
 * 위에 무조건 노출되어야 한다 (CLAUDE.md §7, docs/03-compliance-and-copy.md).
 *
 * @example
 *   <MedicalDisclaimer productName="부개 감비환" />
 *   <MedicalDisclaimer variant="bar" />
 */
export function MedicalDisclaimer({
	productName,
	className,
	variant = "default",
}: MedicalDisclaimerProps) {
	if (variant === "bar") {
		return (
			<aside
				role="note"
				className={cn(
					"px-6 py-2.5 bg-cream-200 text-brown-700 text-xs text-center border-t border-border-subtle",
					className,
				)}
			>
				<span>
					※ 한의사 진료 후 처방되며, 본 사이트는 비대면 진료{" "}
					<strong className="text-brown-900 font-semibold">접수 안내</strong>만
					제공합니다.
				</span>
			</aside>
		);
	}

	const subject = productName ? `본 ${productName}` : "본 한약";

	return (
		<aside
			role="note"
			aria-label="의무 고지"
			className={cn(
				"bg-bg-subtle border-l-[3px] border-vermilion rounded-md",
				"px-6 py-5 text-sm text-ink-secondary leading-loose",
				className,
			)}
		>
			<strong className="text-ink font-medium">
				※ 한의사 진료 후 처방 안내
			</strong>
			<br />
			{subject}은 한의사의 진료 후 체질·증상·복약 이력에 따라 개별 처방되며,
			개인에 따라 효과 및 반응은 다를 수 있습니다.
			<br />
			임신·수유 중이거나 만성 질환이 있는 경우 반드시 사전에 알려주시기
			바랍니다.
			<br />본 페이지는 의료광고 자율심의 기준을 준수하여 작성되었습니다.
		</aside>
	);
}
