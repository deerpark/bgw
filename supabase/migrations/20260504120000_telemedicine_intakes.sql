-- Phase 1 Week 5 — 비대면 진료 접수 테이블
--
-- 네이버폼 응답이 외부 자동화(Naver Works/Apps Script 등)를 거쳐
-- /api/webhooks/naver-form 으로 POST 되면 service-role 키로 적재된다.
-- (관리자 화면은 Phase 2 Week 8–9에서 RLS 정책에 맞춰 추가)
--
-- 컬럼 명세 — docs/01-blueprint.md §4.2 telemedicine_intakes
-- 상태 머신   — docs/01-blueprint.md §4.2 status enum

create extension if not exists pgcrypto;

create table if not exists public.telemedicine_intakes (
  id                       uuid primary key default gen_random_uuid(),
  code                     text unique,
  source                   text not null check (source in ('naver_form','kakao','phone','web_form')),
  source_external_id       text,

  -- 기본 정보
  patient_name             text,
  patient_phone            text,
  patient_birth            date,
  patient_gender           text check (patient_gender in ('female','male','other')),

  -- 다이어트 정보
  height_cm                int2,
  weight_kg                numeric(5,2),
  target_weight_kg         numeric(5,2),
  product_interest         text[] default '{}'::text[],
  meal_pattern             text,
  exercise_freq            text,
  diet_history             text,
  concern                  text,

  -- 건강 상태
  current_meds             text,
  allergies                text,
  chronic_conditions       text[] default '{}'::text[],
  pregnancy_state          text,

  -- 배송·통화
  call_window              text,
  ship_postcode            text,
  ship_address1            text,
  ship_address2            text,
  ship_request             text,

  -- 메타·동의
  utm                      jsonb default '{}'::jsonb,
  referrer                 text,
  user_agent               text,
  ip_hash                  text,
  consent_privacy          boolean default false,
  consent_telemedicine     boolean default false,
  consent_record_retention boolean default false,
  consent_marketing        boolean default false,

  -- 운영
  status                   text not null default 'new'
    check (status in ('new','contacted','consulted','prescribed','shipped','completed','canceled')),
  status_changed_at        timestamptz default now(),
  assigned_to              uuid,
  staff_note               text,
  call_log                 jsonb default '[]'::jsonb,
  prescription_summary     text,
  tracking_no              text,
  courier                  text,

  raw_payload              jsonb,

  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create index if not exists telemedicine_intakes_status_idx
  on public.telemedicine_intakes (status, created_at desc);

create index if not exists telemedicine_intakes_source_idx
  on public.telemedicine_intakes (source, created_at desc);

create index if not exists telemedicine_intakes_phone_idx
  on public.telemedicine_intakes (patient_phone);

-- updated_at 자동 갱신
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists telemedicine_intakes_set_updated_at on public.telemedicine_intakes;
create trigger telemedicine_intakes_set_updated_at
  before update on public.telemedicine_intakes
  for each row execute function public.set_updated_at();

-- 상태 변경 시 status_changed_at 자동 갱신
create or replace function public.set_status_changed_at()
returns trigger language plpgsql as $$
begin
  if new.status is distinct from old.status then
    new.status_changed_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists telemedicine_intakes_set_status_changed_at on public.telemedicine_intakes;
create trigger telemedicine_intakes_set_status_changed_at
  before update on public.telemedicine_intakes
  for each row execute function public.set_status_changed_at();

-- RLS — 기본 deny. 환자 insert 차단, service-role(웹훅) 만 적재.
alter table public.telemedicine_intakes enable row level security;

revoke all on public.telemedicine_intakes from anon, authenticated;

-- 관리자/스태프 read·update 정책은 Phase 2 Week 8 (profiles 도입 후) 마이그레이션에서 추가.
