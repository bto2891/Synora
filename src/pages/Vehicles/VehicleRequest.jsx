import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronLeft, Truck } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'
import { useVehicles } from '../../context/VehicleContext'
import { useTasks } from '../../context/TaskContext'

export default function VehicleRequest() {
  const { user } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { vehicles, requestVehicle } = useVehicles()
  const { tasks } = useTasks()

  const preselectedId = params.get('id') || ''
  const [vehicleId, setVehicleId] = useState(preselectedId)
  const [purpose, setPurpose] = useState('')
  const [taskId, setTaskId] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const available = vehicles.filter((v) => v.status === 'available')
  const myTasks = tasks.filter((tk) => tk.assignee === user.name && tk.status !== 'done')

  const selected = vehicles.find((v) => v.id === vehicleId)

  function handleSubmit() {
    if (!vehicleId || !purpose.trim()) return
    requestVehicle({
      vehicleId,
      vehicle: `${selected.make} (${selected.plate})`,
      technicianId: user.id,
      technician: user.name,
      technicianInitials: user.initials,
      purpose,
      purpose_es: purpose,
      taskId: taskId || null,
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fb923c]/15">
          <Truck className="h-8 w-8 text-[#fb923c]" />
        </div>
        <p className="text-xl font-bold text-white">{t('fleet.requestSent')}</p>
        <p className="text-center text-sm text-[#8a93a6]">{t('fleet.requestSentDesc')}</p>
        <button
          type="button"
          onClick={() => navigate('/vehicles')}
          className="mt-4 rounded-xl bg-[#fb923c] px-6 py-3 text-sm font-bold text-[#0f1117]"
        >
          {t('fleet.backToFleet')}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <header className="flex items-center gap-3">
        <button type="button" onClick={() => navigate(-1)} className="text-[#8a93a6]">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">{t('fleet.requestVehicle')}</h1>
          <p className="text-sm text-[#8a93a6]">{t('fleet.requestSubtitle')}</p>
        </div>
      </header>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">
            {t('fleet.selectVehicle')}
          </label>
          <select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="w-full rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3 text-base text-white outline-none"
          >
            <option value="">{t('fleet.choosePlaceholder')}</option>
            {available.map((v) => (
              <option key={v.id} value={v.id}>
                {v.make} ({v.plate}) — {v.zone}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">
            {t('fleet.linkTask')}
          </label>
          <select
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            className="w-full rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3 text-base text-white outline-none"
          >
            <option value="">{t('fleet.noTask')}</option>
            {myTasks.map((tk) => (
              <option key={tk.id} value={tk.id}>
                {tk.id} — {tk.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">
            {t('fleet.purpose')}
          </label>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            rows={3}
            placeholder={t('fleet.purposePlaceholder')}
            className="w-full resize-none rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3 text-base text-white placeholder-[#8a93a6] outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!vehicleId || !purpose.trim()}
          className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-[#fb923c] text-base font-bold text-[#0f1117] disabled:opacity-40"
        >
          <Truck className="h-5 w-5" />
          {t('fleet.submitRequest')}
        </button>
      </div>
    </div>
  )
}
