-- Zohra Bakery cake catalog table.
-- Run this once in the Supabase SQL Editor for project yntngseawecpipttwimw.

create table if not exists public.zb_cakes (
  id text primary key,
  name text not null,
  category text not null default 'Uncategorized',
  description text not null default '',
  image text not null default '',
  featured boolean not null default false,
  sizes jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.zb_cakes enable row level security;

-- Anyone (anon key) can read the catalog — needed for the public website.
drop policy if exists "zb_cakes public read" on public.zb_cakes;
create policy "zb_cakes public read" on public.zb_cakes
  for select using (true);

-- Only the service role (used server-side by the admin API routes) can
-- insert/update/delete. The anon key has no write access.
