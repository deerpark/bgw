# CLAUDE.md — 부개원 한의원 웹앱 개발 지침

> 이 문서는 Claude(또는 어떤 AI/사람 협업자)가 본 레포에서 작업할 때 따라야 할 단일 진실(single source of truth)이다.
> 변경 시에는 PR 설명에 변경 의도를 함께 기록한다.

---

## 1. 프로젝트 개요

**프로젝트명**: 부개원 한의원 (Bugaewon Korean Medicine Clinic) 공식 웹앱
**1차 목적**: 다이어트 한약(부개 감비환 / 감비탕 / 디톡스)을 비대면 진료를 통해 안전하게 처방받고 택배로 받을 수 있도록 환자를 외부 접수 채널(네이버폼·카카오톡)로 매끄럽게 연결한다.
**2차 목적**: 면역한약(공진단·경옥고·녹용보약), 자동차보험·추나·비염·성장·여성질환 등 진료과목 안내 및 한의원 브랜딩.
**3차 목적**: 관리자 모드를 통해 접수 현황·콘텐츠·통계까지 한 곳에서 운영한다.

> ⚠️ **법적 경계**: 보건의료법상 홈페이지에서 의약품을 직접 주문/결제/배송 신청 받을 수 없다. 본 사이트는 "비대면 진료 **접수**" 채널만 제공한다. 모든 처방·조제·발송 결정은 의료진의 유선 진료 이후 이루어진다. 이 경계를 흐리는 UI/카피는 절대 만들지 않는다.

---

## 2. 기술 스택 (Locked-in)

| 영역 | 선택 | 이유 |
|---|---|---|
| Framework | **Next.js 15 (App Router) + React 19** | SEO·이미지 최적화·SSR/ISR이 한의원 사이트에 필수 |
| Language | **TypeScript (strict)** | 안전성·DX |
| Styling | **Tailwind CSS v4** + CSS Variables | 토큰 기반, 다크/라이트 분기 용이 |
| Component | **shadcn/ui** (커스텀 테마) | Headless 기반, 우리 디자인 시스템에 맞춰 변형 |
| Icon | **lucide-react** | 일관성, tree-shaking |
| Motion | **motion/react (Framer Motion 12)** | 마이크로 인터랙션 |
| Server State | **TanStack Query v5** | 캐싱·invalidation |
| Client State | **Zustand** | UI/네비/필터 상태만, 가볍게 |
| Form | **React Hook Form + Zod** | 관리자 폼·문진표 fallback |
| Backend | **Supabase** (Postgres / Auth / Storage / Realtime) | 한국 리전·RLS·관리자 빠른 구축 |
| Email | **Resend** | 접수 알림(스태프), 환자 안내 메일 |
| Analytics | **Vercel Analytics** + **PostHog** | 성능 + 유입/이탈 측정 |
| Deploy | **Vercel** | Next 최적, ISR/Edge |
| Package Manager | **pnpm** | 워크스페이스·빠름 |
| Lint/Format | **Biome** (또는 ESLint + Prettier) | 단일 도구 선호 → Biome |
| Test | **Vitest** (단위) + **Playwright** (E2E) | 관리자 플로우는 E2E |
| CI | **GitHub Actions** | 타입체크·린트·E2E |

> **버전 추가 규칙**: 라이브러리를 새로 도입할 땐 PR 설명에 "왜 이게 필요한가, 대체재 검토"를 1줄 이상 적는다.

---

## 3. 디렉토리 구조

