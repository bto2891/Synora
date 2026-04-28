import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Mail, Lock, ChevronDown } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { ROLES, ROLE_LIST } from '../../auth/roles'

export default function Login() {
  const navigate = useNavigate()
  const { loginAs } = useAuth()
  const [params] = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [roleId, setRoleId] = useState('site_manager')

  useEffect(() => {
    const as = params.get('as')
    if (as && ROLES[as]) {
      loginAs(as)
      navigate('/', { replace: true })
    }
  }, [params, loginAs, navigate])

  const handleSignIn = (e) => {
    e.preventDefault()
    loginAs(roleId)
    navigate('/', { replace: true })
  }

  const handleDemo = (id) => {
    loginAs(id)
    navigate('/', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0f1117] text-white">
      <div
        className="h-1 w-full"
        style={{ backgroundColor: '#60a5fa' }}
      />
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-12 pb-10">
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#60a5fa] text-2xl font-black text-[#0f1117] shadow-lg shadow-[#60a5fa]/30">
            S
          </div>
          <p className="mt-4 text-2xl font-bold">Synora</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#8a93a6]">
            Industrial Operations
          </p>
        </div>

        <form onSubmit={handleSignIn} className="mt-10 space-y-3">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">
              Email
            </span>
            <div className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3">
              <Mail className="h-5 w-5 text-[#8a93a6]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-transparent text-base text-white placeholder-[#8a93a6] outline-none"
                autoComplete="email"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">
              Password
            </span>
            <div className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3">
              <Lock className="h-5 w-5 text-[#8a93a6]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-base text-white placeholder-[#8a93a6] outline-none"
                autoComplete="current-password"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">
              Role
            </span>
            <div className="relative flex items-center rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3">
              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                className="w-full appearance-none bg-transparent text-base text-white outline-none"
              >
                {ROLE_LIST.map((r) => (
                  <option key={r.id} value={r.id} className="bg-[#161a23]">
                    {r.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 h-5 w-5 text-[#8a93a6]" />
            </div>
          </label>

          <button
            type="submit"
            className="mt-2 flex min-h-[56px] w-full items-center justify-center rounded-xl bg-[#60a5fa] text-base font-bold text-[#0f1117] shadow-lg shadow-[#60a5fa]/20 active:bg-[#3b82f6]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-10">
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-[#262c3a]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8a93a6]">
              Demo mode
            </span>
            <span className="h-px flex-1 bg-[#262c3a]" />
          </div>
          <div className="mt-4 space-y-2.5">
            {ROLE_LIST.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleDemo(r.id)}
                className="flex min-h-[52px] w-full items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 text-left active:bg-[#1d2230]"
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-[#0f1117]"
                  style={{ backgroundColor: r.accent }}
                >
                  {r.label.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </span>
                <span className="flex-1 text-sm font-semibold text-white">
                  Login as {r.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
