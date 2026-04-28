import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'
import Layout from './components/layout/Layout'
import Splash from './pages/Splash/Splash'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Tasks from './pages/Tasks/Tasks'
import Messages from './pages/Messages/Messages'
import Channel from './pages/Messages/Channel'
import Warehouse from './pages/Warehouse/Warehouse'
import Profile from './pages/Profile/Profile'

function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/splash" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:channelId" element={<Channel />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
