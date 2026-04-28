import { Camera, Play, Pause, Check, Clock } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'
import { TASKS } from '../../data/sample'

export default function TechnicianHome() {
  const { user } = useAuth()
  const { t, tr, tz, formatDate } = useI18n()
  const myTasks = TASKS.filter((task) => task.assignee === user.name)
  const active = myTasks.find((task) => task.status === 'in_progress') || myTasks[0]
  const completed = myTasks.filter((task) => task.status === 'done')

  const [state, setState] = useState('in_progress')

  const STATES = [
    { id: 'start', label: t('home.start'), icon: Play },
    { id: 'in_progress', label: t('home.inProgress'), icon: Pause },
    { id: 'done', label: t('home.done'), icon: Check },
  ]

  return (
    <div className="space-y-5">
      <header>
        <p className="text-sm text-[#8a93a6]">{formatDate()}</p>
        <h1 className="mt-1 text-2xl font-bold text-white">{t('home.myTasksToday')}</h1>
        <p className="mt-0.5 text-sm text-[#e2e8f0]">{user.name}</p>
      </header>

      {active && (
        <section>
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
            {t('home.activeTask')}
          </h2>
          <div className="overflow-hidden rounded-2xl border border-[#262c3a] bg-[#161a23]">
            <div
              className="flex h-44 items-center justify-center"
              style={{ backgroundColor: active.photo }}
            >
              <Camera className="h-10 w-10 text-[#8a93a6]" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-[#8a93a6]">
                  {active.id}
                </span>
                <span className="rounded-md border border-[#60a5fa]/30 bg-[#60a5fa]/10 px-2 py-0.5 text-[11px] font-semibold uppercase text-[#60a5fa]">
                  {tz(active.zone)}
                </span>
              </div>
              <h3 className="mt-2 text-xl font-bold text-white">
                {tr(active, 'name')}
              </h3>
              {(active.instructions || active.instructions_es) && (
                <p className="mt-2 text-base leading-relaxed text-[#e6e9f2]/85">
                  {tr(active, 'instructions')}
                </p>
              )}

              <div className="mt-4 flex items-center gap-2 text-sm text-[#8a93a6]">
                <Clock className="h-4 w-4" />
                {t('home.elapsed', { time: active.elapsed })}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {STATES.map((s) => {
                  const Icon = s.icon
                  const selected = state === s.id
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setState(s.id)}
                      className={`flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-lg border text-xs font-bold uppercase tracking-wide transition-colors ${
                        selected
                          ? s.id === 'done'
                            ? 'border-[#22c55e] bg-[#22c55e] text-[#0f1117]'
                            : 'border-[#60a5fa] bg-[#60a5fa] text-[#0f1117]'
                          : 'border-[#262c3a] bg-[#1d2230] text-[#8a93a6] active:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.4} />
                      {s.label}
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                className="mt-3 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-lg border border-[#60a5fa]/40 bg-[#60a5fa]/10 text-base font-bold text-[#60a5fa] active:bg-[#60a5fa]/20"
              >
                <Camera className="h-5 w-5" />
                {t('home.uploadEvidencePhoto')}
              </button>
            </div>
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          {t('home.completedToday', { count: completed.length })}
        </h2>
        <div className="space-y-2">
          {completed.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] p-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#22c55e]/10 text-[#22c55e]">
                <Check className="h-5 w-5" strokeWidth={3} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{tr(task, 'name')}</p>
                <p className="text-xs text-[#8a93a6]">
                  {tz(task.zone)} · {task.elapsed}
                </p>
              </div>
            </div>
          ))}
          {completed.length === 0 && (
            <p className="text-sm text-[#8a93a6]">{t('home.noCompletedYet')}</p>
          )}
        </div>
      </section>
    </div>
  )
}
