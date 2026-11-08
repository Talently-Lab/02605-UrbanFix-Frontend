import { Link, Outlet } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'

export default function PublicLayout() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-surface-50">
      <header className="flex items-center justify-between border-b border-border bg-surface-100 px-6 py-4">
        <Link to="/" className="text-h5 font-bold text-primary">
          UrbanFix
        </Link>
        {user ? (
          <Link to="/panel" className="text-body-sm text-ink-muted hover:text-primary">
            Ir a mi cuenta
          </Link>
        ) : (
          <nav className="flex gap-4 text-body-sm">
            <Link to="/login" className="text-ink-muted hover:text-primary">
              Iniciar sesión
            </Link>
            <Link to="/registro" className="text-ink-muted hover:text-primary">
              Registrarse
            </Link>
          </nav>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
