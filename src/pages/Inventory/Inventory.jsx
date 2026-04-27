import { Search, ScanLine, Package, AlertTriangle } from 'lucide-react'

const parts = [
  {
    sku: 'HRN-4421',
    name: 'Sensor harness — 4 ft',
    location: 'Aisle B · Bin 12',
    qty: 248,
    status: 'ok',
  },
  {
    sku: 'CAM-0188',
    name: 'ADAS forward camera',
    location: 'Aisle A · Bin 03',
    qty: 6,
    status: 'low',
  },
  {
    sku: 'FUS-2200',
    name: 'Fuse panel — 12 slot',
    location: 'Aisle C · Bin 22',
    qty: 41,
    status: 'ok',
  },
  {
    sku: 'GPS-7711',
    name: 'GPS antenna magnetic',
    location: 'Aisle B · Bin 19',
    qty: 0,
    status: 'out',
  },
  {
    sku: 'CBL-5550',
    name: 'CAN bus cable — 25 ft',
    location: 'Aisle D · Bin 04',
    qty: 92,
    status: 'ok',
  },
]

const filters = ['All', 'Low stock', 'Out', 'Reserved']

const statusBadge = {
  ok: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30',
  low: 'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/30',
  out: 'text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/30',
}

const statusLabel = { ok: 'In stock', low: 'Low', out: 'Out' }

export default function Inventory() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-white md:text-3xl">Inventory</h1>
        <p className="mt-1 text-sm text-[#8a93a6]">
          Parts and supplies across the warehouse.
        </p>
      </header>

      <div className="flex gap-3">
        <div className="flex flex-1 items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3">
          <Search className="h-5 w-5 text-[#8a93a6]" />
          <input
            type="text"
            placeholder="Search parts or SKU"
            className="w-full bg-transparent text-base text-white placeholder-[#8a93a6] outline-none"
          />
        </div>
        <button
          type="button"
          aria-label="Scan barcode"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#60a5fa] text-[#0f1117] active:bg-[#3b82f6]"
        >
          <ScanLine className="h-6 w-6" />
        </button>
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
        {filters.map((f, i) => (
          <button
            key={f}
            type="button"
            className={`min-h-[40px] shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors ${
              i === 0
                ? 'border-[#60a5fa] bg-[#60a5fa]/15 text-[#60a5fa]'
                : 'border-[#262c3a] bg-[#161a23] text-[#8a93a6] active:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-[#f97316]/30 bg-[#f97316]/10 p-4">
        <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-[#f97316]" />
        <div>
          <p className="text-base font-semibold text-white">2 parts need reorder</p>
          <p className="mt-0.5 text-sm text-[#e6e9f2]/80">
            ADAS camera and GPS antenna are below threshold.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {parts.map((p) => (
          <button
            key={p.sku}
            type="button"
            className="flex w-full items-center gap-4 rounded-xl border border-[#262c3a] bg-[#161a23] p-4 text-left active:bg-[#1d2230]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#1d2230] text-[#60a5fa]">
              <Package className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-[#8a93a6]">
                  {p.sku}
                </span>
                <span
                  className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${statusBadge[p.status]}`}
                >
                  {statusLabel[p.status]}
                </span>
              </div>
              <p className="mt-1 text-base font-semibold text-white">{p.name}</p>
              <p className="mt-0.5 text-sm text-[#8a93a6]">{p.location}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{p.qty}</p>
              <p className="text-xs text-[#8a93a6]">on hand</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
