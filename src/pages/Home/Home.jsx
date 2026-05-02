import { useAuth } from '../../auth/AuthContext'
import SiteManagerHome from './SiteManagerHome'
import SupervisorHome from './SupervisorHome'
import TechnicianHome from './TechnicianHome'
import WarehouseHome from './WarehouseHome'
import ProjectManagerHome from './ProjectManagerHome'
import FleetManagerHome from './FleetManagerHome'

export default function Home() {
  const { user } = useAuth()
  if (!user) return null
  switch (user.role) {
    case 'site_manager':
      return <SiteManagerHome />
    case 'supervisor':
      return <SupervisorHome />
    case 'technician':
      return <TechnicianHome />
    case 'warehouse_manager':
      return <WarehouseHome />
    case 'project_manager':
      return <ProjectManagerHome />
    case 'fleet_manager':
      return <FleetManagerHome />
    default:
      return null
  }
}
