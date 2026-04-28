import { useState } from 'react'
import { Search, Plus, Camera, Clock, Check, X } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { TASKS } from '../../data/sample'

const statusTag = {
  in_progress: { label: 'In progress', cls: 'text-[#60a5fa] bg-[#60a5fa]/10 border-[#60a5fa]/30' },
  overdue: { label: 'Overdue', cls: 'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/30' },
  pending: { label: 'Pending', cls: 'text-[#8a93a6] bg-[#1d2230] border-[#262c3a]' },
  pending_approval: { label: 'Awaiting QA', cls: 'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/30' },
  done: { label: 'Done', cls: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30' },
}

function visibleTasksFor(user) {
  if (user.role === 'technician') {
    return TASKS.filter((t) => t.assignee === user.name)
  }
  if (user.role === 'supervisor') {
    return TASKS.filter((t) => t.zone === user.zone)
  }
  return TASKS
}

const FILTERS = ['All', 'Pending', 'In progress', 'Awaiting QA', 'Overdue', 'Done']

export default function Tasks() {
  const { user, role } = useAuth()
  const [filter, setFilter] = useState('All')
  const accent = role.accent

  const baseTasks = visibleTasksFor(user)
  const tasks = baseTasks.filter((t) => {
    if (filter === 'All') return true
    return statusTag[t.status]?.label === filter
  })

  const heading =
    user.role === 'technician'
      ? 'My tasks'
      : user.role === 'supervisor'
      ? `${user.zone} tasks`
      : 'All tasks'

  const subheading =
    user.role === 'technician'
      ? 'Tasks assigned to you'
      : user.role === 'supervisor'
      ? 'Approve and assign work in your zone'
      : 'Across the entire site'

  const canCreate = user.role !== 'technician'
  const canApprove = user.role === 'supervisor' || user.role === 'site_manager'

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-white">{heading}</h1>
        <p className="mt-0.5 text-sm text-[#8a93a6]">{subheading}</p>
      </header>

      <div className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3">
        <Search className="h-5 w-5 text-[#8a93a6]" />
        <input
          type="text"
          placeholder="Search tasks"
          className="w-full bg-transparent text-base text-white placeholder-[#8a93a6] outline-none"
        />
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className="min-h-[40px] shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors"
            style={{
              borderColor: filter === f ? accent : '#262c3a',
              backgroundColor: filter === f ? `${accent}26` : '#161a23',
              color: filter === f ? accent : '#8a93a6',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4"
          >
            <div className="flex gap-3">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: t.photo }}
              >
                <Camera className="h-6 w-6 text-[#8a93a6]" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-[#8a93a6]">
                    {t.id}
                  </span>
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase ${statusTag[t.status].cls}`}
                  >
                    {statusTag[t.status].label}
                  </span>
                </div>
                <p className="mt-1 text-base font-semibold text-white">
                  {t.name}
                </p>
                <p className="mt-0.5 text-sm text-[#8a93a6]">
                  {t.zone} · {t.assignee}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#8a93a6]">
                  <Clock className="h-3.5 w-3.5" />
                  {t.elapsed}
                </div>
              </div>
            </div>

            {canApprove && t.status === 'pending_approval' && (
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#22c55e] text-sm font-bold text-[#0f1117] active:bg-[#16a34a]"
                >
                  <Check className="h-4 w-4" strokeWidth={3} />
                  Approve
                </button>
                <button
                  type="button"
                  className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 text-sm font-bold text-[#ef4444] active:bg-[#ef4444]/20"
                >
                  <X className="h-4 w-4" strokeWidth={3} />
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="py-8 text-center text-sm text-[#8a93a6]">
            No tasks match this filter.
          </p>
        )}
      </div>

      {canCreate && (
        <button
          type="button"
          aria-label="New task"
          className="fixed right-5 bottom-24 z-30 flex h-14 items-center gap-2 rounded-full px-5 text-base font-bold text-[#0f1117] shadow-lg active:opacity-90"
          style={{ backgroundColor: accent, boxShadow: `0 10px 25px -5px ${accent}66` }}
        >
          <Plus className="h-6 w-6" strokeWidth={2.5} />
          New Task
        </button>
      )}
    </div>
  )
}
