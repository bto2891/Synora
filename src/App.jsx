import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'
import Layout from './components/layout/Layout'
import AdminLayout from './components/admin/AdminLayout'
import Splash from './pages/Splash/Splash'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Tasks from './pages/Tasks/Tasks'
import Messages from './pages/Messages/Messages'
import Channel from './pages/Messages/Channel'
import Warehouse from './pages/Warehouse/Warehouse'
import Profile from './pages/Profile/Profile'
import VehicleList from './pages/Vehicles/VehicleList'
import VehicleRequest from './pages/Vehicles/VehicleRequest'
import VehicleApproval from './pages/Vehicles/VehicleApproval'
import VehicleReturn from './pages/Vehicles/VehicleReturn'
import VehicleHistory from './pages/Vehicles/VehicleHistory'
import PhysicalInspection from './pages/Tasks/PhysicalInspection'
import DeliveryQueue from './pages/Delivery/DeliveryQueue'
import Metrics from './pages/Metrics/Metrics'
import AdminLogin from './pages/Admin/AdminLogin'
import AdminDashboard from './pages/Admin/AdminDashboard'
import CompanyList from './pages/Admin/CompanyList'
import CompanyDetail from './pages/Admin/CompanyDetail'
import UserManagement from './pages/Admin/UserManagement'
import AdminStats from './pages/Admin/AdminStats'
import AdminSettings from './pages/Admin/AdminSettings'

function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  if (user.role === 'super_admin') return <Navigate to="/admin/dashboard" replace />
  return children
}

function RequireAdmin({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/admin" replace state={{ from: location }} />
  if (user.role !== 'super_admin') return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/splash" element={<Splash />} />
      <Route path="/login" element={<Login />} />

      {/* ── Admin routes ── */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          <RequireAdmin>
            <AdminLayout>
              <Routes>
                <Route path="dashboard"         element={<AdminDashboard />} />
                <Route path="companies"         element={<CompanyList />} />
                <Route path="companies/:id"     element={<CompanyDetail />} />
                <Route path="users"             element={<UserManagement />} />
                <Route path="stats"             element={<AdminStats />} />
                <Route path="settings"          element={<AdminSettings />} />
                <Route path="*"                 element={<Navigate to="/admin/dashboard" replace />} />
              </Routes>
            </AdminLayout>
          </RequireAdmin>
        }
      />

      {/* ── Main app routes ── */}
      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/"                      element={<Home />} />
        <Route path="/tasks"                 element={<Tasks />} />
        <Route path="/tasks/inspection"      element={<PhysicalInspection />} />
        <Route path="/messages"              element={<Messages />} />
        <Route path="/messages/:channelId"   element={<Channel />} />
        <Route path="/warehouse"             element={<Warehouse />} />
        <Route path="/profile"               element={<Profile />} />
        <Route path="/vehicles"              element={<VehicleList />} />
        <Route path="/vehicles/request"      element={<VehicleRequest />} />
        <Route path="/vehicles/approval"     element={<VehicleApproval />} />
        <Route path="/vehicles/return"       element={<VehicleReturn />} />
        <Route path="/vehicles/history"      element={<VehicleHistory />} />
        <Route path="/delivery"              element={<DeliveryQueue />} />
        <Route path="/metrics"               element={<Metrics />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
