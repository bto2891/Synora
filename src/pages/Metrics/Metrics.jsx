import { BarChart2, TrendingUp, Users, CheckCircle } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext'
import { useAuth } from '../../auth/AuthContext'
import { PROJECT_STATS } from '../../data/sample'

export default function Metrics() {
  const { user } = useAuth()
  const { t } = useI18n()
  const s = PROJECT_STATS

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white">{t('metrics.title')}</h1>
        <p className="mt-0.5 text-sm text-[#8a93a6]">
          {t('home.executiveView', { name: user.name })}
        </p>
      </header>

      <div className="rounded-xl border border-[#a78bfa]/20 bg-[#a78bfa]/5 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#a78bfa]">{t('home.weekOf', { week: s.week, total: s.totalWeeks })}</p>
            <p className="mt-1 text-3xl font-bold text-white">{s.progress}%</p>
            <p className="text-sm text-[#8a93a6]">{t('home.overallProgress')}</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#a78bfa]/30">
            <BarChart2 className="h-8 w-8 text-[#a78bfa]" />
          </div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#262c3a]">
          <div className="h-full rounded-full bg-[#a78bfa]" style={{ width: `${s.progress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: t('home.tasksCompleted'), value: `${s.tasksCompleted} / ${s.tasksTotal}`, icon: CheckCircle, color: '#22c55e' },
          { label: t('home.reworkRate'), value: `${s.reworkPercent}%`, icon: TrendingUp, color: '#f97316' },
          { label: t('home.avgRobot'), value: `${s.avgRobotMinutes}m`, icon: BarChart2, color: '#60a5fa' },
          { label: t('home.robotsValidatedShort'), value: `${s.robotsValidated} / ${s.robotsTotal}`, icon: CheckCircle, color: '#a78bfa' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}1a`, color }}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-3 text-xl font-bold text-white">{value}</p>
            <p className="mt-0.5 text-xs text-[#8a93a6]">{label}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#8a93a6]">
          {t('home.progressByZone')}
        </h2>
        <div className="space-y-3">
          {s.zoneProgress.map(({ zone, percent }) => (
            <div key={zone} className="rounded-xl border border-[#262c3a] bg-[#161a23] p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">{zone}</span>
                <span className="text-sm font-bold text-[#a78bfa]">{percent}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#262c3a]">
                <div className="h-full rounded-full bg-[#a78bfa]" style={{ width: `${percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#8a93a6]">
          {t('home.topTechnicians')}
        </h2>
        <div className="overflow-hidden rounded-xl border border-[#262c3a] bg-[#161a23]">
          {s.topTechnicians.map((tech, i) => (
            <div key={tech.name} className={`flex items-center gap-3 p-4 ${i > 0 ? 'border-t border-[#262c3a]' : ''}`}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#a78bfa]/15 text-xs font-bold text-[#a78bfa]">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{tech.name}</p>
                <p className="text-xs text-[#8a93a6]">{t('home.tasksDone', { count: tech.tasksDone })}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#a78bfa]">{tech.score}</p>
                <p className="text-xs text-[#8a93a6]">{t('home.score')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#262c3a] bg-[#161a23] py-3 text-sm font-semibold text-[#8a93a6]"
      >
        {t('home.exportReport')}
      </button>
    </div>
  )
}
