import { Camera, Play, Check, Clock, AlertTriangle, Package, RotateCcw, Zap } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'
import { useToolRequests } from '../../context/ToolRequestContext'
import { useTasks } from '../../context/TaskContext'
import { useGamification } from '../../gamification/GamificationContext'
import { BADGE_DEFS } from '../../gamification/badges'
import { timeAgo } from '../../utils/time'

const TOOL_STATUS_STYLES = {
  pending:       { key: 'toolRequests.pending',       cls: 'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/30' },
  delivered:     { key: 'toolRequests.delivered',     cls: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30' },
  return_pending:{ key: 'toolRequests.returnPending', cls: 'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/30' },
  returned:      { key: 'toolRequests.returned',      cls: 'text-[#8a93a6] bg-[#8a93a6]/10 border-[#8a93a6]/30' },
}

export default function TechnicianHome() {
  const { user } = useAuth()
  const { t, tr, tz, formatDate, lang } = useI18n()
  const { tasks, startTask, submitTask } = useTasks()
  const { requests, initiateReturn } = useToolRequests()

  const myTasks = tasks.filter((task) => task.assignee === user.name)
  const nonDone = myTasks.filter((t) =>
    ['in_progress', 'rework', 'pending', 'pending_approval'].includes(t.status)
  )
  const done = myTasks.filter((t) => t.status === 'done')

  // Pick the most important task as the "current" card
  const current =
    nonDone.find((t) => t.status === 'in_progress') ||
    nonDone.find((t) => t.status === 'rework') ||
    nonDone.find((t) => t.status === 'pending') ||
    nonDone.find((t) => t.status === 'pending_approval')

  const otherNonDone = nonDone.filter((t) => t !== current)

  const myTools = requests.filter((r) => r.technicianId === user.id && r.status !== 'returned')
  const [uploadMode, setUploadMode] = useState(false)
  const { getUser } = useGamification()
  const gData = getUser(user.id)

  return (
    <div className="space-y-5">
      <header>
        <p className="text-sm text-[#8a93a6]">{formatDate()}</p>
        <h1 className="mt-1 text-2xl font-bold text-white">{t('home.myTasksToday')}</h1>
        <p className="mt-0.5 text-sm text-[#e2e8f0]">{user.name}</p>
      </header>

      {/* ── Current Task Card ── */}
      {current ? (
        <section>
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
            {t('home.activeTask')}
          </h2>
          <div className="overflow-hidden rounded-2xl border border-[#262c3a] bg-[#161a23]">

            {/* Rework banner */}
            {current.status === 'rework' && (
              <div className="flex items-start gap-3 border-b border-[#ef4444]/20 bg-[#ef4444]/8 px-5 py-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#ef4444]" />
                <div>
                  <p className="text-sm font-bold text-[#ef4444]">{t('review.reworkBadge')}</p>
                  {current.rejectReason && (
                    <p className="mt-0.5 text-sm text-[#ef4444]/80">
                      {t('review.reworkReason', { reason: current.rejectReason })}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Photo area */}
            {uploadMode ? (
              <div className="flex h-44 flex-col items-center justify-center gap-3 bg-[#0d1f1a]">
                <Camera className="h-12 w-12 text-[#34d399]" />
                <p className="text-sm font-semibold text-[#34d399]">{t('home.uploadEvidencePhoto')}</p>
              </div>
            ) : (
              <div
                className="flex h-44 items-center justify-center"
                style={{ backgroundColor: current.photo }}
              >
                <Camera className="h-10 w-10 text-[#8a93a6]" />
              </div>
            )}

            <div className="p-5">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-semibold text-[#8a93a6]">{current.id}</span>
                <span className="rounded-md border border-[#60a5fa]/30 bg-[#60a5fa]/10 px-2 py-0.5 text-[11px] font-semibold uppercase text-[#60a5fa]">
                  {tz(current.zone)}
                </span>
                {current.priority === 'urgent' && (
                  <span className="rounded-md border border-[#f97316]/40 bg-[#f97316]/10 px-2 py-0.5 text-[11px] font-bold uppercase text-[#f97316]">
                    {t('assign.urgent')}
                  </span>
                )}
              </div>

              <h3 className="mt-2 text-xl font-bold text-white">{tr(current, 'name')}</h3>

              {(current.instructions || current.instructions_es) && (
                <p className="mt-2 text-base leading-relaxed text-[#e6e9f2]/85">
                  {tr(current, 'instructions')}
                </p>
              )}

              <div className="mt-3 flex items-center gap-2 text-sm text-[#8a93a6]">
                <Clock className="h-4 w-4" />
                {t('home.elapsed', { time: current.elapsed })}
              </div>

              {current.assignedBy && (
                <p className="mt-1 text-sm text-[#8a93a6]">
                  {t('home.assignedBy', { name: current.assignedBy })}
                </p>
              )}

              {/* ── Action buttons ── */}
              <div className="mt-5 space-y-2">

                {/* PENDING or REWORK → START TASK */}
                {(current.status === 'pending' || current.status === 'rework') && (
                  <button
                    type="button"
                    onClick={() => { startTask(current.id); setUploadMode(false) }}
                    className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-[#60a5fa] text-base font-bold text-[#0f1117] shadow-lg shadow-[#60a5fa]/20 active:bg-[#3b82f6]"
                  >
                    <Play className="h-5 w-5" strokeWidth={2.5} />
                    {t('home.startTask')}
                  </button>
                )}

                {/* IN PROGRESS → MARK COMPLETE (then upload flow) */}
                {current.status === 'in_progress' && !uploadMode && (
                  <button
                    type="button"
                    onClick={() => setUploadMode(true)}
                    className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-[#22c55e] text-base font-bold text-[#0f1117] shadow-lg shadow-[#22c55e]/20 active:bg-[#16a34a]"
                  >
                    <Check className="h-5 w-5" strokeWidth={3} />
                    {t('home.markComplete')}
                  </button>
                )}

                {/* UPLOAD MODE → submit or cancel */}
                {current.status === 'in_progress' && uploadMode && (
                  <>
                    <button
                      type="button"
                      onClick={() => { submitTask(current.id); setUploadMode(false) }}
                      className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-[#22c55e] text-base font-bold text-[#0f1117] shadow-lg shadow-[#22c55e]/20 active:bg-[#16a34a]"
                    >
                      <Check className="h-5 w-5" strokeWidth={3} />
                      {t('home.submitForReview')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode(false)}
                      className="flex min-h-[44px] w-full items-center justify-center rounded-xl border border-[#262c3a] bg-[#1d2230] text-sm font-semibold text-[#8a93a6] active:bg-[#262c3a]"
                    >
                      {t('common.cancel')}
                    </button>
                  </>
                )}

                {/* PENDING APPROVAL → In Review badge */}
                {current.status === 'pending_approval' && (
                  <div className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[#fbbf24]/30 bg-[#fbbf24]/10 text-base font-bold text-[#fbbf24]">
                    <Clock className="h-5 w-5" />
                    {t('home.inReview')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="rounded-xl border border-[#262c3a] bg-[#161a23] p-8 text-center">
          <p className="text-sm text-[#8a93a6]">{t('home.noCompletedYet')}</p>
        </div>
      )}

      {/* ── Other pending tasks ── */}
      {otherNonDone.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
            {t('home.pendingTasks', { count: otherNonDone.length })}
          </h2>
          <div className="space-y-2">
            {otherNonDone.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] p-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1d2230] text-[#8a93a6]">
                  <Camera className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{tr(task, 'name')}</p>
                  <p className="text-xs text-[#8a93a6]">{tz(task.zone)} · {task.id}</p>
                </div>
                <span className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase ${
                  task.status === 'rework' ? 'text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/30' : 'text-[#8a93a6] bg-[#1d2230] border-[#262c3a]'
                }`}>
                  {t(`status.${task.status}`)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── My Tools ── */}
      {myTools.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
              {t('toolRequests.sectionTitle')}
            </h2>
            <span className="rounded-full bg-[#e2e8f0]/10 px-2.5 py-0.5 text-xs font-bold text-[#e2e8f0]">
              {myTools.length}
            </span>
          </div>
          <div className="space-y-2">
            {myTools.map((r) => {
              const s = TOOL_STATUS_STYLES[r.status]
              const linkedTask = tasks.find((tk) => tk.id === r.taskId)
              const canReturn = linkedTask?.status === 'done' && r.status === 'delivered'
              return (
                <div key={r.id} className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1d2230] text-[#e2e8f0]">
                      <Package className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-base font-semibold text-white">
                          {tr(r, 'item')}
                          <span className="ml-1 text-[#8a93a6]">×{r.qty}</span>
                        </p>
                        <span className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase ${s.cls}`}>
                          {t(s.key)}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs font-mono text-[#8a93a6]">{r.taskId}</p>
                      <p className="text-xs text-[#8a93a6]">
                        {t('toolRequests.requestedOn', { time: timeAgo(r.requestedAt, lang) })}
                        {r.deliveredAt
                          ? ` · ${t('toolRequests.deliveredOn', { time: timeAgo(r.deliveredAt, lang) })}`
                          : ''}
                      </p>
                    </div>
                  </div>
                  {canReturn && (
                    <button
                      type="button"
                      onClick={() => initiateReturn(r.id)}
                      className="mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[#fbbf24]/30 bg-[#fbbf24]/10 text-sm font-bold text-[#fbbf24] active:bg-[#fbbf24]/20"
                    >
                      <RotateCcw className="h-4 w-4" />
                      {t('toolRequests.returnTool')}
                    </button>
                  )}
                  {r.status === 'return_pending' && (
                    <p className="mt-2 text-center text-xs font-semibold text-[#fbbf24]">
                      {t('toolRequests.awaitingConfirm')}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Completed ── */}
      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          {t('home.completedToday', { count: done.length })}
        </h2>
        <div className="space-y-2">
          {done.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] p-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#22c55e]/10 text-[#22c55e]">
                <Check className="h-5 w-5" strokeWidth={3} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{tr(task, 'name')}</p>
                <p className="text-xs text-[#8a93a6]">{tz(task.zone)} · {task.elapsed}</p>
              </div>
            </div>
          ))}
          {done.length === 0 && (
            <p className="text-sm text-[#8a93a6]">{t('home.noCompletedYet')}</p>
          )}
        </div>
      </section>

      {/* ── Gamification ── */}
      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          {t('gamification.yourPoints')}
        </h2>
        <div className="rounded-2xl border border-[#fbbf24]/20 bg-gradient-to-br from-[#fbbf24]/8 to-[#161a23] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold text-white">{gData.points}</p>
              <p className="mt-0.5 text-sm text-[#fbbf24]">
                {t('gamification.streak', { n: gData.streak })}
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#fbbf24]/30 bg-[#fbbf24]/10">
              <Zap className="h-8 w-8 text-[#fbbf24]" />
            </div>
          </div>

          {gData.badges.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8a93a6]">
                {t('gamification.badges')}
              </p>
              <div className="flex flex-wrap gap-2">
                {gData.badges.map((bid) => {
                  const def = BADGE_DEFS.find((b) => b.id === bid)
                  if (!def) return null
                  const Icon = def.icon
                  return (
                    <div
                      key={bid}
                      className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold"
                      style={{ borderColor: `${def.color}4d`, backgroundColor: `${def.color}15`, color: def.color }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {lang === 'es' ? def.label_es : def.label}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {gData.history.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8a93a6]">
                {t('gamification.recentActivity')}
              </p>
              <div className="space-y-1.5">
                {gData.history.slice(0, 4).map((h, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-[#e6e9f2]/80 truncate flex-1">{h.label}</span>
                    <span className="ml-2 shrink-0 font-bold text-[#fbbf24]">+{h.points}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
