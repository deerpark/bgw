# 부개원 한의원 (BGW · Bugaewon Korean Medicine Clinic)

부평 부개원 한의원 공식 웹앱 — 다이어트·면역 한약을 위한 비대면 진료 접수 채널 + 한의원 브랜드 사이트.

> **현 단계**: 기획·디자인 (Phase 0). 개발은 클로드 데스크탑에서 시작 예정.

---

## 산출물 색인

### 기획·전략 문서 (`/docs`)

| 문서 | 내용 |
|---|---|
| [`CLAUDE.md`](./CLAUDE.md) | Claude/AI 협업 + 개발 작업 규칙 (스택, 컨벤션, RLS, 컴플라이언스) |
| [`docs/00-prd.md`](./docs/00-prd.md) | 제품 요구사항 정의서 (목표·페르소나·기능·성공 지표) |
| [`docs/01-blueprint.md`](./docs/01-blueprint.md) | IA·사이트맵·시스템 아키텍처·데이터 모델·외부 연동 |
| [`docs/02-design-system.md`](./docs/02-design-system.md) | 디자인 토큰·타이포·컴포넌트·모션 |
| [`docs/03-compliance-and-copy.md`](./docs/03-compliance-and-copy.md) | 보건의료법·자율심의 카피 가이드, 페이지별 카피 템플릿 |
| [`docs/04-information-architecture.md`](./docs/04-information-architecture.md) | 라우팅 매트릭스, 페이지별 CTA·SEO 매핑 |
| [`docs/05-roadmap.md`](./docs/05-roadmap.md) | Phase 1/2/3 개발 로드맵 |

### 디자인 목업 (`/mockups`) — 코드와 1:1 매핑

`mockups/index.html`을 브라우저에서 열면 모든 시안을 둘러볼 수 있어요. 각 페이지는 **데스크톱 1440 + 모바일 390**을 한 캔버스에 병렬 노출합니다.

| 파일 | 내용 |
|---|---|
| [`mockups/index.html`](./mockups/index.html) | 전체 목업 허브 (★ 여기서 시작) |
| [`mockups/_tokens.css`](./mockups/_tokens.css) | 디자인 토큰 CSS Variables — 라이트·다크 분기 |
| [`mockups/_base.css`](./mockups/_base.css) | 베이스 스타일·재사용 atom (button, card, badge…) |
| [`mockups/_assets.css`](./mockups/_assets.css) | 한지·단청 텍스처, 책장(bookshelf), 인장, 사진 placeholder 스타일 |
| [`mockups/foundations.html`](./mockups/foundations.html) | 컬러·타이포·스페이싱·라운딩·섀도우·모션 시각화 |
| [`mockups/components.html`](./mockups/components.html) | 버튼·뱃지·카드·CTA dock·MedicalDisclaimer 레퍼런스 |
| [`mockups/_illustrations.html`](./mockups/_illustrations.html) | 한약재·약탕기·침·약절구·인장 SVG 일러스트 라이브러리 |
| [`mockups/home.html`](./mockups/home.html) | 메인 페이지 (P-01) — 원장 메시지·실제 블로그 글 포함 |
| [`mockups/diet-hub.html`](./mockups/diet-hub.html) | 다이어트 허브 (P-02) — 3종 비교 |
| [`mockups/product-detail.html`](./mockups/product-detail.html) | 제품 상세 (P-03) — 표준 한약 템플릿 |
| [`mockups/telemedicine.html`](./mockups/telemedicine.html) | 비대면 진료 안내 (P-04) — 3채널 분기 |
| [`mockups/clinic.html`](./mockups/clinic.html) | 한의원 소개 (P-05) — 원장 윤정호 + 책장 모티프 |
| [`mockups/intake-form.html`](./mockups/intake-form.html) | **자체 비대면 진료 접수 폼 (P-06)** — 네이버폼 미러링 6단계 |
| [`mockups/clinic-map.html`](./mockups/clinic-map.html) | **커스텀 SVG 약도 (P-08)** — 지하철·고속도로·도보 반경·펄스 핀·N/K/T 길찾기 |
| [`mockups/admin-intakes.html`](./mockups/admin-intakes.html) | **관리자 접수 관리 (A-01)** — 리스트 + 상세 drawer |

### 피그마 파일

