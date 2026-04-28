import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Send, Sparkles } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { CHANNELS, MESSAGES } from '../../data/sample'

export default function Channel() {
  const { channelId } = useParams()
  const { role } = useAuth()
  const accent = role.accent
  const channel = CHANNELS.find((c) => c.id === channelId)
  const msgs = MESSAGES[channelId] || []

  if (!channel) {
    return (
      <div className="py-10 text-center text-sm text-[#8a93a6]">
        Channel not found.{' '}
        <Link to="/messages" className="text-[#60a5fa]">
          Back to channels
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-180px)] flex-col">
      <div className="-mx-4 flex items-center gap-3 border-b border-[#262c3a] px-4 pb-3">
        <Link
          to="/messages"
          aria-label="Back"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#8a93a6] active:bg-[#1d2230]"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <p className="text-base font-bold text-white">#{channel.name}</p>
          <p className="text-xs text-[#8a93a6]">
            {channel.kind === 'zone' ? 'Zone channel' : 'Group channel'}
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-3 py-4">
        {msgs.map((m) => {
          if (m.ai) {
            return (
              <div key={m.id} className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#a78bfa]/15 text-[#a78bfa]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-[#a78bfa]/30 bg-[#a78bfa]/10 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#a78bfa]">
                      {m.author}
                    </span>
                    <span className="rounded-md bg-[#a78bfa]/20 px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#a78bfa]">
                      AI
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-white">{m.text}</p>
                  <p className="mt-1 text-[11px] text-[#8a93a6]">{m.time}</p>
                </div>
              </div>
            )
          }
          if (m.mine) {
            return (
              <div key={m.id} className="flex justify-end">
                <div
                  className="max-w-[80%] rounded-2xl rounded-tr-sm px-4 py-2.5 text-[#0f1117]"
                  style={{ backgroundColor: accent }}
                >
                  <p className="text-sm font-medium">{m.text}</p>
                  <p className="mt-1 text-[11px] opacity-70">{m.time}</p>
                </div>
              </div>
            )
          }
          return (
            <div key={m.id} className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1d2230] text-xs font-semibold text-white">
                {m.initials}
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-[#161a23] px-4 py-2.5">
                <p className="text-xs font-bold text-[#8a93a6]">{m.author}</p>
                <p className="mt-0.5 text-sm text-white">{m.text}</p>
                <p className="mt-1 text-[11px] text-[#8a93a6]">{m.time}</p>
              </div>
            </div>
          )
        })}
        {msgs.length === 0 && (
          <p className="py-8 text-center text-sm text-[#8a93a6]">
            No messages yet.
          </p>
        )}
      </div>

      <div className="sticky bottom-24 -mx-4 border-t border-[#262c3a] bg-[#0f1117] px-4 py-3">
        <div className="flex items-center gap-2 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 py-2.5">
          <input
            type="text"
            placeholder={`Message #${channel.name}`}
            className="w-full bg-transparent text-base text-white placeholder-[#8a93a6] outline-none"
          />
          <button
            type="button"
            aria-label="Send"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#0f1117]"
            style={{ backgroundColor: accent }}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
