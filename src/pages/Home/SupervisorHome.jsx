import { useState } from 'react'
import { Check, X, Camera, Plus, ArrowLeft, ChevronDown, AlertTriangle, ClipboardCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'
import { useTasks } from '../../context/TaskContext'
import { usePhysicalInspection } from '../../context/PhysicalInspectionContext'
import { TECHNICIANS, ASSIGN_TECHNICIANS, ASSIGN_ZONES } from '../../data/sample'

const STATUS_CLS = {
  pending:         'text-[#8a93a6] bg-[#1d2230] border-[#262c3a]',
  in_progress:     'text-[#60a5fa] bg-[#60a5fa]/10 border-[#60a5fa]/30',
  overdue:         'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/30',
  pending_approval:'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/30',
  done:            'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30',
  rework:          'text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/30',
}

const statusDot = { green: 'bg-[#22c55e]', amber: 'bg-[#fbbf24]', red: 'bg-[#ef4444]' }

function StatusBadge({ status, t }) {
  return (
    <span className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase ${STATUS_CLS[status] || STATUS_CLS.pending}`}>
      {t(`status.${status}`)}
    </span>
  )
}

// ─── Assign Task Form ─────────────────────────────────────────────────────────
function AssignTaskForm({ supervisorName, onBack }) {
  const { t, tz } = useI18n()
  const { createTask } = useTasks()

  const [form, setForm] = useState({
    name: '',
    instructions: '',
    zone: 'Zone A',
    assigneeId: ASSIGN_TECHNICIANS[0].id,
    priority: 'normal',
  })
  const [hasPhoto, setHasPhoto] = useState(false)

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    const tech = ASSIGN_TECHNICIANS.find((x) => x.id === form.assigneeId)
    createTask({
      name: form.name.trim(),
      zone: form.zone,
      assignee: tech.name,
      assignedBy: supervisorName,
      priority: form.priority,
      instructions: form.instructions.trim(),
    })
    onBack()
  }

  return (
    <div className="space-y-5 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#262c3a] bg-[#161a23] text-[#8a93a6] active:bg-[#1d2230]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-white">{t('assign.title')}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task name */}
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">
            {t('assign.taskName')}
          </span>
          <input
            type="text"
            value={form.name}
            onChange={set('name')}
            placeholder={t('assign.taskNamePlaceholder')}
            required
            className="w-full rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3 text-base text-white placeholder-[#8a93a6] outline-none focus:border-[#34d399]"
          />
        </label>

        {/* Instructions */}
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">
            {t('assign.instructions')}
          </span>
          <textarea
            value={form.instructions}
            onChange={set('instructions')}
            placeholder={t('assign.instructionsPlaceholder')}
            rows={3}
            className="w-full resize-none rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3 text-base text-white placeholder-[#8a93a6] outline-none focus:border-[#34d399]"
          />
        </label>

        {/* Zone */}
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">
            {t('assign.zone')}
          </span>
          <div className="relative">
            <select
              value={form.zone}
              onChange={set('zone')}
              className="w-full appearance-none rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3 text-base text-white outline-none"
            >
              {ASSIGN_ZONES.map((z) => (
                <option key={z} value={z} className="bg-[#161a23]">
                  {tz(z)}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8a93a6]" />
          </div>
        </label>

        {/* Technician */}
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">
            {t('assign.technician')}
          </span>
          <div className="relative">
            <select
              value={form.assigneeId}
              onChange={set('assigneeId')}
              className="w-full appearance-none rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3 text-base text-white outline-none"
            >
              {ASSIGN_TECHNICIANS.map((tech) => (
                <option key={tech.id} value={tech.id} className="bg-[#161a23]">
                  {tech.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8a93a6]" />
          </div>
        </label>

        {/* Priority */}
        <div>
          <span className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">
            {t('assign.priority')}
          </span>
          <div className="flex overflow-hidden rounded-xl border border-[#262c3a]">
            {['normal', 'urgent'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, priority: p }))}
                className="flex min-h-[48px] flex-1 items-center justify-center text-base font-bold transition-colors"
                style={{
                  backgroundColor:
                    form.priority === p
                      ? p === 'urgent'
                        ? '#f97316'
                        : '#34d399'
                      : '#161a23',
                  color: form.priority === p ? '#0f1117' : '#8a93a6',
                }}
              >
                {t(`assign.${p}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Reference photo */}
        <div>
          <span className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">
            {t('assign.refPhoto')}
          </span>
          {hasPhoto ? (
            <div className="flex h-28 items-center justify-center rounded-xl bg-[#0f2822]">
              <Camera className="h-8 w-8 text-[#34d399]" />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setHasPhoto(true)}
              className="flex min-h-[80px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#262c3a] bg-[#161a23] text-sm font-semibold text-[#8a93a6] active:bg-[#1d2230]"
            >
              <Camera className="h-6 w-6" />
              {t('assign.addRefPhoto')}
            </button>
          )}
        </div>

        <button
          type="submit"
          className="flex min-h-[56px] w-full items-center justify-center rounded-xl text-base font-bold text-[#0f1117] shadow-lg active:opacity-90"
          style={{ backgroundColor: '#34d399', boxShadow: '0 10px 25px -5px rgba(52,211,153,0.3)' }}
        >
          {t('assign.submit')}
        </button>
      </form>
    </div>
  )
}

