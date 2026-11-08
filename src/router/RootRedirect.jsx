import { Navigate } from 'react-router'
import Spinner from '../components/ui/Spinner.jsx'
import { useAuth } from '../context/AuthContext.jsx'

// No hay página de inicio pública (el diseño arranca en el login): "/" lleva al login o al panel según la sesión.
export default function RootRedirect() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-ink-muted">
        <Spinner className="h-8 w-8" label="Cargando sesión" />
      </div>
    )
  }
  return <Navigate to={user ? '/panel' : '/login'} replace />
}
