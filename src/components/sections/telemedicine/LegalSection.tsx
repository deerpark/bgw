import { Scale } from "lucide-react";
import { clinic } from "@/lib/settings";

/**
 * 의료법 준수 안내 — mockups/telemedicine.html "Legal" 섹션.
 * brown-700 다크 배경.
 *
 * 표기 정책(의료법 §17 시행규칙 §15·§16, 의료광고법 §56):
 *   - 한의사 면허번호 — 의무, settings.clinic.director.licenseNo
 *   - 사업자등록번호 — 의무, settings.clinic.business.registrationNo
 *   - 의료광고 자율심의 — 사이트 게시 내용 자체는 일반 정보 제공이며,
 *     특정 광고가 자율심의 대상이 될 경우 별도 심의를 받는다. 따라서
 *     "통과"가 아닌 "기준 준수" 표현 사용 (불확정 거짓 표시 방지).
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
					한의사 면허번호 제 {clinic.director.licenseNo}호 · 사업자등록번호{" "}
					{clinic.business.registrationNo} · 의료광고 자율심의 기준 준수.
				</p>
				<ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-brown-300 list-none m-0 p-0">
					<li>의료법 제33조의2 (한시적 비대면 진료)</li>
					<li>개인정보보호법 제15조</li>
					<li>의료법 시행규칙 제15조 (진료기록부 보존 10년)</li>
				</ul>
			</div>
		</section>
	);
}
