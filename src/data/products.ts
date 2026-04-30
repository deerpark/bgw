/**
 * 한약 라인업 정적 시드 데이터.
 *
 * Phase 1 시드. Phase 2 관리자 도입 시 Supabase `products` 테이블로 이관
 * (docs/01-blueprint.md §4.2 참조).
 *
 * 카피는 docs/03-compliance-and-copy.md §2.2~§2.4 가드레일 통과.
 *  - "효능 단정", "감량 보장", "before/after" 표현 금지
 *  - 처방·복용·기간 단정 금지 → "(진료 후 안내)" 명시
 */

export type DietSlug = "gambihwan" | "gambitang" | "detox";
export type ImmuneSlug = "gongjindan" | "gyeongokgo" | "nokyong";

export interface ProductCompareMeta {
	form: string; // 환제·탕약·고제
	formShort: string; // "환제 한약"
	easeStars: 1 | 2 | 3;
	easeNote: string;
	precisionStars: 1 | 2 | 3;
	precisionNote: string;
	focus: string;
	audience: string;
	duration: string;
	focusCare: string;
}

export interface ProductDetail {
	heroChip: string;
	heroSub: string;
	heroMeta: { label: string; value: string }[];

	keyPoints: { title: string; body: string }[];
	targets: { icon: string; title: string; body: string }[];

	principleHeadline: string;
	principleNote: string;
	principleGroups: {
		name: string;
		body: string;
		tone: "sage" | "brown" | "vermilion";
	}[];

	usage: { icon: string; title: string; body: string }[];

	cautions: string[];

	faq: { q: string; a: string }[];
}

interface ProductBase<S extends string> {
	slug: S;
	nameKo: string;
	nameEn: string;
	nameZh: string;
	/** Hero/카드 곁들이는 한자 한 글자. */
	chr: string;
	/** 카드 한 줄 본질 (lineup·hero 공용). */
	essence: string;
	/** Hero 우측 작은 카드의 짧은 desc. */
	heroDesc: string;
	/** Lineup 카드 핵심 3문장. */
	points: readonly string[];
	href: string;
	compare: ProductCompareMeta;
	/** 상세 페이지 콘텐츠. Phase 1엔 감비환·공진단만 채움. */
	detail?: ProductDetail;
}

export interface DietProduct extends ProductBase<DietSlug> {}
export interface ImmuneProduct extends ProductBase<ImmuneSlug> {}

/** 다이어트·면역 공통 카테고리. 컴포넌트 색상 분기에 사용. */
export type ProductCategory = "diet" | "immune";

// ──────────────────────────────────────────────────────────────
// Diet 한약 3종
// ──────────────────────────────────────────────────────────────

