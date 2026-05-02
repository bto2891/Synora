import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Shield,
} from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'

const NAV = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/companies', icon: Building2,       label: 'Companies' },
  { to: '/admin/users',     icon: Users,           label: 'Users' },
  { to: '/admin/stats',     icon: BarChart2,       label: 'Stats' },
  { to: '/admin/settings',  icon: Settings,        label: 'Settings' },
]

const ACCENT = '#a78bfa'

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-[#0f1117] text-white">
      {/* ── Sidebar ── */}
      <aside className="flex w-56 shrink-0 flex-col border-r border-[#262c3a] bg-[#0d0f16]">
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-[#262c3a] px-5 py-5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-[#0f1117]"
            style={{ backgroundColor: ACCENT }}
          >
            S
          </div>
          <div>
            <p className="text-sm font-bold text-white">Synora</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#a78bfa]">
              Admin
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#a78bfa]/15 text-[#a78bfa]'
                    : 'text-[#8a93a6] hover:bg-[#161a23] hover:text-white'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User footer */}
        <div className="border-t border-[#262c3a] px-4 py-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#a78bfa]/15 text-xs font-bold text-[#a78bfa]">
              {user?.initials ?? 'SA'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-white">{user?.name ?? 'Super Admin'}</p>
              <div className="mt-0.5 flex items-center gap-1">
                <Shield className="h-3 w-3 text-[#a78bfa]" />
                <p className="text-[10px] text-[#a78bfa]">Super Admin</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#8a93a6] transition-colors hover:bg-[#161a23] hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