[**부개원 한의원 — Design System & Web App**](https://www.figma.com/design/ROeActZdICYgE7Pnjl70HQ) — 디자인 시스템 변수(Color/Spacing/Radius)와 커버·컬러 팔레트가 들어 있습니다. (Starter 플랜 호출 한도로 페이지 시안은 위 HTML 목업으로 대체)

### 기타

| 파일 | 내용 |
|---|---|
| `reference/부개원한의원-로고원본.ai` | 브랜드 로고 원본 |

---

## 기술 스택

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · shadcn/ui · motion · TanStack Query · Zustand · Supabase · Resend · PostHog · Vercel.

> Phase 1 부트스트랩 시점에 Next.js 16이 latest major여서 16으로 잠금 (CLAUDE.md §2 동기화 예정). App Router·RSC 호환은 동일.

자세한 내용은 [`CLAUDE.md` §2](./CLAUDE.md) 참조.

---

## 로컬 개발

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 변수 설정

```bash
cp .env.example .env.local
```

`.env.local`을 열어 실제 값으로 채웁니다. 최소한 다음 변수가 있어야 dev 서버가 정상 동작:

- `NEXT_PUBLIC_SITE_URL` — 로컬에선 `http://localhost:3000`
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase 대시보드 → Project Settings → API
- `SUPABASE_SERVICE_ROLE_KEY` — 같은 페이지의 service_role. **절대 클라이언트에 노출 금지**. 코드에선 [`src/lib/supabase/admin.ts`](./src/lib/supabase/admin.ts)에서만 import, `import "server-only"`로 보호됨.

나머지(Resend / PostHog / 카카오 / 네이버폼 비밀)는 해당 기능 구현 단계에서 채웁니다.

### 3. 개발 서버

```bash
pnpm dev          # http://localhost:3000
pnpm typecheck    # 타입 검사
pnpm check        # Biome lint + format check
pnpm format       # Biome 자동 정리
pnpm build        # 프로덕션 빌드
```

---

## 배포

**프로덕션 URL**: https://bgwon9991.vercel.app · 향후 `bugaewon.kr` 커스텀 도메인 연결 예정.
**리전**: Seoul (icn1) · Supabase Seoul과 같은 리전이어서 latency 최소.

### 첫 배포 (운영자 1회)

```bash
# 1) Vercel CLI 로그인
pnpm dlx vercel login

# 2) 프로젝트 link — 새 프로젝트, 이름은 반드시 "bgwon9991"
#    (vercel.app 서브도메인이 프로젝트 이름에서 결정되기 때문)
pnpm dlx vercel link

# 3) 환경변수 추가 (Production 스코프)
#    .env.local의 NEXT_PUBLIC_SITE_URL 제외 모든 키:
#    NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY /
#    SUPABASE_SERVICE_ROLE_KEY / NEXT_PUBLIC_KAKAO_CHANNEL_ID
pnpm dlx vercel env add NEXT_PUBLIC_SUPABASE_URL production
# … 나머지도 동일하게

# 4) 첫 배포
pnpm dlx vercel --prod
```

이후 `main` 브랜치에 push하면 자동으로 production 배포 (GitHub 연동 시).

### Preview 배포

PR이 열리면 Vercel이 자동으로 preview URL을 생성. `NEXT_PUBLIC_SITE_URL` 미설정 시
[`src/lib/env.ts`](./src/lib/env.ts)가 `VERCEL_URL`로 fallback하여 metadataBase·sitemap·canonical이 올바르게 동작.

---

## 빠른 진입 가이드

### 신규 협업자
1. [`CLAUDE.md`](./CLAUDE.md) 정독
2. [`docs/01-blueprint.md`](./docs/01-blueprint.md)에서 큰 그림 파악
3. 작업 시 [`docs/03-compliance-and-copy.md`](./docs/03-compliance-and-copy.md) 카피 가드레일 준수

### 디자이너
1. [`docs/02-design-system.md`](./docs/02-design-system.md) 토큰 확인
2. 피그마 파일 (링크 추후 추가)
3. 새 컴포넌트는 디자인 시스템 → 마크다운 → 피그마 변수 순으로 갱신

### 운영자
1. [`docs/00-prd.md`](./docs/00-prd.md) §3 페르소나 / §7 DoD 확인
2. 콘텐츠 작성은 [`docs/03-compliance-and-copy.md`](./docs/03-compliance-and-copy.md) §2 페이지별 템플릿 사용

---

## 핵심 결정 사항

- **비대면 진료 접수**는 보건의료법상 결제·구매가 아닌 *접수*로만 운영. 카피·UI는 모두 이 원칙을 따른다.
- 1차 접수 동선은 **네이버폼 문진표** (CTA 우선순위 1) — 운영 폼: "부개 감비환 바로 처방 받기" (`form.naver.com/response/nCxbZSt-zk2g3y8lTAYR1A`)
- 자체 폼(`/intake`)은 6단계 (동의 / 기본 / 다이어트 / 건강 / 배송 / 확인)로 네이버 폼과 동등한 데이터 수집.
- 관리자 모드 4기능: 접수 관리 / 콘텐츠 관리 / 한약·진료과목 편집 / 통계.
- 외부 연동: 네이버폼 webhook, 카카오 채널 딥링크, 네이버 플레이스 임베드, **네이버 블로그 RSS** (`bgwon9991`).
- 대표 원장: **윤정호** 한의사 (한방비만학회·대한한의학회 정회원).

---

## 라이선스 / 저작권

부개원 한의원 © 2026. 코드·콘텐츠 무단 복제·재배포 금지.
