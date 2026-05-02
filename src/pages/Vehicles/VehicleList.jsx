import { useState } from 'react'
import { Truck, Search, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'
import { useVehicles } from '../../context/VehicleContext'

const STATUS_CLS = {
  available:   'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30',
  in_use:      'text-[#60a5fa] bg-[#60a5fa]/10 border-[#60a5fa]/30',
  maintenance: 'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/30',
  reserved:    'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/30',
}

const FILTERS = ['all', 'available', 'in_use', 'maintenance', 'reserved']

export default function VehicleList() {
  const { user } = useAuth()
  const { t } = useI18n()
  const { vehicles, requests } = useVehicles()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const isTech = user.role === 'technician'
  const isFleet = user.role === 'fleet_manager'

  const filtered = vehicles.filter((v) => {
    if (filter !== 'all' && v.status !== filter) return false
    if (search && !v.make.toLowerCase().includes(search.toLowerCase()) && !v.plate.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const myActiveRequest = requests.find((r) => r.technicianId === user.id && r.status === 'approved')

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-white">{t('fleet.title')}</h1>
        <p className="mt-0.5 text-sm text-[#8a93a6]">
          {isTech ? t('fleet.subTech') : t('fleet.subFleet')}
        </p>
      </header>

      {isTech && myActiveRequest && (
        <div className="rounded-xl border border-[#60a5fa]/30 bg-[#60a5fa]/10 p-4">
          <p className="text-sm font-semibold text-[#60a5fa]">{t('fleet.currentlyUsing')}</p>
          <p className="mt-0.5 text-base font-bold text-white">{myActiveRequest.vehicle}</p>
          <Link
            to="/vehicles/return"
            className="mt-2 block rounded-lg bg-[#60a5fa] py-2 text-center text-sm font-bold text-[#0f1117]"
          >
            {t('fleet.returnVehicle')}
          </Link>
        </div>
      )}

      <div className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3">
        <Search className="h-5 w-5 text-[#8a93a6]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('fleet.searchPlaceholder')}
          className="w-full bg-transparent text-base text-white placeholder-[#8a93a6] outline-none"
        />
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className="shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors"
            style={{
              borderColor: filter === f ? '#fb923c' : '#262c3a',
              backgroundColor: filter === f ? 'rgba(251,146,60,0.15)' : '#161a23',
              color: filter === f ? '#fb923c' : '#8a93a6',
            }}
          >
            {t(`fleet.status.${f}`)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((v) => (
          <div key={v.id} className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1d2230] text-[#8a93a6]">
                <Truck className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-[#8a93a6]">{v.id}</span>
                  <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase ${STATUS_CLS[v.status] ?? STATUS_CLS.available}`}>
                    {t(`fleet.status.${v.status}`)}
                  </span>
                </div>
                <p className="mt-1 text-base font-semibold text-white">{v.make}</p>
                <p className="mt-0.5 text-sm text-[#8a93a6]">
                  {v.plate} · {v.type} · {v.zone}
                </p>
                {v.assignedTo && (
                  <p className="mt-0.5 text-sm text-[#60a5fa]">{t('fleet.usedBy', { name: v.assignedTo })}</p>
                )}
              </div>
            </div>
            {isTech && v.status === 'available' && !myActiveRequest && (
              <Link
                to={`/vehicles/request?id=${v.id}`}
                className="mt-3 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#fb923c] text-sm font-bold text-[#0f1117]"
              >
                {t('fleet.requestVehicle')}
              </Link>
            )}
            {isFleet && (
              <div className="mt-2 flex items-center justify-between text-xs text-[#8a93a6]">
                <span>{t('fleet.mileage', { km: v.mileage.toLocaleString() })}</span>
                <span>{t('fleet.lastService', { date: v.lastService })}</span>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-[#8a93a6]">{t('fleet.noVehicles')}</p>
        )}
      </div>

      {isTech && !myActiveRequest && (
        <Link
          to="/vehicles/request"
          className="fixed right-5 bottom-24 z-30 flex h-14 items-center gap-2 rounded-full bg-[#fb923c] px-5 text-base font-bold text-[#0f1117] shadow-lg shadow-[#fb923c]/30"
        >
          <Plus className="h-6 w-6" strokeWidth={2.5} />
          {t('fleet.requestVehicle')}
        </Link>
      )}
    </div>
  )
}
