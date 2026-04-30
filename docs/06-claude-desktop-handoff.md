# 클로드 데스크탑 핸드오프 프롬프트

> 이 문서는 Cowork 세션에서 만든 기획·디자인 산출물을 클로드 데스크탑(Claude Code) 개발 세션으로 넘기기 위한 **단일 킥오프 프롬프트**다. 아래 코드 블록을 그대로 첫 메시지로 붙여넣으면 된다.

---

## 사용법

1. 클로드 데스크탑을 연다
2. 프로젝트 폴더 `/Users/gsr/Dev/deerpark/bgw`를 워크스페이스로 연다
3. 아래 프롬프트를 첫 메시지로 붙여넣는다
4. 그 다음 메시지부터는 자연스럽게 작업 지시 (예: "Week 3 다이어트 허브 만들어줘")

---

## 킥오프 프롬프트 (그대로 붙여넣기)

```
부개원 한의원 (Bugaewon Korean Medicine Clinic) 공식 웹앱 프로젝트야.
Phase 0(기획·디자인) 산출물이 모두 이 레포에 있어. 너는 지금부터
Phase 1 Week 2 — 프로젝트 부트스트랩 + 디자인 시스템 통합 + 공통 레이아웃
+ 메인 페이지 Hero — 부터 시작하면 돼.

## 1. 컨텍스트 로드 (반드시 이 순서로 정독)

1. CLAUDE.md  ← 작업 규칙·스택·컨벤션·컴플라이언스 가드레일 (★ 절대 원칙)
2. docs/00-prd.md  ← 비즈니스 목표·페르소나·P0/P1/P2 기능
3. docs/01-blueprint.md  ← IA·라우팅·DB 스키마·외부 연동·아키텍처
4. docs/02-design-system.md  ← 토큰·타이포·컴포넌트·모션 명세
5. docs/03-compliance-and-copy.md  ← 보건의료법·자율심의 카피 가드레일 (★ 카피 작성 전 반드시)
6. docs/04-information-architecture.md  ← 페이지별 SEO·CTA 매핑
7. docs/05-roadmap.md  ← Phase 1/2/3 마일스톤·Definition of Done
8. README.md  ← 산출물 색인

디자인 레퍼런스 (브라우저로 열어볼 것):
- mockups/index.html  ← 모든 시안 허브
- mockups/foundations.html  ← 컬러·타이포·스페이싱·모션 토큰 시각화
- mockups/components.html  ← 버튼·카드·뱃지·CTA Dock·MedicalDisclaimer
- mockups/_illustrations.html  ← 한약재·약탕기·침 등 12종 SVG + 패턴
- mockups/home.html  ← 메인 (P-01) — 데스크톱 1440 + 모바일 390
- mockups/diet-hub.html  ← 다이어트 허브 (P-02)
- mockups/product-detail.html  ← 한약 상세 표준 템플릿 (P-03) — 6개 한약 페이지가 이 구조 따름
- mockups/telemedicine.html  ← 비대면 진료 안내 (P-04)
- mockups/clinic.html  ← 한의원 소개 원페이지 (P-05) — 윤정호 원장 + 책장 모티프
- mockups/intake-form.html  ← 자체 비대면 진료 접수 폼 (P-06)
- mockups/clinic-map.html  ← 커스텀 SVG 약도 (P-08) — 펄스 핀, 지하철·고속도로 애니메이션
- mockups/admin-intakes.html  ← 관리자 접수 관리 (A-01)

토큰·자산 (코드로 그대로 옮길 것):
- mockups/_tokens.css  ← CSS 변수 580줄 (Light/Dark) — Tailwind v4 @theme로 변환
- mockups/_base.css  ← 베이스 스타일 + atom (button, card, badge…)
- mockups/_assets.css  ← 한지·단청 텍스처, 책장(bookshelf), 인장, photo placeholder

## 2. 기술 스택 (잠금)

- Framework: Next.js 15 (App Router) + React 19 + TypeScript strict
- Styling: Tailwind CSS v4 + shadcn/ui
- Motion: motion/react (Framer Motion 12)
- Server state: TanStack Query v5
- Client state: Zustand
- Form: React Hook Form + Zod
- Backend: Supabase (Postgres + Auth + Storage, 한국 리전, RLS 기본 deny)
- Email: Resend
- Analytics: Vercel Analytics + PostHog
- Deploy: Vercel
- Package: pnpm
- Lint/Format: Biome
- Test: Vitest (단위) + Playwright (E2E, 관리자 플로우 우선)

라이브러리 추가 시 PR 설명에 "왜 이 라이브러리가 필요한가, 대체재 검토" 1줄 적기.

## 3. 절대 원칙 (다시 한 번 강조)

A. 보건의료법 가드레일 (docs/03-compliance-and-copy.md 통과 못 하면 머지 금지)
   - "처방받기/구매/장바구니/결제" 같은 거래 동사 절대 금지 → "비대면 진료 접수" 사용
   - 효능·기간·감량 단정 보장 표현 금지 → "체질에 맞춰 처방되는 한약"
   - before/after 사진 금지
   - 모든 한약 상세 페이지에 <MedicalDisclaimer> 의무 노출
   - 결제·장바구니·금액 UI 절대 만들지 않기

B. 디자인 토큰 (docs/02-design-system.md)
   - 시멘틱 토큰만 사용 (--brand, --accent, --ink-primary…)
   - 하드코딩 색(#492E14 같은 raw hex) 절대 금지
   - 새 토큰이 필요하면 디자인 시스템 문서 먼저 갱신 후 코드 반영
   - mockups/clinic-map.html의 transform-origin 주석 같은 함정 노트 꼭 따르기

C. 데이터 보안 (docs/01-blueprint.md §3.3)
   - Supabase service-role 키는 lib/supabase/admin.ts 안에서만, ESLint 규칙으로 클라이언트 import 차단
   - RLS 기본 deny, 모든 테이블 정책 SQL 마이그레이션에 박제
   - 환자 PII는 절대 클라이언트로 흐르지 않게

D. 컴포넌트 작성
   - Server Component가 기본, "use client"는 인터랙션 leaf만
   - 30줄 넘으면 분리 검토
   - 데이터 fetching은 RSC에서 직접 또는 Server Action

## 4. 핵심 결정 사항 요약

- 비대면 진료 접수 1차 동선: 네이버 폼 (form.naver.com/response/nCxbZSt-zk2g3y8lTAYR1A — "부개 감비환 바로 처방 받기")
- 자체 폼(/intake)은 Phase 2에서 도입, 6단계 (동의/기본/다이어트/건강/배송/확인)
- 관리자 4기능: 접수 관리 / 콘텐츠 관리 / 한약·진료과목 편집 / 통계 (Phase 2)
- 외부 연동: 네이버폼 webhook, 카카오 채널 딥링크, 네이버 플레이스, 네이버 블로그 RSS (bgwon9991)
- 대표 원장: 윤정호 한의사 (한방비만학회·대한한의학회·한방재활의학과학회 정회원)
- 한의원 정보: 부흥로 414, 모아빌딩 401호 (파리바게뜨 4층) · 032-361-9991 · 평일 09:00–20:00 / 토 09:00–14:00

## 5. 이번 작업 — Phase 1 Week 2

### 목표
프로젝트 부트스트랩 + 디자인 시스템 통합 + 공통 레이아웃 + 메인 페이지 Hero & 다이어트 라인업까지.

### 실행 단계
다음을 순서대로 진행하되, 각 단계 끝나면 짧게 결과 보고하고 내가 OK 하면 다음 단계로:

Step 1. 프로젝트 부트스트랩
- pnpm create next-app@latest 으로 src/ 디렉터리 + TypeScript strict + Tailwind v4 + App Router 생성
- 기본 의존성: @supabase/supabase-js, @supabase/ssr, @tanstack/react-query, zustand,
  react-hook-form, zod, motion, lucide-react, clsx, tailwind-variants
- 개발 의존성: @biomejs/biome, supabase CLI, vitest, @playwright/test
- shadcn init (--style new-york --base-color stone --css-variables)

Step 2. 디자인 시스템 통합
- mockups/_tokens.css 를 src/styles/tokens.css로 옮기고 Tailwind v4 @theme block으로 변환
- src/styles/globals.css 에서 @import "./tokens.css" + reset/base
- tailwind.config.ts(또는 v4 CSS 기반 설정)에 시멘틱 토큰 매핑
- src/lib/utils.ts (cn 함수 — clsx + tailwind-merge)
- shadcn 6종 설치 + 우리 토큰으로 재테마: button, card, input, label, dropdown-menu, dialog

Step 3. Supabase 분리
- src/lib/supabase/client.ts (브라우저, anon)
- src/lib/supabase/server.ts (RSC/Route Handler, cookies)
- src/lib/supabase/admin.ts (service-role, server-only — eslint-plugin-no-restricted-imports로 클라이언트 import 차단)
- .env.example 작성, README에 환경변수 안내

Step 4. 공통 레이아웃 컴포넌트
- src/app/layout.tsx — Pretendard Variable 폰트, lang="ko", metadataBase, viewport
- src/components/layout/Header.tsx — 데스크톱 GNB + 모바일 햄버거 (mockups/home.html nav-d/nav-m 참조)
- src/components/layout/Footer.tsx — 4컬럼 (mockups/home.html footer-d 참조)
- src/components/layout/FloatingCTA.tsx — 모바일 하단 sticky 3분할 (카톡/접수/전화)
- src/components/ui/MedicalDisclaimer.tsx — mockups/components.html §04 그대로 (의무 고지)
- src/components/ui/Stamp.tsx, LogoMark.tsx — 인장(富梄開印), 로고 마크(梄)

Step 5. SEO 인프라
- src/lib/seo.ts — generateMetadata helper, JSON-LD MedicalClinic 빌더
- src/app/sitemap.ts, src/app/robots.ts
- src/lib/settings.ts — 한의원 정보 중앙화 (전화·주소·시간을 한 파일에서 관리, 추후 DB로)

Step 6. 메인 페이지 (P-01)
- src/app/(public)/page.tsx — RSC, mockups/home.html 데스크톱 시안을 1:1 복제
- 섹션 컴포넌트: Hero, DietLineup, ImmuneLineup, DirectorMessage, ClinicInfoBar,
  ProcessTimeline, BlogTeaser, FinalCTA
- 모션은 Framer Motion useInView + fade-up reveal (docs/02-design-system.md §6 모션 토큰 참조)
- Hero는 데스크톱/모바일 분기, 모바일에서 FloatingCTA 항상 보이게

Step 7. 검증 + 배포
- pnpm typecheck && pnpm lint && pnpm build 통과
- Lighthouse 모바일 메인 ≥ 95 (Performance/A11y/Best/SEO)
- Vercel preview 연결 + 도메인 임시 연결
- PostHog 핵심 이벤트 5종 적재 (cta_telemedicine_click, kakao_chat_open, naver_form_open, phone_call_click, page_view)

### Definition of Done (Week 2)
- [ ] 모든 디자인 토큰이 시멘틱 이름으로 참조 (하드코딩 색 0건, grep으로 확인)
- [ ] Header/Footer/FloatingCTA가 모든 화면에서 동작
- [ ] MedicalDisclaimer 컴포넌트가 props로 한약명을 받아 렌더
- [ ] 메인 페이지가 mockups/home.html 데스크톱 시안과 95% 일치
- [ ] 메인 페이지 모바일 LCP < 2.5s (4G 시뮬레이션)
- [ ] 모든 CTA에 PostHog 이벤트 부착
- [ ] Vercel preview 링크 공유 가능

### 참조 마이크로 결정
- 폰트: Pretendard Variable 1차, IBM Plex Sans KR 폴백 (display·hero에서)
- 모션 reduce-motion: useReducedMotion 훅으로 감지 후 instant fallback
- 다크 모드: Phase 1엔 라이트만 (다크 토글 UI 노출 X), 토큰은 양쪽 정의
- 분석 측정: 클릭 시점 + 페이지 위치(hero/sticky/section) 메타 함께 보냄

## 6. 그 다음 (참고만, 지금은 안 함)

- Week 3: 다이어트 허브 + 감비환 상세 (mockups/diet-hub.html, product-detail.html)
- Week 4: 면역 한약 + 진료과목 5종 + 비대면 진료 + 한의원 소개
- Week 5: 외부 연동 + 분석
- Week 6–7: 콘텐츠 채움 + 컴플라이언스 통과 + 출시
- Phase 2 (Week 8–11): Auth + 관리자 + 자체 폼 + 웹훅 자동화

자세한 건 docs/05-roadmap.md.

---

자, Step 1부터 시작해줘. 먼저 CLAUDE.md와 docs/01-blueprint.md를 읽고, 부트스트랩 명령 실행 전에 짧게 "이 스택으로 가려는 거 맞지?" 확인 한 번 받으면 좋겠어. 모르는 게 나오면 docs를 더 읽거나 나한테 직접 물어봐줘.
```

