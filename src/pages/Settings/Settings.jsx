import {
  Bell,
  Moon,
  Wifi,
  ScanLine,
  Globe,
  ShieldCheck,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { useState } from 'react'

function Toggle({ on, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
        on ? 'bg-[#60a5fa]' : 'bg-[#262c3a]'
      }`}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
          on ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

function Row({ icon: Icon, title, subtitle, right }) {
  return (
    <div className="flex min-h-[64px] items-center gap-3 px-4 py-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1d2230] text-[#60a5fa]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-base font-semibold text-white">{title}</p>
        {subtitle && <p className="text-sm text-[#8a93a6]">{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}

export default function Settings() {
  const [push, setPush] = useState(true)
  const [dark, setDark] = useState(true)
  const [offline, setOffline] = useState(false)

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-white md:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-[#8a93a6]">
          Account, preferences, and device.
        </p>
      </header>

      <div className="flex items-center gap-4 rounded-xl border border-[#262c3a] bg-[#161a23] p-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#60a5fa] text-lg font-bold text-[#0f1117]">
          OP
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-white">Olivia Park</p>
          <p className="text-sm text-[#8a93a6]">Lead technician · Bay crew A</p>
        </div>
        <button
          type="button"
          className="min-h-[40px] rounded-lg border border-[#262c3a] bg-[#1d2230] px-4 text-sm font-semibold text-white active:bg-[#262c3a]"
        >
          Edit
        </button>
      </div>

      <section>
        <h2 className="mb-2 px-1 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          Preferences
        </h2>
        <div className="divide-y divide-[#262c3a] overflow-hidden rounded-xl border border-[#262c3a] bg-[#161a23]">
          <Row
            icon={Bell}
            title="Push notifications"
            subtitle="Get alerted for urgent orders"
            right={<Toggle on={push} onChange={setPush} />}
          />
          <Row
            icon={Moon}
            title="Dark mode"
            subtitle="Recommended on factory floor"
            right={<Toggle on={dark} onChange={setDark} />}
          />
          <Row
            icon={Wifi}
            title="Offline mode"
            subtitle="Cache work orders for poor signal"
            right={<Toggle on={offline} onChange={setOffline} />}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-2 px-1 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          Device
        </h2>
        <div className="divide-y divide-[#262c3a] overflow-hidden rounded-xl border border-[#262c3a] bg-[#161a23]">
          <button type="button" className="block w-full text-left active:bg-[#1d2230]">
            <Row
              icon={ScanLine}
              title="Barcode scanner"
              subtitle="Built-in camera"
              right={<ChevronRight className="h-5 w-5 text-[#8a93a6]" />}
            />
          </button>
          <button type="button" className="block w-full text-left active:bg-[#1d2230]">
            <Row
              icon={Globe}
              title="Language"
              subtitle="English (US)"
              right={<ChevronRight className="h-5 w-5 text-[#8a93a6]" />}
            />
          </button>
        </div>
      </section>

      <section>
        <h2 className="mb-2 px-1 text-sm font-semibold tracking-wide text-[#8a93a6] uppercase">
          Support
        </h2>
        <div className="divide-y divide-[#262c3a] overflow-hidden rounded-xl border border-[#262c3a] bg-[#161a23]">
          <button type="button" className="block w-full text-left active:bg-[#1d2230]">
            <Row
              icon={ShieldCheck}
              title="Privacy & security"
              right={<ChevronRight className="h-5 w-5 text-[#8a93a6]" />}
            />
          </button>
          <button type="button" className="block w-full text-left active:bg-[#1d2230]">
            <Row
              icon={HelpCircle}
              title="Help center"
              right={<ChevronRight className="h-5 w-5 text-[#8a93a6]" />}
            />
          </button>
        </div>
      </section>

      <button
        type="button"
        className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl border border-[#262c3a] bg-[#161a23] px-4 text-base font-semibold text-[#ef4444] active:bg-[#1d2230]"
      >
        <LogOut className="h-5 w-5" />
        Sign out
      </button>

      <p className="pt-2 text-center text-xs text-[#8a93a6]">Synora · v2.4.1</p>
    </div>
  )
}
