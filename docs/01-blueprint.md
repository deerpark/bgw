# 부개원 한의원 — 앱 블루프린트

> 이 문서는 정보 구조(IA), 사이트맵, 라우팅, 사용자 플로우, 시스템 아키텍처, 데이터 모델, 외부 연동을 포괄한다.
> CLAUDE.md(작업 규칙) · docs/02-design-system.md(룩앤필) · docs/03-compliance-and-copy.md(카피·법규)와 함께 본다.

---

## 1. 정보 구조 (IA)

### 1.1 최상위 메뉴 (7+1)

```
부개원 한의원
├─ 다이어트         ★ 핵심 카테고리
│   ├─ 다이어트 한약 안내 (허브)
│   ├─ 부개 감비환
│   ├─ 부개 감비탕
│   └─ 부개 디톡스
├─ 면역한약          
│   ├─ 면역한약 안내 (허브)
│   ├─ 공진단
│   ├─ 경옥고
│   └─ 녹용보약
├─ 진료과목
│   ├─ 자동차보험
│   ├─ 추나요법
│   ├─ 비염
│   ├─ 성장
│   └─ 여성질환 (월경통·갱년기·산후보약)
├─ 한의원 소개         ★ 1페이지 통합
│   └─ (소개·의료진·내부전경·오시는길·진료시간이 한 페이지에 앵커 네비)
├─ 비대면 진료         ★ 핵심 전환
├─ 블로그              (자체 블로그 또는 네이버 블로그 큐레이션)
└─ [고정 CTA] 비대면 진료 접수
```

> **메뉴 디자인 원칙**: 데스크톱은 모두 노출, 모바일은 햄버거 메뉴 + 하단 floating CTA dock에 핵심 3개(카톡 상담 / 비대면 접수 / 전화).

### 1.2 페이지 매트릭스

| Path | Type | 1차 타깃 | 핵심 CTA | SEO 키워드 (예) |
|---|---|---|---|---|
| `/` | Home | 신규 방문자 | 비대면 진료 접수 | 부개원한의원, 부평 한의원 |
| `/diet` | Hub | 다이어트 관심자 | 3종 비교 → 감비환 | 한방 다이어트, 한약 다이어트 |
| `/diet/gambihwan` | Detail | 환·캡슐 선호 | 비대면 진료 접수 | 부개 감비환, 다이어트 환약 |
| `/diet/gambitang` | Detail | 탕약 선호 | 비대면 진료 접수 | 부개 감비탕, 다이어트 한약 |
| `/diet/detox` | Detail | 디톡스/속 비움 | 비대면 진료 접수 | 부개 디톡스, 한방 디톡스 |
| `/immune` | Hub | 30+ / 갱년기 | 비대면 진료 접수 | 면역 한약, 보약 |
| `/immune/gongjindan` | Detail | 프리미엄 보약 | 비대면 진료 접수 | 공진단 |
| `/immune/gyeongokgo` | Detail | 호흡·기관지 약함 | 비대면 진료 접수 | 경옥고 |
| `/immune/nokyong` | Detail | 기력 보강 | 비대면 진료 접수 | 녹용보약, 녹용 |
| `/clinic` | Onepage | 신뢰 검증 단계 | 길찾기 / 전화 | 부개원한의원 위치, 진료시간 |
| `/treatments/insurance` | Detail | 교통사고 환자 | 전화 예약 | 자동차보험 한의원, 부평 |
| `/treatments/chuna` | Detail | 척추·근골격계 | 전화 예약 | 추나요법 |
| `/treatments/rhinitis` | Detail | 비염 환자 | 전화/접수 | 비염 한약 |
| `/treatments/growth` | Detail | 자녀 키 | 전화/접수 | 한방 성장 |
| `/treatments/womens` | Detail | 여성 환자 | 전화/접수 | 갱년기 한약, 산후보약 |
| `/telemedicine` | Landing | 비대면 진료 입문 | 네이버폼 / 카톡 | 비대면 진료 한약 |
| `/blog` | List | 검색 유입 / 재방문 | — | 콘텐츠 SEO |
| `/blog/[slug]` | Article | 정보 탐색 | 비대면 진료 접수 | 키워드별 |
| `/admin/*` | Admin | 운영자 | (내부) | noindex |

