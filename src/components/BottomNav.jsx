import { NavLink } from 'react-router'
import { linksDelRol } from '../router/navegacion.js'

// Figma "Navigation - mobile": barra fija abajo, solo en celular y tablet.
export default function BottomNav({ role }) {
  const links = linksDelRol(role)
  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-20 grid border-t border-surface-200 bg-surface-100 lg:hidden"
      style={{ gridTemplateColumns: `repeat(${links.length}, minmax(0, 1fr))` }}
    >
      {links.map(({ to, corto, icon: Icon }) => (
        <NavLink
          key={corto}
          to={to}
          end
          className={({ isActive }) =>
            `flex h-16 flex-col items-center justify-center gap-0.5 border-t-2 text-caption ${
              isActive ? 'border-primary font-bold text-primary' : 'border-transparent font-medium text-ink-muted'
            }`
          }
        >
          <Icon className="h-5.5 w-5.5" aria-hidden="true" />
          {corto}
        </NavLink>
      ))}
    </nav>
  )
}
