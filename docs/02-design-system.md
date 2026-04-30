# 부개원 한의원 — 디자인 시스템

> 본 문서는 코드(Tailwind CSS Variables)와 피그마(Variables/Styles) 양쪽에서 동일한 토큰명을 사용하는 것을 원칙으로 한다.
> 토큰명은 Tier1(원시: `palette.brown.700`) → Tier2(시멘틱: `color.surface.brand`) → Tier3(컴포넌트: `button.primary.bg`) 구조다.

---

## 1. 브랜드 핵심 가치

| Keyword | Meaning | Visual cue |
|---|---|---|
| **품격(Dignity)** | 한의학의 깊이와 의료진의 권위 | 진한 브라운, 인장 적색 |
| **온기(Warmth)** | 환자와의 정서적 거리 좁히기 | 크림·아이보리 배경, 손글씨 느낌 한글 로고 |
| **명쾌(Clarity)** | 어렵게 느껴지지 않는 정보 전달 | 충분한 여백, 산세리프 본문, 큰 콘트라스트 |
| **민첩(Agility)** | 비대면 접수까지 1탭으로 | 떠 있는 CTA, 짧은 인터랙션 모션 |

---

## 2. 컬러 팔레트

### 2.1 Tier1 — Primitive (원시 색상)

로고에서 추출한 톤을 기반으로 50–950 스케일을 빌드한다.

```css
/* Brown — primary brand (로고 워드마크) */
--brown-50:  #FAF6F1;  /* near cream */
--brown-100: #F1E8DB;
--brown-200: #E2D2BB;
--brown-300: #C9B08C;
--brown-400: #A6855E;
--brown-500: #80633F;
--brown-600: #5F4A2F;
--brown-700: #492E14;  /* logo wordmark base */
--brown-800: #3A2613;
--brown-900: #2A1B0E;
--brown-950: #1A1109;

/* Vermilion — accent (단청 인장 적색) */
--vermilion-50:  #FBF1F1;
--vermilion-100: #F6DEDE;
--vermilion-200: #ECB8B8;
--vermilion-300: #DD8C8E;
--vermilion-400: #CE3D45;  /* logo seal */
--vermilion-500: #B0303A;
--vermilion-600: #8E222C;
--vermilion-700: #6B1A22;
--vermilion-800: #4A1219;
--vermilion-900: #2C0B0F;

/* Cream — surface (한지/크림) */
--cream-50:  #FFFDF9;
--cream-100: #FBF6EC;
--cream-200: #F4ECD9;
--cream-300: #E9DBBE;

/* Sage — supportive (한약재 그린, 다이어트 신선감) */
--sage-50:  #F2F6F2;
--sage-100: #DDE7DD;
--sage-200: #B8CDB8;
--sage-300: #8AAE8C;
--sage-400: #5E8C61;
--sage-500: #466B49;
--sage-600: #344F36;

/* Neutral (warm gray, 따뜻한 회색) */
--neutral-50:  #FAF8F5;
--neutral-100: #F2EEE8;
--neutral-200: #E2DCD2;
--neutral-300: #C7BFB2;
--neutral-400: #9B9182;
--neutral-500: #6E6557;
--neutral-600: #4F483D;
--neutral-700: #3A3530;
--neutral-800: #25221E;
--neutral-900: #14120F;

/* System */
--success-500: #4F8C5E;
--warning-500: #C99632;
--danger-500:  #B0303A;   /* vermilion-500 alias */
--info-500:    #4F6B8C;
```

### 2.2 Tier2 — Semantic (시멘틱)

```css
/* Light theme */
--bg-base:        var(--cream-50);    /* 페이지 바탕 */
--bg-subtle:      var(--cream-100);
--bg-muted:       var(--neutral-100);
--surface:        #FFFFFF;             /* 카드 */
--surface-alt:    var(--cream-100);

--ink-primary:    var(--brown-800);    /* 본문 */
--ink-secondary:  var(--brown-600);
--ink-muted:      var(--neutral-500);
--ink-inverse:    var(--cream-50);

--border-subtle:  var(--neutral-200);
--border-default: var(--neutral-300);
--border-strong:  var(--brown-700);

--brand:          var(--brown-700);    /* primary actions */
--brand-hover:    var(--brown-800);
--brand-pressed:  var(--brown-900);
--brand-soft:     var(--brown-100);

--accent:         var(--vermilion-500);
--accent-hover:   var(--vermilion-600);
--accent-soft:    var(--vermilion-100);

--success:        var(--success-500);
--warning:        var(--warning-500);
--danger:         var(--danger-500);
--info:           var(--info-500);

--focus-ring:     var(--vermilion-400);
```

### 2.3 다크 모드 정책

> **현 시점 결정**: Phase 1에서는 라이트만 출시. 다크는 Phase 2에서 운영자 페이지(관리자)부터 도입.

