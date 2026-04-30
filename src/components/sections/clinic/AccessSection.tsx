import { ExternalLink } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { SectionHead } from "@/components/sections/SectionHead";
import { channels, clinic } from "@/lib/settings";
import { cn } from "@/lib/utils";

/**
 * 오시는길 — mockups/clinic.html #access.
 *
 * Phase 1엔 4개 info card + 3개 외부 지도 deeplink (네이버/카카오/T맵).
 * 커스텀 SVG 약도(mockups/clinic-map.html)는 Phase 2 이후 별도 구현.
 */

const NAVER_MAP_URL = channels.naverPlaceUrl;
const KAKAO_MAP_URL =
	"https://map.kakao.com/?q=인천%20부평구%20부흥로%20414%20모아빌딩";
const TMAP_URL =
	"https://tmap.life/route?goalname=부개원%20한의원&goalx=126.7351&goaly=37.4929";

interface InfoCard {
	label: string;
	big?: string;
	body: string;
}

const INFO: readonly InfoCard[] = [
	{
		label: "주소",
		big: "부흥로 414, 모아빌딩 401호",
		body: "인천광역시 부평구 부개동\n파리바게뜨 4층 · 부개주공 5·7단지 사이",
	},
	{
		label: "대중교통",
		body: "1호선 부개역 도보 12분 (가장 가까움)\n7호선 굴포천역 도보 14분",
	},
	{
		label: "주차",
		body: "모아빌딩 자체 주차 가능\n부개동 공영주차장 도보 3분",
	},
	{
		label: "전화",
		big: clinic.phone.display,
		body: "업무 시간 외 카카오톡 채널로 문의 부탁드립니다.",
	},
];

export function AccessSection() {
	return (
		<section
			id="access"
			className="bg-surface-alt px-6 lg:px-12 py-16 lg:py-24"
		>
			<SectionHead
				eyebrow="04 · 오시는길"
				title="부개주공 5·7단지 사이, 파리바게뜨 4층"
				sub="1호선 부개역에서 도보 12분, 7호선 굴포천역에서 14분. 부흥로변에 자리합니다."
				align="center"
				className="mb-10 lg:mb-12"
			/>

			<div className="mx-auto max-w-[1080px]">
				{/* Map link buttons (3 channels) */}
				<div className="grid gap-3 sm:grid-cols-3 mb-8">
					<MapButton
						href={NAVER_MAP_URL}
						label="네이버 지도"
						accent="bg-[#03C75A] text-cream-50"
						initial="N"
						external="naver_place"
					/>
					<MapButton
						href={KAKAO_MAP_URL}
						label="카카오 맵"
						accent="bg-[#FEE500] text-[#3C1E1E]"
						initial="K"
						external="kakao_channel"
					/>
					<MapButton
						href={TMAP_URL}
						label="T맵 길찾기"
						accent="bg-[#1F1F1F] text-cream-50"
						initial="T"
					/>
				</div>

				{/* 4 info cards */}
				<dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{INFO.map((info) => (
						<div
							key={info.label}
							className="bg-surface border border-border-subtle rounded-2xl p-6"
						>
							<dt className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] text-ink-muted uppercase mb-2">
								{info.label}
							</dt>
							<dd className="m-0">
								{info.big && (
									<p className="text-lg lg:text-[22px] font-bold tracking-[-0.02em] text-ink-primary leading-[1.4] mb-1">
										{info.big}
									</p>
								)}
								<p className="text-[13px] leading-[1.7] text-ink-secondary whitespace-pre-line [word-break:keep-all]">
									{info.body}
								</p>
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}

interface MapButtonProps {
	href: string;
	label: string;
	accent: string;
	initial: string;
	external?: "naver_place" | "kakao_channel" | "naver_blog";
}

function MapButton({ href, label, accent, initial, external }: MapButtonProps) {
	if (external) {
		return (
			<TrackedLink
				event="external_channel_click"
				eventProps={{ location: "clinic_info_bar", external }}
				href={href}
				target="_blank"
				rel="noopener"
				className="flex items-center gap-3 p-4 bg-surface border border-border-subtle rounded-2xl hover:shadow-md transition-shadow"
			>
				<span
					className={cn(
						"size-10 rounded-xl flex items-center justify-center font-bold text-lg",
						accent,
					)}
					aria-hidden="true"
				>
					{initial}
				</span>
				<span className="flex-1 font-semibold text-ink-primary">{label}</span>
				<ExternalLink className="size-4 text-ink-muted" aria-hidden="true" />
			</TrackedLink>
		);
	}

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener"
			className="flex items-center gap-3 p-4 bg-surface border border-border-subtle rounded-2xl hover:shadow-md transition-shadow"
		>
			<span
				className={cn(
					"size-10 rounded-xl flex items-center justify-center font-bold text-lg",
					accent,
				)}
				aria-hidden="true"
			>
				{initial}
			</span>
			<span className="flex-1 font-semibold text-ink-primary">{label}</span>
			<ExternalLink className="size-4 text-ink-muted" aria-hidden="true" />
		</a>
	);
}
