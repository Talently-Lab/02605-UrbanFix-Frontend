import Placeholder from '../components/Placeholder.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { ROLES } from '../router/roles.js'

// Cada rol ve su propio panel en /panel. Contenido provisorio hasta tener los diseños de cada uno.
const TITULOS = {
  [ROLES.CLIENTE]: 'Panel del cliente',
  [ROLES.TECNICO]: 'Panel del técnico',
  [ROLES.ADMIN]: 'Panel de administración',
}

export default function Dashboard() {
  const { user } = useAuth()
  return <Placeholder title={TITULOS[user.role]} />
}
