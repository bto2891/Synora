import { Check, X, Plus, AlertTriangle, Package } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'
import { WAREHOUSE_REQUESTS, WAREHOUSE_ITEMS } from '../../data/sample'

export default function WarehouseHome() {
  const { user } = useAuth()
  const { t, tr } = useI18n()
  const lowStock = WAREHOUSE_ITEMS.filter((i) => i.stock <= i.threshold)

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-[#8a93a6]">{t('home.warehouse')}</p>
        <h1 className="mt-1 text-2xl font-bold text-white">{user.name}</h1>
        <p className="mt-0.5 text-sm" style={{ color: '#fbbf24' }}>
          {t('home.pendingRequests', { count: WAREHOUSE_REQUESTS.length })}
        </p>
      </header>

      {lowStock.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-[#f97316]/30 bg-[#f97316]/10 p-4">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-[#f97316]" />
          <div>
            <p className="text-base font-semibold text-white">
              {t('home.lowStockSummary', { count: lowStock.length })}
            </p>
            <p className="mt-0.5 text-sm text-[#e6e9f2]/80">
              {lowStock.slice(0, 2).map((i) => tr(i, 'name')).join(', ')}
              {lowStock.length > 2
                ? ` ${t('home.morePlus', { count: lowStock.length - 2 })}`
                : ''}
            </p>
          </div>
        </div>
      )}

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          {t('home.pendingRequestsHeader')}
        </h2>
        <div className="space-y-3">
          {WAREHOUSE_REQUESTS.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fbbf24]/10 text-[#fbbf24]">
                  <Package className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-white">
                    {tr(r, 'item')}{' '}
                    <span className="text-[#fbbf24]">×{r.qty}</span>
                  </p>
                  <p className="mt-0.5 text-sm text-[#8a93a6]">
                    {r.requester}
                  </p>
                  <p className="text-xs text-[#8a93a6]">
                    {t('home.forTask', { taskId: r.taskId, time: tr(r, 'requested').replace(/^hace\s+/, '') })}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#22c55e] text-base font-bold text-[#0f1117] active:bg-[#16a34a]"
                >
                  <Check className="h-5 w-5" strokeWidth={3} />
                  {t('home.deliver')}
                </button>
                <button
                  type="button"
                  className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 text-base font-bold text-[#ef4444] active:bg-[#ef4444]/20"
                >
                  <X className="h-5 w-5" strokeWidth={3} />
                  {t('home.unavailable')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button
        type="button"
        className="fixed right-5 bottom-24 z-30 flex h-14 items-center gap-2 rounded-full px-5 text-base font-bold text-[#0f1117] shadow-lg active:opacity-90"
        style={{ backgroundColor: '#fbbf24', boxShadow: '0 10px 25px -5px rgba(251,191,36,0.4)' }}
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
        {t('home.addItem')}
      </button>
    </div>
  )
}
