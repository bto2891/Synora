import { Check, X, Camera, Plus } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'
import { PENDING_APPROVALS, TASKS, TECHNICIANS } from '../../data/sample'

const statusDot = {
  green: 'bg-[#22c55e]',
  amber: 'bg-[#fbbf24]',
  red: 'bg-[#ef4444]',
}

export default function SupervisorHome() {
  const { user } = useAuth()
  const { t, tr, tz, formatDate } = useI18n()
  const zoneTasks = TASKS.filter((task) => task.zone === user.zone)
  const pending = zoneTasks.filter((task) => task.status !== 'done')
  const zoneTechs = TECHNICIANS.filter((tech) => tech.zone === user.zone)
  const approvals = PENDING_APPROVALS.filter((a) => a.zone === user.zone)

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-[#8a93a6]">{formatDate()}</p>
        <h1 className="mt-1 text-2xl font-bold text-white">{tz(user.zone)}</h1>
        <p className="mt-0.5 text-sm" style={{ color: '#34d399' }}>
          {t('home.pendingTasks', { count: pending.length })}
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          {t('home.pendingApprovals')}
        </h2>
        <div className="space-y-3">
          {approvals.map((a) => (
            <div
              key={a.id}
              className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4"
            >
              <div className="flex gap-3">
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: a.photo }}
                >
                  <Camera className="h-7 w-7 text-[#8a93a6]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-mono font-semibold text-[#8a93a6]">
                    {a.taskId}
                  </p>
                  <p className="text-base font-semibold text-white">
                    {tr(a, 'task')}
                  </p>
                  <p className="mt-0.5 text-sm text-[#8a93a6]">
                    {a.technician}
                  </p>
                  <p className="mt-1 text-xs text-[#8a93a6]">
                    {t('home.submittedAgo', { time: tr(a, 'submitted') })}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#22c55e] text-base font-bold text-[#0f1117] active:bg-[#16a34a]"
                >
                  <Check className="h-5 w-5" strokeWidth={3} />
                  {t('home.approve')}
                </button>
                <button
                  type="button"
                  className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 text-base font-bold text-[#ef4444] active:bg-[#ef4444]/20"
                >
                  <X className="h-5 w-5" strokeWidth={3} />
                  {t('home.reject')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          {t('home.activeTechniciansZone', { zone: tz(user.zone) })}
        </h2>
        <div className="overflow-hidden rounded-xl border border-[#262c3a] bg-[#161a23]">
          {zoneTechs.map((tech, i) => (
            <div
              key={tech.id}
              className={`flex items-center gap-3 p-4 ${i > 0 ? 'border-t border-[#262c3a]' : ''}`}
            >
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1d2230] text-sm font-semibold text-white">
                  {tech.initials}
                </div>
                <span
                  className={`absolute right-0 bottom-0 h-3 w-3 rounded-full ring-2 ring-[#161a23] ${statusDot[tech.status]}`}
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-base font-semibold text-white">
                  {tech.name}
                </p>
                <p className="truncate text-sm text-[#8a93a6]">
                  {tr(tech, 'currentTask')}
                </p>
              </div>
              <p className="text-sm font-semibold text-white">{tech.activeFor}</p>
            </div>
          ))}
        </div>
      </section>

      <button
        type="button"
        className="fixed right-5 bottom-24 z-30 flex h-14 items-center gap-2 rounded-full px-5 text-base font-bold text-[#0f1117] shadow-lg active:opacity-90"
        style={{ backgroundColor: '#34d399', boxShadow: '0 10px 25px -5px rgba(52,211,153,0.4)' }}
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
        {t('home.assignTask')}
      </button>
    </div>
  )
}
