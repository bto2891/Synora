import { Plus, Search, ChevronRight, Car } from 'lucide-react'

const projects = [
  {
    id: 'PRJ-104',
    name: 'Fleet ADAS Retrofit',
    client: 'Northwind Logistics',
    progress: 72,
    status: 'On track',
    statusColor: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30',
  },
  {
    id: 'PRJ-098',
    name: 'EV Telematics Build',
    client: 'Bayside Motors',
    progress: 41,
    status: 'At risk',
    statusColor: 'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/30',
  },
  {
    id: 'PRJ-091',
    name: 'Cold Chain Sensors',
    client: 'Polar Foods',
    progress: 88,
    status: 'On track',
    statusColor: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30',
  },
  {
    id: 'PRJ-085',
    name: 'Cab Camera Install',
    client: 'Ridgeline Trucking',
    progress: 12,
    status: 'New',
    statusColor: 'text-[#60a5fa] bg-[#60a5fa]/10 border-[#60a5fa]/30',
  },
]

export default function Projects() {
  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white md:text-3xl">Projects</h1>
          <p className="mt-1 text-sm text-[#8a93a6]">
            Vehicle integration builds and client jobs.
          </p>
        </div>
      </header>

      <div className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3">
        <Search className="h-5 w-5 text-[#8a93a6]" />
        <input
          type="text"
          placeholder="Search projects"
          className="w-full bg-transparent text-base text-white placeholder-[#8a93a6] outline-none"
        />
      </div>

      <div className="space-y-3">
        {projects.map((p) => (
          <button
            key={p.id}
            type="button"
            className="flex w-full items-center gap-4 rounded-xl border border-[#262c3a] bg-[#161a23] p-4 text-left active:bg-[#1d2230]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#60a5fa]/10 text-[#60a5fa]">
              <Car className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-[#8a93a6]">
                  {p.id}
                </span>
                <span
                  className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${p.statusColor}`}
                >
                  {p.status}
                </span>
              </div>
              <p className="mt-1 text-base font-semibold text-white">{p.name}</p>
              <p className="text-sm text-[#8a93a6]">{p.client}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#262c3a]">
                  <div
                    className="h-full rounded-full bg-[#60a5fa]"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-[#e6e9f2]">
                  {p.progress}%
                </span>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-[#8a93a6]" />
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label="New project"
        className="fixed right-5 bottom-24 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#60a5fa] text-[#0f1117] shadow-lg shadow-[#60a5fa]/30 active:bg-[#3b82f6] md:bottom-8"
      >
        <Plus className="h-7 w-7" strokeWidth={2.5} />
      </button>
    </div>
  )
}
