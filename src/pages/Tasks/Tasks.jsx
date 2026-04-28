import { useState } from 'react'
import { Search, Plus, Camera, Clock, Check, X } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'
import { TASKS } from '../../data/sample'

const statusCls = {
  in_progress: 'text-[#60a5fa] bg-[#60a5fa]/10 border-[#60a5fa]/30',
  overdue: 'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/30',
  pending: 'text-[#8a93a6] bg-[#1d2230] border-[#262c3a]',
  pending_approval: 'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/30',
  done: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30',
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

const FILTERS = ['all', 'pending', 'in_progress', 'pending_approval', 'overdue', 'done']

export default function Tasks() {
  const { user, role } = useAuth()
  const { t, tr, tz } = useI18n()
  const [filter, setFilter] = useState('all')
  const accent = role.accent

  const baseTasks = visibleTasksFor(user)
  const tasks = baseTasks.filter((task) => {
    if (filter === 'all') return true
    return task.status === filter
  })

  const heading =
    user.role === 'technician'
      ? t('tasks.headingMy')
      : user.role === 'supervisor'
      ? t('tasks.headingZone', { zone: tz(user.zone) })
      : t('tasks.headingAll')

  const subheading =
    user.role === 'technician'
      ? t('tasks.subMy')
      : user.role === 'supervisor'
      ? t('tasks.subSupervisor')
      : t('tasks.subSite')

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
          placeholder={t('tasks.searchPlaceholder')}
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
            {t(`tasks.filters.${f}`)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4"
          >
            <div className="flex gap-3">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: task.photo }}
              >
                <Camera className="h-6 w-6 text-[#8a93a6]" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-[#8a93a6]">
                    {task.id}
                  </span>
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase ${statusCls[task.status]}`}
                  >
                    {t(`status.${task.status}`)}
                  </span>
                </div>
                <p className="mt-1 text-base font-semibold text-white">
                  {tr(task, 'name')}
                </p>
                <p className="mt-0.5 text-sm text-[#8a93a6]">
                  {tz(task.zone)} · {task.assignee}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#8a93a6]">
                  <Clock className="h-3.5 w-3.5" />
                  {task.elapsed}
                </div>
              </div>
            </div>

            {canApprove && task.status === 'pending_approval' && (
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#22c55e] text-sm font-bold text-[#0f1117] active:bg-[#16a34a]"
                >
                  <Check className="h-4 w-4" strokeWidth={3} />
                  {t('home.approve')}
                </button>
                <button
                  type="button"
                  className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 text-sm font-bold text-[#ef4444] active:bg-[#ef4444]/20"
                >
                  <X className="h-4 w-4" strokeWidth={3} />
                  {t('home.reject')}
                </button>
              </div>
            )}
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="py-8 text-center text-sm text-[#8a93a6]">
            {t('tasks.noMatch')}
          </p>
        )}
      </div>

      {canCreate && (
        <button
          type="button"
          aria-label={t('home.newTask')}
          className="fixed right-5 bottom-24 z-30 flex h-14 items-center gap-2 rounded-full px-5 text-base font-bold text-[#0f1117] shadow-lg active:opacity-90"
          style={{ backgroundColor: accent, boxShadow: `0 10px 25px -5px ${accent}66` }}
        >
          <Plus className="h-6 w-6" strokeWidth={2.5} />
          {t('home.newTask')}
        </button>
      )}
    </div>
  )
}
