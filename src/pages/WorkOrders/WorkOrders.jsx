import { Plus, Search, ChevronRight, Clock, User } from 'lucide-react'

const orders = [
  {
    id: 'WO-2418',
    title: 'Install rear sensor harness',
    vehicle: 'Ford F-150 — Bay 3',
    assignee: 'M. Alvarez',
    due: 'Today, 10:30 AM',
    priority: 'urgent',
    status: 'In progress',
    statusColor: 'text-[#60a5fa] bg-[#60a5fa]/10 border-[#60a5fa]/30',
  },
  {
    id: 'WO-2419',
    title: 'Calibrate ADAS camera',
    vehicle: 'Tesla Model Y — Bay 1',
    assignee: 'You',
    due: 'Today, 12:00 PM',
    priority: 'normal',
    status: 'Open',
    statusColor: 'text-[#8a93a6] bg-[#1d2230] border-[#262c3a]',
  },
  {
    id: 'WO-2412',
    title: 'Wiring fault diagnostic',
    vehicle: 'RAM 1500 — Bay 2',
    assignee: 'J. Park',
    due: 'Overdue 2 days',
    priority: 'urgent',
    status: 'Overdue',
    statusColor: 'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/30',
  },
  {
    id: 'WO-2420',
    title: 'Replace fuse panel',
    vehicle: 'RAM 2500 — Bay 5',
    assignee: 'Unassigned',
    due: 'Today, 2:15 PM',
    priority: 'normal',
    status: 'Open',
    statusColor: 'text-[#8a93a6] bg-[#1d2230] border-[#262c3a]',
  },
  {
    id: 'WO-2401',
    title: 'Install GPS tracker',
    vehicle: 'Sprinter Van — Bay 4',
    assignee: 'M. Alvarez',
    due: 'Yesterday',
    priority: 'normal',
    status: 'Done',
    statusColor: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30',
  },
]

const filters = ['All', 'Mine', 'Urgent', 'Overdue', 'Done']

const priorityStyles = {
  urgent: 'bg-[#f97316]/15 text-[#f97316] border-[#f97316]/30',
  normal: 'bg-[#60a5fa]/15 text-[#60a5fa] border-[#60a5fa]/30',
}

export default function WorkOrders() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-white md:text-3xl">Work Orders</h1>
        <p className="mt-1 text-sm text-[#8a93a6]">
          Installation and service tickets.
        </p>
      </header>

      <div className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3">
        <Search className="h-5 w-5 text-[#8a93a6]" />
        <input
          type="text"
          placeholder="Search work orders"
          className="w-full bg-transparent text-base text-white placeholder-[#8a93a6] outline-none"
        />
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

      <div className="space-y-3">
        {orders.map((wo) => (
          <button
            key={wo.id}
            type="button"
            className="flex w-full items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] p-4 text-left active:bg-[#1d2230]"
          >
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-semibold text-[#8a93a6]">
                  {wo.id}
                </span>
                <span
                  className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${priorityStyles[wo.priority]}`}
                >
                  {wo.priority}
                </span>
                <span
                  className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${wo.statusColor}`}
                >
                  {wo.status}
                </span>
              </div>
              <p className="mt-1.5 text-base font-semibold text-white">
                {wo.title}
              </p>
              <p className="mt-0.5 text-sm text-[#8a93a6]">{wo.vehicle}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#8a93a6]">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {wo.due}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {wo.assignee}
                </span>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-[#8a93a6]" />
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label="New work order"
        className="fixed right-5 bottom-24 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#60a5fa] text-[#0f1117] shadow-lg shadow-[#60a5fa]/30 active:bg-[#3b82f6] md:bottom-8"
      >
        <Plus className="h-7 w-7" strokeWidth={2.5} />
      </button>
    </div>
  )
}
