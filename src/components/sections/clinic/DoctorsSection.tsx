import Image from "next/image";
import { SectionHead } from "@/components/sections/SectionHead";
import { clinicPhoto } from "@/data/clinic-photos";
import { clinic } from "@/lib/settings";

/**
 * /clinic 의료진 섹션 — mockups/clinic.html #doctors.
 *
 * 2 카드:
 *   1. 윤정호 원장 카드 — 실제 사진(진료실 책장 포함) + 인장 + 정보
 *   2. 인증·활동 카드 — brown-900 다크 배경 + 證 뱃지 3개 (학회 정회원)
 */

const PORTRAIT = clinicPhoto("director");

const CERTIFICATES = [
	{ name: "한방비만학회", note: "정회원 · 회원증 인증" },
	{ name: "대한한의학회", note: "정회원 · 학술 활동" },
	{ name: "한방재활의학과학회", note: "자동차보험 진료 협력" },
] as const;

const SCOPE = [
	{ label: "다이어트", value: "부개 감비환 · 감비탕 · 디톡스" },
	{ label: "면역", value: "공진단 · 경옥고 · 녹용보약" },
	{ label: "보험", value: "자동차보험 (실손 협진) · 산재보험" },
	{ label: "기타", value: "추나 · 비염 · 성장 · 여성질환" },
] as const;

export function DoctorsSection() {
	return (
		<section
			id="doctors"
			className="bg-surface-alt px-6 lg:px-12 py-16 lg:py-24"
		>
			<SectionHead
				eyebrow="02 · 의료진"
				title="한의학을 깊이 신뢰하는 한의사들"
				sub="학력·경력은 사실 그대로, 환자분이 가장 중요하게 보시는 면허 정보를 명확히 표기합니다."
				align="center"
				className="mb-10 lg:mb-12"
			/>
			<div className="mx-auto max-w-[1080px] grid gap-6 lg:grid-cols-2">
				{/* Director portrait card */}
				<article className="bg-surface border border-border-subtle rounded-3xl overflow-hidden">
					<figure className="relative aspect-square overflow-hidden bg-brown-950">
						<Image
							src={`/photos/clinic/${PORTRAIT.slug}.webp`}
							alt={`${clinic.director.nameKo} ${clinic.director.title}`}
							fill
							sizes="(max-width: 1024px) 100vw, 540px"
							className="object-cover object-[58%_center]"
						/>
						<div
							className="absolute bottom-4 right-4 bg-vermilion text-cream-50 px-2.5 py-2 rounded font-serif font-bold text-[10px] leading-tight [writing-mode:vertical-rl] shadow-md"
							role="img"
							aria-label="인장: 富梄開印"
						>
							富梄
							<br />
							開印
						</div>
					</figure>
					<div className="p-7 lg:p-8">
						<span className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase text-vermilion">
							대표 원장 · KMD
						</span>
						<h3 className="mt-2 font-display text-2xl lg:text-[28px] font-bold tracking-[-0.03em] text-ink-primary">
							{clinic.director.nameKo}{" "}
							<small className="font-serif text-base font-normal text-brown-500">
								尹正鎬 · YOON Jeong-ho
							</small>
						</h3>
						<p className="mt-2 text-sm text-ink-muted">
							한의사 면허번호 제 {clinic.director.licenseNo}호
						</p>
						<dl className="mt-5 flex flex-col gap-2.5 text-sm">
							<div className="flex gap-3">
								<dt className="font-semibold text-ink-primary min-w-[48px]">
									학력
								</dt>
								<dd className="m-0 text-ink-secondary [word-break:keep-all]">
									경희대학교 한의과대학 졸업
								</dd>
							</div>
							<div className="flex gap-3">
								<dt className="font-semibold text-ink-primary min-w-[48px]">
									학회
								</dt>
								<dd className="m-0 text-ink-secondary [word-break:keep-all]">
									한방비만학회 정회원 / 대한한의학회 정회원
								</dd>
							</div>
							<div className="flex gap-3">
								<dt className="font-semibold text-ink-primary min-w-[48px]">
									경력
								</dt>
								<dd className="m-0 text-ink-secondary [word-break:keep-all]">
									부개동 한의원 진료의 / 자동차보험 협진 한의사
								</dd>
							</div>
							<div className="flex gap-3">
								<dt className="font-semibold text-ink-primary min-w-[48px]">
									분야
								</dt>
								<dd className="m-0 text-ink-secondary [word-break:keep-all]">
									다이어트 · 면역한약 · 자동차보험 · 추나요법 · 통증
								</dd>
							</div>
						</dl>
						<blockquote className="mt-6 pt-5 border-t border-border-subtle font-serif text-[15px] leading-[1.7] text-ink-secondary [word-break:keep-all]">
							“한약은 표준 처방이 아니라, 환자 한 분 한 분의 체질 위에 다시
							짜이는 처방이라 믿습니다. 비대면 진료라도 환자분의 이야기를 충분히
							듣고, 일상에 무리 없이 자리 잡는 한약을 처방해 드리겠습니다.”
						</blockquote>
					</div>
				</article>

				{/* Awards / activities card */}
				<article className="bg-surface border border-border-subtle rounded-3xl overflow-hidden">
					<div className="aspect-square p-9 bg-brown-900 relative overflow-hidden">
						<p className="font-mono text-[11px] tracking-[0.12em] text-brown-300 mb-7">
							CERTIFICATIONS · ACTIVITIES
						</p>
						<h3 className="font-display text-2xl lg:text-[28px] font-bold tracking-[-0.03em] leading-[1.3] text-cream-50 mb-7 [word-break:keep-all]">
							한방의 깊이를
							<br />
							꾸준히 공부합니다
						</h3>
						<ul className="flex flex-col gap-3.5 m-0 p-0 list-none">
							{CERTIFICATES.map((c) => (
								<li key={c.name} className="flex gap-3.5 items-start">
									<span
										className="bg-vermilion text-cream-50 px-2 py-1.5 rounded font-serif font-bold text-[11px] leading-tight [writing-mode:vertical-rl]"
										aria-hidden="true"
									>
										證
									</span>
									<div>
										<p className="m-0 text-sm font-medium text-cream-50">
											{c.name}
										</p>
										<p className="m-0 mt-0.5 text-[11px] text-brown-300">
											{c.note}
										</p>
									</div>
								</li>
							))}
						</ul>
						<div
							aria-hidden="true"
							className="absolute bottom-0 left-0 right-0 h-6 bg-brown-950"
						/>
					</div>
					<div className="p-7 lg:p-8">
						<span className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase text-vermilion">
							진료 영역
						</span>
						<dl className="mt-5 flex flex-col gap-2.5 text-sm">
							{SCOPE.map((s) => (
								<div key={s.label} className="flex gap-3">
									<dt className="font-semibold text-ink-primary min-w-[64px]">
										{s.label}
									</dt>
									<dd className="m-0 text-ink-secondary [word-break:keep-all]">
										{s.value}
									</dd>
								</div>
							))}
						</dl>
					</div>
				</article>
			</div>
		</section>
	);
}