```css
.dark {
  --bg-base:    var(--neutral-900);
  --bg-subtle:  var(--neutral-800);
  --surface:    #1A1814;
  --ink-primary:var(--cream-100);
  --ink-secondary: var(--neutral-300);
  --brand:      var(--brown-300);
  --brand-soft: rgba(73, 46, 20, 0.16);
  --accent:     var(--vermilion-300);
  --border-default: var(--neutral-700);
}
```

### 2.4 사용 가이드

| 용도 | 토큰 | 비고 |
|---|---|---|
| 본문 텍스트 | `ink-primary` | 4.5:1 이상 |
| 보조 텍스트 | `ink-secondary` | |
| 메타·캡션 | `ink-muted` | 3:1 이상 |
| 페이지 배경 | `bg-base` | |
| 카드 | `surface` | shadow-sm |
| Primary 버튼 | `brand` 위 `cream-50` | hover시 `brand-hover` |
| 액센트(인장 강조) | `accent` | "비대면 진료 접수" 같은 강조 CTA에만 |
| 다이어트 카테고리 | `sage-500` 보조 라인 | |
| 면역한약 카테고리 | `vermilion-500` 보조 라인 | |
| 위험·경고 | `danger` | 의료광고 컴플라이언스 표기에는 `warning` |

> **CRITICAL**: 컴포넌트에 색을 직접 박지 말고 시멘틱 토큰만 쓴다. 카테고리별 보조 컬러는 `data-category="diet|immune"` 속성으로 분기.

---

## 3. 타이포그래피

### 3.1 Font Family

```css
--font-sans: "Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont,
             system-ui, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
--font-display: "IBM Plex Sans KR", "Pretendard", sans-serif;
--font-serif: "Noto Serif KR", "Nanum Myeongjo", serif;
--font-mono: "JetBrains Mono", "D2Coding", monospace;
```

- 본문/UI: **Pretendard Variable** (가독성·다국어·웨이트 자유)
- 디스플레이/Hero: **IBM Plex Sans KR** 또는 본명조 한 줄. 한약 페이지의 한자/한방 무드를 살릴 때 명조 사용 가능
- 한자 표시(부개원, 富梄開印 인장 등)는 명조

### 3.2 Type Scale (1.25 modular scale + clamp)

```css
--text-xs:    0.75rem;   /* 12 */
--text-sm:    0.875rem;  /* 14 */
--text-base:  1rem;      /* 16 */
--text-lg:    1.125rem;  /* 18 */
--text-xl:    1.25rem;   /* 20 */
--text-2xl:   1.5rem;    /* 24 */
--text-3xl:   1.875rem;  /* 30 */
--text-4xl:   2.25rem;   /* 36 */
--text-5xl:   clamp(2.5rem, 4vw + 1rem, 3.5rem);   /* 40–56 hero */
--text-6xl:   clamp(3rem, 5vw + 1.25rem, 4.5rem);  /* display */

/* line-height */
--leading-tight: 1.2;
--leading-snug:  1.35;
--leading-normal:1.55;
--leading-loose: 1.75;

/* letter-spacing */
--tracking-tight: -0.02em;
--tracking-normal: 0;
--tracking-wide:   0.02em;
--tracking-koh1:   -0.04em;  /* 한글 디스플레이용 */
```

### 3.3 시멘틱 텍스트 스타일

| Style | size | weight | leading | tracking | 용도 |
|---|---|---|---|---|---|
| display-1 | 6xl | 800 | tight | koh1 | Hero headline |
| display-2 | 5xl | 700 | tight | koh1 | Sub hero |
| heading-1 | 4xl | 700 | snug | tight | 페이지 H1 |
| heading-2 | 3xl | 700 | snug | tight | 섹션 헤더 |
| heading-3 | 2xl | 600 | snug | normal | 카드 타이틀 |
| heading-4 | xl  | 600 | snug | normal | 소제목 |
| body-lg   | lg  | 400 | loose | normal | 리드 본문 |
| body      | base| 400 | normal | normal | 본문 |
| body-sm   | sm  | 400 | normal | normal | 메타 |
| caption   | xs  | 500 | normal | wide | 라벨/태그 |
| eyebrow   | xs  | 600 | tight | wide(uppercase) | "DIET CARE" 등 카테고리 라벨 |
| quote     | 2xl | 500 | snug | tight (serif) | 인용/철학 문구 |

---

## 4. 스페이싱·레이아웃

### 4.1 Spacing scale (4px base)

```
0  1  2   3   4   5   6   8   10  12  14  16  20  24  32  40  48  64  80  96
0  4  8  12  16  20  24  32  40  48  56  64  80  96  128 160 192 256 320 384
```

