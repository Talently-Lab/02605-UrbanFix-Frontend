import { Outlet } from 'react-router'
import imagenLogin from '../assets/login-herramientas.jpg'
import Logo from '../components/Logo.jsx'
import { ESPECIALIDADES } from '../constants/especialidades.js'

// Pantallas de acceso (Figma Hi-fi "D - Login"): panel de marca a la izquierda y formulario a la derecha.
// En pantallas grandes todo entra en el alto de la ventana: la foto ocupa el espacio que sobra.
export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:h-screen lg:grid-cols-2">
      <aside className="hidden min-h-0 flex-col gap-8 bg-brand-night p-12 text-sobre-oscuro lg:flex">
        <Logo variant="negativo" className="self-start" />
        <img src={imagenLogin} alt="" className="min-h-0 w-full flex-1 rounded-md object-cover" />
        <div>
          <p className="text-h4 font-semibold">Encontrá técnicos para arreglos y mantenimiento del hogar</p>
          <p className="mt-3 text-body font-semibold">Creá tu solicitud y seguí cómo avanza.</p>
        </div>
        <p className="text-caption text-sobre-oscuro-2">
          {ESPECIALIDADES.map((especialidad) => especialidad.label).join(' · ')}
        </p>
      </aside>

      {/* Si el formulario es más alto que la pantalla (registro de técnico), solo esta columna hace scroll. */}
      <main className="flex flex-col items-center overflow-y-auto bg-surface-100 px-4 py-8">
        {/* my-auto centra verticalmente sin cortar el contenido de arriba cuando es más alto que la pantalla. */}
        <div className="my-auto w-full max-w-100">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
