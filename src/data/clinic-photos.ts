/**
 * 한의원 내부·원장 사진 메타데이터.
 *
 * 자동 생성 — `scripts/optimize-clinic-photos.mjs` 실행 결과.
 * 직접 수정 금지. 사진을 추가/교체하려면 reference/images/에 원본 두고 스크립트 재실행.
 */

export interface ClinicPhoto {
	slug: string;
	caption: string;
	w: number;
	h: number;
}

export const CLINIC_PHOTOS = [
	{
		"slug": "chuna-bed",
		"caption": "추나 베드",
		"w": 1448,
		"h": 1086
	},
	{
		"slug": "chuna-room",
		"caption": "추나 치료실",
		"w": 1448,
		"h": 1086
	},
	{
		"slug": "consult-1",
		"caption": "진료실",
		"w": 1600,
		"h": 1200
	},
	{
		"slug": "consult-2",
		"caption": "진료실",
		"w": 1600,
		"h": 1200
	},
	{
		"slug": "consult-3",
		"caption": "진료실",
		"w": 1600,
		"h": 1200
	},
	{
		"slug": "director",
		"caption": "윤정호 원장",
		"w": 1448,
		"h": 1086
	},
	{
		"slug": "dispensary-1",
		"caption": "원내 탕전실",
		"w": 1600,
		"h": 1200
	},
	{
		"slug": "dispensary-2",
		"caption": "원내 탕전실",
		"w": 1600,
		"h": 1200
	},
	{
		"slug": "exam-room-1",
		"caption": "진료실",
		"w": 1448,
		"h": 1086
	},
	{
		"slug": "exam-room-2",
		"caption": "진료실",
		"w": 1448,
		"h": 1086
	},
	{
		"slug": "exam-room-3",
		"caption": "진료실",
		"w": 1448,
		"h": 1086
	},
	{
		"slug": "exam-room-4",
		"caption": "진료실",
		"w": 1448,
		"h": 1086
	},
	{
		"slug": "hallway",
		"caption": "복도",
		"w": 1448,
		"h": 1086
	},
	{
		"slug": "interior",
		"caption": "실내 전경",
		"w": 1448,
		"h": 1086
	},
	{
		"slug": "massage-room",
		"caption": "마사지룸",
		"w": 1448,
		"h": 1086
	},
	{
		"slug": "reception-1",
		"caption": "안내데스크",
		"w": 1448,
		"h": 1086
	},
	{
		"slug": "reception-2",
		"caption": "안내데스크",
		"w": 1600,
		"h": 1200
	},
	{
		"slug": "waiting-room",
		"caption": "대기실",
		"w": 1448,
		"h": 1086
	}
] as const satisfies readonly ClinicPhoto[];

export type ClinicPhotoSlug = (typeof CLINIC_PHOTOS)[number]["slug"];

export function clinicPhoto(slug: ClinicPhotoSlug): ClinicPhoto {
	const found = CLINIC_PHOTOS.find((p) => p.slug === slug);
	if (!found) throw new Error(`unknown clinic photo: ${slug}`);
	return found;
}
