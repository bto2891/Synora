import { Check, X, Camera, Plus } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { PENDING_APPROVALS, TASKS, TECHNICIANS } from '../../data/sample'

const statusDot = {
  green: 'bg-[#22c55e]',
  amber: 'bg-[#fbbf24]',
  red: 'bg-[#ef4444]',
}

export default function SupervisorHome() {
  const { user } = useAuth()
  const zoneTasks = TASKS.filter((t) => t.zone === user.zone)
  const pending = zoneTasks.filter((t) => t.status !== 'done')
  const zoneTechs = TECHNICIANS.filter((t) => t.zone === user.zone)
  const approvals = PENDING_APPROVALS.filter((a) => a.zone === user.zone)

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-[#8a93a6]">Tuesday, April 28</p>
        <h1 className="mt-1 text-2xl font-bold text-white">{user.zone}</h1>
        <p className="mt-0.5 text-sm" style={{ color: '#34d399' }}>
          {pending.length} pending tasks
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          Pending approvals
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
                    {a.task}
                  </p>
                  <p className="mt-0.5 text-sm text-[#8a93a6]">
                    {a.technician}
                  </p>
                  <p className="mt-1 text-xs text-[#8a93a6]">
                    Submitted {a.submitted}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#22c55e] text-base font-bold text-[#0f1117] active:bg-[#16a34a]"
                >
                  <Check className="h-5 w-5" strokeWidth={3} />
                  Approve
                </button>
                <button
                  type="button"
                  className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 text-base font-bold text-[#ef4444] active:bg-[#ef4444]/20"
                >
                  <X className="h-5 w-5" strokeWidth={3} />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          Active technicians · {user.zone}
        </h2>
        <div className="overflow-hidden rounded-xl border border-[#262c3a] bg-[#161a23]">
          {zoneTechs.map((t, i) => (
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
              <p className="text-sm font-semibold text-white">{t.activeFor}</p>
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
        Assign Task
      </button>
    </div>
  )
}