> Tailwind 기본 스케일을 그대로 따른다. 디자이너 측에서는 **8/16/24/32/48/64/96/128**을 강한 베이스로 본다.

### 4.2 레이아웃 컨테이너

| 토큰 | 값 |
|---|---|
| `container-sm` | max-width: 640px |
| `container-md` | max-width: 768px |
| `container-lg` | max-width: 1024px |
| `container-xl` | max-width: 1200px |
| `container-2xl` | max-width: 1280px |
| `container-prose` | max-width: 72ch — 상세 본문 |

페이지 padding (gutter):
- mobile: 20px
- tablet: 32px
- desktop: 48px (hero에서는 64px)

### 4.3 Breakpoints

```
sm: 640px   /* small phone landscape, large phone */
md: 768px   /* tablet portrait */
lg: 1024px  /* tablet landscape, small laptop */
xl: 1280px  /* desktop */
2xl: 1536px /* wide desktop */
```

### 4.4 Grid

- 모바일: 4컬럼, gutter 16
- 태블릿: 8컬럼, gutter 24
- 데스크톱: 12컬럼, gutter 32

---

## 5. 라운딩·섀도우·테두리

```css
--radius-xs: 4px;    /* 작은 태그 */
--radius-sm: 8px;    /* input, small button */
--radius-md: 12px;   /* default card */
--radius-lg: 16px;   /* large card */
--radius-xl: 24px;   /* hero panel */
--radius-2xl: 32px;
--radius-full: 9999px;

/* shadow — warm, soft, never harsh */
--shadow-xs: 0 1px 2px rgba(73, 46, 20, 0.06);
--shadow-sm: 0 2px 8px rgba(73, 46, 20, 0.06);
--shadow-md: 0 8px 20px rgba(73, 46, 20, 0.08);
--shadow-lg: 0 16px 40px rgba(73, 46, 20, 0.10);
--shadow-xl: 0 24px 60px rgba(73, 46, 20, 0.14);
--shadow-inner: inset 0 1px 2px rgba(73, 46, 20, 0.08);

--border-width-1: 1px;
--border-width-2: 2px;
```

---

## 6. 모션 토큰

```css
--ease-standard:   cubic-bezier(0.2, 0, 0, 1);
--ease-emphasized: cubic-bezier(0.2, 0, 0, 1.2);
--ease-decelerate: cubic-bezier(0, 0, 0, 1);
--ease-accelerate: cubic-bezier(0.3, 0, 1, 1);

--duration-instant: 80ms;
--duration-fast:    160ms;
--duration-base:    240ms;
--duration-slow:    320ms;
--duration-slower:  480ms;
--duration-pageEnter: 600ms;
```

### 6.1 모션 패턴

| 패턴 | 사용처 | 스펙 |
|---|---|---|
| **Fade-up reveal** | 섹션 진입 | y: 16 → 0, opacity 0 → 1, duration base, ease standard, stagger 60ms |
| **Hover lift** | 카드 호버 | y: -2, shadow md → lg, duration fast |
| **Tap scale** | 버튼 탭 | scale 1 → 0.98 → 1, duration instant |
| **Underline grow** | 텍스트 링크 | width 0 → 100%, ease emphasized |
| **Sticky CTA** | 스크롤시 진입 | y: 64 → 0, fade, duration slow |
| **Number counter** | KPI 카운트업 | 1.5s, easeOut |
| **Page transition** | 라우팅 | 부모 fade(200ms) + child fade-up(stagger) |

### 6.2 prefers-reduced-motion

- 모든 transform/opacity 애니메이션은 `useReducedMotion`으로 감지하여 instant fallback.
- 마케팅 이펙트(parallax, 스크롤 트리거 큰 변화)는 reduce 시 완전 제거.

---

## 7. 컴포넌트 라이브러리 (UI primitives)

> shadcn/ui를 기반으로 우리 토큰으로 재테마. 모든 컴포넌트는 `data-slot`을 통해 변형 가능.

### 7.1 Button

| Variant | 용도 | 스타일 |
|---|---|---|
| `primary` | 가장 강한 행동 | `bg-brand text-cream-50`, hover `brand-hover` |
| `accent` | 비대면 진료 접수 등 핵심 전환 | `bg-accent text-cream-50`, 인장 적색 |
| `secondary` | 보조 행동 | `bg-brand-soft text-brand`, border-default |
| `outline` | 차분한 보조 | `border-brand text-brand bg-transparent` |
| `ghost` | 메뉴/네비 | 배경 없음, hover시 brand-soft |
| `link` | 인라인 링크 | underline-offset-4 |

| Size | height | padding | text |
|---|---|---|---|
| `sm` | 36 | 12 16 | text-sm |
| `md` | 44 | 12 20 | text-base |
| `lg` | 52 | 16 24 | text-lg |
| `xl` | 60 | 20 32 | text-lg, hero CTA |

