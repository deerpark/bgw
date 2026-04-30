import { Scale } from "lucide-react";

/**
 * 의료법 준수 안내 — mockups/telemedicine.html "Legal" 섹션.
 * brown-700 다크 배경. 면허번호·등록번호·자율심의 통과 정보 노출.
 *
 * 면허번호·등록번호·심의번호는 운영자가 추후 채워야 함 — Phase 2 settings 테이블로 이관.
 */
export function LegalSection() {
	return (
		<section className="bg-brown-700 text-cream-200 px-6 lg:px-12 py-16">
			<div className="mx-auto max-w-[880px]">
				<h2 className="flex items-center gap-2.5 text-cream-50 text-lg lg:text-xl font-semibold tracking-[-0.02em] mb-4">
					<Scale className="size-5" aria-hidden="true" />
					의료법 준수 안내
				</h2>
				<p className="text-sm lg:text-[15px] leading-[2] text-brown-200 mb-4 [word-break:keep-all]">
					본 사이트는 의료법에 따라 비대면 진료{" "}
					<strong className="text-cream-50 font-medium">접수 안내</strong>만
					제공하며, 처방·조제·발송은 한의사의 유선 진료 이후 이루어집니다.
					<br />
					한의사 면허번호 ○○○○○ · 의료기관 등록번호 ○○○○○○ · 의료광고 자율심의
					통과(○○○-○○-○○○).
				</p>
				<ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-brown-300 list-none m-0 p-0">
					<li>의료법 제33조의2 (한시적 비대면 진료)</li>
					<li>개인정보보호법 제15조</li>
					<li>의료법 시행규칙 제16조 (진료기록부 보존 10년)</li>
				</ul>
			</div>
		</section>
	);
}
