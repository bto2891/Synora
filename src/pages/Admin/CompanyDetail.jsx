import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, User, RefreshCw, Edit, X } from 'lucide-react'
import { SAMPLE_COMPANIES, SAMPLE_USERS, PLAN_CONFIG } from '../../data/adminSample'

const ROLES_LIST = ['site_manager','supervisor','technician','warehouse_manager','fleet_manager','project_manager']
const ROLE_LABELS = {
  site_manager: 'Site Manager', supervisor: 'Supervisor', technician: 'Technician',
  warehouse_manager: 'Warehouse Manager', fleet_manager: 'Fleet Manager', project_manager: 'Project Manager',
}
const ROLE_COLORS = {
  site_manager: '#60a5fa', supervisor: '#34d399', technician: '#e2e8f0',
  warehouse_manager: '#fbbf24', fleet_manager: '#fb923c', project_manager: '#a78bfa',
}

function generatePIN() {
  return String(Math.floor(1000 + Math.random() * 9000))
}

export default function CompanyDetail() {
  const { id } = useParams()
  const company = SAMPLE_COMPANIES.find((c) => c.id === id)

  const [users, setUsers] = useState(SAMPLE_USERS.filter((u) => u.company_id === id))
  const [showAddUser, setShowAddUser] = useState(false)
  const [newPin, setNewPin] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', role: 'technician' })
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  if (!company) {
    return (
      <div className="py-20 text-center text-sm text-[#8a93a6]">
        Company not found.{' '}
        <Link to="/admin/companies" className="text-[#a78bfa]">Go back</Link>
      </div>
    )
  }

  const planCfg = PLAN_CONFIG[company.plan]

  function handleAddUser(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    const pin = generatePIN()
    setUsers((prev) => [
      ...prev,
      {
        id: `su-new-${Date.now()}`,
        name: form.name.trim(),
        phone: form.phone.trim(),
        role: form.role,
        company_id: id,
        company: company.name,
        active: true,
        points: 0,
        last_active: '—',
        created_at: new Date().toISOString().slice(0, 10),
        _newPin: pin,
      },
    ])
    setNewPin({ name: form.name.trim(), pin })
    setForm({ name: '', phone: '', role: 'technician' })
    setShowAddUser(false)
  }

  function handleResetPin(userId) {
    const pin = generatePIN()
    const u = users.find((x) => x.id === userId)
    setNewPin({ name: u?.name ?? 'User', pin })
  }

  function toggleActive(userId) {
    setUsers((prev) =>
      prev.map((u) => u.id === userId ? { ...u, active: !u.active } : u)
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/admin/companies" className="text-[#8a93a6] hover:text-white">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{company.name}</h1>
          <p className="text-sm text-[#8a93a6]">Company detail</p>
        </div>
      </div>

      {/* Company info */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-[#262c3a] bg-[#161a23] p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#8a93a6]">Company Info</h2>
          <div className="space-y-3">
            {[
              { label: 'Name', value: company.name },
              { label: 'Contact', value: company.contact_name || '—' },
              { label: 'Email', value: company.contact_email || '—' },
              { label: 'Created', value: new Date(company.created_at).toLocaleDateString() },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-[#8a93a6]">{label}</span>
                <span className="font-medium text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#262c3a] bg-[#161a23] p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#8a93a6]">Plan & Billing</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#8a93a6]">Plan</span>
              <span
                className="rounded-full px-3 py-0.5 text-sm font-bold"
                style={{ backgroundColor: `${planCfg.color}1a`, color: planCfg.color }}
              >
                {planCfg.label}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#8a93a6]">Monthly price</span>
              <span className="font-bold text-white">${company.monthly_price.toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#8a93a6]">Max users</span>
              <span className="font-medium text-white">{planCfg.maxUsers === 999 ? 'Unlimited' : planCfg.maxUsers}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#8a93a6]">Status</span>
              <span className={`font-bold ${company.status === 'active' ? 'text-[#22c55e]' : company.status === 'trial' ? 'text-[#fbbf24]' : 'text-[#ef4444]'}`}>
                {company.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* New PIN notification */}
      {newPin && (
        <div className="flex items-start justify-between rounded-xl border border-[#22c55e]/30 bg-[#22c55e]/8 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-[#22c55e]">PIN for {newPin.name}</p>
            <p className="mt-1 text-2xl font-mono font-bold tracking-[0.3em] text-white">{newPin.pin}</p>
            <p className="mt-0.5 text-xs text-[#8a93a6]">Share this PIN once — it won't be shown again.</p>
          </div>
          <button type="button" onClick={() => setNewPin(null)}>
            <X className="h-4 w-4 text-[#8a93a6]" />
          </button>
        </div>
      )}

      {/* Users */}
      <div className="rounded-xl border border-[#262c3a] bg-[#161a23]">
        <div className="flex items-center justify-between border-b border-[#262c3a] px-5 py-4">
          <h2 className="text-base font-semibold text-white">Users ({users.length})</h2>
          <button
            type="button"
            onClick={() => setShowAddUser(true)}
            className="flex items-center gap-2 rounded-lg bg-[#a78bfa]/15 px-3 py-1.5 text-xs font-bold text-[#a78bfa]"
          >
            <Plus className="h-3.5 w-3.5" />
            Add User
          </button>
        </div>

        {/* Add user form */}
        {showAddUser && (
          <div className="border-b border-[#262c3a] bg-[#1d2230] px-5 py-4">
            <form onSubmit={handleAddUser} className="grid gap-3 lg:grid-cols-4">
              <input
                value={form.name}
                onChange={set('name')}
                placeholder="Full name"
                className="rounded-lg border border-[#262c3a] bg-[#161a23] px-3 py-2 text-sm text-white placeholder-[#8a93a6] outline-none focus:border-[#a78bfa]"
              />
              <input
                value={form.phone}
                onChange={set('phone')}
                placeholder="+52-477-000-0000"
                className="rounded-lg border border-[#262c3a] bg-[#161a23] px-3 py-2 text-sm text-white placeholder-[#8a93a6] outline-none focus:border-[#a78bfa]"
              />
              <select
                value={form.role}
                onChange={set('role')}
                className="rounded-lg border border-[#262c3a] bg-[#161a23] px-3 py-2 text-sm text-white outline-none"
              >
                {ROLES_LIST.map((r) => (
                  <option key={r} value={r} className="bg-[#161a23]">{ROLE_LABELS[r]}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="flex-1 rounded-lg border border-[#262c3a] text-xs font-semibold text-[#8a93a6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-[#a78bfa] text-xs font-bold text-[#0f1117]"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        )}

        {users.map((u, i) => (
          <div
            key={u.id}
            className={`flex items-center gap-3 px-5 py-4 ${i > 0 ? 'border-t border-[#262c3a]' : ''} ${!u.active ? 'opacity-50' : ''}`}
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-[#0f1117]"
              style={{ backgroundColor: ROLE_COLORS[u.role] ?? '#8a93a6' }}
            >
              {u.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{u.name}</p>
              <p className="text-xs text-[#8a93a6]">{u.phone} · {ROLE_LABELS[u.role]}</p>
            </div>
            <span className={`text-xs font-semibold ${u.active ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
              {u.active ? 'Active' : 'Inactive'}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                title="Reset PIN"
                onClick={() => handleResetPin(u.id)}
                className="rounded p-1.5 text-[#8a93a6] hover:bg-[#262c3a] hover:text-white"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                title={u.active ? 'Deactivate' : 'Activate'}
                onClick={() => toggleActive(u.id)}
                className={`rounded px-2 py-1 text-xs font-semibold ${
                  u.active ? 'text-[#ef4444] hover:bg-[#ef4444]/10' : 'text-[#22c55e] hover:bg-[#22c55e]/10'
                }`}
              >
                {u.active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <p className="py-8 text-center text-sm text-[#8a93a6]">No users yet. Add the first one.</p>
        )}
      </div>
    </div>
  )
}
