import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Shield, Loader, AlertCircle } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { loginAdmin, isSupabaseConfigured } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.')
      return
    }
    setLoading(true)
    const { error: err } = await loginAdmin(email.trim(), password)
    setLoading(false)
    if (err) { setError(err); return }
    navigate('/admin/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0f1117] px-6 text-white">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#a78bfa] text-xl font-black text-[#0f1117] shadow-lg shadow-[#a78bfa]/30">
            S
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">Synora Admin</p>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#8a93a6]">
              Super Admin Panel
            </p>
          </div>
        </div>

        {!isSupabaseConfigured && (
          <div className="mb-5 flex items-start gap-2 rounded-xl border border-[#a78bfa]/30 bg-[#a78bfa]/8 px-4 py-3">
            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-[#a78bfa]" />
            <p className="text-xs text-[#a78bfa]">
              Demo mode: use <strong>admin@synora.io</strong> / <strong>admin</strong>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">Email</span>
            <div className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3 focus-within:border-[#a78bfa]">
              <Mail className="h-5 w-5 text-[#8a93a6]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@synora.io"
                className="w-full bg-transparent text-base text-white placeholder-[#8a93a6] outline-none"
                autoComplete="email"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#8a93a6]">Password</span>
            <div className="flex items-center gap-3 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-3 focus-within:border-[#a78bfa]">
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

          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-[#ef4444]/30 bg-[#ef4444]/8 px-4 py-3">
              <AlertCircle className="h-4 w-4 shrink-0 text-[#ef4444]" />
              <p className="text-sm text-[#ef4444]">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#a78bfa] text-base font-bold text-[#0f1117] shadow-lg shadow-[#a78bfa]/20 disabled:opacity-60"
          >
            {loading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Shield className="h-5 w-5" />
                Sign In to Admin
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-[#8a93a6]">
          Not an admin?{' '}
          <a href="/login" className="font-semibold text-[#60a5fa]">
            Back to app →
          </a>
        </p>
      </div>
    </div>
  )
}
