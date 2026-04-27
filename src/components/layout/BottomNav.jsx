import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  Package,
  ClipboardList,
  Settings,
} from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/work-orders', icon: ClipboardList, label: 'Orders' },
  { to: '/inventory', icon: Package, label: 'Parts' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#262c3a] bg-[#161a23]/95 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid grid-cols-5">
        {navItems.map(({ to, icon: Icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex min-h-[64px] flex-col items-center justify-center gap-1 px-1 py-2 text-[11px] font-medium transition-colors ${
                  isActive
                    ? 'text-[#60a5fa]'
                    : 'text-[#8a93a6] active:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-9 w-12 items-center justify-center rounded-lg transition-colors ${
                      isActive ? 'bg-[#60a5fa]/15' : ''
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={isActive ? 2.4 : 2} />
                  </span>
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
