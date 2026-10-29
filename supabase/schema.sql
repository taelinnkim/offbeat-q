-- 딴질문 과제용 데모: 로그인하지 않은 누구나 모든 질문을 CRUD할 수 있습니다.
-- Supabase SQL Editor에서 실행하세요. 앱에서 자동 실행하지 않습니다.
-- 전용 데모 프로젝트에서 사용하며 개인정보나 비공개 데이터를 저장하지 마세요.
-- 기존 테이블이 있으면 구조를 변경하지 않고, 아래 이름의 정책만 재설정합니다.

begin;

create table if not exists public.questions (
    id uuid primary key default gen_random_uuid(),
    title text not null check (length(btrim(title)) > 0),
    category text not null check (length(btrim(category)) > 0),
    created_at timestamptz not null default now()
);

grant usage on schema public to anon;
grant select, insert, update, delete on table public.questions to anon;

alter table public.questions enable row level security;

drop policy if exists questions_demo_select on public.questions;
create policy questions_demo_select on public.questions
    for select to anon using (true);

drop policy if exists questions_demo_insert on public.questions;
create policy questions_demo_insert on public.questions
    for insert to anon with check (true);

drop policy if exists questions_demo_update on public.questions;
create policy questions_demo_update on public.questions
    for update to anon using (true) with check (true);

drop policy if exists questions_demo_delete on public.questions;
create policy questions_demo_delete on public.questions
    for delete to anon using (true);

commit;
