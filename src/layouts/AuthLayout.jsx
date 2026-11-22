import { Outlet, useLocation } from 'react-router'
import fotoAcceso from '../assets/acceso-foto.jpg'
import mascaraEscudo from '../assets/logo/isotipo-mascara.svg'
import Logo from '../components/Logo.jsx'

const TEXTO_PANEL =
  'Si necesitás un arreglo, creá tu solicitud. Si sos técnico, respondé las que te envían clientes de tus barrios.'

// La tarjeta destacada del panel cambia entre Login (A1) y Registro (A2).
const TARJETAS = {
  login: {
    texto: 'Encontrá técnicos para arreglos y mantenimiento del hogar',
    clases: 'w-99 bg-primary-hover text-h4',
  },
  registro: {
    texto: 'Creá tu cuenta en pocos pasos',
    clases: 'w-80 bg-accent-hover text-h3',
  },
}

// Foto recortada con la forma del escudo del logo (Figma: capa "Imagen" con máscara).
function FotoEscudo({ className = '' }) {
  const mascara = {
    maskImage: `url(${mascaraEscudo})`,
    WebkitMaskImage: `url(${mascaraEscudo})`,
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
  }
  return (
    <div className={className} style={mascara}>
      <img src={fotoAcceso} alt="" className="h-full w-full object-cover object-[50%_30%]" />
    </div>
  )
}

// Pantallas de acceso (Figma A1 - Login y A2 - Registro, con sus versiones mobile).
export default function AuthLayout() {
  const { pathname } = useLocation()
  const pantalla = pathname.startsWith('/registro') ? 'registro' : 'login'
  const tarjeta = TARJETAS[pantalla]

  return (
    <div className="min-h-screen bg-surface-100 lg:grid lg:h-screen lg:grid-cols-2">
      {/* Escritorio: panel de marca a la izquierda. */}
      <aside className="hidden min-h-0 flex-col gap-10 overflow-hidden bg-primary p-16 lg:flex">
        <Logo variant="negativo" className="self-start" />
        <div className="relative min-h-0 flex-1">
          <FotoEscudo className="absolute inset-0" />
          <p className={`absolute bottom-0 left-0 translate-y-9 rounded-xl p-8 text-sobre-oscuro-2 ${tarjeta.clases}`}>
            {tarjeta.texto}
          </p>
        </div>
        <p className={`max-w-106 text-body text-sobre-oscuro ${pantalla === 'registro' ? 'p-10' : 'px-5 py-10'}`}>
          {TEXTO_PANEL}
        </p>
      </aside>

      {/* Celular: el Login lleva un panel de marca chico; el Registro, una barra blanca con el logo. */}
      {pantalla === 'login' ? (
        <div className="relative flex h-67 flex-col justify-between overflow-hidden bg-primary p-6 lg:hidden">
          <Logo variant="negativo" className="self-start" />
          <p className="relative z-10 max-w-42.5 text-h5 text-sobre-oscuro-2">
            Encontrá técnicos
            <br />
            para arreglos y mantenimiento del hogar
          </p>
          <FotoEscudo className="absolute top-6 -right-3.75 h-55 w-50" />
        </div>
      ) : (
        <header className="flex h-14 items-center border-b border-surface-200 bg-surface-100 px-4 lg:hidden">
          <Logo imgClassName="h-8" />
        </header>
      )}

      {/* Formulario. Si es más alto que la pantalla (registro de técnico), solo esta columna hace scroll. */}
      <main
        className={`flex flex-col items-center px-6 lg:overflow-y-auto lg:px-10 ${
          pantalla === 'registro' ? 'pt-10 pb-20 lg:pt-20 lg:pb-14' : 'py-10 lg:justify-center'
        }`}
      >
        <div className={`w-full ${pantalla === 'registro' ? 'lg:max-w-115' : 'lg:max-w-100'}`}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
