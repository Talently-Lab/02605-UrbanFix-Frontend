import { LogOut } from 'lucide-react'
import { NavLink } from 'react-router'
import { linksDelRol } from '../router/navegacion.js'
import Logo from './Logo.jsx'

const itemClassName = 'flex h-12 items-center gap-3 rounded-[10px] px-3 text-input font-medium transition-colors'

// Figma "Sidebar" (C1, T1). Solo en escritorio; en celular la navegación va en BottomNav.
export default function Sidebar({ role, onLogout }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-62 shrink-0 flex-col gap-8 border-r border-surface-200 bg-surface-100 px-4 pt-6 pb-10 lg:flex">
      <Logo to="/panel" imgClassName="h-8" />

      <nav aria-label="Principal" className="flex flex-1 flex-col gap-1">
        {linksDelRol(role).map(({ to, label, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            end
            className={({ isActive }) =>
              `${itemClassName} ${isActive ? 'bg-primary-subtle text-primary' : 'text-ink hover:bg-surface-50'}`
            }
          >
            <Icon className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-surface-200 pt-4">
        <button type="button" onClick={onLogout} className={`${itemClassName} w-full text-ink hover:bg-surface-50`}>
          <LogOut className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
