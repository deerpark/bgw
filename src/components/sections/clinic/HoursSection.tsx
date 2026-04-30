import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * 진료시간 섹션 — mockups/clinic.html #hours.
 *
 * 좌: 안내 카피 + 길찾기 CTA
 * 우: 7행 진료시간 테이블 (월~일·공휴일)
 */

interface ScheduleRow {
	day: string;
	hours: string;
	closed?: boolean;
}

const SCHEDULE: readonly ScheduleRow[] = [
	{ day: "월요일", hours: "09:00 — 20:00" },
	{ day: "화요일", hours: "09:00 — 20:00" },
	{ day: "수요일", hours: "09:00 — 20:00" },
	{ day: "목요일", hours: "09:00 — 20:00" },
	{ day: "금요일", hours: "09:00 — 20:00" },
	{ day: "토요일", hours: "09:00 — 14:00" },
	{ day: "일요일", hours: "휴진", closed: true },
	{ day: "공휴일", hours: "휴진", closed: true },
];

export function HoursSection() {
	return (
		<section id="hours" className="bg-bg-base px-6 lg:px-12 py-16 lg:py-24">
			<div className="mx-auto max-w-[var(--container-xl)] grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
				<div>
					<span className="text-[11px] font-eyebrow font-semibold tracking-[0.12em] uppercase text-vermilion">
						05 · Business Hours
					</span>
					<h2 className="mt-3 font-display text-3xl lg:text-[36px] font-bold tracking-[-0.03em] leading-[1.2] text-ink-primary [word-break:keep-all]">
						진료시간 안내
					</h2>
					<p className="mt-4 text-base leading-[1.85] text-ink-secondary [word-break:keep-all]">
						평일은 저녁 8시까지 운영합니다.
						<br />
						점심시간 13:00–14:00 (토요일은 점심시간 없음)
						<br />
						비대면 진료 접수는 24시간 가능하며, 영업시간 내 ○시간 안에
						한의원에서 연락드립니다.
					</p>
					<Button asChild size="lg" className="mt-6">
						<Link href="#access">길찾기 보기 →</Link>
					</Button>
				</div>
				<div>
					<table className="w-full border-collapse bg-surface border border-border-subtle rounded-2xl overflow-hidden">
						<tbody>
							{SCHEDULE.map((row) => (
								<tr
									key={row.day}
									className="border-b border-border-subtle last:border-b-0"
								>
									<th
										scope="row"
										className="text-left text-sm font-semibold tracking-[-0.01em] text-ink-primary px-5 py-3.5"
									>
										{row.day}
									</th>
									<td
										className={`text-right text-sm px-5 py-3.5 ${
											row.closed
												? "text-ink-muted"
												: "text-ink-secondary font-medium"
										}`}
									>
										{row.hours}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}
