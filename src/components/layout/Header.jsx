import { Bell, RefreshCcw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'

export default function Header() {
  const { user, role, logout } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()
  const accent = role?.accent || '#60a5fa'

  const handleSwitchRole = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[#262c3a] bg-[#0f1117]/95 backdrop-blur">
      <div
        className="h-1 w-full"
        style={{ backgroundColor: accent }}
      />
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg text-base font-bold text-[#0f1117]"
            style={{ backgroundColor: accent }}
          >
            S
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold text-white">{t('appName')}</span>
            {role && (
              <span
                className="text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: accent }}
              >
                {t(`roles.${role.id}`)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <button
              type="button"
              onClick={handleSwitchRole}
              aria-label={t('common.switchRole')}
              className="flex h-8 items-center gap-1 rounded-lg border border-[#262c3a] bg-[#161a23] px-2.5 text-[11px] font-semibold text-[#8a93a6] active:bg-[#1d2230]"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              {t('common.switchRole')}
            </button>
          )}
          <button
            type="button"
            aria-label={t('common.notifications')}
            className="relative flex h-12 w-12 items-center justify-center rounded-lg text-[#8a93a6] active:bg-[#1d2230]"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-[#f97316] ring-2 ring-[#0f1117]" />
          </button>
          {user && (
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-[#0f1117]"
              style={{ backgroundColor: accent }}
            >
              {user.initials}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
