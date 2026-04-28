import {
  AlertTriangle,
  Users,
  ListChecks,
  RotateCcw,
  Bot,
  Plus,
  ChevronRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { TASKS, TECHNICIANS, SITE_STATS } from '../../data/sample'

const statusDot = {
  green: 'bg-[#22c55e]',
  amber: 'bg-[#fbbf24]',
  red: 'bg-[#ef4444]',
}

const statusTag = {
  in_progress: { label: 'In progress', cls: 'text-[#60a5fa] bg-[#60a5fa]/10 border-[#60a5fa]/30' },
  overdue: { label: 'Overdue', cls: 'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/30' },
  pending: { label: 'Pending', cls: 'text-[#8a93a6] bg-[#1d2230] border-[#262c3a]' },
  pending_approval: { label: 'Awaiting QA', cls: 'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/30' },
  done: { label: 'Done', cls: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30' },
}

export default function SiteManagerHome() {
  const { user } = useAuth()
  const overdue = TASKS.filter((t) => t.status === 'overdue')
  const attention = TASKS.filter((t) =>
    ['overdue', 'pending_approval'].includes(t.status),
  )

  const stats = [
    { label: 'Active technicians', value: SITE_STATS.activeTechnicians, icon: Users },
    { label: 'Tasks today', value: SITE_STATS.tasksToday, icon: ListChecks },
    { label: 'Reworks', value: SITE_STATS.reworks, icon: RotateCcw },
    { label: 'Robots validated', value: SITE_STATS.robotsValidated, icon: Bot },
  ]

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-[#8a93a6]">Tuesday, April 28</p>
        <h1 className="mt-1 text-2xl font-bold text-white">
          Good morning, {user.name.split(' ')[0]}
        </h1>
        <p className="mt-0.5 text-sm text-[#60a5fa]">{user.project}</p>
      </header>

      {overdue.length > 0 && (
        <Link
          to="/tasks"
          className="flex items-start gap-3 rounded-xl border border-[#f97316]/30 bg-[#f97316]/10 p-4 active:bg-[#f97316]/20"
        >
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-[#f97316]" />
          <div className="flex-1">
            <p className="text-base font-semibold text-white">
              {overdue.length} overdue task{overdue.length > 1 ? 's' : ''}
            </p>
            <p className="mt-0.5 text-sm text-[#e6e9f2]/80">
              Tap to review and reassign.
            </p>
          </div>
          <span className="rounded-lg bg-[#f97316] px-3 py-2 text-sm font-semibold text-white">
            Review
          </span>
        </Link>
      )}

      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#60a5fa]/10 text-[#60a5fa]">
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-3 text-2xl font-bold text-white">{value}</p>
            <p className="mt-0.5 text-sm text-[#8a93a6]">{label}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          Requires attention
        </h2>
        <div className="space-y-3">
          {attention.map((t) => (
            <button
              key={t.id}
              type="button"
              className="flex w-full items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] p-4 text-left active:bg-[#1d2230]"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-[#8a93a6]">
                    {t.id}
                  </span>
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase ${statusTag[t.status].cls}`}
                  >
                    {statusTag[t.status].label}
                  </span>
                </div>
                <p className="mt-1.5 text-base font-semibold text-white">
                  {t.name}
                </p>
                <p className="mt-0.5 text-sm text-[#8a93a6]">
                  {t.assignee} · {t.zone}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-[#8a93a6]" />
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          Active technicians
        </h2>
        <div className="overflow-hidden rounded-xl border border-[#262c3a] bg-[#161a23]">
          {TECHNICIANS.map((t, i) => (
            <div
              key={t.id}
              className={`flex items-center gap-3 p-4 ${i > 0 ? 'border-t border-[#262c3a]' : ''}`}
            >
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1d2230] text-sm font-semibold text-white">
                  {t.initials}
                </div>
                <span
                  className={`absolute right-0 bottom-0 h-3 w-3 rounded-full ring-2 ring-[#161a23] ${statusDot[t.status]}`}
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-base font-semibold text-white">
                  {t.name}
                </p>
                <p className="truncate text-sm text-[#8a93a6]">
                  {t.currentTask}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">{t.activeFor}</p>
                <p className="text-xs text-[#8a93a6]">{t.zone}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button
        type="button"
        aria-label="New task"
        className="fixed right-5 bottom-24 z-30 flex h-14 items-center gap-2 rounded-full bg-[#f97316] px-5 text-base font-bold text-white shadow-lg shadow-[#f97316]/30 active:bg-[#ea6a0c]"
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
        New Task
      </button>
    </div>
  )
}