```
.
├── app/                        # Next.js App Router
│   ├── (public)/               # 일반 사용자용 라우트 그룹
│   │   ├── layout.tsx          # 공용 헤더/푸터/CTA dock
│   │   ├── page.tsx            # 메인 (다이어트 강조)
│   │   ├── diet/
│   │   │   ├── page.tsx        # 다이어트 한약 허브 (3종 비교)
│   │   │   ├── gambihwan/page.tsx
│   │   │   ├── gambitang/page.tsx
│   │   │   └── detox/page.tsx
│   │   ├── immune/
│   │   │   ├── page.tsx        # 면역한약 허브
│   │   │   ├── gongjindan/page.tsx
│   │   │   ├── gyeongokgo/page.tsx
│   │   │   └── nokyong/page.tsx
│   │   ├── clinic/page.tsx     # 한의원 소개 원페이지(소개·의료진·내부·오시는길·시간)
│   │   ├── treatments/
│   │   │   ├── insurance/page.tsx
│   │   │   ├── chuna/page.tsx
│   │   │   ├── rhinitis/page.tsx
│   │   │   ├── growth/page.tsx
│   │   │   └── womens/page.tsx
│   │   ├── telemedicine/page.tsx  # 비대면 진료 접수 안내
│   │   └── blog/[slug]/page.tsx   # 자체 블로그(선택)
│   ├── (admin)/
│   │   └── admin/
│   │       ├── layout.tsx
│   │       ├── page.tsx                    # 대시보드
│   │       ├── intakes/page.tsx            # 접수 관리
│   │       ├── intakes/[id]/page.tsx
│   │       ├── content/banners/page.tsx
│   │       ├── content/posts/page.tsx
│   │       ├── products/page.tsx
│   │       ├── analytics/page.tsx
│   │       └── settings/page.tsx
│   ├── api/
│   │   ├── webhooks/naver-form/route.ts    # 네이버폼 → Supabase 적재
│   │   ├── webhooks/kakao/route.ts         # (선택) 카톡 채널 자동응답 트리거
│   │   ├── analytics/event/route.ts        # 이벤트 수집 endpoint
│   │   └── og/route.tsx                    # 동적 OG 이미지
│   ├── sitemap.ts
│   ├── robots.ts
│   └── layout.tsx
├── components/
│   ├── ui/                     # shadcn 기반 원자 컴포넌트
│   ├── motion/                 # 재사용 가능한 모션 래퍼
│   ├── sections/               # Hero, ProductCard, ClinicMap 등 페이지 섹션
│   ├── layout/                 # Header, Footer, FloatingCTA, Breadcrumb
│   ├── admin/                  # 관리자 전용 (테이블, 폼, 차트)
│   └── icons/                  # 커스텀 SVG 아이콘
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # 브라우저 클라이언트
│   │   ├── server.ts           # RSC/Route Handler 클라이언트
│   │   ├── admin.ts            # service-role (서버 전용)
│   │   └── types.ts            # `supabase gen types` 결과
│   ├── analytics.ts
│   ├── seo.ts                  # generateMetadata helpers
│   ├── kakao.ts                # 카카오 채널 딥링크
│   ├── naver.ts                # 네이버폼 URL/플레이스 링크
│   └── utils.ts
├── hooks/
├── types/
├── styles/
│   └── globals.css             # Tailwind layer + CSS variables
├── public/
│   ├── brand/                  # 로고, 인장, 마크
│   ├── og/                     # 정적 OG 이미지
│   └── photos/                 # 한의원 내부 사진 (lazy/blur)
├── supabase/
│   ├── migrations/             # SQL 마이그레이션
│   ├── seed.sql
│   └── functions/              # Edge Functions (선택)
├── docs/
│   ├── 01-blueprint.md
│   ├── 02-design-system.md
│   └── 03-compliance.md        # 의료광고/보건의료법 체크리스트
├── tests/
│   ├── e2e/
│   └── unit/
└── CLAUDE.md
```

---

## 4. 코딩 컨벤션

### 4.1 파일/폴더 네이밍
- 컴포넌트 파일: `PascalCase.tsx` (e.g. `HeroDiet.tsx`)
- 훅: `useXxx.ts`
- 유틸: `kebab-case.ts`
- 라우트 폴더: 영어 소문자 (`telemedicine`, `gambihwan`)

### 4.2 컴포넌트 작성 원칙
- **Server Component가 기본**. `"use client"`는 인터랙션이 필요한 leaf 컴포넌트에만.
- props는 **객체 디스트럭처링** + 명시적 타입. `any` 금지.
- 30줄 넘으면 분리를 검토한다.
- 데이터 fetching은 RSC에서 직접, 또는 Server Action. 클라이언트에서 fetch는 인터랙션 결과(검색·필터)에만.
- `forwardRef`는 ref 필요할 때만. shadcn 패턴 준수.

