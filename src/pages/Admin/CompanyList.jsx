import { useState } from 'react'
import { Plus, Search, MoreVertical, Building2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SAMPLE_COMPANIES, PLAN_CONFIG } from '../../data/adminSample'

const STATUS_CLS = {
  active:    'bg-[#22c55e]/10 text-[#22c55e]',
  trial:     'bg-[#fbbf24]/10 text-[#fbbf24]',
  suspended: 'bg-[#ef4444]/10 text-[#ef4444]',
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const PLAN_OPTIONS = ['starter', 'pro', 'business']

export default function CompanyList() {
  const [companies, setCompanies] = useState(SAMPLE_COMPANIES)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', plan: 'starter', contact_name: '', contact_email: '' })

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  function handleCreate(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    const planCfg = PLAN_CONFIG[form.plan]
    setCompanies((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        name: form.name.trim(),
        plan: form.plan,
        status: 'trial',
        monthly_price: planCfg.price,
        contact_name: form.contact_name,
        contact_email: form.contact_email,
        users_count: 0,
        created_at: new Date().toISOString(),
      },
    ])
    setForm({ name: '', plan: 'starter', contact_name: '', contact_email: '' })
    setShowForm(false)
  }

  function toggleStatus(id) {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'active' ? 'suspended' : 'active' }
          : c
      )
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Companies</h1>
          <p className="mt-0.5 text-sm text-[#8a93a6]">{companies.length} companies registered</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-[#a78bfa] px-4 py-2.5 text-sm font-bold text-[#0f1117]"
        >
          <Plus className="h-4 w-4" />
          New Company
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3">
        <Search className="h-4 w-4 text-[#8a93a6]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search companies…"
          className="w-full bg-transparent text-sm text-white placeholder-[#8a93a6] outline-none"
        />
      </div>

      {/* Create form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#262c3a] bg-[#161a23] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Create Company</h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X className="h-5 w-5 text-[#8a93a6]" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3">
              {[
                { label: 'Company Name', key: 'name', placeholder: 'Acme Corp', type: 'text' },
                { label: 'Contact Name', key: 'contact_name', placeholder: 'John Doe', type: 'text' },
                { label: 'Contact Email', key: 'contact_email', placeholder: 'john@acme.com', type: 'email' },
              ].map(({ label, key, placeholder, type }) => (
                <label key={key} className="block">
                  <span className="mb-1 block text-xs font-semibold text-[#8a93a6]">{label}</span>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={set(key)}
                    placeholder={placeholder}
                    className="w-full rounded-lg border border-[#262c3a] bg-[#1d2230] px-3 py-2.5 text-sm text-white placeholder-[#8a93a6] outline-none focus:border-[#a78bfa]"
                  />
                </label>
              ))}
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-[#8a93a6]">Plan</span>
                <select
                  value={form.plan}
                  onChange={set('plan')}
                  className="w-full rounded-lg border border-[#262c3a] bg-[#1d2230] px-3 py-2.5 text-sm text-white outline-none"
                >
                  {PLAN_OPTIONS.map((p) => (
                    <option key={p} value={p} className="bg-[#1d2230]">
                      {PLAN_CONFIG[p].label} — ${PLAN_CONFIG[p].price}/mo
                    </option>
                  ))}
                </select>
              </label>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-lg border border-[#262c3a] py-2.5 text-sm font-semibold text-[#8a93a6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-[#a78bfa] py-2.5 text-sm font-bold text-[#0f1117]"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#262c3a] bg-[#161a23]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#262c3a]">
              {['Company', 'Plan', 'Users', 'Status', 'Revenue', 'Created', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#8a93a6]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((co, i) => {
              const planCfg = PLAN_CONFIG[co.plan]
              return (
                <tr key={co.id} className={i > 0 ? 'border-t border-[#262c3a]' : ''}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1d2230] text-xs font-bold text-white">
                        {co.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{co.name}</p>
                        <p className="text-xs text-[#8a93a6]">{co.contact_email || '—'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                      style={{ backgroundColor: `${planCfg.color}1a`, color: planCfg.color }}
                    >
                      {planCfg.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white">{co.users_count}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${STATUS_CLS[co.status]}`}>
                      {co.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-white">
                    ${co.monthly_price.toLocaleString()}/mo
                  </td>
                  <td className="px-4 py-3 text-[#8a93a6]">{formatDate(co.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/companies/${co.id}`}
                        className="rounded px-2 py-1 text-xs font-semibold text-[#a78bfa] hover:bg-[#a78bfa]/10"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleStatus(co.id)}
                        className={`rounded px-2 py-1 text-xs font-semibold ${
                          co.status === 'suspended'
                            ? 'text-[#22c55e] hover:bg-[#22c55e]/10'
                            : 'text-[#ef4444] hover:bg-[#ef4444]/10'
                        }`}
                      >
                        {co.status === 'suspended' ? 'Activate' : 'Suspend'}
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-sm text-[#8a93a6]">
                  No companies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
