import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router'
import Sidebar from '../components/Sidebar.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-surface-50 lg:flex">
      <Sidebar role={user.role} open={menuOpen} onClose={closeMenu} onLogout={handleLogout} />

      {/* Fondo oscuro detrás del menú en celular: al tocarlo se cierra. */}
      {menuOpen && (
        <div aria-hidden="true" onClick={closeMenu} className="fixed inset-0 z-20 bg-surface-dark/60 lg:hidden" />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-border bg-surface-100 px-4 py-3 lg:justify-end lg:border-b-0 lg:bg-transparent lg:px-8 lg:pt-6">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="rounded-sm p-2 text-ink lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <Link
            to="/perfil"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-100 py-1 pr-3 pl-1 text-body-sm font-semibold text-ink hover:bg-surface-50"
          >
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-subtle text-caption text-primary"
            >
              {user.name.charAt(0).toUpperCase()}
            </span>
            {user.name}
          </Link>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