### 4.3 스타일링 규칙
- **CSS 변수 → Tailwind 토큰** 흐름. 하드코딩 색상(`#5b3a23`) 금지, 반드시 `bg-brand-ink` 같이 토큰명을 쓴다.
- `cn()` 유틸로 클래스 결합. 조건부 클래스는 `clsx` 또는 `tailwind-variants`(tv) 사용.
- 반응형은 mobile-first. `sm: md: lg: xl:` 순서를 어기지 않는다.
- 다크모드는 `class="dark"` 토글 기반. 모든 색은 light/dark 양쪽 정의.

### 4.4 모션 규칙
- 모션은 **인지 부하를 낮추는 방향**으로만. 장식적 무한 애니메이션 금지.
- 진입 애니메이션: 60–80ms 지연, 200–320ms duration, `easeOut`.
- 인터랙티브: hover/tap은 `whileHover`, `whileTap` 활용, scale 0.98–1.02 범위.
- `prefers-reduced-motion` respect: `useReducedMotion` 훅으로 감지하여 fallback.

### 4.5 접근성
- 의미 있는 시멘틱 태그(`<nav>`, `<main>`, `<article>`).
- 모든 인터랙티브 요소는 키보드 진입 가능 + visible focus ring.
- 컬러 콘트라스트 WCAG AA 이상. 본문 4.5:1, 큰 글씨 3:1.
- 폼은 `<label>` 연결, 에러는 `aria-describedby`.
- 이미지는 의미 있을 때만 `alt`, 장식 이미지는 `alt=""`.

### 4.6 SEO
- 모든 페이지는 `generateMetadata`로 title/description/openGraph 정의.
- 한의원 정보는 `JSON-LD`(MedicalBusiness, MedicalClinic) 추가.
- `app/sitemap.ts`, `app/robots.ts` 자동 생성.
- 한국어 메인이므로 `lang="ko"`, hreflang은 영어 페이지 추가 시 고려.
- 로컬 SEO를 위해 한의원 주소/전화/영업시간을 footer 및 schema에 명시.

---

## 5. 데이터·Supabase 가이드

### 5.1 환경변수 (필수)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # 서버 전용. 클라이언트 import 금지
NEXT_PUBLIC_SITE_URL=
RESEND_API_KEY=
NAVER_FORM_WEBHOOK_SECRET=
KAKAO_CHANNEL_ID=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

### 5.2 클라이언트 분리
- `lib/supabase/client.ts` — 브라우저(anon)
- `lib/supabase/server.ts` — RSC/Route Handler (cookies 기반)
- `lib/supabase/admin.ts` — service-role, 절대 클라이언트 import 금지. ESLint 규칙으로 막는다.

### 5.3 RLS 정책 원칙
- **기본은 deny**. 모든 테이블에 RLS 활성화.
- `telemedicine_intakes`: 환자가 직접 insert하지 않는다(웹훅이 service-role로 적재). select/update는 `profiles.role = 'admin' or 'staff'` 조건.
- `products`, `banners`, `posts`: select는 public 허용 + `published = true` 조건. mutate는 admin only.
- 정책은 SQL 마이그레이션에 박제하고 손으로 콘솔에서 바꾸지 않는다.

### 5.4 마이그레이션
- `supabase/migrations/YYYYMMDDHHMMSS_description.sql` 형식.
- 절대 과거 마이그레이션을 수정하지 않는다. 새 마이그레이션으로 덮어쓴다.
- `supabase db push` 후 `supabase gen types typescript` 실행하여 `lib/supabase/types.ts` 갱신.

---

## 6. 외부 연동 컨벤션

### 6.1 네이버폼
- 비대면 진료 접수 1차 동선. CTA에서 새 탭으로 열고 `utm_source`, `utm_medium`, `utm_content`(어느 페이지의 어떤 CTA인지)를 붙인다.
- 응답 데이터는 네이버폼 → 운영자 메일 → (선택) 자동 파서 또는 수기 입력으로 Supabase에 적재. 가능하면 네이버 웍스/구글 시트 연동을 통한 webhook fan-out을 1순위로 검토한다.

### 6.2 카카오톡 채널
- 채널 추가 + 1:1 상담 딥링크: `https://pf.kakao.com/_<channel_public_id>/chat`
- 모바일에서는 `kakaoplus://...` 스킴도 시도하고 fallback으로 https.
- 카카오 비즈메시지 발송은 Phase 2(별도 검토).

