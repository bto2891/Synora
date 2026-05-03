import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Phone, Lock, ChevronRight, AlertCircle, Loader } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { ROLES, ROLE_LIST } from '../../auth/roles'
import { useI18n } from '../../i18n/I18nContext'
import { useSupabaseStatus } from '../../hooks/useSupabaseStatus'

const STATUS_CONFIG = {
  checking:       { dot: '#8a93a6', label: 'Checking…',           pulse: true  },
  connected:      { dot: '#22c55e', label: 'Supabase Connected',  pulse: false },
  offline:        { dot: '#ef4444', label: 'Supabase Offline',    pulse: false },
  not_configured: { dot: '#8a93a6', label: 'Supabase Not Configured', pulse: false },
}

export default function Login() {
  const navigate = useNavigate()
  const { loginAs, loginReal, isSupabaseConfigured } = useAuth()
  const { t } = useI18n()
  const [params] = useSearchParams()

  const sbStatus = useSupabaseStatus()

  const [mode, setMode] = useState('demo') // 'real' | 'demo'
  const [phone, setPhone] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const as = params.get('as')
    if (as && ROLES[as]) {
      loginAs(as)
      navigate('/', { replace: true })
    }
  }, [params, loginAs, navigate])

  const handleRealLogin = async (e) => {
    e.preventDefault()
    setError('')
    if (!phone.trim()) { setError('Enter your phone number.'); return }
    if (pin.length !== 4) { setError('PIN must be 4 digits.'); return }
    setLoading(true)
    const { error: err } = await loginReal(phone, pin)
    setLoading(false)
    if (err) { setError(err); return }
    navigate('/', { replace: true })
  }

  const handleDemo = (id) => {
    loginAs(id)
    navigate('/', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0f1117] text-white">
      <div className="h-1 w-full bg-[#60a5fa]" />
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-12 pb-10">

        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#60a5fa] text-2xl font-black text-[#0f1117] shadow-lg shadow-[#60a5fa]/30">
            S
          </div>
          <p className="mt-4 text-2xl font-bold">{t('appName')}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#8a93a6]">
            {t('appTagline')}
          </p>

          {/* Supabase status indicator */}
          {(() => {
            const cfg = STATUS_CONFIG[sbStatus]
            return (
              <div className="mt-4 flex items-center gap-2 rounded-full border border-[#262c3a] bg-[#161a23] px-3 py-1.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: cfg.dot }}
                  />
                  {cfg.pulse && (
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                      style={{ backgroundColor: cfg.dot }}
                    />
                  )}
                </span>
                <span className="text-xs font-medium" style={{ color: cfg.dot }}>
                  {cfg.label}
                </span>
              </div>
            )
          })()}
        </div>

        {/* Mode toggle */}
        <div className="mt-10 flex overflow-hidden rounded-xl border border-[#262c3a]">
          {['real', 'demo'].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setError('') }}
              className="flex-1 py-2.5 text-sm font-semibold transition-colors"
              style={{
                backgroundColor: mode === m ? '#60a5fa' : '#161a23',
                color: mode === m ? '#0f1117' : '#8a93a6',
              }}
            >
              {m === 'real' ? t('login.realLogin') : t('login.demoMode')}
            </button>
          ))}
        </div>

        {/* ── Real login ── */}
        {mode === 'real' && (
          <form onSubmit={handleRealLogin} className="mt-6 space-y-3">
            {!isSupabaseConfigured && (
              <div className="flex items-start gap-2 rounded-xl border border-[#fbbf24]/30 bg-[#fbbf24]/8 px-4 py-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#fbbf24]" />
                <p className="text-xs text-[#fbbf24]">{t('login.noSupabase')}</p>
              </div>
            )}

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">
                {t('login.phone')}
              </span>
              <div className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3">
                <Phone className="h-5 w-5 text-[#8a93a6]" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t('login.phonePlaceholder')}
                  className="w-full bg-transparent text-base text-white placeholder-[#8a93a6] outline-none"
                  autoComplete="tel"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">
                {t('login.pin')}
              </span>
              <div className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3">
                <Lock className="h-5 w-5 text-[#8a93a6]" />
                <input
                  type="password"
                  inputMode="numeric"
                  pattern="\d{4}"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="••••"
                  className="w-full bg-transparent text-xl tracking-[0.4em] text-white placeholder-[#8a93a6] outline-none"
                  autoComplete="one-time-code"
                />
              </div>
            </label>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-[#ef4444]/30 bg-[#ef4444]/8 px-4 py-3">
                <AlertCircle className="h-4 w-4 shrink-0 text-[#ef4444]" />
                <p className="text-sm text-[#ef4444]">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-[#60a5fa] text-base font-bold text-[#0f1117] shadow-lg shadow-[#60a5fa]/20 disabled:opacity-60"
            >
              {loading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {t('login.signIn')}
                  <ChevronRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* ── Demo mode ── */}
        {mode === 'demo' && (
          <div className="mt-6 space-y-2.5">
            <p className="text-center text-xs text-[#8a93a6]">{t('login.demoHint')}</p>
            {ROLE_LIST.map((r) => {
              const label = t(`roles.${r.id}`)
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleDemo(r.id)}
                  className="flex min-h-[52px] w-full items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 text-left active:bg-[#1d2230]"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-[#0f1117]"
                    style={{ backgroundColor: r.accent }}
                  >
                    {label.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                  </span>
                  <span className="flex-1 text-sm font-semibold text-white">
                    {t('login.loginAs', { role: label })}
                  </span>
                  <ChevronRight className="h-4 w-4 text-[#8a93a6]" />
                </button>
              )
            })}
          </div>
        )}

        {/* Admin link */}
        <p className="mt-10 text-center text-xs text-[#8a93a6]">
          {t('login.adminAccess')}{' '}
          <a href="/admin" className="font-semibold text-[#a78bfa]">
            {t('login.adminLink')}
          </a>
        </p>
      </div>
    </div>
  )
}
