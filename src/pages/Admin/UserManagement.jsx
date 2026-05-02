import { useState } from 'react'
import { Search, RefreshCw, X } from 'lucide-react'
import { SAMPLE_USERS, SAMPLE_COMPANIES } from '../../data/adminSample'

const ROLE_LABELS = {
  site_manager: 'Site Manager', supervisor: 'Supervisor', technician: 'Technician',
  warehouse_manager: 'Warehouse Mgr', fleet_manager: 'Fleet Mgr', project_manager: 'Project Mgr',
}
const ROLE_COLORS = {
  site_manager: '#60a5fa', supervisor: '#34d399', technician: '#e2e8f0',
  warehouse_manager: '#fbbf24', fleet_manager: '#fb923c', project_manager: '#a78bfa',
}

function generatePIN() {
  return String(Math.floor(1000 + Math.random() * 9000))
}

export default function UserManagement() {
  const [users, setUsers] = useState(SAMPLE_USERS)
  const [search, setSearch] = useState('')
  const [filterCompany, setFilterCompany] = useState('all')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selected, setSelected] = useState(new Set())
  const [newPin, setNewPin] = useState(null)

  const companies = [{ id: 'all', name: 'All Companies' }, ...SAMPLE_COMPANIES]
  const roles = ['all', ...Object.keys(ROLE_LABELS)]

  const filtered = users.filter((u) => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search)
    const matchCompany = filterCompany === 'all' || u.company_id === filterCompany
    const matchRole = filterRole === 'all' || u.role === filterRole
    const matchStatus = filterStatus === 'all' || (filterStatus === 'active' ? u.active : !u.active)
    return matchSearch && matchCompany && matchRole && matchStatus
  })

  function toggleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function bulkActivate(active) {
    setUsers((prev) =>
      prev.map((u) => selected.has(u.id) ? { ...u, active } : u)
    )
    setSelected(new Set())
  }

  function resetPin(userId) {
    const pin = generatePIN()
    const u = users.find((x) => x.id === userId)
    setNewPin({ name: u?.name ?? 'User', pin })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="mt-0.5 text-sm text-[#8a93a6]">{users.length} users across all companies</p>
        </div>
      </div>

      {newPin && (
        <div className="flex items-start justify-between rounded-xl border border-[#22c55e]/30 bg-[#22c55e]/8 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-[#22c55e]">New PIN for {newPin.name}</p>
            <p className="mt-1 text-2xl font-mono font-bold tracking-[0.4em] text-white">{newPin.pin}</p>
            <p className="mt-0.5 text-xs text-[#8a93a6]">Share once — not stored in this demo.</p>
          </div>
          <button type="button" onClick={() => setNewPin(null)}>
            <X className="h-4 w-4 text-[#8a93a6]" />
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex flex-1 items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-[#8a93a6]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or phone…"
            className="w-full bg-transparent text-sm text-white placeholder-[#8a93a6] outline-none"
          />
        </div>
        <select
          value={filterCompany}
          onChange={(e) => setFilterCompany(e.target.value)}
          className="rounded-xl border border-[#262c3a] bg-[#161a23] px-3 py-2.5 text-sm text-white outline-none"
        >
          {companies.map((c) => <option key={c.id} value={c.id} className="bg-[#161a23]">{c.name}</option>)}
        </select>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="rounded-xl border border-[#262c3a] bg-[#161a23] px-3 py-2.5 text-sm text-white outline-none"
        >
          {roles.map((r) => <option key={r} value={r} className="bg-[#161a23]">{r === 'all' ? 'All Roles' : ROLE_LABELS[r]}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-[#262c3a] bg-[#161a23] px-3 py-2.5 text-sm text-white outline-none"
        >
          {[['all','All Status'],['active','Active'],['inactive','Inactive']].map(([v, l]) => (
            <option key={v} value={v} className="bg-[#161a23]">{l}</option>
          ))}
        </select>
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-[#a78bfa]/30 bg-[#a78bfa]/8 px-4 py-3">
          <p className="text-sm text-[#a78bfa]">{selected.size} selected</p>
          <button
            type="button"
            onClick={() => bulkActivate(true)}
            className="rounded-lg bg-[#22c55e]/15 px-3 py-1.5 text-xs font-bold text-[#22c55e]"
          >
            Activate
          </button>
          <button
            type="button"
            onClick={() => bulkActivate(false)}
            className="rounded-lg bg-[#ef4444]/10 px-3 py-1.5 text-xs font-bold text-[#ef4444]"
          >
            Deactivate
          </button>
          <button
            type="button"
            onClick={() => setSelected(new Set())}
            className="ml-auto text-xs text-[#8a93a6]"
          >
            Clear
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#262c3a] bg-[#161a23]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#262c3a]">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selected.size === filtered.length && filtered.length > 0}
                  onChange={(e) => setSelected(e.target.checked ? new Set(filtered.map((u) => u.id)) : new Set())}
                  className="rounded"
                />
              </th>
              {['Name', 'Company', 'Role', 'Phone', 'Status', 'Points', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#8a93a6]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id} className={`${i > 0 ? 'border-t border-[#262c3a]' : ''} ${!u.active ? 'opacity-50' : ''}`}>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(u.id)}
                    onChange={() => toggleSelect(u.id)}
                    className="rounded"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-[#0f1117]"
                      style={{ backgroundColor: ROLE_COLORS[u.role] ?? '#8a93a6' }}
                    >
                      {u.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                    </div>
                    <span className="font-semibold text-white">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#8a93a6]">{u.company}</td>
                <td className="px-4 py-3">
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{ backgroundColor: `${ROLE_COLORS[u.role]}1a`, color: ROLE_COLORS[u.role] }}
                  >
                    {ROLE_LABELS[u.role]}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-[#8a93a6]">{u.phone}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold ${u.active ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                    {u.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-[#fbbf24]">{u.points}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Reset PIN"
                      onClick={() => resetPin(u.id)}
                      className="flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold text-[#8a93a6] hover:bg-[#262c3a] hover:text-white"
                    >
                      <RefreshCw className="h-3 w-3" />
                      PIN
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="py-12 text-center text-sm text-[#8a93a6]">
                  No users match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