> **메뉴 ↔ 페이지 매핑**: 메뉴에 안 보이는 깊은 페이지(`/blog/[slug]`)는 SEO 진입 페이지로만 활용하고, 사이트 내부 동선은 hub → detail 구조.

### 1.3 깊이 규칙

- 어떤 페이지에서도 **2탭 안에 비대면 진료 접수**에 도달.
- breadcrumb은 `/diet/gambihwan`처럼 2 depth 이상에서 노출.

---

## 2. 핵심 사용자 플로우

### 2.1 P1 — "다이어트 한약을 받고 싶다" (★ 메인 플로우)

```mermaid
flowchart LR
  A[검색/광고/입소문] --> B(/ 메인)
  B -->|Hero CTA| C[/diet 허브]
  B -.바로 접수.-> Z[비대면 진료 접수]
  C -->|3종 비교| D[/diet/gambihwan 등 상세]
  D -->|상세 끝 sticky CTA| Z
  D -->|FAQ 의문| E[FAQ 섹션]
  E --> Z
  Z -->|네이버폼| F[문진표 작성/제출]
  Z -->|카카오톡| G[채널 1:1 상담]
  Z -->|전화| H[유선 통화]
  F --> I[(접수 DB 적재)]
  G --> I
  H --> I
  I --> J{한의사 비대면 진료}
  J --> K[처방·결제 안내]
  K --> L[택배 발송]
```

### 2.2 P2 — "한의원이 어떤 곳인가 확인하고 가고 싶다"

```
검색 → / → /clinic (소개·의료진·내부·길찾기·시간) → 전화 / 카톡
```

### 2.3 P3 — 운영자 (관리자)

```
관리자 로그인 → /admin
  ├─ 대시보드: 오늘의 접수, 미처리 건, 채널별 추이
  ├─ /admin/intakes: 접수 리스트 (필터: 상태/채널/날짜)
  │    └─ /admin/intakes/[id]: 상세 + 상태 변경 + 메모 + 통화 기록
  ├─ /admin/content: 배너·공지·블로그
  ├─ /admin/products: 한약·진료과목 정보 편집
  ├─ /admin/analytics: 유입/이탈/CTA 클릭
  └─ /admin/settings: 채널 링크, 알림 메일
```

### 2.4 외부 채널 통합 흐름

```
환자
 ├─ 카카오톡 채널 추가 → 카톡 알림톡 수신 (운영 단계)
 ├─ 네이버 플레이스 → 길찾기 / 리뷰 (역방향 진입)
 └─ 네이버 블로그 글 → 부개원닷컴 진입
```

---

## 3. 시스템 아키텍처

### 3.1 하이레벨 다이어그램

```
┌──────────────────────────────────────────────────┐
│ Browser (모바일·데스크톱)                          │
│   Next.js 15 App Router (RSC + Client Islands)   │
│   Tailwind v4 · shadcn · Framer Motion           │
└──────────────┬───────────────────┬───────────────┘
               │                   │
        Vercel Edge          Vercel Functions
        (정적/ISR)           (API Routes, Webhooks)
               │                   │
               ▼                   ▼
        ┌──────────────────────────────┐
        │  Supabase (Seoul region)     │
        │  - Postgres (data)           │
        │  - Auth (admin)              │
        │  - Storage (이미지/문서)      │
        │  - Realtime (관리자 라이브)   │
        └──────────────────────────────┘
               │
   ┌───────────┴────────────┐
   │                        │
[Resend] 메일       [PostHog] 분석
                            +
                  [Vercel Analytics]
                            +
       ─── 외부 ───
[네이버폼] webhook → /api/webhooks/naver-form
[카카오 채널] 딥링크 + (선택) 알림톡
[네이버 플레이스/블로그] 임베드/링크
```

### 3.2 렌더링 전략

| 페이지 | 전략 | 비고 |
|---|---|---|
| `/` 메인 | ISR (revalidate 5min) | 배너·블로그 카드 갱신 |
| `/diet/*`, `/immune/*`, `/treatments/*` | ISR (revalidate 1h) | 운영자 편집 시 즉시 무효화 (`revalidatePath`) |
| `/clinic` | SSG | 거의 정적 |
| `/telemedicine` | ISR | UTM 처리는 클라이언트 |
| `/blog/[slug]` | ISG (on-demand) | 새 글 등록 시 빌드 |
| `/admin/*` | SSR (no cache) | 인증·실시간 |

