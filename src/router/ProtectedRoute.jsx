import { Navigate, Outlet, useLocation } from 'react-router'
import Spinner from '../components/ui/Spinner.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { necesitaAprobacion } from './roles.js'

// Mientras se recupera la sesión, espera. Sin sesión → /login. Técnico sin aprobar → /cuenta-en-revision.
// Con `roles`, además exige que el rol del usuario esté incluido.
export default function ProtectedRoute({ roles }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        <Spinner className="h-8 w-8" label="Cargando sesión" />
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  if (necesitaAprobacion(user)) return <Navigate to="/cuenta-en-revision" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/panel" replace />

  return <Outlet />
}
