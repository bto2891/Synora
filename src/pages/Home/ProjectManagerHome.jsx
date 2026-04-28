import { Download, TrendingUp, RotateCcw, Timer, Bot } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { PROJECT_STATS } from '../../data/sample'

export default function ProjectManagerHome() {
  const { user } = useAuth()
  const s = PROJECT_STATS

  const stats = [
    { label: 'Tasks completed', value: `${s.tasksCompleted} / ${s.tasksTotal}`, icon: TrendingUp },
    { label: 'Rework rate', value: `${s.reworkPercent}%`, icon: RotateCcw },
    { label: 'Avg / robot', value: `${s.avgRobotMinutes}m`, icon: Timer },
    { label: 'Robots validated', value: `${s.robotsValidated} / ${s.robotsTotal}`, icon: Bot },
  ]

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-[#8a93a6]">Executive view · {user.name}</p>
        <h1 className="mt-1 text-2xl font-bold text-white">{s.name}</h1>
        <p className="mt-0.5 text-sm" style={{ color: '#a78bfa' }}>
          Week {s.week} of {s.totalWeeks}
        </p>
      </header>

      <section className="rounded-xl border border-[#262c3a] bg-[#161a23] p-5">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-semibold text-[#8a93a6] uppercase tracking-wide">
            Overall progress
          </p>
          <p className="text-2xl font-bold text-white">{s.progress}%</p>
        </div>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-[#1d2230]">
          <div
            className="h-full rounded-full"
            style={{
              width: `${s.progress}%`,
              backgroundColor: '#a78bfa',
            }}
          />
        </div>
        <p className="mt-2 text-xs text-[#8a93a6]">
          On track to validate all {s.robotsTotal} robots by week {s.totalWeeks}.
        </p>
      </section>

      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#a78bfa]/10 text-[#a78bfa]">
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-3 text-xl font-bold text-white">{value}</p>
            <p className="mt-0.5 text-sm text-[#8a93a6]">{label}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          Progress by zone
        </h2>
        <div className="space-y-3 rounded-xl border border-[#262c3a] bg-[#161a23] p-4">
          {s.zoneProgress.map((z) => (
            <div key={z.zone}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{z.zone}</p>
                <p className="text-sm font-bold text-[#a78bfa]">{z.percent}%</p>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#1d2230]">
                <div
                  className="h-full rounded-full bg-[#a78bfa]"
                  style={{ width: `${z.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          Top technicians
        </h2>
        <div className="overflow-hidden rounded-xl border border-[#262c3a] bg-[#161a23]">
          {s.topTechnicians.map((t, i) => (
            <div
              key={t.name}
              className={`flex items-center gap-3 p-4 ${i > 0 ? 'border-t border-[#262c3a]' : ''}`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#a78bfa]/10 text-sm font-bold text-[#a78bfa]">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold text-white">{t.name}</p>
                <p className="text-sm text-[#8a93a6]">
                  {t.tasksDone} tasks done
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-white">{t.score}</p>
                <p className="text-xs text-[#8a93a6]">score</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button
        type="button"
        className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl px-4 text-base font-bold text-[#0f1117] shadow-lg active:opacity-90"
        style={{ backgroundColor: '#a78bfa', boxShadow: '0 10px 25px -5px rgba(167,139,250,0.4)' }}
      >
        <Download className="h-5 w-5" />
        Export report
      </button>
    </div>
  )
}
