-- BayesUpdate v1 schema
-- Run this in the Supabase SQL editor for your project.

create table if not exists predictions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  question text not null,
  category text not null default 'other'
    check (category in ('career', 'finance', 'health', 'goals', 'other')),
  target_date date,
  alpha double precision not null,
  beta double precision not null,
  status text not null default 'active'
    check (status in ('active', 'resolved_true', 'resolved_false')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists evidence_entries (
  id uuid primary key default gen_random_uuid(),
  prediction_id uuid not null references predictions (id) on delete cascade,
  description text not null,
  direction text not null
    check (direction in ('favorable', 'unfavorable', 'neutral')),
  strength text not null
    check (strength in ('weak', 'moderate', 'strong')),
  probability_before double precision not null,
  probability_after double precision not null,
  created_at timestamptz not null default now()
);

create index if not exists evidence_entries_prediction_id_idx
  on evidence_entries (prediction_id);

alter table predictions enable row level security;
alter table evidence_entries enable row level security;

create policy "Users manage their own predictions"
  on predictions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage evidence on their own predictions"
  on evidence_entries for all
  using (
    exists (
      select 1 from predictions
      where predictions.id = evidence_entries.prediction_id
      and predictions.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from predictions
      where predictions.id = evidence_entries.prediction_id
      and predictions.user_id = auth.uid()
    )
  );
