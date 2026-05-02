import { useNavigate } from 'react-router-dom'
import { LogOut, Globe, ChevronRight, Bell, ShieldCheck, HelpCircle, Package } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'
import { useToolRequests } from '../../context/ToolRequestContext'
import { timeAgo } from '../../utils/time'

const TOOL_STATUS_STYLES = {
  pending:       { key: 'toolRequests.pending',      cls: 'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/30' },
  delivered:     { key: 'toolRequests.delivered',    cls: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30' },
  return_pending:{ key: 'toolRequests.returnPending',cls: 'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/30' },
  returned:      { key: 'toolRequests.returned',     cls: 'text-[#8a93a6] bg-[#8a93a6]/10 border-[#8a93a6]/30' },
}

export default function Profile() {
  const navigate = useNavigate()
  const { user, role, logout } = useAuth()
  const { t, tr, tz, lang, setLang } = useI18n()
  const { requests } = useToolRequests()

  const myAllTools = requests.filter((r) => r.technicianId === user.id)
  const activeToolCount = myAllTools.filter((r) => r.status !== 'returned').length
  const returnedToolCount = myAllTools.filter((r) => r.status === 'returned').length

  const accent = role.accent

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const roleLabel = t(`roles.${role.id}`)

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-white">{t('profile.title')}</h1>
        <p className="mt-0.5 text-sm text-[#8a93a6]">
          {t('profile.subtitle')}
        </p>
      </header>

      <div className="rounded-2xl border border-[#262c3a] bg-[#161a23] p-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-[#0f1117]"
              style={{ backgroundColor: accent }}
            >
              {user.initials}
            </div>
            <span
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#0f1117]"
              style={{ backgroundColor: accent }}
            >
              {roleLabel.split(' ')[0]}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-white">{user.name}</p>
            <p className="text-sm" style={{ color: accent }}>
              {roleLabel}
            </p>
            <p className="mt-1 text-sm text-[#8a93a6]">
              {user.project} · {tz(user.zone)}
            </p>
          </div>
        </div>
      </div>

      <section>
        <h2 className="mb-2 px-1 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          {t('profile.languageHeader')}
        </h2>
        <div className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${accent}1a`, color: accent }}
            >
              <Globe className="h-5 w-5" />
            </div>
            <p className="flex-1 text-base font-semibold text-white">
              {t('profile.appLanguage')}
            </p>
            <div className="flex overflow-hidden rounded-lg border border-[#262c3a]">
              {[
                { code: 'en', label: 'EN' },
                { code: 'es', label: 'ES' },
              ].map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  className="min-h-[40px] min-w-[52px] text-sm font-bold transition-colors"
                  style={{
                    backgroundColor: lang === l.code ? accent : '#1d2230',
                    color: lang === l.code ? '#0f1117' : '#8a93a6',
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {user.role === 'technician' && (
        <section>
          <h2 className="mb-2 px-1 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
            {t('toolRequests.sectionTitle')}
          </h2>
          <div className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4">
            {myAllTools.length === 0 ? (
              <p className="text-sm text-[#8a93a6]">{t('toolRequests.noRequests')}</p>
            ) : (
              <>
                <div className="mb-4 flex items-center gap-6 border-b border-[#262c3a] pb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{activeToolCount}</p>
                    <p className="text-xs text-[#8a93a6]">Active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{returnedToolCount}</p>
                    <p className="text-xs text-[#8a93a6]">Returned</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {myAllTools.map((r) => {
                    const s = TOOL_STATUS_STYLES[r.status]
                    return (
                      <div key={r.id} className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1d2230] text-[#e2e8f0]">
                          <Package className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-sm font-semibold text-white">
                              {tr(r, 'item')} ×{r.qty}
                            </p>
                            <span className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase ${s.cls}`}>
                              {t(s.key)}
                            </span>
                          </div>
                          <p className="text-xs text-[#8a93a6]">
                            {r.taskId} · {t('toolRequests.requestedOn', { time: timeAgo(r.requestedAt, lang) })}
                          </p>
                          {r.deliveredAt && (
                            <p className="text-xs text-[#8a93a6]">
                              {t('toolRequests.deliveredOn', { time: timeAgo(r.deliveredAt, lang) })}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-2 px-1 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          {t('profile.accountHeader')}
        </h2>
        <div className="divide-y divide-[#262c3a] overflow-hidden rounded-xl border border-[#262c3a] bg-[#161a23]">
          <button
            type="button"
            className="flex min-h-[60px] w-full items-center gap-3 px-4 py-3 text-left active:bg-[#1d2230]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1d2230] text-[#60a5fa]">
              <Bell className="h-5 w-5" />
            </div>
            <p className="flex-1 text-base font-semibold text-white">
              {t('profile.notifications')}
            </p>
            <ChevronRight className="h-5 w-5 text-[#8a93a6]" />
          </button>
          <button
            type="button"
            className="flex min-h-[60px] w-full items-center gap-3 px-4 py-3 text-left active:bg-[#1d2230]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1d2230] text-[#60a5fa]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <p className="flex-1 text-base font-semibold text-white">
              {t('profile.privacy')}
            </p>
            <ChevronRight className="h-5 w-5 text-[#8a93a6]" />
          </button>
          <button
            type="button"
            className="flex min-h-[60px] w-full items-center gap-3 px-4 py-3 text-left active:bg-[#1d2230]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1d2230] text-[#60a5fa]">
              <HelpCircle className="h-5 w-5" />
            </div>
            <p className="flex-1 text-base font-semibold text-white">
              {t('profile.help')}
            </p>
            <ChevronRight className="h-5 w-5 text-[#8a93a6]" />
          </button>
        </div>
      </section>

      <button
        type="button"
        onClick={handleLogout}
        className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-[#ef4444] px-4 text-base font-bold text-white shadow-lg shadow-[#ef4444]/25 active:bg-[#dc2626]"
      >
        <LogOut className="h-5 w-5" />
        {t('profile.logout')}
      </button>

      <p className="pt-2 text-center text-xs text-[#8a93a6]">{t('appName')} · v2.5.0</p>
    </div>
  )
}