export const DIET_PRODUCTS: readonly DietProduct[] = [
	{
		slug: "gambihwan",
		nameKo: "부개 감비환",
		nameEn: "BUGAE GAMBIHWAN",
		nameZh: "富梄 減肥丸",
		chr: "減",
		essence:
			"휴대가 간편하고 일상 다이어트에 부드럽게 녹아드는 환제 한약입니다.",
		points: [
			"식욕 조절·기초대사 케어 중심",
			"1일 ○회 식전 복용 (정확한 복용법은 진료 후 안내)",
			"외식·야근 잦은 직장인에 권장",
		],
		heroDesc: "휴대 간편한 환제 다이어트 — 직장인·외식 잦은 분께 권장",
		href: "/diet/gambihwan",
		compare: {
			form: "환제 (작은 알약)",
			formShort: "환제 한약",
			easeStars: 3,
			easeNote: "매우 간편 · 휴대 가능",
			precisionStars: 2,
			precisionNote: "표준 베이스에 일부 조정",
			focus: "식욕 조절 · 기초대사",
			audience: "외식·야근 잦은 직장인",
			duration: "1–3개월",
			focusCare: "식욕·기초대사",
		},
		detail: {
			heroChip: "DIET CARE · 환제 한약",
			heroSub:
				"한의사가 환자의 체질·생활습관·복약 이력을 진료하여 처방하는 환약 한약입니다. 환자의 상황에 맞춰 약재 비율이 조정되며, 비대면 진료를 통해 자택에서 받으실 수 있습니다.",
			heroMeta: [
				{ label: "형태", value: "환제 (丸劑)" },
				{ label: "중점 케어", value: "식욕·기초대사" },
				{ label: "권장 기간", value: "1–3개월" },
				{ label: "견적", value: "진료 후 안내" },
			],
			keyPoints: [
				{
					title: "한의사 1:1 처방",
					body: "체질·생활습관·복약 이력을 살핀 뒤 처방됩니다.",
				},
				{
					title: "식욕·대사·배출 통합",
					body: "식욕 조절, 기초대사, 노폐물 배출이 함께 다뤄지도록 설계.",
				},
				{
					title: "휴대 간편한 환제",
					body: "외출·외식이 잦은 직장인에게 부담이 적습니다.",
				},
				{
					title: "비대면으로 자택에서",
					body: "유선 진료 후 자택으로 보냉 포장 발송됩니다.",
				},
				{
					title: "진료 기반 조정",
					body: "처방의 강도와 조성은 진료 시 한의사가 결정합니다.",
				},
			],
			targets: [
				{
					icon: "🍱",
					title: "야근·외식이 잦은 직장인",
					body: "식이 관리가 매번 무너지지만, 무리한 다이어트는 피하고 싶은 분.",
				},
				{
					icon: "🔁",
					title: "꾸준한 한방 케어를 선호",
					body: "짧은 기간 무리한 감량보다, 부담 없는 한약을 일상에 두고 싶은 분.",
				},
				{
					icon: "⏱",
					title: "탕약 챙김이 어려움",
					body: "탕약을 매일 데워 마시기 어려운 환경, 출장·외근이 잦은 분.",
				},
			],
			principleHeadline: "세 가지 약재군이 함께 다뤄지도록 설계",
			principleNote:
				"정확한 약재 비율은 한의사가 진료 시 결정하며, 본 페이지의 설명은 일반적인 안내입니다.",
			principleGroups: [
				{
					name: "식욕 조절군",
					body: "식욕의 기복을 다스리는 약재 군. 한의사가 식습관·스트레스 양상 등을 살핀 뒤 비율을 결정합니다.",
					tone: "sage",
				},
				{
					name: "대사 보조군",
					body: "기초대사와 에너지 흐름을 받쳐주는 약재 군. 체력·기력 상태에 따라 조정.",
					tone: "brown",
				},
				{
					name: "배출 조정군",
					body: "노폐물·부기를 다듬는 약재 군. 변·소변·부기 양상을 살펴 조정합니다.",
					tone: "vermilion",
				},
			],
			usage: [
				{
					icon: "⏰",
					title: "1일 ○회 식전 ○분",
					body: "정확한 복용 횟수와 타이밍은 한의사가 처방 시 안내합니다.",
				},
				{
					icon: "💧",
					title: "충분한 물과 함께",
					body: "물을 충분히 드시고 평소 식습관을 함께 유지해 주세요.",
				},
				{
					icon: "📦",
					title: "서늘하고 건조한 곳",
					body: "직사광선을 피해 보관하시고 어린이 손이 닿지 않는 곳에 두세요.",
				},
			],
			cautions: [
				"임신·수유 중이시거나 임신을 계획 중인 경우 반드시 사전에 알려주세요.",
				"고혈압·당뇨·갑상선 등 만성 질환으로 약을 복용 중인 경우 반드시 알려주세요.",
				"한약 복용 중 알레르기 반응(발진, 호흡 곤란)이 나타나면 즉시 복용을 중단하고 한의원으로 연락주세요.",
				"복용 초기에 변의 양상 변화나 가벼운 소화기 증상이 있을 수 있습니다. 지속될 경우 알려주세요.",
				"다른 한의원·병원에서 처방받은 약과 함께 복용 시 반드시 두 곳 모두에 알려주세요.",
			],
			faq: [
				{
					q: "다른 다이어트 약과 함께 먹어도 되나요?",
					a: "현재 복용 중인 약(처방약·체중 감량제·영양제 포함)이 있다면 진료 시 반드시 알려주세요. 한의사가 상호작용 가능성을 확인한 뒤 처방 가부를 결정합니다.",
				},
				{
					q: "운동을 꼭 같이 해야 하나요?",
					a: "한약은 식욕·대사 흐름을 다스리도록 설계되며, 식습관과 일상 활동을 함께 유지하시면 더 자연스러운 변화를 기대할 수 있습니다. 무리한 운동을 권장하지 않습니다.",
				},
				{
					q: "효과는 언제부터 느낄 수 있나요?",
					a: "개인차가 있어 일률적으로 말씀드리기 어렵습니다. 한의사 처방에 따라 일반적으로 ○주 차부터 변화를 체감하시는 분이 있으나, 체질·생활습관에 따라 다를 수 있습니다.",
				},
				{
					q: "탕약과 비교했을 때 차이는?",
					a: "감비환은 환제(작은 알약) 형태로 휴대·복용이 간편한 반면, 감비탕은 탕약 형태로 약재 비율을 가장 정밀하게 조정 가능합니다. 진료 시 어떤 형태가 적합한지 함께 결정합니다.",
				},
				{
					q: "비용은 얼마인가요?",
					a: "처방의 약재 구성·기간에 따라 달라지므로, 정확한 견적은 진료 시 안내해 드립니다. 무리한 권유 없이 환자의 상황과 예산을 함께 고려해 결정해 드립니다.",
				},
			],
		},
	},
	{
		slug: "gambitang",
		nameKo: "부개 감비탕",
		nameEn: "BUGAE GAMBITANG",
		nameZh: "富梄 減肥湯",
		chr: "湯",
		essence: "체질·증상에 따라 가장 정밀하게 조정 가능한 탕제 한방 다이어트.",
		points: [
			"약재 비율을 한의사가 진료 후 결정",
			"근본 체질 케어 / 호르몬·식욕·대사 동반",
			"꾸준한 복용이 가능한 분께 권장",
		],
		heroDesc: "체질·증상에 맞춘 정밀 처방 탕약 — 근본 케어가 필요한 분께",
		href: "/diet/gambitang",
		compare: {
			form: "탕약 (달인 한약)",
			formShort: "탕약 한약",
			easeStars: 2,
			easeNote: "데워 드시기 권장",
			precisionStars: 3,
			precisionNote: "가장 정밀 (1:1 맞춤)",
			focus: "체질 · 호르몬 · 식욕 · 대사 동반",
			audience: "꾸준한 복용이 가능한 분, 근본 케어 희망",
			duration: "2–6개월 (단계적)",
			focusCare: "체질·호르몬·대사",
		},
	},
	{
		slug: "detox",
		nameKo: "부개 디톡스",
		nameEn: "BUGAE DETOX",
		nameZh: "富梄 淨化",
		chr: "淨",
		essence: "노폐물 배출과 속 비움 케어 — 다이어트의 시작 단계나 회복기에.",
		points: [
			"부기·소화 문제 동반 시",
			"식이 회복기 보조",
			"단기 집중 복용 형태",
		],
		heroDesc: "노폐물 케어 한방 처방 — 다이어트 시작 단계에 권장",
		href: "/diet/detox",
		compare: {
			form: "탕약 / 환제 혼합 처방 가능",
			formShort: "혼합 처방",
			easeStars: 3,
			easeNote: "단기 집중 복용",
			precisionStars: 2,
			precisionNote: "회복기 / 시작기 베이스 조정",
			focus: "노폐물 배출 · 부기 · 소화",
			audience: "다이어트 시작 단계 / 식이 회복기",
			duration: "2–4주 단기",
			focusCare: "노폐물·부기·소화",
		},
	},
];