### 6.3 네이버 플레이스 / 블로그
- 푸터·`<ClinicMap>` 컴포넌트에서 네이버 지도 임베드 + "길찾기" 외부 링크.
- 자체 블로그는 옵션. 우선은 네이버 블로그 글을 카드 형태로 가져와 보여준다(RSS 또는 단순 큐레이션).

### 6.4 분석 이벤트(필수 추적)
- `cta_telemedicine_click` (카테고리·페이지·제품)
- `kakao_chat_open`
- `naver_form_open`
- `phone_call_click` (모바일 `tel:` 클릭)
- `product_detail_view` (slug)

---

## 7. 보건의료법·의료광고 컴플라이언스

> `docs/03-compliance.md`에 체크리스트가 있다. 카피·이미지 추가 전에 반드시 본다.

핵심 원칙:
1. **"처방받기" / "구매" / "장바구니" / "결제"** 같은 직접적 거래 동사 금지. → "비대면 진료 접수", "상담 신청" 사용.
2. 효능 단정 표현 금지(예: "100% 감량 보장"). 가능: "체질에 맞춰 처방되는 한약입니다."
3. **before/after 사진**은 의료광고 심의를 받지 않은 상태로 사용 금지.
4. 모든 한약 페이지 하단에 "한의사의 진료 후 처방되며, 체질·건강상태에 따라 처방이 다를 수 있습니다." 고지.
5. **부작용·주의사항** 섹션을 누락하지 않는다.

---

## 8. 커밋·브랜치·PR

### 8.1 커밋 메시지 (Conventional Commits)
```
feat(diet): 감비환 상세 페이지 hero 구성
fix(admin): 접수 상태 변경 시 토스트 미표시 버그
chore(deps): tailwind v4 업그레이드
docs(blueprint): 면역한약 IA 보강
```

### 8.2 브랜치
- `main`: 항상 배포 가능
- `develop`: 통합 작업 (필요 시)
- `feat/*`, `fix/*`, `chore/*`

### 8.3 PR
- 제목은 커밋 컨벤션 따름
- 설명에 "왜", "무엇이 변경되는가", "스크린샷 또는 영상", "테스트 방법" 4개 섹션
- self-review 체크리스트 통과 후 머지

---

## 9. 작업 시작 시 Claude/AI 행동 규칙

1. 작업 시작 전 `docs/01-blueprint.md`와 본 `CLAUDE.md`를 먼저 읽는다.
2. 새 페이지/섹션을 만들 때, **먼저 기존 컴포넌트를 검색**하여 재사용 가능 여부 확인. 중복 생성 금지.
3. 디자인 토큰(컬러·간격·라운딩·섀도우)은 `docs/02-design-system.md`의 정의만 사용. 새 토큰이 필요하면 디자인 시스템에 먼저 추가한다.
4. 카피를 작성하거나 변경할 때는 **§7 컴플라이언스**를 통과하는지 자체 점검.
5. 데이터 모델에 영향을 주는 변경은 마이그레이션 파일을 같은 PR에 포함.
6. 작업 완료 시 `pnpm typecheck && pnpm lint && pnpm test`가 모두 통과해야 한다.

---

## 10. 사용자 페르소나 (UX 결정의 기준)

**P1 — 30대 직장인 여성, 김다현**
- 다이어트 시도 경험 다수, 한약은 처음.
- 점심시간/퇴근 후 모바일로 정보 탐색.
- 신뢰 가능한 한의사인지, 부작용은 없는지가 핵심 의사결정 요인.
- "방문 없이 받을 수 있다"는 편의성에 매력 느낌.

**P2 — 50대 여성, 갱년기 보약/면역한약 관심, 이순영**
- 데스크톱 + 모바일 혼용. 글씨가 작으면 떠난다.
- 효능 설명보다는 "원장님이 어떤 분인가"가 중요.

**P3 — 한의원 운영자(원장/스태프)**
- 매일 새 접수를 빠르게 확인·전화·상태 업데이트해야 함.
- 한 손에 든 휴대폰으로도 접수 상세를 볼 수 있어야 한다(반응형 admin).

> 모든 디자인 결정은 P1·P2의 의사결정 흐름을 끊지 않는 방향으로 우선순위를 둔다.

---

마지막 업데이트: 2026-04-29
