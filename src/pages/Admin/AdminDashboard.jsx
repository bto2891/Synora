import { Building2, Users, TrendingUp, DollarSign, Plus, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SAMPLE_COMPANIES, SAMPLE_USERS, REVENUE_DATA, ACTIVITY_LOG, PLAN_CONFIG } from '../../data/adminSample'

const totalRevenue = SAMPLE_COMPANIES.reduce((s, c) => s + c.monthly_price, 0)
const activeCompanies = SAMPLE_COMPANIES.filter((c) => c.status === 'active').length
const totalUsers = SAMPLE_USERS.length
const activeUsers = SAMPLE_USERS.filter((u) => u.active).length

const STAT_CARDS = [
  { label: 'Active Companies', value: activeCompanies, icon: Building2, color: '#a78bfa', sub: `${SAMPLE_COMPANIES.length} total` },
  { label: 'Total Users',      value: totalUsers,      icon: Users,     color: '#60a5fa', sub: `${activeUsers} active` },
  { label: 'Active Projects',  value: 2,               icon: TrendingUp, color: '#34d399', sub: 'across all companies' },
  { label: 'Monthly Revenue',  value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#fbbf24', sub: 'MRR' },
]

const ACTIVITY_COLORS = { user: '#60a5fa', company: '#a78bfa', billing: '#fbbf24' }

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-0.5 text-sm text-[#8a93a6]">Overview of all companies and activity</p>
        </div>
        <Link
          to="/admin/companies"
          className="flex items-center gap-2 rounded-lg bg-[#a78bfa] px-4 py-2.5 text-sm font-bold text-[#0f1117]"
        >
          <Plus className="h-4 w-4" />
          New Company
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STAT_CARDS.map(({ label, value, icon: Icon, color, sub }) => (
          <div key={label} className="rounded-xl border border-[#262c3a] bg-[#161a23] p-5">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${color}1a`, color }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-4 text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-[#8a93a6]">{label}</p>
            <p className="mt-0.5 text-xs text-[#8a93a6]/60">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue chart */}
        <div className="rounded-xl border border-[#262c3a] bg-[#161a23] p-5">
          <h2 className="mb-4 text-base font-semibold text-white">Revenue (6 months)</h2>
          <div className="flex items-end gap-2" style={{ height: 120 }}>
            {REVENUE_DATA.map((d) => {
              const max = Math.max(...REVENUE_DATA.map((r) => r.revenue))
              const pct = (d.revenue / max) * 100
              return (
                <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-sm bg-[#a78bfa]"
                    style={{ height: `${pct}%`, minHeight: 4 }}
                  />
                  <span className="text-[10px] text-[#8a93a6]">{d.month}</span>
                </div>
              )
            })}
          </div>
          <p className="mt-3 text-xs text-[#8a93a6]">
            MRR: <span className="font-bold text-[#a78bfa]">${totalRevenue.toLocaleString()}/mo</span>
          </p>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-[#262c3a] bg-[#161a23] p-5">
          <h2 className="mb-4 text-base font-semibold text-white">Recent Activity</h2>
          <div className="space-y-3">
            {ACTIVITY_LOG.map((log) => (
              <div key={log.id} className="flex items-start gap-3">
                <div
                  className="mt-0.5 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: ACTIVITY_COLORS[log.type] ?? '#8a93a6' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{log.action}</p>
                  <p className="text-xs text-[#8a93a6]">{log.detail}</p>
                </div>
                <span className="shrink-0 text-xs text-[#8a93a6]">{timeAgo(log.at)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Companies summary */}
      <div className="rounded-xl border border-[#262c3a] bg-[#161a23]">
        <div className="flex items-center justify-between border-b border-[#262c3a] px-5 py-4">
          <h2 className="text-base font-semibold text-white">Companies</h2>
          <Link to="/admin/companies" className="text-xs font-semibold text-[#a78bfa]">
            View all →
          </Link>
        </div>
        {SAMPLE_COMPANIES.map((co, i) => {
          const planCfg = PLAN_CONFIG[co.plan]
          return (
            <div
              key={co.id}
              className={`flex items-center gap-4 px-5 py-4 ${i > 0 ? 'border-t border-[#262c3a]' : ''}`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1d2230] text-sm font-bold text-white">
                {co.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{co.name}</p>
                <p className="text-xs text-[#8a93a6]">{co.users_count} users</p>
              </div>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                style={{ backgroundColor: `${planCfg.color}1a`, color: planCfg.color }}
              >
                {planCfg.label}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  co.status === 'active' ? 'bg-[#22c55e]/10 text-[#22c55e]'
                  : co.status === 'trial' ? 'bg-[#fbbf24]/10 text-[#fbbf24]'
                  : 'bg-[#ef4444]/10 text-[#ef4444]'
                }`}
              >
                {co.status}
              </span>
              <p className="text-sm font-semibold text-white">
                ${co.monthly_price.toLocaleString()}/mo
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