// ──────────────────────────────────────────────────────────────
// Immune 한약 3종 — 공진단 풀 콘텐츠, 경옥고/녹용 base only
// 카피는 docs/03-compliance-and-copy.md §2.4: "기력 회복", "면역" 표현 OK,
// "감기·바이러스 예방 보장" 같은 단정 금지.
// ──────────────────────────────────────────────────────────────

export const IMMUNE_PRODUCTS: readonly ImmuneProduct[] = [
	{
		slug: "gongjindan",
		nameKo: "공진단",
		nameEn: "GONGJINDAN",
		nameZh: "拱辰丹",
		chr: "拱",
		essence: "전통 처방의 대표격. 기력 회복·집중력·체력이 떨어지는 분께.",
		points: [
			"향(香)·보(補)·자(滋) 세 약재군 통합",
			"꿀로 빚은 환제 — 휴대 간편",
			"체질·기력 상태에 따라 처방 조정",
		],
		heroDesc: "전통 4대 보약의 대표 — 만성 피로·갱년기 분께 권장",
		href: "/immune/gongjindan",
		compare: {
			form: "환제 (꿀로 빚은 알약)",
			formShort: "환제 한약",
			easeStars: 3,
			easeNote: "매우 간편 · 휴대 가능",
			precisionStars: 2,
			precisionNote: "표준 베이스에 일부 조정",
			focus: "기력 회복 · 집중력 · 체력",
			audience: "만성 피로·갱년기 분께",
			duration: "1–3개월",
			focusCare: "기력·집중력·체력",
		},
		detail: {
			heroChip: "IMMUNE CARE · 환제 한약",
			heroSub:
				"한의사가 환자의 체질·기력 상태·복약 이력을 진료하여 처방하는 환약 한약입니다. 환자의 상황에 맞춰 약재 비율이 조정되며, 비대면 진료를 통해 자택에서 받으실 수 있습니다.",
			heroMeta: [
				{ label: "형태", value: "환제 (꿀)" },
				{ label: "중점 케어", value: "기력·집중력" },
				{ label: "권장 기간", value: "1–3개월" },
				{ label: "견적", value: "진료 후 안내" },
			],
			keyPoints: [
				{
					title: "한의사 1:1 처방",
					body: "체질·기력 상태·복약 이력을 살핀 뒤 처방됩니다.",
				},
				{
					title: "전통 4대 약재 기반",
					body: "사향·녹용·산수유·당귀 — 정확한 비율은 진료 후 결정.",
				},
				{
					title: "휴대 간편한 환제",
					body: "외출 시에도 1환씩 복용 가능, 일상 부담이 적습니다.",
				},
				{
					title: "비대면으로 자택에서",
					body: "유선 진료 후 자택으로 보냉 포장 발송됩니다.",
				},
				{
					title: "처방 강도 조정",
					body: "처방의 강도와 조성은 진료 시 한의사가 결정합니다.",
				},
			],
			targets: [
				{
					icon: "🌙",
					title: "만성 피로·집중력 저하",
					body: "야근·공부·육아 병행으로 기력이 떨어지고 집중이 어려운 분.",
				},
				{
					icon: "🌸",
					title: "갱년기 변화",
					body: "호르몬 변화로 체력·기분의 기복이 큰 분께 권장됩니다.",
				},
				{
					icon: "🌱",
					title: "회복기·체력 보강",
					body: "큰 병이나 출산 후, 또는 큰 시험 전후에 체력 보강이 필요한 분.",
				},
			],
			principleHeadline: "전통 4대 약재군이 함께 다뤄지도록 설계",
			principleNote:
				"정확한 약재 비율은 한의사가 진료 시 결정하며, 본 페이지의 설명은 일반적인 안내입니다.",
			principleGroups: [
				{
					name: "향(香) 약재군",
					body: "기(氣)의 흐름을 다스리는 약재 군. 사향이 대표적이며 한의사가 사향의 가용성과 환자 체질을 함께 고려해 결정합니다.",
					tone: "vermilion",
				},
				{
					name: "보(補) 약재군",
					body: "보혈·보기 약재 군. 녹용·당귀 등이 체력·기력의 기반을 받쳐주도록 사용됩니다.",
					tone: "brown",
				},
				{
					name: "자(滋) 약재군",
					body: "자음(滋陰) 약재 군. 산수유 등이 진액·수분 균형을 살피며 가벼운 보강이 필요한 분께 사용됩니다.",
					tone: "sage",
				},
			],
			usage: [
				{
					icon: "⏰",
					title: "1일 ○회 ○○분",
					body: "정확한 복용 횟수와 타이밍은 한의사가 처방 시 안내합니다.",
				},
				{
					icon: "💧",
					title: "따뜻한 물과 함께",
					body: "충분한 수분을 섭취하시고, 차가운 음료는 피해 주세요.",
				},
				{
					icon: "📦",
					title: "서늘하고 건조한 곳",
					body: "직사광선을 피해 보관하시고 어린이 손이 닿지 않는 곳에 두세요.",
				},
			],
			cautions: [
				"임신·수유 중이시거나 임신을 계획 중인 경우 반드시 사전에 알려주세요.",
				"고혈압·당뇨·갑상선 등 만성 질환으로 약을 복용 중인 경우 반드시 알려주세요.",
				"한약 복용 중 알레르기 반응(발진, 호흡 곤란)이 나타나면 즉시 복용을 중단하고 한의원으로 연락주세요.",
				"복용 초기에 가벼운 소화기 증상이 있을 수 있습니다. 지속될 경우 알려주세요.",
				"다른 한의원·병원에서 처방받은 약과 함께 복용 시 반드시 두 곳 모두에 알려주세요.",
			],
			faq: [
				{
					q: "공진단은 어떤 분께 적합한가요?",
					a: "만성 피로·집중력 저하·갱년기·회복기 등 기력 보강이 필요한 분께 일반적으로 권장됩니다. 다만 적합 여부는 한의사가 체질·기력·복약 이력을 살핀 뒤 결정하며, 모든 분께 일률적으로 권장되지는 않습니다.",
				},
				{
					q: "효과는 언제부터 느낄 수 있나요?",
					a: "개인차가 있어 일률적으로 말씀드리기 어렵습니다. 한의사 처방에 따라 일반적으로 ○주 차부터 변화를 체감하시는 분이 있으나, 체질·생활 환경에 따라 다를 수 있습니다.",
				},
				{
					q: "다른 보약과 비교했을 때 차이는?",
					a: "공진단은 향(香)·보(補)·자(滋) 4대 약재군이 통합된 환제로, 휴대·복용이 간편한 것이 특징입니다. 경옥고(고제), 녹용보약(탕약/혼합)과는 형태·중점이 다르며 진료 시 어떤 처방이 적합한지 함께 결정합니다.",
				},
				{
					q: "운전이나 기계 작업 중 복용해도 되나요?",
					a: "공진단은 졸음을 유발하는 성분이 일반적으로 없으나, 개인차가 있을 수 있습니다. 처음 복용 시에는 가벼운 활동 중 복용해 보시고, 이상 반응이 있으면 알려주세요.",
				},
				{
					q: "비용은 얼마인가요?",
					a: "한약은 처방의 약재 구성·기간에 따라 비용이 달라지며, 사향 등의 약재 가용성도 영향을 줍니다. 정확한 견적은 진료 시 안내해 드립니다.",
				},
			],
		},
	},
	{
		slug: "gyeongokgo",
		nameKo: "경옥고",
		nameEn: "GYEONGOKGO",
		nameZh: "瓊玉膏",
		chr: "瓊",
		essence: "호흡·기관지가 약하거나 마른 체형으로 잔병이 잦으신 분께.",
		points: [
			"인삼·생지황·복령·꿀 — 진하게 졸인 고제(膏劑)",
			"진액 보충·호흡기 케어 중심",
			"마른 체형·잔기침·잦은 감기에 권장",
		],
		heroDesc: "고제(膏劑) 한약 — 호흡·진액 보강",
		href: "/immune/gyeongokgo",
		compare: {
			form: "고(膏) — 진하게 졸인 한약",
			formShort: "고제 한약",
			easeStars: 2,
			easeNote: "수저로 떠 드시기",
			precisionStars: 3,
			precisionNote: "체질·증상별 정밀 조정",
			focus: "호흡 · 기관지 · 진액",
			audience: "마른 체형 / 호흡기 약함 / 잔병 잦은 분",
			duration: "2–4개월",
			focusCare: "호흡·기관지·진액",
		},
	},
	{
		slug: "nokyong",
		nameKo: "녹용보약",
		nameEn: "NOKYONG BOYAK",
		nameZh: "鹿茸補藥",
		chr: "鹿",
		essence: "성장기·갱년기·산후 회복 시기에 체력을 보강하는 처방.",
		points: [
			"녹용 중심 보혈·보기 처방",
			"체력·면역·회복 케어",
			"성장기·갱년기·산후 회복기에 권장",
		],
		heroDesc: "녹용 중심 보약 — 성장·갱년기·산후 회복",
		href: "/immune/nokyong",
		compare: {
			form: "탕약 또는 환제 혼합",
			formShort: "보약 한약",
			easeStars: 2,
			easeNote: "탕약은 데워, 환제는 휴대 가능",
			precisionStars: 3,
			precisionNote: "체질·시기별 정밀 조정",
			focus: "체력 · 면역 · 회복",
			audience: "성장기·갱년기·산후 회복기",
			duration: "2–6개월 (단계적)",
			focusCare: "체력·회복·성장",
		},
	},
];

// ──────────────────────────────────────────────────────────────
// Lookup helpers
// ──────────────────────────────────────────────────────────────

export function getDietProduct(slug: DietSlug): DietProduct {
	const product = DIET_PRODUCTS.find((p) => p.slug === slug);
	if (!product) throw new Error(`Unknown diet product slug: ${slug}`);
	return product;
}

export function getOtherDietProducts(slug: DietSlug): DietProduct[] {
	return DIET_PRODUCTS.filter((p) => p.slug !== slug);
}

export function getImmuneProduct(slug: ImmuneSlug): ImmuneProduct {
	const product = IMMUNE_PRODUCTS.find((p) => p.slug === slug);
	if (!product) throw new Error(`Unknown immune product slug: ${slug}`);
	return product;
}

export function getOtherImmuneProducts(slug: ImmuneSlug): ImmuneProduct[] {
	return IMMUNE_PRODUCTS.filter((p) => p.slug !== slug);
}
