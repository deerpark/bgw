import { Scale } from "lucide-react";

/**
 * 한약 상세 페이지 마지막 풀버전 의무 고지.
 * mockups/product-detail.html "Final disclaimer" — brown-700 다크 배경.
 *
 * 자율심의 4문구를 모두 포함 (체질·진료/임신/접수만/자율심의).
 */
export function FinalDisclaimer() {
	return (
		<section className="bg-brown-700 text-cream-200 px-6 lg:px-12 py-16">
			<div className="mx-auto max-w-[880px]">
				<h2 className="flex items-center gap-2.5 text-cream-50 text-lg font-semibold tracking-[-0.02em] mb-4">
					<Scale className="size-5" aria-hidden="true" />
					의료광고 자율심의 준수 안내
				</h2>
				<div className="text-[13px] leading-[2] text-brown-200 space-y-1 [word-break:keep-all]">
					<p>
						※ 본 한약은 한의사의 진료 후 체질·증상·복약 이력에 따라 개별
						처방되며, 개인에 따라 효과 및 반응은 다를 수 있습니다.
					</p>
					<p>
						※ 임신·수유 중이거나 만성질환이 있는 경우 반드시 사전에
						알려주십시오.
					</p>
					<p>
						※ 본 사이트는 의료법에 따라 비대면 진료{" "}
						<strong className="text-cream-50 font-medium">접수 안내</strong>만
						제공하며, 처방·조제·발송은 한의사의 유선 진료 이후 이루어집니다.
					</p>
					<p>※ 본 페이지는 의료광고 자율심의 기준을 준수하여 작성되었습니다.</p>
				</div>
			</div>
		</section>
	);
}
