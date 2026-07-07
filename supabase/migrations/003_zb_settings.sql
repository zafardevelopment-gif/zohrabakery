-- Zohra Bakery site-wide settings (currently just the homepage hero image).
-- Run this once in the Supabase SQL Editor for project yntngseawecpipttwimw.

create table if not exists public.zb_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.zb_settings enable row level security;

-- Anyone (anon key) can read settings — needed for the public website.
drop policy if exists "zb_settings public read" on public.zb_settings;
create policy "zb_settings public read" on public.zb_settings
  for select using (true);

-- Only the service role (used server-side by the admin API routes) can
-- insert/update/delete. The anon key has no write access.

insert into public.zb_settings (key, value)
values ('hero_image', '/images/cakes/velvet.svg')
on conflict (key) do nothing;
