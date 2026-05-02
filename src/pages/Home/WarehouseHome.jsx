import { Check, X, Plus, AlertTriangle, Package, RotateCcw } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'
import { useToolRequests } from '../../context/ToolRequestContext'
import { WAREHOUSE_ITEMS } from '../../data/sample'
import { timeAgo, isOverLimit } from '../../utils/time'

export default function WarehouseHome() {
  const { user } = useAuth()
  const { t, tr, lang } = useI18n()
  const { requests, markDelivered, confirmReturn } = useToolRequests()

  const lowStock = WAREHOUSE_ITEMS.filter((i) => i.stock <= i.threshold)
  const pendingRequests = requests.filter((r) => r.status === 'pending')
  const toolsOut = requests.filter((r) => r.status === 'delivered' || r.status === 'return_pending')
  const returnsToConfirm = requests.filter((r) => r.status === 'return_pending')

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-[#8a93a6]">{t('home.warehouse')}</p>
        <h1 className="mt-1 text-2xl font-bold text-white">{user.name}</h1>
        <p className="mt-0.5 text-sm" style={{ color: '#fbbf24' }}>
          {t('home.pendingRequests', { count: pendingRequests.length })}
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
              {lowStock.length > 2 ? ` ${t('home.morePlus', { count: lowStock.length - 2 })}` : ''}
            </p>
          </div>
        </div>
      )}

      {/* Pending requests */}
      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          {t('home.pendingRequestsHeader')}
        </h2>
        <div className="space-y-3">
          {pendingRequests.length === 0 && (
            <p className="text-sm text-[#8a93a6]">{t('toolRequests.noRequests')}</p>
          )}
          {pendingRequests.map((r) => (
            <div key={r.id} className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fbbf24]/10 text-[#fbbf24]">
                  <Package className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-white">
                    {tr(r, 'item')}{' '}
                    <span className="text-[#fbbf24]">×{r.qty}</span>
                  </p>
                  <p className="mt-0.5 text-sm text-[#8a93a6]">{r.technician}</p>
                  <p className="text-xs text-[#8a93a6]">
                    {r.taskId} · {timeAgo(r.requestedAt, lang)}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => markDelivered(r.id)}
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

      {/* Returns to confirm */}
      {returnsToConfirm.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
            {t('toolRequests.pendingReturns')}
          </h2>
          <div className="space-y-3">
            {returnsToConfirm.map((r) => (
              <div key={r.id} className="rounded-xl border border-[#fbbf24]/30 bg-[#161a23] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fbbf24]/10 text-[#fbbf24]">
                    <RotateCcw className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-white">
                      {tr(r, 'item')}{' '}
                      <span className="text-[#fbbf24]">×{r.qty}</span>
                    </p>
                    <p className="mt-0.5 text-sm text-[#8a93a6]">{r.technician}</p>
                    <p className="text-xs text-[#8a93a6]">{r.taskId}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => confirmReturn(r.id)}
                  className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#fbbf24] text-base font-bold text-[#0f1117] active:opacity-80"
                >
                  <Check className="h-5 w-5" strokeWidth={3} />
                  {t('toolRequests.confirmReturn')}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tools currently out */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
            {t('toolRequests.toolsOut')}
          </h2>
          <span className="rounded-full bg-[#fbbf24]/10 px-2.5 py-0.5 text-xs font-bold text-[#fbbf24]">
            {toolsOut.length}
          </span>
        </div>
        {toolsOut.length === 0 ? (
          <p className="text-sm text-[#8a93a6]">{t('toolRequests.noToolsOut')}</p>
        ) : (
          <div className="space-y-2">
            {toolsOut.map((r) => {
              const over = isOverLimit(r.deliveredAt, 24)
              return (
                <div
                  key={r.id}
                  className={`rounded-xl border p-4 ${
                    over ? 'border-[#ef4444]/30 bg-[#ef4444]/5' : 'border-[#262c3a] bg-[#161a23]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-[#0f1117]"
                      style={{ backgroundColor: '#fbbf24' }}
                    >
                      {r.technicianInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-base font-semibold text-white">
                            {tr(r, 'item')} ×{r.qty}
                          </p>
                          <p className="mt-0.5 text-sm text-[#8a93a6]">
                            {t('toolRequests.heldBy', { name: r.technician })}
                          </p>
                          <p className="text-xs text-[#8a93a6]">
                            {r.taskId} · {t('toolRequests.outFor', { time: timeAgo(r.deliveredAt, lang) })}
                          </p>
                        </div>
                        {over && (
                          <span className="shrink-0 rounded-md border border-[#ef4444]/40 bg-[#ef4444]/10 px-2 py-0.5 text-[10px] font-bold uppercase text-[#ef4444]">
                            {t('toolRequests.overdueAlert')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
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
