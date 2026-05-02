import { Shield, Database, Globe, Bell } from 'lucide-react'
import { isSupabaseConfigured } from '../../lib/supabase'

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-0.5 text-sm text-[#8a93a6]">Platform configuration</p>
      </div>

      {/* Supabase status */}
      <div className="rounded-xl border border-[#262c3a] bg-[#161a23] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#a78bfa]/10 text-[#a78bfa]">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Supabase Connection</p>
            <p className="text-xs text-[#8a93a6]">Backend database and authentication</p>
          </div>
          <div className="ml-auto">
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                isSupabaseConfigured
                  ? 'bg-[#22c55e]/10 text-[#22c55e]'
                  : 'bg-[#fbbf24]/10 text-[#fbbf24]'
              }`}
            >
              {isSupabaseConfigured ? 'Connected' : 'Not configured'}
            </span>
          </div>
        </div>
        {!isSupabaseConfigured && (
          <div className="mt-4 rounded-lg border border-[#fbbf24]/20 bg-[#fbbf24]/5 px-4 py-3">
            <p className="text-xs text-[#fbbf24]">
              Add <code className="font-mono">VITE_SUPABASE_URL</code> and{' '}
              <code className="font-mono">VITE_SUPABASE_ANON_KEY</code> to your{' '}
              <code className="font-mono">.env.local</code> file to enable real authentication
              and database storage.
            </p>
          </div>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {[
          {
            icon: Shield,
            title: 'Security',
            desc: 'PIN complexity rules, session timeouts',
            items: ['Minimum PIN length: 4 digits', 'Session expires: 30 days', 'Failed attempts lockout: 5'],
          },
          {
            icon: Globe,
            title: 'Localization',
            desc: 'Supported languages and date formats',
            items: ['Languages: English, Spanish', 'Date format: auto (browser)', 'Timezone: UTC / local'],
          },
          {
            icon: Bell,
            title: 'Notifications',
            desc: 'System alert thresholds',
            items: ['Tool checkout alert: 24h', 'Task overdue alert: 2h', 'Low stock threshold: configurable'],
          },
        ].map(({ icon: Icon, title, desc, items }) => (
          <div key={title} className="rounded-xl border border-[#262c3a] bg-[#161a23] p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#a78bfa]/10 text-[#a78bfa]">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-[#8a93a6]">{desc}</p>
              </div>
            </div>
            <ul className="space-y-1.5">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-[#8a93a6]">
                  <span className="h-1 w-1 rounded-full bg-[#a78bfa]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
