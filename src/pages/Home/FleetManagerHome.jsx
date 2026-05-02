import { Truck, CheckCircle, Wrench, Clock, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'
import { useVehicles } from '../../context/VehicleContext'

const STATUS_CLS = {
  available:   'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30',
  in_use:      'text-[#60a5fa] bg-[#60a5fa]/10 border-[#60a5fa]/30',
  maintenance: 'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/30',
  reserved:    'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/30',
  rejected:    'text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/30',
}

export default function FleetManagerHome() {
  const { user } = useAuth()
  const { t, formatDate } = useI18n()
  const { vehicles, requests } = useVehicles()

  const available = vehicles.filter((v) => v.status === 'available').length
  const inUse = vehicles.filter((v) => v.status === 'in_use').length
  const maintenance = vehicles.filter((v) => v.status === 'maintenance').length
  const pendingRequests = requests.filter((r) => r.status === 'pending')

  const stats = [
    { label: t('fleet.available'), value: available, icon: CheckCircle, color: '#22c55e' },
    { label: t('fleet.inUse'), value: inUse, icon: Truck, color: '#60a5fa' },
    { label: t('fleet.maintenance'), value: maintenance, icon: Wrench, color: '#f97316' },
    { label: t('fleet.pendingReqs'), value: pendingRequests.length, icon: Clock, color: '#fbbf24' },
  ]

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-[#8a93a6]">{formatDate()}</p>
        <h1 className="mt-1 text-2xl font-bold text-white">
          {t('home.greetingMorning', { name: user.name.split(' ')[0] })}
        </h1>
        <p className="mt-0.5 text-sm text-[#fb923c]">{t('fleet.title')}</p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${color}1a`, color }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-3 text-2xl font-bold text-white">{value}</p>
            <p className="mt-0.5 text-sm text-[#8a93a6]">{label}</p>
          </div>
        ))}
      </div>

      {pendingRequests.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#8a93a6]">
              {t('fleet.pendingApprovals')}
            </h2>
            <Link to="/vehicles/approval" className="text-xs font-semibold text-[#fb923c]">
              {t('common.viewAll')}
            </Link>
          </div>
          <div className="space-y-3">
            {pendingRequests.slice(0, 3).map((req) => (
              <Link
                key={req.id}
                to="/vehicles/approval"
                className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1d2230] text-sm font-bold text-white">
                  {req.technicianInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{req.technician}</p>
                  <p className="truncate text-xs text-[#8a93a6]">{req.vehicle}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8a93a6]" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#8a93a6]">
            {t('fleet.fleetStatus')}
          </h2>
          <Link to="/vehicles" className="text-xs font-semibold text-[#fb923c]">
            {t('common.viewAll')}
          </Link>
        </div>
        <div className="overflow-hidden rounded-xl border border-[#262c3a] bg-[#161a23]">
          {vehicles.slice(0, 5).map((v, i) => (
            <div
              key={v.id}
              className={`flex items-center gap-3 p-4 ${i > 0 ? 'border-t border-[#262c3a]' : ''}`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1d2230] text-[#8a93a6]">
                <Truck className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold text-white">{v.make}</p>
                <p className="text-xs text-[#8a93a6]">{v.plate} · {v.zone}</p>
              </div>
              <span className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase ${STATUS_CLS[v.status]}`}>
                {t(`fleet.status.${v.status}`)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
