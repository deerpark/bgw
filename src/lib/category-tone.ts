/**
 * 카테고리(diet/immune)별 시각적 토큰 매핑.
 * product-detail / hub 페이지의 chr 뱃지·번호·visual gradient·border 색을
 * category prop으로 분기할 때 사용한다.
 */

import type { ProductCategory } from "@/data/products";

export interface CategoryTone {
	/** chr 뱃지 배경 (작은 카드용). */
	chrBg: string;
	/** chr 뱃지 텍스트. */
	chrText: string;
	/** 큰 둥근 chr 뱃지 (Hub Hero center accent). */
	hubAccentBg: string;
	/** Hero visual 배경 그라디언트 (ProductHero). */
	heroVisualGradient: string;
	/** KeyPoints / WhenToUse의 큰 serif 숫자 색. */
	numberText: string;
	/** Hub eyebrow 뱃지 배경/텍스트. */
	eyebrowBg: string;
	eyebrowText: string;
	/** RelatedProductCard 좌측 보더. */
	cardLeftBorder: string;
}

export const CATEGORY_TONES: Record<ProductCategory, CategoryTone> = {
	diet: {
		chrBg: "bg-sage-100",
		chrText: "text-sage-600",
		hubAccentBg: "bg-sage-500",
		heroVisualGradient: "from-sage-200 to-cream-200",
		numberText: "text-sage-500",
		eyebrowBg: "bg-sage-100",
		eyebrowText: "text-sage-600",
		cardLeftBorder: "border-l-category-diet",
	},
	immune: {
		chrBg: "bg-vermilion-100",
		chrText: "text-vermilion-700",
		hubAccentBg: "bg-vermilion-500",
		heroVisualGradient: "from-vermilion-200 to-cream-200",
		numberText: "text-vermilion-600",
		eyebrowBg: "bg-vermilion-100",
		eyebrowText: "text-vermilion-700",
		cardLeftBorder: "border-l-category-immune",
	},
};

export function getCategoryTone(category: ProductCategory): CategoryTone {
	return CATEGORY_TONES[category];
}
