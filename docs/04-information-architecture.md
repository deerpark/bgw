# 부개원 한의원 — Information Architecture (IA)

> 본 문서는 메뉴 구조와 페이지별 목적·타깃·CTA·SEO 메타·라우팅 디테일을 한 곳에 모은 reference 표다.
> 페이지를 추가/이동할 때 본 표를 먼저 갱신한다.

---

## 1. 메뉴 트리 (사용자가 보는 구조)

```
GNB (Desktop)
┌────────────────────────────────────────────────────────────────────┐
│ [LOGO]  다이어트 ▾  면역한약 ▾  진료과목 ▾  한의원 소개  비대면 진료  블로그   [CTA: 비대면 진료 접수] │
└────────────────────────────────────────────────────────────────────┘

다이어트 ▾
  ├─ 다이어트 한약 안내
  ├─ 부개 감비환
  ├─ 부개 감비탕
  └─ 부개 디톡스

면역한약 ▾
  ├─ 면역 한약 안내
  ├─ 공진단
  ├─ 경옥고
  └─ 녹용보약

진료과목 ▾
  ├─ 자동차보험
  ├─ 추나요법
  ├─ 비염
  ├─ 성장
  └─ 여성질환 (월경통·갱년기·산후보약)
```

```
GNB (Mobile)
┌──────────────────────────┐
│ [LOGO]            [☰] [📞] │
└──────────────────────────┘
└─ Drawer 열림 시 풀스크린 트리 노출

Floating CTA Dock (Mobile sticky bottom)
┌────────────┬────────────┬────────────┐
│ 카톡 상담   │ 비대면 접수 │ 전화 걸기   │
└────────────┴────────────┴────────────┘
```

---

## 2. 라우팅 매트릭스

| Path | Name | Render | Auth | Layout | Index? |
|---|---|---|---|---|---|
| `/` | 메인 | ISR 5min | public | public | ✅ |
| `/diet` | 다이어트 허브 | ISR 1h | public | public | ✅ |
| `/diet/gambihwan` | 부개 감비환 | ISR 1h | public | public | ✅ |
| `/diet/gambitang` | 부개 감비탕 | ISR 1h | public | public | ✅ |
| `/diet/detox` | 부개 디톡스 | ISR 1h | public | public | ✅ |
| `/immune` | 면역한약 허브 | ISR 1h | public | public | ✅ |
| `/immune/gongjindan` | 공진단 | ISR 1h | public | public | ✅ |
| `/immune/gyeongokgo` | 경옥고 | ISR 1h | public | public | ✅ |
| `/immune/nokyong` | 녹용보약 | ISR 1h | public | public | ✅ |
| `/clinic` | 한의원 소개 | SSG | public | public | ✅ |
| `/treatments/insurance` | 자동차보험 | ISR 1h | public | public | ✅ |
| `/treatments/chuna` | 추나요법 | ISR 1h | public | public | ✅ |
| `/treatments/rhinitis` | 비염 | ISR 1h | public | public | ✅ |
| `/treatments/growth` | 성장 | ISR 1h | public | public | ✅ |
| `/treatments/womens` | 여성질환 | ISR 1h | public | public | ✅ |
| `/telemedicine` | 비대면 진료 안내 | ISR 1h | public | public | ✅ |
| `/blog` | 블로그 목록 | ISR 30m | public | public | ✅ |
| `/blog/[slug]` | 블로그 상세 | ISG | public | public | ✅ |
| `/privacy` | 개인정보 처리방침 | SSG | public | minimal | ✅ |
| `/terms` | 이용약관 | SSG | public | minimal | ✅ |
| `/admin` | 관리자 대시보드 | SSR | role: staff/admin | admin | ❌ |
| `/admin/intakes` | 접수 관리 | SSR | role: staff/admin | admin | ❌ |
| `/admin/intakes/[id]` | 접수 상세 | SSR | role: staff/admin | admin | ❌ |
| `/admin/products` | 한약/진료과목 편집 | SSR | role: admin | admin | ❌ |
| `/admin/content/banners` | 배너 관리 | SSR | role: admin | admin | ❌ |
| `/admin/content/posts` | 블로그 관리 | SSR | role: admin | admin | ❌ |
| `/admin/analytics` | 통계 | SSR | role: admin | admin | ❌ |
| `/admin/settings` | 설정 | SSR | role: admin | admin | ❌ |
| `/login` | 로그인 | SSR | public | minimal | ❌ |
| `/api/webhooks/naver-form` | 웹훅 | route.ts | shared secret | — | ❌ |
| `/api/analytics/event` | 이벤트 수집 | route.ts | public(rate-limit) | — | ❌ |
| `/api/og` | OG 이미지 | route.tsx | public | — | ❌ |

---

## 3. 페이지별 목적·CTA·SEO