### 3.3 보안

- 모든 admin 라우트는 미들웨어에서 `profiles.role in ('admin','staff')` 검증.
- `service-role` 키는 서버 코드에서만(`lib/supabase/admin.ts`).
- 네이버폼 웹훅은 공유 비밀(`x-naver-signature`) + IP 화이트리스트(가능 시).
- 민감정보(연락처 등)는 절대 클라이언트로 흐르지 않게, admin API에서만.

---

## 4. 데이터 모델 (Supabase)

> 모든 테이블 RLS 활성화. 핵심 SQL은 `supabase/migrations/`에 박제.

### 4.1 ERD

```
profiles ──┐
           │
           │  staff
           ▼
intake_actions ──── intake_status_log
           ▲
           │
telemedicine_intakes ──── intake_attachments
                       │
                       └── utm_attribution

products ──── product_assets
banners
posts ──── post_tags ──── tags
events
settings
```

### 4.2 테이블 정의 (요약)

#### `profiles`
| col | type | note |
|---|---|---|
| id (PK) | uuid | `auth.users` 1:1 |
| role | text | enum: admin / staff |
| display_name | text | |
| phone | text | |
| created_at | timestamptz | default now() |

#### `telemedicine_intakes`

> 네이버 폼 **"부개 감비환 바로 처방 받기"**(form id `nCxbZSt-zk2g3y8lTAYR1A`)와 동등한 필드를 갖되, 자체 폼·웹훅 입력 모두 동일 스키마로 수렴한다.

| col | type | note |
|---|---|---|
| id (PK) | uuid | gen_random_uuid |
| code | text unique | 표시용 접수번호 `#YY-MMDD-NNN` |
| source | text | enum: `naver_form` / `kakao` / `phone` / `web_form` |
| source_external_id | text | 네이버폼 응답 ID, 카카오 메시지 ID 등 |
| **기본 정보** | | |
| patient_name | text | 실명, 암호화 권장 (Phase 2 pgsodium) |
| patient_phone | text | E.164 정규화 |
| patient_birth | date | 생년월일 (만나이 계산은 view에서) |
| patient_gender | text | enum: `female` / `male` / `other` |
| **다이어트 정보** | | |
| height_cm | int2 | 키 |
| weight_kg | numeric(5,2) | 현재 체중 |
| target_weight_kg | numeric(5,2) | 목표 체중 (선택) |
| product_interest | text[] | 관심 한약 slug: `gambihwan`, `gambitang`, `detox`, `unsure` |
| meal_pattern | text | enum: `regular` / `skip_breakfast` / `late_night` / `irregular` / `intermittent` |
| exercise_freq | text | enum: `none` / `1_2_week` / `3_4_week` / `5plus_week` |
| diet_history | text | 다이어트 시도 경험 (서술) |
| concern | text | 주요 고민 (서술) |
| **건강 상태** | | |
| current_meds | text | 복용 중인 약·영양제 (서술 — "없음" 포함) |
| allergies | text | 알레르기 |
| chronic_conditions | text[] | 진단 질환 array: `hypertension`, `diabetes`, `thyroid`, `heart`, `kidney`, `liver` |
| pregnancy_state | text | enum: `none` / `pregnant` / `lactating` / `planning` |
| **배송·통화** | | |
| call_window | text | enum: `weekday_am` / `weekday_pm_early` / `weekday_pm_late` / `saturday_am` / `flexible` |
| ship_postcode | text | |
| ship_address1 | text | 기본 주소 |
| ship_address2 | text | 상세 주소 |
| ship_request | text | 배송 요청사항 |
| **메타·동의** | | |
| utm | jsonb | source/medium/campaign/content/keyword |
| referrer | text | 진입 페이지 |
| user_agent | text | |
| ip_hash | text | 해시 처리 |
| consent_privacy | bool | 필수 |
| consent_telemedicine | bool | 필수 |
| consent_record_retention | bool | 필수 (의료법 진료기록 10년 보존) |
| consent_marketing | bool | 선택 |
| **운영** | | |
| status | text | enum (다음 절 참조) |
| status_changed_at | timestamptz | |
| assigned_to | uuid | `profiles.id` — 담당 스태프 |
| staff_note | text | 내부 메모 |
| call_log | jsonb | 통화 시도/결과 배열 |
| prescription_summary | text | 처방 결과 요약 (한의사 입력) |
| tracking_no | text | 발송 운송장 번호 |
| courier | text | 택배사명 |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | trigger로 자동 갱신 |

