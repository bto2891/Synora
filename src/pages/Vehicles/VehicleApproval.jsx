import { Check, X, Truck } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext'
import { useVehicles } from '../../context/VehicleContext'

export default function VehicleApproval() {
  const { t } = useI18n()
  const { requests, approveRequest, rejectRequest } = useVehicles()

  const pending = requests.filter((r) => r.status === 'pending')

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-white">{t('fleet.approvalTitle')}</h1>
        <p className="mt-0.5 text-sm text-[#8a93a6]">{t('fleet.approvalSubtitle')}</p>
      </header>

      {pending.length === 0 ? (
        <div className="rounded-xl border border-[#262c3a] bg-[#161a23] p-8 text-center">
          <Truck className="mx-auto mb-3 h-10 w-10 text-[#262c3a]" />
          <p className="text-sm text-[#8a93a6]">{t('fleet.noApprovals')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pending.map((req) => (
            <div key={req.id} className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1d2230] text-sm font-bold text-white">
                  {req.technicianInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-white">{req.technician}</p>
                  <p className="text-sm font-medium text-[#fb923c]">{req.vehicle}</p>
                  <p className="mt-1 text-sm text-[#e6e9f2]/80">{req.purpose}</p>
                  {req.taskId && (
                    <p className="mt-0.5 text-xs font-mono text-[#8a93a6]">{t('fleet.linkedTask', { id: req.taskId })}</p>
                  )}
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => approveRequest(req.id)}
                  className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#22c55e] text-sm font-bold text-[#0f1117]"
                >
                  <Check className="h-4 w-4" strokeWidth={3} />
                  {t('home.approve')}
                </button>
                <button
                  type="button"
                  onClick={() => rejectRequest(req.id)}
                  className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 text-sm font-bold text-[#ef4444]"
                >
                  <X className="h-4 w-4" strokeWidth={3} />
                  {t('home.reject')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
