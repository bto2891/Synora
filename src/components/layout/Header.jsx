import { Bell, Search } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#262c3a] bg-[#0f1117]/95 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-4 md:h-16 md:px-8">
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#60a5fa] text-base font-bold text-[#0f1117]">
            S
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Synora
          </span>
        </div>

        <div className="hidden flex-1 items-center gap-3 rounded-lg bg-[#161a23] px-4 py-2 md:flex md:max-w-md">
          <Search className="h-5 w-5 text-[#8a93a6]" />
          <input
            type="text"
            placeholder="Search projects, parts, work orders..."
            className="w-full bg-transparent text-sm text-white placeholder-[#8a93a6] outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-12 w-12 items-center justify-center rounded-lg text-[#8a93a6] active:bg-[#1d2230] md:hover:bg-[#1d2230] md:hover:text-white"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-[#f97316] ring-2 ring-[#0f1117]" />
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#60a5fa] text-sm font-semibold text-[#0f1117]">
            OP
          </div>
        </div>
      </div>
    </header>
  )
}
