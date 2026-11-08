import { NavLink, Outlet, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'
import { ROLE_LABELS, ROLES } from '../router/roles.js'

// `roles` indefinido = visible para todos los roles.
const links = [
  { to: '/panel', label: 'Panel' },
  { to: '/solicitudes', label: 'Solicitudes', roles: [ROLES.CLIENTE, ROLES.TECNICO] },
  { to: '/solicitudes/nueva', label: 'Nueva solicitud', roles: [ROLES.CLIENTE] },
  { to: '/admin', label: 'Administración', roles: [ROLES.ADMIN] },
  { to: '/admin/tecnicos', label: 'Técnicos', roles: [ROLES.ADMIN] },
  { to: '/perfil', label: 'Perfil' },
]

export default function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = links.filter(({ roles }) => !roles || roles.includes(user.role))

  return (
    <div className="min-h-screen bg-surface-50">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-surface-100 px-6 py-4">
        <span className="text-h5 font-bold text-primary">UrbanFix</span>
        <nav className="flex flex-wrap gap-4 text-body-sm">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                isActive ? 'font-semibold text-primary' : 'text-ink-muted hover:text-primary'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-body-sm">
          <span className="text-ink-muted">{ROLE_LABELS[user.role]}</span>
          <button
            onClick={handleLogout}
            className="rounded-sm border border-border px-3 py-1 text-ink hover:bg-surface-200"
          >
            Salir
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