// ─── Supervisor Home ──────────────────────────────────────────────────────────
export default function SupervisorHome() {
  const { user } = useAuth()
  const { t, tr, tz, formatDate } = useI18n()
  const { tasks, approveTask, rejectTask } = useTasks()

  const [view, setView] = useState('main')
  const [rejectingId, setRejectingId] = useState(null)
  const [rejectReason, setRejectReason] = useState('')
  const { getForTask } = usePhysicalInspection()

  const zoneTasks = tasks.filter((task) => task.zone === user.zone)
  const reviewTasks = zoneTasks.filter((t) => t.status === 'pending_approval')
  const activeTasks = zoneTasks.filter((t) =>
    ['pending', 'in_progress', 'overdue', 'rework'].includes(t.status)
  )
  const inspectionNeeded = zoneTasks.filter(
    (t) => t.status === 'done' && !getForTask(t.id)
  )
  const zoneTechs = TECHNICIANS.filter((tech) => tech.zone === user.zone)

  const handleConfirmReject = (id) => {
    if (!rejectReason.trim()) return
    rejectTask(id, rejectReason.trim())
    setRejectingId(null)
    setRejectReason('')
  }

  if (view === 'assign') {
    return <AssignTaskForm supervisorName={user.name} onBack={() => setView('main')} />
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-[#8a93a6]">{formatDate()}</p>
        <h1 className="mt-1 text-2xl font-bold text-white">{tz(user.zone)}</h1>
        <p className="mt-0.5 text-sm" style={{ color: '#34d399' }}>
          {t('home.pendingTasks', { count: activeTasks.length })}
        </p>
      </header>

      {/* ── Pending Review ── */}
      {reviewTasks.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
            {t('review.pendingSection')}
            <span className="ml-2 rounded-full bg-[#fbbf24]/15 px-2 py-0.5 text-[11px] text-[#fbbf24]">
              {reviewTasks.length}
            </span>
          </h2>
          <div className="space-y-4">
            {reviewTasks.map((task) => (
              <div
                key={task.id}
                className="overflow-hidden rounded-2xl border border-[#262c3a] bg-[#161a23]"
              >
                {/* Meta row */}
                <div className="flex items-center justify-between px-4 pt-4 pb-2">
                  <span className="text-xs font-mono font-semibold text-[#8a93a6]">
                    {task.id}
                  </span>
                  <span className="text-sm font-semibold text-white">{task.assignee}</span>
                </div>

                {/* Photo comparison */}
                <div className="grid grid-cols-2 gap-2 px-4 pb-1">
                  <div>
                    <p className="mb-1.5 text-center text-[10px] font-bold uppercase tracking-widest text-[#8a93a6]">
                      {t('review.refPhoto')}
                    </p>
                    <div
                      className="flex h-28 items-center justify-center rounded-xl"
                      style={{ backgroundColor: task.photo }}
                    >
                      <Camera className="h-7 w-7 text-[#8a93a6]" />
                    </div>
                  </div>
                  <div>
                    <p className="mb-1.5 text-center text-[10px] font-bold uppercase tracking-widest text-[#34d399]">
                      {t('review.evidence')}
                    </p>
                    <div
                      className="flex h-28 items-center justify-center rounded-xl"
                      style={{ backgroundColor: task.evidencePhoto || '#0f2822' }}
                    >
                      <Camera className="h-7 w-7 text-[#34d399]" />
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-3">
                  <p className="text-base font-bold text-white">{tr(task, 'name')}</p>
                  {task.instructions && (
                    <p className="mt-1 text-sm leading-relaxed text-[#8a93a6]">
                      {tr(task, 'instructions')}
                    </p>
                  )}

                  {rejectingId === task.id ? (
                    <div className="mt-3 space-y-2">
                      <textarea
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder={t('review.rejectPlaceholder')}
                        rows={2}
                        autoFocus
                        className="w-full resize-none rounded-xl border border-[#ef4444]/30 bg-[#1d2230] px-4 py-3 text-base text-white placeholder-[#8a93a6] outline-none"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => { setRejectingId(null); setRejectReason('') }}
                          className="min-h-[44px] flex-1 rounded-lg border border-[#262c3a] bg-[#1d2230] text-sm font-semibold text-[#8a93a6] active:bg-[#262c3a]"
                        >
                          {t('common.cancel')}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleConfirmReject(task.id)}
                          disabled={!rejectReason.trim()}
                          className="min-h-[44px] flex-1 rounded-lg bg-[#ef4444] text-sm font-bold text-white disabled:opacity-40 active:bg-[#dc2626]"
                        >
                          {t('review.confirmReject')}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => approveTask(task.id)}
                        className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#22c55e] text-base font-bold text-[#0f1117] active:bg-[#16a34a]"
                      >
                        <Check className="h-5 w-5" strokeWidth={3} />
                        {t('home.approve')}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setRejectingId(task.id); setRejectReason('') }}
                        className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl border border-[#ef4444]/30 bg-[#ef4444]/10 text-base font-bold text-[#ef4444] active:bg-[#ef4444]/20"
                      >
                        <X className="h-5 w-5" strokeWidth={3} />
                        {t('home.reject')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Active Tasks ── */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
            {t('supervisor.activeTasks')}
          </h2>
          <span className="rounded-full bg-[#34d399]/10 px-2.5 py-0.5 text-xs font-bold text-[#34d399]">
            {activeTasks.length}
          </span>
        </div>

        {activeTasks.length === 0 ? (
          <p className="text-sm text-[#8a93a6]">{t('supervisor.noActiveTasks')}</p>
        ) : (
          <div className="space-y-2">
            {activeTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1d2230] text-sm font-bold text-white">
                    {task.assignee.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-mono text-[#8a93a6]">{task.id}</span>
                      <StatusBadge status={task.status} t={t} />
                      {task.priority === 'urgent' && (
                        <span className="rounded-md border border-[#f97316]/40 bg-[#f97316]/10 px-2 py-0.5 text-[11px] font-bold uppercase text-[#f97316]">
                          {t('assign.urgent')}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-base font-semibold text-white">{tr(task, 'name')}</p>
                    <p className="mt-0.5 text-sm text-[#8a93a6]">
                      {task.assignee} · {tz(task.zone)}
                    </p>
                  </div>
                </div>
                {task.status === 'rework' && task.rejectReason && (
                  <div className="mt-2 flex items-start gap-2 rounded-lg border border-[#ef4444]/20 bg-[#ef4444]/5 px-3 py-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#ef4444]" />
                    <p className="text-xs text-[#ef4444]">
                      {t('review.reworkReason', { reason: task.rejectReason })}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Physical Inspection ── */}
      {inspectionNeeded.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
              {t('inspection.pending')}
            </h2>
            <span className="rounded-full bg-[#34d399]/10 px-2.5 py-0.5 text-xs font-bold text-[#34d399]">
              {inspectionNeeded.length}
            </span>
          </div>
          <div className="space-y-2">
            {inspectionNeeded.map((task) => (
              <div key={task.id} className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#34d399]/10 text-[#34d399]">
                  <ClipboardCheck className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{tr(task, 'name')}</p>
                  <p className="text-xs text-[#8a93a6]">{task.assignee} · {task.id}</p>
                </div>
                <Link
                  to={`/tasks/inspection?id=${task.id}`}
                  className="shrink-0 rounded-lg bg-[#34d399] px-3 py-2 text-xs font-bold text-[#0f1117]"
                >
                  {t('inspection.inspect')}
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Technicians ── */}
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
                <p className="truncate text-base font-semibold text-white">{tech.name}</p>
                <p className="truncate text-sm text-[#8a93a6]">{tr(tech, 'currentTask')}</p>
              </div>
              <p className="text-sm font-semibold text-white">{tech.activeFor}</p>
            </div>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={() => setView('assign')}
        className="fixed right-5 bottom-24 z-30 flex h-14 items-center gap-2 rounded-full px-5 text-base font-bold text-[#0f1117] shadow-lg active:opacity-90"
        style={{ backgroundColor: '#34d399', boxShadow: '0 10px 25px -5px rgba(52,211,153,0.4)' }}
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
        {t('home.assignTask')}
      </button>
    </div>
  )
}
