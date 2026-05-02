import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronLeft, CheckCircle, XCircle } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'
import { useTasks } from '../../context/TaskContext'
import { usePhysicalInspection } from '../../context/PhysicalInspectionContext'

export default function PhysicalInspection() {
  const { user } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { tasks } = useTasks()
  const { recordInspection, getForTask } = usePhysicalInspection()

  const taskId = params.get('id')
  const task = tasks.find((tk) => tk.id === taskId)
  const existing = getForTask(taskId)

  const [result, setResult] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!task) {
    return (
      <div className="py-20 text-center text-sm text-[#8a93a6]">
        {t('inspection.notFound')}
      </div>
    )
  }

  if (existing || submitted) {
    const insp = existing || { result, notes, inspectedBy: user.name }
    return (
      <div className="space-y-5">
        <header className="flex items-center gap-3">
          <button type="button" onClick={() => navigate(-1)} className="text-[#8a93a6]">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-white">{t('inspection.title')}</h1>
        </header>
        <div className="rounded-xl border border-[#262c3a] bg-[#161a23] p-5">
          <p className="text-xs font-mono text-[#8a93a6]">{task.id}</p>
          <p className="mt-1 text-lg font-bold text-white">{task.name}</p>
          <p className="mt-0.5 text-sm text-[#8a93a6]">{task.assignee} · {task.zone}</p>
          <div className={`mt-4 flex items-center gap-2 rounded-lg border p-3 ${insp.result === 'pass' ? 'border-[#22c55e]/30 bg-[#22c55e]/10' : 'border-[#ef4444]/30 bg-[#ef4444]/10'}`}>
            {insp.result === 'pass'
              ? <CheckCircle className="h-5 w-5 text-[#22c55e]" />
              : <XCircle className="h-5 w-5 text-[#ef4444]" />
            }
            <span className={`text-sm font-bold ${insp.result === 'pass' ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
              {t(`inspection.result.${insp.result}`)}
            </span>
          </div>
          {insp.notes && (
            <p className="mt-3 text-sm text-[#e6e9f2]/80">{insp.notes}</p>
          )}
          <p className="mt-3 text-xs text-[#8a93a6]">
            {t('inspection.by', { name: insp.inspectedBy })}
          </p>
        </div>
      </div>
    )
  }

  function handleSubmit() {
    if (!result) return
    recordInspection({
      taskId: task.id,
      task: task.name,
      task_es: task.name_es,
      technician: task.assignee,
      zone: task.zone,
      result,
      notes,
      notes_es: notes,
      inspectedBy: user.name,
    })
    setSubmitted(true)
  }

  return (
    <div className="space-y-5">
      <header className="flex items-center gap-3">
        <button type="button" onClick={() => navigate(-1)} className="text-[#8a93a6]">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">{t('inspection.title')}</h1>
          <p className="text-sm text-[#8a93a6]">{t('inspection.subtitle')}</p>
        </div>
      </header>

      <div className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4">
        <p className="text-xs font-mono text-[#8a93a6]">{task.id}</p>
        <p className="mt-1 text-base font-semibold text-white">{task.name}</p>
        <p className="mt-0.5 text-sm text-[#8a93a6]">{task.assignee} · {task.zone}</p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-[#8a93a6]">{t('inspection.result.label')}</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setResult('pass')}
              className={`flex flex-1 min-h-[52px] items-center justify-center gap-2 rounded-xl border text-sm font-bold transition-colors ${
                result === 'pass'
                  ? 'border-[#22c55e]/40 bg-[#22c55e]/15 text-[#22c55e]'
                  : 'border-[#262c3a] bg-[#161a23] text-[#8a93a6]'
              }`}
            >
              <CheckCircle className="h-5 w-5" />
              {t('inspection.result.pass')}
            </button>
            <button
              type="button"
              onClick={() => setResult('fail')}
              className={`flex flex-1 min-h-[52px] items-center justify-center gap-2 rounded-xl border text-sm font-bold transition-colors ${
                result === 'fail'
                  ? 'border-[#ef4444]/40 bg-[#ef4444]/15 text-[#ef4444]'
                  : 'border-[#262c3a] bg-[#161a23] text-[#8a93a6]'
              }`}
            >
              <XCircle className="h-5 w-5" />
              {t('inspection.result.fail')}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">
            {t('inspection.notes')}
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder={t('inspection.notesPlaceholder')}
            className="w-full resize-none rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3 text-base text-white placeholder-[#8a93a6] outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!result}
          className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-[#34d399] text-base font-bold text-[#0f1117] disabled:opacity-40"
        >
          {t('inspection.submit')}
        </button>
      </div>
    </div>
  )
}