상태: default / hover / pressed / disabled / loading(spinner inline) / icon-only.

### 7.2 Card

- `surface` 배경, `radius-lg`, `shadow-sm`, `border-subtle` 1px
- Hover시 `shadow-md`, y -2
- Variants: `default`, `outlined`(border만), `feature`(hero용 큰 카드, gradient overlay 가능)

### 7.3 Badge / Tag

- `default`: `neutral-100 / ink-secondary`
- `brand`: `brown-100 / brown-700`
- `accent`: `vermilion-100 / vermilion-600`
- `success` / `warning` / `danger`
- size: sm(20px), md(24px), lg(28px)

### 7.4 Input / Textarea / Select

- height 44, radius-sm, border-default
- focus시 `border-brand` + `ring-2 ring-focus-ring/40`
- 에러: `border-danger`, helper text danger
- label 위에, helper 아래

### 7.5 Navigation

- **Desktop Header**: 고정, 80px, 로고 + 7개 메뉴(다이어트 / 면역한약 / 진료과목▼ / 한의원소개 / 비대면진료 / 블로그 / 오시는길) + 우측 "비대면 진료 접수" CTA
- **Mobile Header**: 64px, 로고 + 햄버거 + 우측 전화 아이콘
- **Mobile Drawer**: full screen, 슬라이드 in
- **Floating CTA Dock (mobile)**: 하단 고정 영역, "카카오톡 상담 / 비대면 진료 접수 / 전화" 3분할

### 7.6 Footer

- 4 column desktop / stacked mobile
- 한의원 정보(주소·전화·시간) / 메뉴 / 외부 채널(네이버 플레이스/블로그/카톡) / 법적 고지

### 7.7 Section primitives

- `Hero`, `FeatureGrid`, `ProductCompare`, `ProcessTimeline`, `FAQ(Accordion)`, `Testimonial`, `ClinicMap`, `DoctorProfile`, `BeforeAfterDisclaimer`, `CTABanner`

### 7.8 Admin primitives

- `DataTable` (TanStack Table 기반)
- `KPI Card`
- `StatusPill` (접수 상태)
- `Drawer` (접수 상세 빠른 보기)
- `RichTextEditor` (TipTap)
- `ImageUploader` (Supabase Storage 연동)

---

## 8. 아이코노그래피

- 1차: `lucide-react` (24px, stroke 1.5)
- 2차: 한방 모티프(약초·인장·약탕기·침)는 커스텀 SVG 4–6종 제작 → `components/icons/`
- stroke만 사용, fill 색은 `currentColor`

---

## 9. 일러스트레이션 / 이미지

- 한의원 내부 사진은 톤 보정(웜톤, 노란빛 약간) 후 사용. 80% saturation, +5 warmth.
- 한약 제품 컷은 흰 배경 + 따뜻한 그림자.
- before/after 사진 사용 금지(컴플라이언스).
- 일러스트가 필요할 때는 라인+크림 톤 스폿 일러스트(직접 제작 또는 외주).

---

## 10. 토큰 매핑 표 (Code ↔ Figma)

> Tailwind, CSS 변수, Figma 변수 모두 동일한 이름을 쓴다. 변환은 `tokens.json` → Style Dictionary로 자동화 권장(Phase 2).

| Figma Variable | CSS variable | Tailwind class 예 |
|---|---|---|
| `color/brand` | `--brand` | `bg-brand` `text-brand` |
| `color/accent` | `--accent` | `bg-accent` |
| `color/ink/primary` | `--ink-primary` | `text-ink` |
| `color/surface` | `--surface` | `bg-surface` |
| `radius/md` | `--radius-md` | `rounded-md` |
| `space/6` | (4*6) 24px | `p-6 m-6` |
| `text/heading-2` | `--text-3xl` | `text-3xl` |
| `shadow/md` | `--shadow-md` | `shadow-md` |

---

## 11. 컴플라이언스가 디자인에 미치는 영향

- 모든 한약 상세 페이지에 의무 고지 영역(`MedicalDisclaimer`)을 디자인 단계부터 컴포넌트로 박는다.
- 결제·구매 동작을 연상시키는 카트·장바구니·금액·할인 UI는 **만들지 않는다**. "상세 견적은 진료 후 안내" 표현 사용.
- "비대면 진료 접수"는 vermilion accent로, "구매"가 아니라 "접수/상담"임을 끊임없이 시각적으로 환기.

---

## 12. 변경 관리

- 토큰 추가/수정 시 본 문서 + `tokens.json` + Figma Variables를 함께 갱신.
- PR에 `[design-system]` 라벨.
- 디자이너·개발자 양측 1인씩 리뷰.

---

마지막 업데이트: 2026-04-29