상태 enum:
```
new → contacted → consulted → prescribed → shipped → completed
                     │
                     └→ canceled (사유 포함)
```

| status | 의미 | 다음 액션 |
|---|---|---|
| `new` | 접수 도착 | 운영자가 통화 안내 발송 |
| `contacted` | 통화 예약 안내 발송 | 한의사가 통화 |
| `consulted` | 한의사 통화 진료 진행/완료 | 처방 결정 |
| `prescribed` | 처방 결정 · 조제 진행 중 | 발송 준비 |
| `shipped` | 택배 발송 완료 | 환자 수령 대기 |
| `completed` | 환자 수령 + 케어 종료 | — |
| `canceled` | 취소 (사유: 임신 확인, 환자 변심 등) | — |

#### `intake_status_log`
| col | type |
|---|---|
| id | uuid |
| intake_id | uuid → telemedicine_intakes |
| from_status | text |
| to_status | text |
| changed_by | uuid → profiles |
| reason | text |
| created_at | timestamptz |

#### `products`
| col | type | note |
|---|---|---|
| id | uuid | |
| slug | text unique | URL 식별자 |
| category | text | diet / immune / treatment |
| name_ko / name_zh / name_en | text | |
| short_desc | text | |
| body | jsonb | TipTap JSON |
| key_points | text[] | 핵심 5문장 |
| disclaimer | text | 의무 고지 |
| hero_image_path | text | Storage |
| gallery | text[] | |
| price_range_label | text | "상담 후 안내" 등 비결제 표현 |
| consultation_label | text | CTA 라벨 |
| order_index | int | |
| published | bool | |
| seo_title / seo_description | text | |
| og_image_path | text | |
| created_at / updated_at | timestamptz | |

#### `banners`
| col | type | note |
|---|---|---|
| id | uuid | |
| slot | text | main_hero / top_strip / floating |
| title / body / cta_label / cta_url | text | |
| start_at / end_at | timestamptz | |
| weight | int2 | A/B 가중치 |
| is_active | bool | |

#### `posts` (자체 블로그)
- 표준 블로그 필드 (id, slug, title, summary, body jsonb, hero_image, published_at, author_id, tags)

#### `events` (커스텀 이벤트 fallback — PostHog 메인)
- (id, event, props jsonb, page, ua, ip_hash, created_at)

#### `settings`
| key | value (예시) | desc |
|---|---|---|
| naver_form_url | `https://form.naver.com/response/nCxbZSt-zk2g3y8lTAYR1A` | 비대면 진료 접수 폼 URL |
| naver_blog_url | `https://blog.naver.com/bgwon9991` | |
| naver_blog_rss | `https://rss.blog.naver.com/bgwon9991.xml` | |
| naver_place_url | `https://map.naver.com/p/...` | 네이버 플레이스 |
| kakao_channel_chat_url | `https://pf.kakao.com/_<id>/chat` | |
| kakao_plus_id | (운영자 입력) | |
| tmap_route_url | `https://apis.openapi.sk.com/tmap/...` | T맵 길찾기 deeplink |
| phone_main | `032-361-9991` | |
| address | `인천광역시 부평구 부흥로 414, 모아빌딩 401호` | 부개주공 5·7단지 사이 / 파리바게뜨 4층 |
| address_landmark | `파리바게뜨 4층 · 부개주공 5·7단지 사이` | 사용자가 알아볼 랜드마크 |
| nearest_subway | `1호선 부개역 (도보 12분) / 7호선 굴포천역 (도보 14분)` | |
| business_hours | jsonb | `{"weekday":"09:00-20:00","saturday":"09:00-14:00","lunch":"13:00-14:00","sunday":"closed","holiday":"closed"}` |

### 4.3 RLS 정책 핵심

