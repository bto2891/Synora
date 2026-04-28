import { useAuth } from '../../auth/AuthContext'
import { Search, Package, AlertTriangle, Plus, Send } from 'lucide-react'
import { WAREHOUSE_ITEMS } from '../../data/sample'

function stockBadge(item) {
  if (item.stock === 0) {
    return {
      label: 'Out',
      cls: 'text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/30',
    }
  }
  if (item.stock <= item.threshold) {
    return {
      label: 'Low',
      cls: 'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/30',
    }
  }
  return {
    label: 'In stock',
    cls: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30',
  }
}

export default function Warehouse() {
  const { user, role } = useAuth()
  const accent = role.accent
  const lowItems = WAREHOUSE_ITEMS.filter((i) => i.stock <= i.threshold)

  if (user.role === 'site_manager') {
    return (
      <div className="space-y-5">
        <header>
          <h1 className="text-2xl font-bold text-white">Warehouse overview</h1>
          <p className="mt-0.5 text-sm text-[#8a93a6]">
            Stock alerts across the project
          </p>
        </header>
        <div className="rounded-xl border border-[#f97316]/30 bg-[#f97316]/10 p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-[#f97316]" />
            <p className="text-base font-semibold text-white">
              {lowItems.length} items need attention
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {lowItems.map((it) => {
            const b = stockBadge(it)
            return (
              <div
                key={it.sku}
                className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] p-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1d2230] text-[#60a5fa]">
                  <Package className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#8a93a6]">
                      {it.sku}
                    </span>
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase ${b.cls}`}
                    >
                      {b.label}
                    </span>
                  </div>
                  <p className="mt-1 text-base font-semibold text-white">
                    {it.name}
                  </p>
                  <p className="text-sm text-[#8a93a6]">Loc {it.location}</p>
                </div>
                <p className="text-2xl font-bold text-white">{it.stock}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const canManage = user.role === 'warehouse_manager'
  const isTechnician = user.role === 'technician'

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-white">Warehouse</h1>
        <p className="mt-0.5 text-sm text-[#8a93a6]">
          {canManage
            ? 'Manage parts and stock'
            : isTechnician
              ? 'Browse and request parts'
              : 'Available parts'}
        </p>
      </header>

      <div className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3">
        <Search className="h-5 w-5 text-[#8a93a6]" />
        <input
          type="text"
          placeholder="Search parts or SKU"
          className="w-full bg-transparent text-base text-white placeholder-[#8a93a6] outline-none"
        />
      </div>

      <div className="space-y-3">
        {WAREHOUSE_ITEMS.map((it) => {
          const b = stockBadge(it)
          const out = it.stock === 0
          return (
            <div
              key={it.sku}
              className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1d2230] text-[#60a5fa]">
                  <Package className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#8a93a6]">
                      {it.sku}
                    </span>
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase ${b.cls}`}
                    >
                      {b.label}
                    </span>
                  </div>
                  <p className="mt-1 text-base font-semibold text-white">
                    {it.name}
                  </p>
                  <p className="text-sm text-[#8a93a6]">Loc {it.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{it.stock}</p>
                  <p className="text-xs text-[#8a93a6]">on hand</p>
                </div>
              </div>

              {isTechnician && (
                <button
                  type="button"
                  disabled={out}
                  className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg text-base font-bold text-[#0f1117] disabled:opacity-40"
                  style={{ backgroundColor: out ? '#262c3a' : accent }}
                >
                  <Send className="h-5 w-5" />
                  {out ? 'Out of stock' : 'Request'}
                </button>
              )}

              {canManage && (
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    className="min-h-[44px] flex-1 rounded-lg border border-[#262c3a] bg-[#1d2230] text-sm font-semibold text-white active:bg-[#262c3a]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="min-h-[44px] flex-1 rounded-lg text-sm font-bold text-[#0f1117] active:opacity-90"
                    style={{ backgroundColor: accent }}
                  >
                    Restock
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {canManage && (
        <button
          type="button"
          aria-label="Add item"
          className="fixed right-5 bottom-24 z-30 flex h-14 items-center gap-2 rounded-full px-5 text-base font-bold text-[#0f1117] shadow-lg active:opacity-90"
          style={{ backgroundColor: accent, boxShadow: `0 10px 25px -5px ${accent}66` }}
        >
          <Plus className="h-6 w-6" strokeWidth={2.5} />
          Add item
        </button>
      )}
    </div>
  )
}