---

## 다음 메시지 템플릿 (참고)

Phase 1 Week 2가 끝난 뒤, 다음 작업을 시킬 때 쓰는 짧은 템플릿:

```
Phase 1 Week 3 진행하자.
- 작업 범위: docs/05-roadmap.md Week 3 항목 (다이어트 허브 + 감비환 상세)
- 디자인 레퍼런스: mockups/diet-hub.html · product-detail.html
- 카피 표준: docs/03-compliance-and-copy.md §2.2, §2.3 페이지 템플릿 그대로
- 데이터: 아직 Supabase products 테이블 없으니 src/data/products.ts 임시 시드로 시작
- DoD: 라이트하우스 모바일 ≥ 95, MedicalDisclaimer 노출, sticky CTA 동작

Step별 결과 짧게 보고하고 내가 OK 하면 다음 step.
```

---

## 부록: 클로드 데스크탑에 등록하면 좋은 별칭

`.cursorrules` 또는 Claude Code custom instructions에 다음 한 줄을 추가하면 매 메시지에 일일이 안 적어도 됨:

```
부개원 한의원 프로젝트는 항상 docs/03-compliance-and-copy.md 카피 가드레일을 통과해야 한다.
"처방받기/구매/장바구니/결제" 동사 사용 금지, "비대면 진료 접수" 사용. 한약 상세 페이지 하단에는 항상 <MedicalDisclaimer/> 컴포넌트.
```

---

마지막 업데이트: 2026-04-30
