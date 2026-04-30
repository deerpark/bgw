import Link from "next/link";
import { LogoMark } from "@/components/icons/LogoMark";
import { channels, clinic, kakaoChannelUrl } from "@/lib/settings";

/**
 * 공용 푸터 — 4컬럼 grid (desktop) / 단일 컬럼 stack (mobile).
 * mockups/home.html footer-d 참조.
 */
export function Footer() {
	return (
		<footer className="bg-brown-900 text-cream-200">
			<div className="mx-auto max-w-[var(--container-xl)] px-6 lg:px-12 pt-16 lg:pt-20 pb-10">
				<div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-16 pb-10 md:pb-14 border-b border-cream-50/10">
					<div>
						<div className="flex items-center gap-2.5 mb-4 md:mb-5">
							<LogoMark size="sm" className="text-cream-50" />
							<strong className="text-cream-50 text-[15px] tracking-tight">
								{clinic.nameKo}
							</strong>
						</div>
						<p className="text-[13px] leading-[1.85]">
							{clinic.address.full}
							<br />
							{clinic.transit.subway[0].line} {clinic.transit.subway[0].walk}
						</p>
						<p className="text-[13px] leading-[1.85] mt-2">
							대표 <a href={clinic.phone.tel}>{clinic.phone.display}</a>
							{"  ·  "}
							<a href={`mailto:${clinic.email}`}>{clinic.email}</a>
						</p>
						<p className="mt-5 text-[11px] leading-[1.7] text-brown-300">
							※ 본 사이트는 비대면 진료{" "}
							<strong className="text-cream-50 font-medium">접수 안내</strong>만
							제공합니다.
							<br />
							처방·조제·발송은 한의사의 유선 진료 이후 이루어집니다.
						</p>
					</div>

					<div>
						<h4 className="text-[13px] text-cream-50 mb-4 tracking-[0.04em] font-semibold">
							진료
						</h4>
						<ul className="text-[13px] leading-[1.85] space-y-0">
							<li>
								<Link href="/diet">다이어트</Link>
							</li>
							<li>
								<Link href="/immune">면역한약</Link>
							</li>
							<li>
								<Link href="/treatments/insurance">자동차보험</Link>
							</li>
							<li>
								<Link href="/treatments/chuna">추나요법</Link>
							</li>
							<li>
								<Link href="/treatments/rhinitis">비염 / 성장 / 여성</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-[13px] text-cream-50 mb-4 tracking-[0.04em] font-semibold">
							한의원
						</h4>
						<ul className="text-[13px] leading-[1.85] space-y-0">
							<li>
								<Link href="/clinic#about">소개</Link>
							</li>
							<li>
								<Link href="/clinic#director">의료진</Link>
							</li>
							<li>
								<Link href="/clinic#location">오시는길</Link>
							</li>
							<li>
								<Link href="/clinic#hours">진료시간</Link>
							</li>
							<li>
								<Link href="/blog">블로그</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-[13px] text-cream-50 mb-4 tracking-[0.04em] font-semibold">
							외부 채널
						</h4>
						<ul className="text-[13px] leading-[1.85] space-y-0">
							<li>
								<Link
									href={channels.naverPlaceUrl}
									target="_blank"
									rel="noopener"
								>
									네이버 플레이스
								</Link>
							</li>
							<li>
								<Link href={kakaoChannelUrl()} target="_blank" rel="noopener">
									카카오톡 채널
								</Link>
							</li>
							<li>
								<Link
									href={channels.naverBlogUrl}
									target="_blank"
									rel="noopener"
								>
									네이버 블로그
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="flex flex-col md:flex-row md:justify-between gap-3 pt-6 md:pt-8 text-[11px] text-brown-300">
					<span>
						© {new Date().getFullYear()} {clinic.nameEn}. All rights reserved.
					</span>
					<span className="flex flex-wrap gap-4 md:gap-5">
						<Link href="/privacy">개인정보처리방침</Link>
						<Link href="/terms">이용약관</Link>
						<span>의료광고 자율심의 통과</span>
					</span>
				</div>
			</div>
		</footer>
	);
}
