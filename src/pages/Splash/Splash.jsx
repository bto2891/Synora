import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'

export default function Splash() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { t } = useI18n()

  useEffect(() => {
    const t = setTimeout(() => {
      navigate(user ? '/' : '/login', { replace: true })
    }, 1400)
    return () => clearTimeout(t)
  }, [navigate, user])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0f1117] text-white">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#60a5fa] text-3xl font-black text-[#0f1117] shadow-lg shadow-[#60a5fa]/30">
        S
      </div>
      <p className="mt-6 text-2xl font-bold tracking-tight">{t('appName')}</p>
      <p className="mt-1 text-sm font-medium uppercase tracking-[0.3em] text-[#8a93a6]">
        {t('appTagline')}
      </p>
      <div className="mt-10 flex gap-1.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#60a5fa]" />
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#60a5fa]"
          style={{ animationDelay: '150ms' }}
        />
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#60a5fa]"
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  )
}