```sql
-- 모든 테이블 RLS on
alter table telemedicine_intakes enable row level security;

-- 환자 insert 차단 (웹훅이 service-role로 적재)
revoke insert on telemedicine_intakes from anon, authenticated;

-- 스태프 read/update
create policy "staff read" on telemedicine_intakes
  for select using (
    exists (select 1 from profiles
             where profiles.id = auth.uid()
               and profiles.role in ('admin','staff'))
  );

create policy "staff update" on telemedicine_intakes
  for update using (...)
  with check (...);

-- 공개 콘텐츠
create policy "public read products" on products
  for select using (published = true);
```

### 4.4 마이그레이션 운영

- `pnpm db:migrate` → `supabase db push`
- 새 테이블/컬럼 추가시 즉시 `pnpm db:gen-types` → `lib/supabase/types.ts` 갱신
- 시드 데이터(제품 8종 + 진료과목 5종)는 `supabase/seed.sql`

---

## 5. 외부 연동 설계

### 5.1 네이버폼

- **현재 운영 폼**: "부개 감비환 바로 처방 받기" — `https://form.naver.com/response/nCxbZSt-zk2g3y8lTAYR1A`
- **자체 폼 구조 (네이버 폼 동등 구현)** — 단계별 6 step:
  1. **동의** — 개인정보·비대면 진료·진료기록 보존 (필수 3) + 마케팅 (선택)
  2. **기본 정보** — 이름 / 휴대전화 / 생년월일 / 성별
  3. **다이어트 정보** — 키 / 체중 / 목표 체중 / 관심 한약(복수) / 식사 패턴 / 운동 / 다이어트 시도 경험 / 주요 고민
  4. **건강 상태** — 복용 중 약·영양제 / 알레르기 / 진단 질환(복수) / 임신·수유 여부
  5. **배송·통화** — 통화 가능 시간 / 우편번호·기본·상세 주소 / 배송 요청사항
  6. **확인** — 입력 정보 미리보기 + 최종 제출
- **연결 방식 (네이버폼 → Supabase)**:
  1. 외부 CTA 클릭 → `https://naver.me/<formId>?utm_source=...` 새 탭 (UTM 자동 부착)
  2. 폼 제출 결과는 운영자 메일 + Google Sheet 또는 Naver Works로 fan-out
  3. (Phase 2) Sheet → Apps Script → `/api/webhooks/naver-form`로 POST하여 `telemedicine_intakes`에 service-role로 적재
  4. (대안) 자체 폼(`/intake`)은 직접 적재
- **추적**: 클릭 시점에 `cta_telemedicine_click` 이벤트 + 페이지·CTA 위치 메타.

### 5.2 카카오톡 채널

- **딥링크**:
  - 모바일 앱 우선: `kakaoplus://plusfriend/talk/chat/_<plus_id>` → 실패 시 web fallback
  - 웹: `https://pf.kakao.com/_<plus_id>/chat`
- **추가 버튼**: `https://pf.kakao.com/_<plus_id>` (채널 추가 페이지)
- (Phase 2) 알림톡: 비즈센터 등록 후 진료 안내 / 발송 안내 자동화.

### 5.3 네이버 플레이스 / 블로그

- **플레이스 임베드**: `/clinic` 하단 지도 영역에 iframe + "네이버 지도에서 길찾기" 외부 링크.
- **현재 운영 블로그**: `https://blog.naver.com/bgwon9991` (부개원 한의원 — 거의 매일 발행, 자동차보험·통증·맞춤 한약 중심)
- **RSS endpoint**: `https://rss.blog.naver.com/bgwon9991.xml`
- **블로그 카드**: 메인 / `/blog`에 RSS를 ISR(30분)로 fetch → 카드 6장.
- 자체 블로그(`posts` 테이블)도 함께 운영 시: 자체 글 우선 + 네이버 글 보조.
- 향후 자체 블로그(`posts`) 와 함께 노출 (자체 우선 → 네이버 블로그 보조).

### 5.4 분석/측정

