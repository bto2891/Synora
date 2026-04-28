import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0f1117] text-[#e6e9f2]">
      <Header />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-28">
        <div className="mx-auto w-full max-w-2xl">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
