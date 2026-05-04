import { LegalPage } from "@/components/sections/legal/LegalPage";
import { clinic } from "@/lib/settings";
import { buildMetadata } from "@/lib/seo";

const EFFECTIVE_AT = "2026년 5월 4일";
const UPDATED_AT = "2026-05-04";

export const metadata = buildMetadata({
	title: "개인정보처리방침",
	description:
		"부개원 한의원 비대면 진료 접수 사이트의 개인정보 수집·이용·보유·제공·파기에 관한 안내입니다. 의료법 진료기록 보존 의무와 개인정보보호법 제30조에 따라 작성되었습니다.",
	path: "/privacy",
	og: {
		category: "법적 고지",
		title: "개인정보처리방침",
		subtitle: "부개원 한의원 — 비대면 진료 접수 사이트",
	},
});

/**
 * 개인정보처리방침 — 개인정보보호법(PIPA) 제30조 의무 항목 + 의료법 진료기록 보존(10년).
 *
 * 운영 변경 시 갱신 항목:
 *   - 5조 처리 위탁: 새 SaaS 추가 시 (예: Sentry, Slack 알림)
 *   - 9조 보호책임자: 담당자 교체 시
 *   - 8조 자동수집장치: PostHog 옵션 변경 시
 */
export default function PrivacyPage() {
	return (
		<LegalPage
			eyebrow="법적 고지"
			title="개인정보처리방침"
			intro={
				<p>
					{clinic.nameKo}(이하 "한의원")은 「개인정보 보호법」 제30조 및
					「의료법」 제22조·제23조를 준수하여, 정보주체의 개인정보를 안전하게
					처리하고 보호하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.
					본 방침은 한의원 공식 웹사이트(이하 "사이트")에서 이루어지는 비대면
					진료 접수 안내 및 관련 부수 활동에 한해 적용됩니다.
				</p>
			}
			effectiveAt={EFFECTIVE_AT}
			updatedAt={UPDATED_AT}
			sections={[
				{
					id: "purpose",
					title: "개인정보의 처리 목적",
					body: (
						<>
							<p>
								한의원은 다음의 목적을 위해 개인정보를 처리하며, 목적 외의
								용도로는 이용하지 않습니다.
							</p>
							<ul className="list-disc pl-5 flex flex-col gap-1.5">
								<li>
									비대면 진료 접수의 본인 확인, 한의사 유선 진료 일정 안내,
									문진 내용 확인
								</li>
								<li>
									유선 진료 결과에 따른 한약 처방·조제·발송 안내, 수령 확인
								</li>
								<li>의료법에 따른 진료기록부의 작성·보존</li>
								<li>
									사이트·전화·카카오톡 채널·네이버 비즈니스 계정 등으로 접수된
									문의 회신
								</li>
								<li>
									의약품·진료 관련 안전 안내(이상반응·복용 주의사항 등)
								</li>
								<li>
									서비스 개선 및 통계 분석(개인 식별이 불가능한 비식별
									통계로만 활용)
								</li>
							</ul>
						</>
					),
				},
				{
					id: "items",
					title: "처리하는 개인정보의 항목",
					body: (
						<>
							<p>
								비대면 진료 접수에 한해 다음 항목을 수집·이용합니다. 자체
								사이트에서 직접 폼을 제출하시거나 외부 채널(네이버폼·카카오톡
								등)을 통해 접수하시는 경우 모두 동일한 범위가 적용됩니다.
							</p>
							<table>
								<thead>
									<tr>
										<th>구분</th>
										<th>항목</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>필수</td>
										<td>
											이름, 휴대전화번호, 생년월일, 성별, 신장·체중, 진료
											희망 한약, 식사·운동 패턴, 다이어트·복용 이력,
											알레르기, 진단 질환, 임신·수유 여부, 통화 가능 시간,
											배송지 정보, 동의 여부
										</td>
									</tr>
									<tr>
										<td>선택</td>
										<td>
											목표 체중, 주요 고민, 배송 요청사항, 마케팅 정보 수신
											동의
										</td>
									</tr>
									<tr>
										<td>자동 수집</td>
										<td>
											접속 IP의 해시값, 사용자 에이전트, 진입 페이지(referrer),
											접속 일시, 쿠키·로컬스토리지 식별값, 디바이스 정보
										</td>
									</tr>
								</tbody>
							</table>
							<p>
								주민등록번호는 수집하지 않습니다. 진료 기록상 만 나이 산정은
								생년월일을 통해 이루어집니다.
							</p>
						</>
					),
				},
				{
					id: "retention",
					title: "처리 및 보유 기간",
					body: (
						<>
							<p>
								한의원은 법령에 따른 보유 기간 또는 정보주체로부터 동의받은
								기간 내에서 개인정보를 처리·보유합니다.
							</p>
							<ul className="list-disc pl-5 flex flex-col gap-1.5">
								<li>
									<strong>진료기록부에 편입된 정보</strong>: 「의료법 시행규칙」
									제15조에 따라 <strong>10년간 보존</strong>한 후 파기
								</li>
								<li>
									<strong>처방전 사본</strong>: 「의료법 시행규칙」 제15조에
									따라 2년간 보존
								</li>
								<li>
									<strong>진료 미진행 접수 정보</strong>(취소·중단된 접수): 접수
									시점부터 <strong>1년</strong> 보유 후 파기
								</li>
								<li>
									<strong>마케팅 정보 수신 동의 정보</strong>: 동의 철회 시
									즉시 파기
								</li>
								<li>
									<strong>웹 자동 수집 정보</strong>(쿠키·접속 로그): 최대 12개월
								</li>
							</ul>
							<p>
								위 보존기간 종료 시 지체 없이 파기하며, 전자적 파일은 복구
								불가능한 방법으로 영구 삭제하고 출력물은 분쇄 또는 소각합니다.
							</p>
						</>
					),
				},
				{
					id: "third-party",
					title: "개인정보의 제3자 제공",
					body: (
						<>
							<p>
								한의원은 정보주체의 동의, 법률의 특별한 규정 등 「개인정보
								보호법」 제17조·제18조에 해당하는 경우에 한해 개인정보를
								제3자에게 제공합니다. 평상시에는 제3자 제공을 하지 않습니다.
							</p>
							<ul className="list-disc pl-5 flex flex-col gap-1.5">
								<li>
									택배 발송이 필요한 경우, <strong>운송업체</strong>에 수령인
									성명·연락처·배송지·요청사항을 제공합니다(목적: 배송, 보유:
									배송 완료 후 6개월).
								</li>
								<li>
									자동차보험 진료의 경우, 환자 동의 하에{" "}
									<strong>보험사 또는 손해사정 기관</strong>에 진료 사실 및
									진료비 청구 자료를 제공합니다(목적: 보험금 청구, 보유: 관련
									법령 준용).
								</li>
								<li>
									법원·수사기관의 적법한 요청이 있는 경우 관련 정보를 제공할
									수 있습니다.
								</li>
							</ul>
						</>
					),
				},
				{
					id: "outsourcing",
					title: "개인정보 처리 위탁",
					body: (
						<>
							<p>
								원활한 사이트 운영과 비대면 진료 접수 처리를 위해 다음과 같이
								업무를 위탁하고 있으며, 위탁 계약 시 개인정보 보호 관련 의무를
								준수하도록 명시하고 있습니다.
							</p>
							<table>
								<thead>
									<tr>
										<th>수탁자</th>
										<th>위탁 업무</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>네이버(주) — 네이버폼·네이버 비즈니스</td>
										<td>비대면 진료 접수 폼 호스팅, 응답 수신</td>
									</tr>
									<tr>
										<td>(주)카카오 — 카카오톡 채널</td>
										<td>1:1 상담 채널 운영</td>
									</tr>
									<tr>
										<td>Vercel Inc. (미국)</td>
										<td>
											웹사이트 호스팅, 트래픽·성능 측정(Vercel Analytics·Speed
											Insights)
										</td>
									</tr>
									<tr>
										<td>Supabase Inc. (싱가포르)</td>
										<td>
											접수 정보 데이터베이스 운영, 인증·접근 통제(서울 리전)
										</td>
									</tr>
									<tr>
										<td>PostHog, Inc. (미국)</td>
										<td>
											사이트 사용성 분석(클릭 이벤트·페이지뷰), 비식별 식별자
											기반 통계
										</td>
									</tr>
									<tr>
										<td>Resend, Inc. (미국)</td>
										<td>운영자 알림 메일 발송</td>
									</tr>
								</tbody>
							</table>
							<p>
								국외 위탁 항목·국가·일시·방법·연락처에 대한 자세한 내용은
								본 방침 9조의 보호책임자에게 요청하시면 안내해 드립니다.
							</p>
						</>
					),
				},
				{
					id: "rights",
					title: "정보주체의 권리·의무 및 행사 방법",
					body: (
						<>
							<p>
								정보주체는 한의원에 대해 언제든지 다음의 권리를 행사할 수
								있습니다.
							</p>
							<ul className="list-disc pl-5 flex flex-col gap-1.5">
								<li>개인정보 열람·정정·삭제·처리정지 요청</li>
								<li>개인정보 처리에 대한 동의 철회</li>
								<li>마케팅 정보 수신 동의 철회</li>
							</ul>
							<p>
								권리 행사는 한의원에 서면, 전화(
								<a href={clinic.phone.tel}>{clinic.phone.display}</a>),
								이메일(<a href={`mailto:${clinic.email}`}>{clinic.email}</a>)을
								통해 하실 수 있으며, 한의원은 지체 없이 조치합니다. 다만
								의료법에 따른 진료기록 보존 의무가 있는 정보는 보존기간이
								만료되기 전까지 삭제할 수 없습니다.
							</p>
							<p>
								정보주체가 만 14세 미만 아동인 경우, 법정대리인이 권리를
								행사할 수 있습니다.
							</p>
						</>
					),
				},
				{
					id: "security",
					title: "개인정보의 안전성 확보 조치",
					body: (
						<>
							<p>
								한의원은 「개인정보 보호법」 제29조 및 시행령에 따라 다음과
								같은 안전성 확보 조치를 취하고 있습니다.
							</p>
							<ul className="list-disc pl-5 flex flex-col gap-1.5">
								<li>
									<strong>관리적 조치</strong>: 개인정보 취급자 최소화 및
									정기 교육
								</li>
								<li>
									<strong>기술적 조치</strong>: 접근 권한 통제(Supabase RLS),
									HTTPS 전송 암호화, 접속 IP 해시 처리, 비밀 키의 환경 변수
									분리
								</li>
								<li>
									<strong>물리적 조치</strong>: 한의원 내부 단말기에 대한
									접근 통제 및 시건
								</li>
							</ul>
						</>
					),
				},
				{
					id: "auto-collection",
					title: "쿠키 등 자동 수집 도구",
					body: (
						<>
							<p>
								한의원은 이용자에게 더 나은 서비스 환경을 제공하기 위해 쿠키 및
								유사 기술을 사용합니다.
							</p>
							<ul className="list-disc pl-5 flex flex-col gap-1.5">
								<li>
									<strong>필수 쿠키</strong>: 사이트 기본 동작과 보안에 필수.
									차단 시 일부 기능이 제한될 수 있습니다.
								</li>
								<li>
									<strong>분석 쿠키 (PostHog · Vercel Analytics · Speed
									Insights)</strong>: 페이지뷰·CTA 클릭·페이지 성능 측정.
									개인을 식별하지 않는 비식별 통계를 위해서만 사용됩니다.
								</li>
							</ul>
							<p>
								이용자는 브라우저 설정의 쿠키 차단/삭제 기능을 통해 쿠키
								저장을 거부할 수 있습니다. PostHog 분석은 향후 쿠키 동의 배너
								도입 시 옵트아웃 옵션이 추가될 예정입니다.
							</p>
						</>
					),
				},
				{
					id: "officer",
					title: "개인정보 보호책임자 및 문의",
					body: (
						<>
							<p>
								한의원은 개인정보의 처리에 관한 업무를 총괄해서 책임지고,
								개인정보 처리와 관련한 정보주체의 불만 처리 및 피해 구제를
								위해 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
							</p>
							<ul className="list-disc pl-5 flex flex-col gap-1.5">
								<li>
									<strong>보호책임자</strong>: {clinic.director.nameKo}{" "}
									{clinic.director.title}
								</li>
								<li>
									<strong>전화</strong>:{" "}
									<a href={clinic.phone.tel}>{clinic.phone.display}</a>
								</li>
								<li>
									<strong>이메일</strong>:{" "}
									<a href={`mailto:${clinic.email}`}>{clinic.email}</a>
								</li>
								<li>
									<strong>주소</strong>: {clinic.address.full}
								</li>
							</ul>
							<p>
								기타 개인정보 침해에 대한 신고·상담이 필요하신 경우 아래 기관에
								문의하실 수 있습니다.
							</p>
							<ul className="list-disc pl-5 flex flex-col gap-1.5">
								<li>개인정보분쟁조정위원회 — 1833-6972 (privacy.go.kr)</li>
								<li>
									개인정보침해신고센터 — 국번 없이 118 (privacy.kisa.or.kr)
								</li>
								<li>대검찰청 사이버수사과 — 국번 없이 1301 (spo.go.kr)</li>
								<li>경찰청 사이버수사국 — 국번 없이 182 (cyberbureau.police.go.kr)</li>
							</ul>
						</>
					),
				},
				{
					id: "changes",
					title: "방침의 변경",
					body: (
						<p>
							본 개인정보처리방침은 {EFFECTIVE_AT}부터 시행됩니다. 법령 또는
							운영 정책의 변경에 따라 내용이 추가·삭제·수정될 수 있으며, 변경
							사항은 시행 7일 전부터 사이트 공지를 통해 안내합니다. 다만
							이용자의 권리에 중대한 변경이 있을 경우 30일 전부터 공지합니다.
						</p>
					),
				},
			]}
		/>
	);
}
