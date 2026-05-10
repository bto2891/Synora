-- ============================================================
-- Synora — Initial Schema
-- Project: tvfowvxlasrqbebpokrb
-- Run in: Supabase Dashboard → SQL Editor
--         or: supabase db push (requires CLI + DB password)
-- Safe to re-run: all statements are idempotent
-- ============================================================

-- ─── Extensions ──────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ─── 1. companies ────────────────────────────────────────────
create table if not exists companies (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  plan          text not null default 'starter'
                  check (plan in ('starter','pro','business')),
  status        text not null default 'trial'
                  check (status in ('active','suspended','trial')),
  monthly_price numeric(10,2) not null default 0,
  created_at    timestamptz not null default now()
);

-- ─── 2. users ────────────────────────────────────────────────
create table if not exists users (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  phone         text unique,
  email         text,
  role          text not null
                  check (role in (
                    'super_admin','site_manager','supervisor','technician',
                    'warehouse_manager','fleet_manager','project_manager'
                  )),
  company_id    uuid references companies(id) on delete cascade,
  pin           text not null
                  check (length(pin) = 4 and pin ~ '^\d{4}$'),
  active        boolean not null default true,
  points        integer not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists idx_users_phone      on users (phone);
create index if not exists idx_users_company    on users (company_id);
create index if not exists idx_users_role       on users (role);

-- ─── 3. tasks ────────────────────────────────────────────────
create table if not exists tasks (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text,
  zone          text,
  status        text not null default 'pending'
                  check (status in (
                    'pending','in_progress','pending_approval',
                    'done','overdue','rework'
                  )),
  priority      text not null default 'normal'
                  check (priority in ('normal','urgent')),
  assigned_to   uuid references users(id) on delete set null,
  created_by    uuid references users(id) on delete set null,
  company_id    uuid references companies(id) on delete cascade,
  created_at    timestamptz not null default now()
);

create index if not exists idx_tasks_company    on tasks (company_id);
create index if not exists idx_tasks_assigned   on tasks (assigned_to);
create index if not exists idx_tasks_status     on tasks (status);

-- ─── 4. vehicles ─────────────────────────────────────────────
create table if not exists vehicles (
  id            uuid primary key default gen_random_uuid(),
  plate         text not null,
  type          text not null,
  status        text not null default 'available'
                  check (status in ('available','in_use','maintenance','reserved')),
  company_id    uuid references companies(id) on delete cascade,
  created_at    timestamptz not null default now()
);

create index if not exists idx_vehicles_company on vehicles (company_id);

-- ─── 5. vehicle_requests ─────────────────────────────────────
create table if not exists vehicle_requests (
  id            uuid primary key default gen_random_uuid(),
  vehicle_id    uuid references vehicles(id) on delete cascade,
  user_id       uuid references users(id) on delete cascade,
  purpose       text not null,
  destination   text,
  return_time   timestamptz,
  status        text not null default 'pending'
                  check (status in ('pending','approved','rejected','returned')),
  created_at    timestamptz not null default now()
);

create index if not exists idx_vreq_vehicle  on vehicle_requests (vehicle_id);
create index if not exists idx_vreq_user     on vehicle_requests (user_id);
create index if not exists idx_vreq_status   on vehicle_requests (status);

-- ─── 6. warehouse_items ──────────────────────────────────────
create table if not exists warehouse_items (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  category      text,
  stock         integer not null default 0,
  min_stock     integer not null default 0,
  company_id    uuid references companies(id) on delete cascade,
  created_at    timestamptz not null default now()
);

create index if not exists idx_witems_company on warehouse_items (company_id);

-- ─── 7. warehouse_requests ───────────────────────────────────
create table if not exists warehouse_requests (
  id            uuid primary key default gen_random_uuid(),
  item_id       uuid references warehouse_items(id) on delete cascade,
  user_id       uuid references users(id) on delete cascade,
  quantity      integer not null check (quantity > 0),
  status        text not null default 'pending'
                  check (status in ('pending','delivered','return_pending','returned')),
  task_id       uuid references tasks(id) on delete set null,
  created_at    timestamptz not null default now()
);

create index if not exists idx_wreq_item   on warehouse_requests (item_id);
create index if not exists idx_wreq_user   on warehouse_requests (user_id);
create index if not exists idx_wreq_status on warehouse_requests (status);

-- ─── 8. delivery_queue ───────────────────────────────────────
create table if not exists delivery_queue (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  zone          text,
  status        text not null default 'in_progress'
                  check (status in (
                    'in_progress','in_review','ready_to_deliver','delivered'
                  )),
  priority      text not null default 'normal'
                  check (priority in ('normal','urgent')),
  task_id       uuid references tasks(id) on delete set null,
  company_id    uuid references companies(id) on delete cascade,
  created_at    timestamptz not null default now()
);

create index if not exists idx_dqueue_company on delivery_queue (company_id);
create index if not exists idx_dqueue_status  on delivery_queue (status);

-- ─── 9. gamification ─────────────────────────────────────────
create table if not exists gamification (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid unique references users(id) on delete cascade,
  points        integer not null default 0,
  streak        integer not null default 0,
  badges        text[] not null default '{}',
  week_points   integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_gamif_user on gamification (user_id);

-- Auto-update updated_at
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_gamification_updated_at on gamification;
create trigger trg_gamification_updated_at
  before update on gamification
  for each row execute function set_updated_at();

-- ─── Row Level Security ───────────────────────────────────────

alter table companies       enable row level security;
alter table users           enable row level security;
alter table tasks           enable row level security;
alter table vehicles        enable row level security;
alter table vehicle_requests enable row level security;
alter table warehouse_items  enable row level security;
alter table warehouse_requests enable row level security;
alter table delivery_queue  enable row level security;
alter table gamification    enable row level security;

-- Anon can read active users for phone+PIN login
drop policy if exists "anon read active users" on users;
create policy "anon read active users" on users
  for select to anon using (active = true);

-- Anon can read companies (needed by login status check)
drop policy if exists "anon read companies" on companies;
create policy "anon read companies" on companies
  for select to anon using (status = 'active');

-- Authenticated users read their own company's data
drop policy if exists "auth read own company tasks" on tasks;
create policy "auth read own company tasks" on tasks
  for select to authenticated
  using (company_id = (select company_id from users where id = auth.uid()));

drop policy if exists "auth read own company vehicles" on vehicles;
create policy "auth read own company vehicles" on vehicles
  for select to authenticated
  using (company_id = (select company_id from users where id = auth.uid()));

drop policy if exists "auth read own company warehouse" on warehouse_items;
create policy "auth read own company warehouse" on warehouse_items
  for select to authenticated
  using (company_id = (select company_id from users where id = auth.uid()));

drop policy if exists "auth read own gamification" on gamification;
create policy "auth read own gamification" on gamification
  for select to authenticated
  using (user_id = auth.uid());

-- Service role has full access to all tables
drop policy if exists "service full companies" on companies;
create policy "service full companies" on companies
  for all to service_role using (true) with check (true);

drop policy if exists "service full users" on users;
create policy "service full users" on users
  for all to service_role using (true) with check (true);

drop policy if exists "service full tasks" on tasks;
create policy "service full tasks" on tasks
  for all to service_role using (true) with check (true);

drop policy if exists "service full vehicles" on vehicles;
create policy "service full vehicles" on vehicles
  for all to service_role using (true) with check (true);

drop policy if exists "service full vehicle_requests" on vehicle_requests;
create policy "service full vehicle_requests" on vehicle_requests
  for all to service_role using (true) with check (true);

drop policy if exists "service full warehouse_items" on warehouse_items;
create policy "service full warehouse_items" on warehouse_items
  for all to service_role using (true) with check (true);

drop policy if exists "service full warehouse_requests" on warehouse_requests;
create policy "service full warehouse_requests" on warehouse_requests
  for all to service_role using (true) with check (true);

drop policy if exists "service full delivery_queue" on delivery_queue;
create policy "service full delivery_queue" on delivery_queue
  for all to service_role using (true) with check (true);

drop policy if exists "service full gamification" on gamification;
create policy "service full gamification" on gamification
  for all to service_role using (true) with check (true);

-- ─── Seed data ────────────────────────────────────────────────

-- Company: Multiindustrias
insert into companies (id, name, plan, status, monthly_price) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Multiindustrias', 'business', 'active', 999.00)
on conflict (id) do nothing;

-- 5 users for Multiindustrias (all PIN: 1234)
insert into users (id, name, phone, email, role, company_id, pin) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'Sofía Torres',   '+52-800-001-0001', 'sofia@multiind.mx',    'site_manager',      'aaaaaaaa-0000-0000-0000-000000000001', '1234'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'Andrés Vega',    '+52-800-001-0002', 'andres@multiind.mx',   'supervisor',        'aaaaaaaa-0000-0000-0000-000000000001', '1234'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'Carmen López',   '+52-800-001-0003', 'carmen@multiind.mx',   'technician',        'aaaaaaaa-0000-0000-0000-000000000001', '1234'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'Ricardo Núñez',  '+52-800-001-0004', 'ricardo@multiind.mx',  'warehouse_manager', 'aaaaaaaa-0000-0000-0000-000000000001', '1234'),
  ('bbbbbbbb-0000-0000-0000-000000000005', 'Elena Fuentes',  '+52-800-001-0005', 'elena@multiind.mx',    'fleet_manager',     'aaaaaaaa-0000-0000-0000-000000000001', '1234')
on conflict (phone) do nothing;

-- 5 tasks
insert into tasks (id, title, description, zone, status, priority, assigned_to, created_by, company_id) values
  ('cccccccc-0000-0000-0000-000000000001', 'Install conveyor belt motor',    'Replace worn motor unit on line 3', 'Zone A', 'in_progress',      'normal', 'bbbbbbbb-0000-0000-0000-000000000003', 'bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001'),
  ('cccccccc-0000-0000-0000-000000000002', 'Calibrate pressure sensors',     'All sensors on manifold B',         'Zone B', 'pending',          'urgent', 'bbbbbbbb-0000-0000-0000-000000000003', 'bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001'),
  ('cccccccc-0000-0000-0000-000000000003', 'Weld frame support L-12',        'Use 6010 rod, inspect after',       'Zone C', 'pending_approval', 'normal', 'bbbbbbbb-0000-0000-0000-000000000003', 'bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001'),
  ('cccccccc-0000-0000-0000-000000000004', 'Replace hydraulic hose HH-07',   'Pressure-test after install',       'Zone A', 'overdue',          'urgent', 'bbbbbbbb-0000-0000-0000-000000000003', 'bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001'),
  ('cccccccc-0000-0000-0000-000000000005', 'Lubricate bearing block BB-02',  'Use Mobilux EP 2',                  'Zone B', 'done',             'normal', 'bbbbbbbb-0000-0000-0000-000000000003', 'bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001')
on conflict (id) do nothing;

-- 3 vehicles
insert into vehicles (id, plate, type, status, company_id) values
  ('dddddddd-0000-0000-0000-000000000001', 'MUL-001', 'Pickup',   'available',   'aaaaaaaa-0000-0000-0000-000000000001'),
  ('dddddddd-0000-0000-0000-000000000002', 'MUL-002', 'Forklift', 'in_use',      'aaaaaaaa-0000-0000-0000-000000000001'),
  ('dddddddd-0000-0000-0000-000000000003', 'MUL-003', 'Van',      'maintenance', 'aaaaaaaa-0000-0000-0000-000000000001')
on conflict (id) do nothing;

-- 5 warehouse items
insert into warehouse_items (id, name, category, stock, min_stock, company_id) values
  ('eeeeeeee-0000-0000-0000-000000000001', 'M10 hex bolts',        'Fasteners',  320, 100, 'aaaaaaaa-0000-0000-0000-000000000001'),
  ('eeeeeeee-0000-0000-0000-000000000002', 'Hydraulic hose 1/2"',  'Hydraulics',   4,   5, 'aaaaaaaa-0000-0000-0000-000000000001'),
  ('eeeeeeee-0000-0000-0000-000000000003', 'Bearing block BB-02',  'Mechanical',  12,  10, 'aaaaaaaa-0000-0000-0000-000000000001'),
  ('eeeeeeee-0000-0000-0000-000000000004', 'Welding rod 6010 box', 'Welding',      0,   3, 'aaaaaaaa-0000-0000-0000-000000000001'),
  ('eeeeeeee-0000-0000-0000-000000000005', 'Pressure sensor PS-4', 'Electronics',  7,   5, 'aaaaaaaa-0000-0000-0000-000000000001')
on conflict (id) do nothing;

-- Gamification record for Carmen (technician)
insert into gamification (user_id, points, streak, badges, week_points) values
  ('bbbbbbbb-0000-0000-0000-000000000003', 85, 2, '{"first_blood","reliable"}', 30)
on conflict (user_id) do nothing;
