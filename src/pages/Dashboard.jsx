import { useAuth } from '../context/AuthContext.jsx'
import { ROLES } from '../router/roles.js'
import DashboardAdmin from './dashboard/DashboardAdmin.jsx'
import DashboardCliente from './dashboard/DashboardCliente.jsx'
import DashboardTecnico from './dashboard/DashboardTecnico.jsx'

// /panel es una sola ruta: cada rol ve su propio dashboard.
// ProtectedRoute ya garantiza que hay sesión y que el técnico está aprobado.
const DASHBOARDS = {
  [ROLES.CLIENTE]: DashboardCliente,
  [ROLES.TECNICO]: DashboardTecnico,
  [ROLES.ADMIN]: DashboardAdmin,
}

export default function Dashboard() {
  const { user } = useAuth()
  const DashboardDelRol = DASHBOARDS[user.role]
  return <DashboardDelRol />
}
