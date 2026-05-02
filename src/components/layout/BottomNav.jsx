import { NavLink } from 'react-router-dom'
import {
  Home,
  ListChecks,
  MessageSquare,
  Warehouse,
  User,
  Truck,
  PackageCheck,
  BarChart2,
} from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'

function navForRole(role, t) {
  const home    = { to: '/',          icon: Home,         label: t('nav.home') }
  const tasks   = { to: '/tasks',     icon: ListChecks,   label: t('nav.tasks') }
  const msgs    = { to: '/messages',  icon: MessageSquare,label: t('nav.messages') }
  const wh      = { to: '/warehouse', icon: Warehouse,    label: t('nav.warehouse') }
  const profile = { to: '/profile',   icon: User,         label: t('nav.profile') }
  const vehicles = { to: '/vehicles', icon: Truck,        label: t('nav.vehicles') }
  const delivery = { to: '/delivery', icon: PackageCheck, label: t('nav.delivery') }
  const metrics  = { to: '/metrics',  icon: BarChart2,    label: t('nav.metrics') }

  switch (role) {
    case 'technician':
      return [home, tasks, msgs, wh, vehicles, profile]
    case 'fleet_manager':
      return [home, vehicles, profile]
    case 'site_manager':
      return [home, tasks, delivery, msgs, profile]
    case 'project_manager':
      return [home, tasks, metrics, msgs, profile]
    case 'supervisor':
      return [home, tasks, msgs, wh, profile]
    case 'warehouse_manager':
      return [home, tasks, msgs, wh, profile]
    default:
      return [home, tasks, msgs, wh, profile]
  }
}

export default function BottomNav() {
  const { user, role } = useAuth()
  const { t } = useI18n()
  const accent = role?.accent || '#60a5fa'
  const navItems = navForRole(user?.role, t)

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#262c3a] bg-[#161a23]/95 backdrop-blur"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul
        className="mx-auto max-w-2xl"
        style={{ display: 'grid', gridTemplateColumns: `repeat(${navItems.length}, 1fr)` }}
      >
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
