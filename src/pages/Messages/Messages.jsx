import { Link } from 'react-router-dom'
import { Hash, Users } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { useI18n } from '../../i18n/I18nContext'
import { CHANNELS } from '../../data/sample'

function visibleChannelsFor(user) {
  if (user.role === 'technician') {
    const zoneId = user.zone.toLowerCase().replace(' ', '-')
    return CHANNELS.filter(
      (c) => c.id === zoneId || c.id === 'supervisors',
    )
  }
  if (user.role === 'supervisor') {
    const zoneId = user.zone.toLowerCase().replace(' ', '-')
    return CHANNELS.filter(
      (c) => c.id === zoneId || c.id === 'supervisors' || c.id === 'warehouse',
    )
  }
  if (user.role === 'warehouse_manager') {
    return CHANNELS.filter((c) => c.id === 'warehouse' || c.kind === 'zone')
  }
  return CHANNELS
}

export default function Messages() {
  const { user, role } = useAuth()
  const { t, tr } = useI18n()
  const channels = visibleChannelsFor(user)
  const accent = role.accent

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-white">{t('messages.title')}</h1>
        <p className="mt-0.5 text-sm text-[#8a93a6]">
          {t('messages.subtitle')}
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border border-[#262c3a] bg-[#161a23]">
        {channels.map((c, i) => (
          <Link
            key={c.id}
            to={`/messages/${c.id}`}
            className={`flex items-center gap-3 p-4 active:bg-[#1d2230] ${i > 0 ? 'border-t border-[#262c3a]' : ''}`}
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${accent}1a`, color: accent }}
            >
              {c.kind === 'zone' ? (
                <Hash className="h-5 w-5" />
              ) : (
                <Users className="h-5 w-5" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate text-base font-semibold text-white">
                  {tr(c, 'name')}
                </p>
                <span className="shrink-0 text-xs text-[#8a93a6]">
                  {tr(c, 'time')}
                </span>
              </div>
              <p className="truncate text-sm text-[#8a93a6]">{tr(c, 'last')}</p>
            </div>
            {c.unread > 0 && (
              <span
                className="flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 text-xs font-bold text-[#0f1117]"
                style={{ backgroundColor: accent }}
              >
                {c.unread}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
