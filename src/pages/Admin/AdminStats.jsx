import { TrendingUp, Users, Building2, DollarSign } from 'lucide-react'
import { SAMPLE_COMPANIES, SAMPLE_USERS, REVENUE_DATA, PLAN_CONFIG } from '../../data/adminSample'

const totalRevenue = SAMPLE_COMPANIES.reduce((s, c) => s + c.monthly_price, 0)

const planCounts = Object.keys(PLAN_CONFIG).map((plan) => ({
  plan,
  count: SAMPLE_COMPANIES.filter((c) => c.plan === plan).length,
}))

const usersByCompany = SAMPLE_COMPANIES.map((co) => ({
  name: co.name,
  count: SAMPLE_USERS.filter((u) => u.company_id === co.id).length,
})).sort((a, b) => b.count - a.count)

const activeUsers = SAMPLE_USERS.filter((u) => u.active).length

export default function AdminStats() {
  const maxRevenue = Math.max(...REVENUE_DATA.map((r) => r.revenue))
  const maxUsers = Math.max(...usersByCompany.map((u) => u.count))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Stats & Analytics</h1>
        <p className="mt-0.5 text-sm text-[#8a93a6]">Platform-wide metrics across all companies</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'MRR', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#fbbf24', trend: '+12%' },
          { label: 'Total Users', value: SAMPLE_USERS.length, icon: Users, color: '#60a5fa', trend: `${activeUsers} active` },
          { label: 'Companies', value: SAMPLE_COMPANIES.length, icon: Building2, color: '#a78bfa', trend: '1 on trial' },
          { label: 'Growth',   value: '+23%', icon: TrendingUp, color: '#34d399', trend: 'vs last month' },
        ].map(({ label, value, icon: Icon, color, trend }) => (
          <div key={label} className="rounded-xl border border-[#262c3a] bg-[#161a23] p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}1a`, color }}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-[#22c55e]">{trend}</span>
            </div>
            <p className="mt-3 text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-[#8a93a6]">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue bar chart */}
        <div className="rounded-xl border border-[#262c3a] bg-[#161a23] p-5">
          <h2 className="mb-1 text-base font-semibold text-white">Monthly Revenue</h2>
          <p className="mb-5 text-xs text-[#8a93a6]">Last 6 months</p>
          <div className="flex items-end gap-3" style={{ height: 140 }}>
            {REVENUE_DATA.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-[10px] font-semibold text-[#a78bfa]">
                  ${(d.revenue / 1000).toFixed(1)}k
                </span>
                <div
                  className="w-full rounded-t bg-gradient-to-t from-[#a78bfa] to-[#a78bfa]/60"
                  style={{ height: `${(d.revenue / maxRevenue) * 90}%`, minHeight: 8 }}
                />
                <span className="text-[10px] text-[#8a93a6]">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plan breakdown */}
        <div className="rounded-xl border border-[#262c3a] bg-[#161a23] p-5">
          <h2 className="mb-1 text-base font-semibold text-white">Companies by Plan</h2>
          <p className="mb-5 text-xs text-[#8a93a6]">Distribution across tiers</p>
          <div className="space-y-4">
            {planCounts.map(({ plan, count }) => {
              const cfg = PLAN_CONFIG[plan]
              const pct = SAMPLE_COMPANIES.length > 0 ? (count / SAMPLE_COMPANIES.length) * 100 : 0
              return (
                <div key={plan}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ color: cfg.color }}>{cfg.label}</span>
                    <span className="text-sm text-[#8a93a6]">{count} companies</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#262c3a]">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: cfg.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Users by company */}
        <div className="rounded-xl border border-[#262c3a] bg-[#161a23] p-5">
          <h2 className="mb-1 text-base font-semibold text-white">Most Active Companies</h2>
          <p className="mb-5 text-xs text-[#8a93a6]">By user count</p>
          <div className="space-y-3">
            {usersByCompany.map(({ name, count }) => (
              <div key={name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-white">{name}</span>
                  <span className="text-[#8a93a6]">{count} users</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#262c3a]">
                  <div
                    className="h-full rounded-full bg-[#60a5fa]"
                    style={{ width: `${(count / maxUsers) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User growth (static example) */}
        <div className="rounded-xl border border-[#262c3a] bg-[#161a23] p-5">
          <h2 className="mb-1 text-base font-semibold text-white">User Growth</h2>
          <p className="mb-5 text-xs text-[#8a93a6]">New users per month</p>
          {(() => {
            const months = ['Nov','Dec','Jan','Feb','Mar','Apr']
            const counts = [2, 2, 3, 5, 8, 10]
            const max = Math.max(...counts)
            return (
              <div className="flex items-end gap-3" style={{ height: 120 }}>
                {months.map((m, i) => (
                  <div key={m} className="flex flex-1 flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-[#34d399] to-[#34d399]/60"
                      style={{ height: `${(counts[i] / max) * 90}%`, minHeight: 8 }}
                    />
                    <span className="text-[10px] text-[#8a93a6]">{m}</span>
                  </div>
                ))}
              </div>
            )
          })()}
        </div>
      </div>
    </div>
  )
}
