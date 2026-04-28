import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Globe, ChevronRight, Bell, ShieldCheck, HelpCircle } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'

export default function Profile() {
  const navigate = useNavigate()
  const { user, role, logout } = useAuth()
  const [lang, setLang] = useState('EN')

  const accent = role.accent

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="mt-0.5 text-sm text-[#8a93a6]">
          Account, language, and session
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
              {role.label.split(' ')[0]}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-white">{user.name}</p>
            <p className="text-sm" style={{ color: accent }}>
              {role.label}
            </p>
            <p className="mt-1 text-sm text-[#8a93a6]">
              {user.project} · {user.zone}
            </p>
          </div>
        </div>
      </div>

      <section>
        <h2 className="mb-2 px-1 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          Language
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
              App language
            </p>
            <div className="flex overflow-hidden rounded-lg border border-[#262c3a]">
              {['EN', 'ES'].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className="min-h-[40px] min-w-[52px] text-sm font-bold transition-colors"
                  style={{
                    backgroundColor: lang === l ? accent : '#1d2230',
                    color: lang === l ? '#0f1117' : '#8a93a6',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-2 px-1 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          Account
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
              Notifications
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
              Privacy & security
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
              Help center
            </p>
            <ChevronRight className="h-5 w-5 text-[#8a93a6]" />
          </button>
        </div>
      </section>

      <button
        type="button"
        onClick={handleLogout}
        className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 text-base font-semibold text-[#ef4444] active:bg-[#1d2230]"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>

      <p className="pt-2 text-center text-xs text-[#8a93a6]">Synora · v2.5.0</p>
    </div>
  )
}
