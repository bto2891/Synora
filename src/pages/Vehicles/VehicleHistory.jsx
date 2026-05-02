import { Truck, CheckCircle, XCircle, Clock } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext'
import { useVehicles } from '../../context/VehicleContext'
import { timeAgo } from '../../utils/time'

const STATUS_ICON = {
  returned: CheckCircle,
  approved: Truck,
  rejected: XCircle,
  pending: Clock,
}

const STATUS_COLOR = {
  returned: '#22c55e',
  approved: '#60a5fa',
  rejected: '#ef4444',
  pending: '#fbbf24',
}

export default function VehicleHistory() {
  const { t, lang } = useI18n()
  const { requests } = useVehicles()

  const sorted = [...requests].sort(
    (a, b) => new Date(b.requestedAt) - new Date(a.requestedAt)
  )

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-white">{t('fleet.historyTitle')}</h1>
        <p className="mt-0.5 text-sm text-[#8a93a6]">{t('fleet.historySubtitle')}</p>
      </header>

      <div className="space-y-3">
        {sorted.map((req) => {
          const Icon = STATUS_ICON[req.status] ?? Truck
          const color = STATUS_COLOR[req.status] ?? '#8a93a6'
          return (
            <div key={req.id} className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4">
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${color}1a`, color }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{req.vehicle}</p>
                  <p className="text-xs text-[#8a93a6]">{req.technician} · {timeAgo(req.requestedAt, lang)}</p>
                  <p className="mt-0.5 truncate text-xs text-[#8a93a6]">{req.purpose}</p>
                </div>
                <span
                  className="shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase"
                  style={{ color, borderColor: `${color}4d`, backgroundColor: `${color}1a` }}
                >
                  {t(`fleet.reqStatus.${req.status}`)}
                </span>
              </div>
            </div>
          )
        })}
        {sorted.length === 0 && (
          <p className="py-8 text-center text-sm text-[#8a93a6]">{t('fleet.noHistory')}</p>
        )}
      </div>
    </div>
  )
}
