import {
  FolderKanban,
  Package,
  ClipboardList,
  AlertTriangle,
  ScanLine,
  Plus,
  ChevronRight,
  Wrench,
  Clock,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  {
    label: 'Active Projects',
    value: '12',
    icon: FolderKanban,
    accent: 'text-[#60a5fa] bg-[#60a5fa]/10',
  },
  {
    label: 'Parts in Stock',
    value: '1,847',
    icon: Package,
    accent: 'text-[#22c55e] bg-[#22c55e]/10',
  },
  {
    label: 'Open Orders',
    value: '34',
    icon: ClipboardList,
    accent: 'text-[#60a5fa] bg-[#60a5fa]/10',
  },
  {
    label: 'Overdue',
    value: '3',
    icon: AlertTriangle,
    accent: 'text-[#f97316] bg-[#f97316]/10',
  },
]

const todayWorkOrders = [
  {
    id: 'WO-2418',
    title: 'Install rear sensor harness',
    vehicle: 'Ford F-150 — Bay 3',
    due: '10:30 AM',
    priority: 'urgent',
  },
  {
    id: 'WO-2419',
    title: 'Calibrate ADAS camera',
    vehicle: 'Tesla Model Y — Bay 1',
    due: '12:00 PM',
    priority: 'normal',
  },
  {
    id: 'WO-2420',
    title: 'Replace fuse panel',
    vehicle: 'RAM 2500 — Bay 5',
    due: '2:15 PM',
    priority: 'normal',
  },
]

const priorityStyles = {
  urgent: 'bg-[#f97316]/15 text-[#f97316] border-[#f97316]/30',
  normal: 'bg-[#60a5fa]/15 text-[#60a5fa] border-[#60a5fa]/30',
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-[#8a93a6]">Tuesday, April 27</p>
        <h1 className="mt-1 text-3xl font-bold text-white">Good morning, OP</h1>
        <p className="mt-1 text-base text-[#8a93a6]">
          You have 5 work orders scheduled today.
        </p>
      </header>

      <div className="flex items-start gap-3 rounded-xl border border-[#f97316]/30 bg-[#f97316]/10 p-4">
        <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-[#f97316]" />
        <div className="flex-1">
          <p className="text-base font-semibold text-white">3 overdue items</p>
          <p className="mt-0.5 text-sm text-[#e6e9f2]/80">
            Tap to review and reassign overdue work.
          </p>
        </div>
        <Link
          to="/work-orders"
          className="rounded-lg bg-[#f97316] px-4 py-2 text-sm font-semibold text-white active:bg-[#ea6a0c]"
        >
          Review
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, accent }) => (
          <div
            key={label}
            className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-3 text-2xl font-bold text-white">{value}</p>
            <p className="mt-0.5 text-sm text-[#8a93a6]">{label}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          Quick actions
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex min-h-[64px] items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3 text-left active:bg-[#1d2230]"
          >
            <ScanLine className="h-6 w-6 text-[#60a5fa]" />
            <span className="text-base font-semibold text-white">Scan part</span>
          </button>
          <button
            type="button"
            className="flex min-h-[64px] items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3 text-left active:bg-[#1d2230]"
          >
            <Plus className="h-6 w-6 text-[#60a5fa]" />
            <span className="text-base font-semibold text-white">New order</span>
          </button>
          <button
            type="button"
            className="flex min-h-[64px] items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3 text-left active:bg-[#1d2230]"
          >
            <Wrench className="h-6 w-6 text-[#60a5fa]" />
            <span className="text-base font-semibold text-white">Log work</span>
          </button>
          <button
            type="button"
            className="flex min-h-[64px] items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3 text-left active:bg-[#1d2230]"
          >
            <ClipboardList className="h-6 w-6 text-[#60a5fa]" />
            <span className="text-base font-semibold text-white">My queue</span>
          </button>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
            Today's work orders
          </h2>
          <Link
            to="/work-orders"
            className="text-sm font-semibold text-[#60a5fa] active:text-[#3b82f6]"
          >
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {todayWorkOrders.map((wo) => (
            <button
              key={wo.id}
              type="button"
              className="flex w-full items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] p-4 text-left active:bg-[#1d2230]"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-[#8a93a6]">
                    {wo.id}
                  </span>
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${priorityStyles[wo.priority]}`}
                  >
                    {wo.priority}
                  </span>
                </div>
                <p className="mt-1.5 text-base font-semibold text-white">
                  {wo.title}
                </p>
                <p className="mt-1 text-sm text-[#8a93a6]">{wo.vehicle}</p>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-[#8a93a6]">
                  <Clock className="h-4 w-4" />
                  Due {wo.due}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-[#8a93a6]" />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
