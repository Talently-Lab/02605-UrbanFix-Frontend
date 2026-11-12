import { CirclePlus, House, LayoutDashboard, List, LogOut, Users, X } from 'lucide-react'
import { Link, NavLink } from 'react-router'
import { ROLES } from '../router/roles.js'

// `roles` indefinido = visible para todos los roles.
// Solo el menú del cliente está en el Figma; técnico y admin quedan provisorios.
const LINKS = [
  { to: '/panel', label: 'Inicio', icon: House },
  { to: '/solicitudes', label: 'Mis solicitudes', icon: List, roles: [ROLES.CLIENTE] },
  { to: '/solicitudes', label: 'Solicitudes', icon: List, roles: [ROLES.TECNICO] },
  { to: '/solicitudes/nueva', label: 'Crear solicitud', icon: CirclePlus, roles: [ROLES.CLIENTE] },
  { to: '/admin', label: 'Administración', icon: LayoutDashboard, roles: [ROLES.ADMIN] },
  { to: '/admin/tecnicos', label: 'Técnicos', icon: Users, roles: [ROLES.ADMIN] },
]

const itemClassName = 'flex items-center gap-3 rounded-sm px-3 py-2 text-body-sm transition-colors'

// Figma Hi-fi "Sidebar". En celular se abre como panel desde la izquierda; en escritorio queda fijo.
export default function Sidebar({ role, open, onClose, onLogout }) {
  const items = LINKS.filter(({ roles }) => !roles || roles.includes(role))

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex w-62 flex-col border-r border-border bg-surface-100 px-4 pt-6 pb-4 transition-[transform,visibility] lg:visible lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
        open ? 'visible translate-x-0' : 'invisible -translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between">
        <Link
          to="/panel"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-3 py-2 text-body font-bold text-primary"
        >
          <span aria-hidden="true" className="h-6 w-6 rounded-sm bg-brand-orange" />
          UrbanFix
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar menú"
          className="rounded-sm p-2 text-ink-muted hover:text-ink lg:hidden"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Principal" className="mt-8 flex flex-1 flex-col gap-1">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            onClick={onClose}
            className={({ isActive }) =>
              `${itemClassName} ${isActive ? 'bg-primary-subtle font-semibold text-primary' : 'text-ink hover:bg-surface-50'}`
            }
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border pt-4">
        <button type="button" onClick={onLogout} className={`${itemClassName} w-full text-ink hover:bg-surface-50`}>
          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
