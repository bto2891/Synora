-- Synora initial schema
-- Run this in the Supabase SQL editor or via `supabase db push`

-- ─── Companies ───────────────────────────────────────────────────────────────
create table if not exists companies (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  plan          text not null check (plan in ('starter','pro','business')) default 'starter',
  status        text not null check (status in ('active','suspended','trial')) default 'trial',
  monthly_price numeric(10,2) not null default 0,
  created_at    timestamptz not null default now()
);

-- ─── Users ───────────────────────────────────────────────────────────────────
create table if not exists users (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  phone         text unique,
  email         text,
  role          text not null check (role in (
                  'super_admin','site_manager','supervisor','technician',
                  'warehouse_manager','fleet_manager','project_manager'
                )),
  company_id    uuid references companies(id) on delete cascade,
  pin           text not null check (length(pin) = 4 and pin ~ '^\d{4}$'),
  active        boolean not null default true,
  points        integer not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists users_phone_idx on users (phone);
create index if not exists users_company_idx on users (company_id);

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- Enable RLS on both tables
alter table companies enable row level security;
alter table users enable row level security;

-- Allow anon to select from users (phone+PIN login for field app)
-- In production you would tighten this with a stored function and verify PIN server-side
create policy "anon can read active users" on users
  for select to anon using (active = true);

-- Super admins (authenticated via Supabase Auth) can do anything
create policy "service role full access companies" on companies
  for all to service_role using (true) with check (true);

create policy "service role full access users" on users
  for all to service_role using (true) with check (true);

-- ─── Seed data ────────────────────────────────────────────────────────────────
-- Sample companies
insert into companies (id, name, plan, status, monthly_price) values
  ('11111111-0000-0000-0000-000000000001', 'AutoMex SA', 'pro', 'active', 499.00),
  ('11111111-0000-0000-0000-000000000002', 'GM Silao Project', 'business', 'active', 999.00),
  ('11111111-0000-0000-0000-000000000003', 'Solaris Builds', 'starter', 'trial', 0.00)
on conflict (id) do nothing;

-- Sample users (PINs are 4-digit for demo)
insert into users (name, phone, email, role, company_id, pin) values
  ('Olivia Park',   '+52-477-001-0001', 'olivia@gm-silao.com',    'site_manager',      '11111111-0000-0000-0000-000000000002', '1234'),
  ('Marco Alvarez', '+52-477-001-0002', 'marco@gm-silao.com',     'supervisor',        '11111111-0000-0000-0000-000000000002', '1234'),
  ('Diego Ramos',   '+52-477-001-0003', 'diego@gm-silao.com',     'technician',        '11111111-0000-0000-0000-000000000002', '1234'),
  ('Isabela Cruz',  '+52-477-001-0004', 'isabela@gm-silao.com',   'warehouse_manager', '11111111-0000-0000-0000-000000000002', '1234'),
  ('Hector Beltran','+52-477-001-0005', 'hector@gm-silao.com',    'project_manager',   '11111111-0000-0000-0000-000000000002', '1234'),
  ('Carlos Ruiz',   '+52-477-001-0006', 'carlos@gm-silao.com',    'fleet_manager',     '11111111-0000-0000-0000-000000000002', '1234'),
  ('Ana Delgado',   '+52-477-002-0001', 'ana@automex.com',        'site_manager',      '11111111-0000-0000-0000-000000000001', '5678'),
  ('Luis Mora',     '+52-477-002-0002', 'luis@automex.com',       'supervisor',        '11111111-0000-0000-0000-000000000001', '5678'),
  ('Sofia Reyes',   '+52-477-002-0003', 'sofia@automex.com',      'technician',        '11111111-0000-0000-0000-000000000001', '5678'),
  ('Pedro Lagos',   '+52-477-003-0001', 'pedro@solaris.com',      'site_manager',      '11111111-0000-0000-0000-000000000003', '9012')
on conflict (phone) do nothing;
