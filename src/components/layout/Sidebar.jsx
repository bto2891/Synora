import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  Package,
  ClipboardList,
  Settings,
} from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/inventory', icon: Package, label: 'Inventory' },
  { to: '/work-orders', icon: ClipboardList, label: 'Work Orders' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-[#262c3a] bg-[#161a23] md:flex">
      <div className="flex h-16 items-center gap-2 border-b border-[#262c3a] px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#60a5fa] text-base font-bold text-[#0f1117]">
          S
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          Synora
        </span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                isActive
                  ? 'bg-[#60a5fa]/10 text-[#60a5fa]'
                  : 'text-[#8a93a6] hover:bg-[#1d2230] hover:text-white'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
