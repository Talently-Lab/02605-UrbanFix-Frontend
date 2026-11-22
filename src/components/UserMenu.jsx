import { ChevronDown, LogOut, User } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router'

// Figma "Top-bar-user": chip con avatar, nombre y flecha (escritorio) o solo avatar (celular).
// Al tocarlo abre un menú con el perfil y cerrar sesión.
export default function UserMenu({ name, onLogout }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const menuId = useId()
  const inicial = name.charAt(0).toUpperCase()

  // Se cierra al hacer clic afuera o con Escape.
  useEffect(() => {
    if (!open) return
    const handleClick = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const handleKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-primary lg:h-12 lg:bg-surface-50 lg:pr-3.5 lg:pl-1.5"
      >
        <span
          aria-hidden="true"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-subtle text-input font-bold text-primary lg:border lg:border-surface-200 lg:bg-surface-100 lg:text-[13px]"
        >
          {inicial}
        </span>
        <span className="sr-only lg:not-sr-only lg:text-input lg:font-semibold lg:text-ink">{name}</span>
        <ChevronDown className="hidden h-4.5 w-4.5 text-ink lg:block" aria-hidden="true" />
      </button>

      {open && (
        <ul
          id={menuId}
          className="absolute right-0 z-30 mt-2 w-48 overflow-hidden rounded-md border border-surface-200 bg-surface-100 py-1 shadow-lg"
        >
          <li>
            <Link
              to="/perfil"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-input text-ink hover:bg-surface-50"
            >
              <User className="h-4.5 w-4.5" aria-hidden="true" />
              Mi perfil
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-input text-ink hover:bg-surface-50"
            >
              <LogOut className="h-4.5 w-4.5" aria-hidden="true" />
              Cerrar sesión
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
