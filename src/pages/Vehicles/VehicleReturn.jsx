import { RotateCcw, Truck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'
import { useVehicles } from '../../context/VehicleContext'
import { timeAgo } from '../../utils/time'

export default function VehicleReturn() {
  const { user } = useAuth()
  const { t, lang } = useI18n()
  const navigate = useNavigate()
  const { requests, returnVehicle } = useVehicles()

  const active = requests.filter(
    (r) => r.technicianId === user.id && r.status === 'approved'
  )

  function handleReturn(id) {
    returnVehicle(id)
    navigate('/vehicles')
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-white">{t('fleet.returnTitle')}</h1>
        <p className="mt-0.5 text-sm text-[#8a93a6]">{t('fleet.returnSubtitle')}</p>
      </header>

      {active.length === 0 ? (
        <div className="rounded-xl border border-[#262c3a] bg-[#161a23] p-8 text-center">
          <Truck className="mx-auto mb-3 h-10 w-10 text-[#262c3a]" />
          <p className="text-sm text-[#8a93a6]">{t('fleet.noActiveVehicles')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {active.map((req) => (
            <div key={req.id} className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fb923c]/10 text-[#fb923c]">
                  <Truck className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-white">{req.vehicle}</p>
                  <p className="mt-0.5 text-sm text-[#8a93a6]">
                    {t('fleet.outFor', { time: timeAgo(req.approvedAt, lang) })}
                  </p>
                  <p className="mt-0.5 text-sm text-[#8a93a6]">{req.purpose}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleReturn(req.id)}
                className="mt-3 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#fb923c] text-base font-bold text-[#0f1117]"
              >
                <RotateCcw className="h-5 w-5" />
                {t('fleet.confirmReturn')}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
