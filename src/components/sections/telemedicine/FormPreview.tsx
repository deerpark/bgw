import { SectionHead } from "@/components/sections/SectionHead";

const BASIC_FIELDS = [
	{ num: "01", label: "이름", required: true },
	{ num: "02", label: "휴대전화 번호", required: true },
	{ num: "03", label: "나이 / 성별", required: true },
	{ num: "04", label: "키 / 체중", required: false },
	{ num: "05", label: "거주 지역 (시·도)", required: false },
] as const;

const HEALTH_FIELDS = [
	{ num: "06", label: "관심 한약 (체크)", required: true },
	{ num: "07", label: "주요 고민", required: true },
	{ num: "08", label: "복용 중인 약 / 영양제", required: true },
	{ num: "09", label: "알레르기 / 만성질환", required: true },
	{ num: "10", label: "임신·수유 여부 (해당 시)", required: true },
	{ num: "11", label: "개인정보 수집 동의", required: true },
] as const;

interface FieldGroupProps {
	heading: string;
	body: string;
	fields: readonly { num: string; label: string; required: boolean }[];
}

function FieldGroup({ heading, body, fields }: FieldGroupProps) {
	return (
		<div className="bg-surface border border-border-subtle rounded-3xl p-7 lg:p-8">
			<h3 className="text-lg lg:text-xl font-bold tracking-[-0.02em] text-ink-primary mb-2">
				{heading}
			</h3>
			<p className="text-[13px] leading-[1.7] text-ink-secondary mb-5 [word-break:keep-all]">
				{body}
			</p>
			<dl className="flex flex-col gap-2.5">
				{fields.map((f) => (
					<div
						key={f.num}
						className="flex items-center gap-3 px-4 py-3 bg-bg-subtle rounded-lg"
					>
						<dt className="font-mono text-[11px] tracking-[0.04em] text-ink-muted">
							{f.num}
						</dt>
						<dd className="m-0 flex-1 text-sm font-medium text-ink-primary">
							{f.label}
						</dd>
						{f.required ? (
							<span className="text-[10px] tracking-[0.08em] uppercase font-eyebrow font-semibold text-vermilion bg-vermilion-100 px-2 py-0.5 rounded">
								필수
							</span>
						) : (
							<span className="text-[10px] tracking-[0.08em] uppercase font-eyebrow font-semibold text-ink-muted">
								선택
							</span>
						)}
					</div>
				))}
			</dl>
		</div>
	);
}

/**
 * 비대면 진료 안내 페이지의 문진표 미리보기 — mockups/telemedicine.html .form-preview.
 *
 * 11개 필드가 어떤 정보를 받는지 미리 보여주어 사용자 거부감을 낮춤.
 * 실제 제출은 네이버폼에서 처리.
 */
export function FormPreview() {
	return (
		<section className="bg-bg-base px-6 lg:px-12 py-16 lg:py-24">
			<div className="mx-auto max-w-[var(--container-xl)]">
				<SectionHead
					eyebrow="03 · 문진표 미리보기"
					title="접수 시 어떤 정보가 필요한가요?"
					sub="한의사가 안전하고 정확한 처방을 결정하기 위해 다음 정보를 받습니다."
					align="center"
					className="mb-10 lg:mb-12"
				/>
				<div className="grid gap-5 lg:grid-cols-2 max-w-[1080px] mx-auto">
					<FieldGroup
						heading="기본 정보"
						body="의료법에 따라 진료 시작 전 환자 식별을 위한 기본 정보입니다."
						fields={BASIC_FIELDS}
					/>
					<FieldGroup
						heading="건강·진료 정보"
						body="체질·증상·복약 이력이 처방 결정에 직접 영향을 줍니다."
						fields={HEALTH_FIELDS}
					/>
				</div>
			</div>
		</section>
	);
}
