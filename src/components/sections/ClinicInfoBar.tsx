import { TrackedLink } from "@/components/analytics/TrackedLink";
import { channels, clinic, kakaoChannelUrl } from "@/lib/settings";

/**
 * 한의원 정보 4-col 카드 — mockups/home.html .clinic-bar.
 * brown-700 배경 · radius-3xl · 위치 / 진료시간 / 대표번호 / 외부 채널.
 *
 * 데스크톱: grid-cols-[1.2fr_1fr_1fr_1fr]
 * 모바일: 단일 컬럼 stack
 *
 * 컬럼 라벨은 `<dt>`로 의미화 (heading 사용 시 페이지 heading 순서 어긋남).
 * 섹션 이름은 sr-only h2로 스크린리더에 노출.
 */
export function ClinicInfoBar() {
	return (
		<section
			aria-labelledby="clinic-info-heading"
			className="bg-surface-alt px-6 lg:px-12 py-16 lg:py-24"
		>
			<h2 id="clinic-info-heading" className="sr-only">
				한의원 정보
			</h2>
			<div className="mx-auto max-w-[var(--container-xl)]">
				<dl className="grid gap-8 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-8 px-7 py-8 lg:px-9 lg:py-9 bg-brown-700 text-cream-100 rounded-3xl m-0">
					<div>
						<dt className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] text-brown-300 uppercase mb-1.5">
							위치
						</dt>
						<dd className="m-0">
							<p className="text-[22px] font-bold tracking-[-0.02em] text-cream-50 leading-[1.7]">
								{clinic.address.short}
							</p>
							<p className="text-[13px] text-brown-200 leading-[1.7] mt-1">
								{clinic.address.landmark} · {clinic.transit.subway[0].line}{" "}
								{clinic.transit.subway[0].walk}
							</p>
						</dd>
					</div>

					<div>
						<dt className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] text-brown-300 uppercase mb-1.5">
							진료시간
						</dt>
						<dd className="m-0">
							<p className="text-[15px] text-cream-50 leading-[1.7]">
								평일 {clinic.hours.weekday}
								<br />
								토요일 {clinic.hours.saturday}
								<br />
								<span className="text-brown-300">
									일·공휴일 {clinic.hours.sunday} · 점심 {clinic.hours.lunch}
								</span>
							</p>
						</dd>
					</div>

					<div>
						<dt className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] text-brown-300 uppercase mb-1.5">
							대표번호
						</dt>
						<dd className="m-0">
							<p className="text-[22px] font-bold tracking-[-0.02em] leading-[1.7]">
								<TrackedLink
									event="phone_call_click"
									eventProps={{ location: "clinic_info_bar" }}
									href={clinic.phone.tel}
									className="text-cream-50 hover:text-cream-100 transition-colors"
								>
									{clinic.phone.display}
								</TrackedLink>
							</p>
							<p className="text-[13px] text-brown-200 leading-[1.7] mt-1">
								자동차보험 진료 가능
							</p>
						</dd>
					</div>

					<div>
						<dt className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] text-brown-300 uppercase mb-1.5">
							외부 채널
						</dt>
						<dd className="m-0">
							<ul className="text-[15px] text-cream-50 leading-[1.7] space-y-0">
								<li>
									<TrackedLink
										event="external_channel_click"
										eventProps={{
											location: "clinic_info_bar",
											external: "naver_place",
										}}
										href={channels.naverPlaceUrl}
										target="_blank"
										rel="noopener"
										className="hover:underline underline-offset-2"
									>
										네이버 플레이스
									</TrackedLink>
								</li>
								<li>
									<TrackedLink
										event="external_channel_click"
										eventProps={{
											location: "clinic_info_bar",
											external: "kakao_channel",
										}}
										href={kakaoChannelUrl()}
										target="_blank"
										rel="noopener"
										className="hover:underline underline-offset-2"
									>
										카카오톡 채널
									</TrackedLink>
								</li>
								<li>
									<TrackedLink
										event="external_channel_click"
										eventProps={{
											location: "clinic_info_bar",
											external: "naver_blog",
										}}
										href={channels.naverBlogUrl}
										target="_blank"
										rel="noopener"
										className="hover:underline underline-offset-2"
									>
										네이버 블로그
									</TrackedLink>
								</li>
							</ul>
						</dd>
					</div>
				</dl>
			</div>
		</section>
	);
}
