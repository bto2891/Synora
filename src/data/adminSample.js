export const SAMPLE_COMPANIES = [
  {
    id: 'c-001',
    name: 'GM Silao Project',
    plan: 'business',
    status: 'active',
    monthly_price: 999,
    contact_name: 'Hector Beltran',
    contact_email: 'hector@gm-silao.com',
    users_count: 6,
    created_at: '2026-01-15T00:00:00',
  },
  {
    id: 'c-002',
    name: 'AutoMex SA',
    plan: 'pro',
    status: 'active',
    monthly_price: 499,
    contact_name: 'Ana Delgado',
    contact_email: 'ana@automex.com',
    users_count: 3,
    created_at: '2026-02-03T00:00:00',
  },
  {
    id: 'c-003',
    name: 'Solaris Builds',
    plan: 'starter',
    status: 'trial',
    monthly_price: 0,
    contact_name: 'Pedro Lagos',
    contact_email: 'pedro@solaris.com',
    users_count: 1,
    created_at: '2026-04-10T00:00:00',
  },
]

export const SAMPLE_USERS = [
  { id: 'su-01', name: 'Olivia Park',    phone: '+52-477-001-0001', role: 'site_manager',      company_id: 'c-001', company: 'GM Silao Project', active: true,  points: 0,   last_active: '2026-05-01', created_at: '2026-01-15' },
  { id: 'su-02', name: 'Marco Alvarez',  phone: '+52-477-001-0002', role: 'supervisor',        company_id: 'c-001', company: 'GM Silao Project', active: true,  points: 0,   last_active: '2026-05-01', created_at: '2026-01-15' },
  { id: 'su-03', name: 'Diego Ramos',    phone: '+52-477-001-0003', role: 'technician',        company_id: 'c-001', company: 'GM Silao Project', active: true,  points: 145, last_active: '2026-05-01', created_at: '2026-01-15' },
  { id: 'su-04', name: 'Isabela Cruz',   phone: '+52-477-001-0004', role: 'warehouse_manager', company_id: 'c-001', company: 'GM Silao Project', active: true,  points: 0,   last_active: '2026-04-30', created_at: '2026-01-15' },
  { id: 'su-05', name: 'Hector Beltran', phone: '+52-477-001-0005', role: 'project_manager',   company_id: 'c-001', company: 'GM Silao Project', active: true,  points: 0,   last_active: '2026-04-29', created_at: '2026-01-15' },
  { id: 'su-06', name: 'Carlos Ruiz',    phone: '+52-477-001-0006', role: 'fleet_manager',     company_id: 'c-001', company: 'GM Silao Project', active: true,  points: 0,   last_active: '2026-04-28', created_at: '2026-01-15' },
  { id: 'su-07', name: 'Ana Delgado',    phone: '+52-477-002-0001', role: 'site_manager',      company_id: 'c-002', company: 'AutoMex SA',        active: true,  points: 0,   last_active: '2026-04-30', created_at: '2026-02-03' },
  { id: 'su-08', name: 'Luis Mora',      phone: '+52-477-002-0002', role: 'supervisor',        company_id: 'c-002', company: 'AutoMex SA',        active: true,  points: 0,   last_active: '2026-04-28', created_at: '2026-02-03' },
  { id: 'su-09', name: 'Sofia Reyes',    phone: '+52-477-002-0003', role: 'technician',        company_id: 'c-002', company: 'AutoMex SA',        active: false, points: 0,   last_active: '2026-03-15', created_at: '2026-02-03' },
  { id: 'su-10', name: 'Pedro Lagos',    phone: '+52-477-003-0001', role: 'site_manager',      company_id: 'c-003', company: 'Solaris Builds',    active: true,  points: 0,   last_active: '2026-04-25', created_at: '2026-04-10' },
]

export const REVENUE_DATA = [
  { month: 'Nov', revenue: 1299 },
  { month: 'Dec', revenue: 1299 },
  { month: 'Jan', revenue: 1498 },
  { month: 'Feb', revenue: 1498 },
  { month: 'Mar', revenue: 1498 },
  { month: 'Apr', revenue: 1498 },
]

export const ACTIVITY_LOG = [
  { id: 'al-01', action: 'User created',      detail: 'Diego Ramos added to GM Silao Project',  at: '2026-05-01T09:00:00', type: 'user' },
  { id: 'al-02', action: 'Company activated', detail: 'AutoMex SA moved from trial to active',   at: '2026-04-28T14:30:00', type: 'company' },
  { id: 'al-03', action: 'PIN reset',         detail: 'Sofia Reyes PIN reset by admin',           at: '2026-04-27T11:00:00', type: 'user' },
  { id: 'al-04', action: 'Company created',   detail: 'Solaris Builds onboarded (trial)',         at: '2026-04-10T10:00:00', type: 'company' },
  { id: 'al-05', action: 'Plan upgraded',     detail: 'GM Silao Project: pro → business',         at: '2026-03-01T08:00:00', type: 'billing' },
]

export const PLAN_CONFIG = {
  starter:  { label: 'Starter',  color: '#8a93a6', price: 0,   maxUsers: 5 },
  pro:      { label: 'Pro',      color: '#60a5fa', price: 499, maxUsers: 25 },
  business: { label: 'Business', color: '#a78bfa', price: 999, maxUsers: 999 },
}

export const SUPER_ADMIN_USER = {
  id: 'sa-root',
  name: 'Super Admin',
  email: 'admin@synora.io',
  role: 'super_admin',
  initials: 'SA',
}
