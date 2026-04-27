import { Bell, Search } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-3">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects, parts, work orders..."
          className="w-80 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-8 w-8 rounded-full bg-indigo-600 text-xs font-medium leading-8 text-white">
          OP
        </div>
      </div>
    </header>
  )
}
