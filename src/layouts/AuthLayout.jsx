import { Link, Outlet } from 'react-router'
import imagenLogin from '../assets/login-herramientas.jpg'
import { ESPECIALIDADES } from '../constants/especialidades.js'

// El texto toma el color del contenedor (currentColor): oscuro sobre blanco, blanco sobre el panel de marca.
function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-2 text-body font-bold">
      <span aria-hidden="true" className="h-6 w-6 rounded-sm bg-brand-orange" />
      UrbanFix
    </Link>
  )
}

// Pantallas de acceso (Figma Hi-fi "D - Login"): panel de marca a la izquierda y formulario a la derecha.
export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="hidden flex-col justify-between gap-10 bg-brand-night p-14 text-sobre-oscuro lg:flex">
        <Logo />
        <div>
          <img src={imagenLogin} alt="" className="aspect-[4/3] w-full rounded-md object-cover" />
          <p className="mt-8 text-h4 font-semibold">Encontrá técnicos para arreglos y mantenimiento del hogar</p>
          <p className="mt-3 text-body font-semibold">Creá tu solicitud y seguí cómo avanza.</p>
        </div>
        <p className="text-caption text-sobre-oscuro-2">
          {ESPECIALIDADES.map((especialidad) => especialidad.label).join(' · ')}
        </p>
      </aside>

      <main className="flex flex-col items-center justify-center bg-surface-100 px-4 py-12">
        <div className="mb-10 text-ink lg:hidden">
          <Logo />
        </div>
        <div className="w-full max-w-100">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
