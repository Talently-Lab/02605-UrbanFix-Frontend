import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'

// Sin sesión → /login. Con `roles`, además exige que el rol del usuario esté incluido.
export default function ProtectedRoute({ roles }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  if (roles && !roles.includes(user.role)) return <Navigate to="/panel" replace />

  return <Outlet />
}