| Path | 1차 목적 | 1차 타깃 | Primary CTA | Secondary CTA | SEO Title | Description |
|---|---|---|---|---|---|---|
| `/` | 첫 인상 + 비대면 접수 유도 | P1·P2 | 비대면 진료 접수 | 다이어트 둘러보기 | 부개원 한의원 - 부평 비대면 한방 다이어트 | 체질에 맞춘 한방 다이어트와 면역 한약을 비대면 진료로 처방받으세요. |
| `/diet` | 3종 비교 + 신뢰 형성 | P1 | 비대면 진료 접수 | 감비환 자세히 | 한방 다이어트 — 부개 감비환·감비탕·디톡스 | 부개원의 한방 다이어트 3종을 한자리에서 비교해 보세요. |
| `/diet/gambihwan` | 환제 한약 상세 안내 | P1 | 비대면 진료 접수 | 다른 한약 비교 | 부개 감비환 — 휴대 간편한 환제 한방 다이어트 | … |
| `/diet/gambitang` | 탕약 상세 | P1 | 비대면 진료 접수 | 비교 | 부개 감비탕 — 체질을 살피는 탕제 한방 다이어트 | … |
| `/diet/detox` | 디톡스 상세 | P1 | 비대면 진료 접수 | 비교 | 부개 디톡스 — 노폐물 케어 한방 처방 | … |
| `/immune` | 면역 한약 카탈로그 | P2 | 비대면 진료 접수 | 한의원 소개 | 면역 한약 — 공진단·경옥고·녹용보약 | … |
| `/immune/gongjindan` | 공진단 상세 | P2 | 비대면 진료 접수 | 한의원 소개 | 공진단 — 부개원 한의원 | … |
| `/clinic` | 신뢰 검증 | P1·P2 | 길찾기 | 전화 걸기 | 부개원 한의원 — 부평 한의원 안내 / 진료시간·오시는길 | … |
| `/treatments/insurance` | 자동차 보험 환자 유치 | 사고 환자 | 전화 예약 | 카카오 상담 | 자동차보험 한의원 진료 — 부평 부개원 | … |
| `/telemedicine` | 비대면 진료 절차 안내 | 신규 | 네이버폼 | 카톡/전화 | 비대면 진료 안내 — 부개원 한의원 | … |
| `/blog` | SEO 보강 | 검색유입 | 비대면 진료 접수 | — | 부개원 한의원 블로그 | … |

> SEO 키워드는 운영하면서 PostHog/네이버 검색광고 데이터로 보강.

---

## 4. 메뉴 ↔ 사용자 의도 매핑

| 사용자 의도 | 진입 메뉴 | 다음 동선 |
|---|---|---|
| "다이어트 한약 받고 싶다" | 다이어트 ▾ → 감비환 | 비대면 진료 접수 |
| "어떤 한약이 나에게 맞을지 모름" | 다이어트 → 허브 | 비교 → 1종 상세 → 접수 |
| "한의원 위치/시간 확인" | 한의원 소개 | 길찾기 / 전화 |
| "면역·기력 보강하고 싶다" | 면역한약 ▾ | 상세 → 접수 |
| "교통사고 후 한방 진료 받고 싶다" | 진료과목 → 자동차보험 | 전화 예약 |
| "비대면 진료가 뭔지 모름" | 비대면 진료 | 절차 → 접수 |

---

## 5. 페이지 컴포넌트 구성 표

| Page | Sections (in order) |
|---|---|
| `/` | Hero · DietHighlight · ImmuneHighlight · ClinicQuickInfo · ProcessSummary · BlogTeaser · CTASection |
| `/diet` | Hero · ProductCompareTable · ProcessTimeline · DoctorSpotlight · FAQ · CTASection · MedicalDisclaimer |
| `/diet/[slug]` | Hero · KeyPoints · TargetUser · PrescriptionPrinciple · UsageGuide · ProcessTimeline · Cautions · FAQ · RelatedProducts · CTASection · MedicalDisclaimer |
| `/immune` | Hero · ProductCompareTable · ProcessTimeline · FAQ · CTASection · MedicalDisclaimer |
| `/clinic` | AnchorNav · Intro · DoctorList · GalleryCarousel · ClinicMap · BusinessHours · CTASection |
| `/treatments/[slug]` | Hero · SymptomDescription · OurApproach · ProcessTimeline · FAQ · CTASection |
| `/telemedicine` | Hero · ChannelChoice · ProcessTimeline(5step) · FAQ · LegalNote |
| `/blog` | FeaturedPost · PostGrid · TagFilter |

---

## 6. URL 정책

- 한국어 슬러그 대신 **로마자/영문 단어** 사용 (감비환 → `gambihwan`).
- `kebab-case`. 한자/특수문자 금지.
- 진료과목은 `/treatments/<topic>` 일관 prefix.
- 영구 변경 금지 — 변경 시 301 redirect를 `next.config.ts`의 `redirects()`에 추가.

---

마지막 업데이트: 2026-04-29
