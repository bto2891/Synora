import { NavLink } from 'react-router-dom'
import {
  Home,
  ListChecks,
  MessageSquare,
  Warehouse,
  User,
} from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'

export default function BottomNav() {
  const { role } = useAuth()
  const { t } = useI18n()
  const accent = role?.accent || '#60a5fa'

  const navItems = [
    { to: '/', icon: Home, label: t('nav.home') },
    { to: '/tasks', icon: ListChecks, label: t('nav.tasks') },
    { to: '/messages', icon: MessageSquare, label: t('nav.messages') },
    { to: '/warehouse', icon: Warehouse, label: t('nav.warehouse') },
    { to: '/profile', icon: User, label: t('nav.profile') },
  ]

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#262c3a] bg-[#161a23]/95 backdrop-blur"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto grid max-w-2xl grid-cols-5">
        {navItems.map(({ to, icon: Icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className="flex min-h-[64px] flex-col items-center justify-center gap-1 px-1 py-2 text-[11px] font-medium"
            >
              {({ isActive }) => (
                <>
                  <span
                    className="flex h-9 w-12 items-center justify-center rounded-lg transition-colors"
                    style={{
                      backgroundColor: isActive ? `${accent}26` : 'transparent',
                      color: isActive ? accent : '#8a93a6',
                    }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={isActive ? 2.4 : 2} />
                  </span>
                  <span style={{ color: isActive ? accent : '#8a93a6' }}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
