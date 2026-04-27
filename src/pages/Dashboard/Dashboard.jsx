import { FolderKanban, Package, ClipboardList, AlertTriangle } from 'lucide-react'

const stats = [
  { label: 'Active Projects', value: '12', icon: FolderKanban, color: 'bg-indigo-100 text-indigo-600' },
  { label: 'Parts in Stock', value: '1,847', icon: Package, color: 'bg-emerald-100 text-emerald-600' },
  { label: 'Open Work Orders', value: '34', icon: ClipboardList, color: 'bg-amber-100 text-amber-600' },
  { label: 'Overdue Items', value: '3', icon: AlertTriangle, color: 'bg-red-100 text-red-600' },
]

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">
        Overview of your automotive integration operations.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">{label}</span>
              <div className={`rounded-lg p-2 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-semibold text-gray-900">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