- **Vercel Analytics**: Web Vitals + 페이지뷰
- **PostHog**: 이벤트, 퍼널 (`view product → click_cta → submit_form_indicator`)
- 핵심 이벤트:
  ```
  page_view (path, category)
  product_detail_view (slug, category)
  cta_click_telemedicine (page, location, channel)  // channel = naver_form|kakao|phone
  kakao_chat_open
  naver_form_open
  phone_call_click
  scroll_depth (25/50/75/100)
  ```

---

## 6. 컴포넌트 인벤토리 (개발 우선순위)

| 우선 | 컴포넌트 | 설명 |
|---|---|---|
| P0 | `Layout / Header / Footer / FloatingCTA` | 모든 페이지 공통 |
| P0 | `Hero` (variants: home, hub, detail) | 메인 시각 |
| P0 | `ProductCard / ProductCompareTable` | 다이어트 허브 핵심 |
| P0 | `MedicalDisclaimer` | 컴플라이언스 |
| P0 | `TelemedicineCTA` (3-channel) | 핵심 전환 |
| P0 | `ClinicMap` | 위치 |
| P0 | `DoctorProfile` | 의료진 카드 |
| P0 | `BusinessHours` | 진료시간 |
| P1 | `FAQ Accordion` | 의문 해소 |
| P1 | `ProcessTimeline` | 비대면 진료 절차 |
| P1 | `Testimonial` (텍스트만, 사진 없음) | 신뢰 |
| P1 | `Banner / TopStrip` | 운영자 편집 |
| P2 | `Admin DataTable / Drawer / KPI` | 관리자 |
| P2 | `RichTextEditor` | 콘텐츠 편집 |
| P2 | `BlogCard / TagList` | 블로그 |

---

## 7. 콘텐츠 모델 표준 — 한약 상세 페이지

모든 한약 상세는 동일 구조를 따른다 (CMS 입력 폼도 동일).

```
1. Hero
   - 제품 한국어 + 한자 명
   - 한 줄 본질 ("뱃살·식욕·체질을 함께 다스리는 환제 한약")
   - 큰 CTA: 비대면 진료 접수
   - 고지 한 줄: "한의사 진료 후 처방"
2. Key Points (3–5)
3. 어떤 분께 권장
4. 처방 원리 (성분 카테고리 — 정확한 처방은 상담 후 결정)
5. 복용·관리 방법
6. 진료 절차 (4–5 step)
7. 주의사항 / 부작용 (의무)
8. FAQ (5–8)
9. 다른 다이어트 옵션 비교 카드
10. CTA repeat + 의무 고지
```

---

## 8. 환경/배포

### 8.1 환경
- `local` — `.env.local` + Supabase local stack
- `preview` — Vercel Preview, Supabase staging branch
- `production` — Vercel Production, Supabase main

### 8.2 도메인/SEO
- 메인: `bugaewon.kr` 또는 `bugaewon.com` (운영자 결정)
- `www` → apex 리다이렉트
- `robots.txt`, `sitemap.xml` 자동 생성
- `/admin/*` `noindex`
- 한국어 단일 언어, `lang="ko"`

### 8.3 모니터링
- Vercel Speed Insights / Logs
- Supabase Logs (DB 에러)
- Sentry (Phase 2)

---

## 9. 마이그레이션 / 시드 시퀀스

```
0001_init.sql                — extensions(pgcrypto), profiles, settings
0002_intakes.sql             — telemedicine_intakes + status_log + RLS
0003_products.sql            — products + product_assets + RLS
0004_banners_posts.sql       — banners, posts, tags, post_tags + RLS
0005_events.sql              — events fallback table
seed.sql                     — 8 products + settings 기본값
```

---

## 10. 결정 로그 (ADR sketch)

- **A1. App Router 채택**: SEO·RSC 데이터 흐름이 한의원 사이트에 적합.
- **A2. Supabase**: 한국 리전 + 통합 Auth/Storage/RLS, 운영자 1인이 대시보드까지 빠르게 만들 수 있다.
- **A3. 네이버폼 우선 (자체 폼 보조)**: 보건의료법 회피 + 운영자가 익숙한 응답 관리 환경.
- **A4. shadcn + Tailwind v4**: 토큰 기반, 디자인 시스템과 1:1.
- **A5. PostHog + Vercel Analytics**: 둘 다 무료 시작, 분석 깊이/속도 트레이드오프 분담.

---

마지막 업데이트: 2026-04-29
