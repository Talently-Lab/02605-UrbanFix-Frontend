import { Check } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router'
import Logo from '../components/Logo.jsx'
import Badge from '../components/ui/Badge.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import { listarEspecialidades, MATRICULAS } from '../constants/especialidades.js'
import { useAuth } from '../context/AuthContext.jsx'
import { ESTADOS_TECNICO, getApprovalStatus, necesitaAprobacion } from '../router/roles.js'

// Figma T0 - Cuenta pendiente (y su versión mobile).
// Única pantalla accesible para un técnico que todavía no fue aprobado (definición 2A).
export default function CuentaEnRevision() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-ink-muted">
        <Spinner className="h-8 w-8" label="Cargando sesión" />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  if (!necesitaAprobacion(user)) return <Navigate to="/panel" replace />

  const rechazado = getApprovalStatus(user) === ESTADOS_TECNICO.RECHAZADO

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-surface-100">
      <header className="border-b border-surface-200">
        <div className="mx-auto flex h-14 max-w-296 items-center justify-between px-4 lg:h-18 lg:px-8">
          <Logo variant="isotipo" to="/cuenta-en-revision" className="lg:hidden" imgClassName="h-8" />
          <Logo to="/cuenta-en-revision" className="hidden lg:inline-flex" imgClassName="h-8" />
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="hidden h-9 w-9 items-center justify-center rounded-full bg-primary-subtle text-input font-bold text-primary lg:flex"
            >
              {user.name.charAt(0).toUpperCase()}
            </span>
            <span className="hidden text-body font-semibold text-ink lg:inline">{user.name}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="text-input font-semibold text-primary hover:underline lg:text-body"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-190 flex-col gap-5 px-4 pt-6 pb-8 lg:gap-6 lg:px-8 lg:pt-12 lg:pb-14">
        {rechazado ? (
          <Rechazada />
        ) : (
          <>
            <div className="flex flex-col items-start gap-4">
              <Badge className="bg-warning-subtle" dotClassName="bg-warning">
                Cuenta en revisión
              </Badge>
              <h1 className="text-[1.5rem] leading-8 font-semibold text-ink lg:text-h3">Estamos revisando tu cuenta</h1>
              <p className="text-input leading-6 text-ink-muted lg:text-body">
                Un administrador revisa tus datos antes de aprobar tu cuenta de técnico. Cuando esté aprobada, vas a
                poder recibir solicitudes de clientes de tus barrios. No hay una fecha garantizada para la revisión.
              </p>
            </div>
            <EstadoDeLaCuenta />
          </>
        )}
        <DatosEnviados user={user} />
      </main>
    </div>
  )
}

function Rechazada() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Badge className="bg-danger-subtle" dotClassName="bg-danger">
        Cuenta no aprobada
      </Badge>
      <h1 className="text-[1.5rem] leading-8 font-semibold text-ink lg:text-h3">Tu cuenta no fue aprobada</h1>
      <p className="text-input leading-6 text-ink-muted lg:text-body">
        Revisamos tus datos y no pudimos aprobar tu cuenta de técnico. Si creés que es un error, contactá al equipo de
        UrbanFix.
      </p>
    </div>
  )
}

const PASOS = [
  { texto: 'Cuenta creada', estado: 'hecho' },
  { texto: 'Datos enviados', estado: 'hecho' },
  { texto: 'Revisión del administrador', estado: 'actual' },
  { texto: 'Cuenta aprobada', estado: 'pendiente' },
]

function Tarjeta({ titulo, children }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-surface-200 bg-surface-100 p-5 lg:gap-5 lg:p-7">
      <h2 className="text-[1.1875rem] leading-7 font-semibold text-ink lg:text-h5">{titulo}</h2>
      {children}
    </section>
  )
}

function EstadoDeLaCuenta() {
  return (
    <Tarjeta titulo="Estado de tu cuenta">
      <ol className="flex flex-col gap-3.5">
        {PASOS.map(({ texto, estado }) => (
          <li key={texto} className="flex items-center gap-3">
            {estado === 'hecho' && (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-sobre-oscuro">
                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
              </span>
            )}
            {estado === 'actual' && <span className="h-6 w-6 shrink-0 rounded-full border-2 border-warning" />}
            {estado === 'pendiente' && <span className="h-6 w-6 shrink-0 rounded-full border-2 border-border-strong" />}
            <span className={`text-body ${estado === 'pendiente' ? 'text-ink-muted' : 'font-semibold text-ink'}`}>
              {texto}
              {estado === 'actual' && <span className="font-normal"> · en curso</span>}
              <span className="sr-only">
                {estado === 'hecho' ? ' (completo)' : estado === 'pendiente' ? ' (pendiente)' : ''}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </Tarjeta>
  )
}

function DatosEnviados({ user }) {
  const especialidades = user.technician?.specialties ?? []
  const matriculas = especialidades.filter(({ category, licenseNumber }) => MATRICULAS[category] && licenseNumber)

  return (
    <Tarjeta titulo="Datos que enviaste">
      <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
        <Dato etiqueta="Nombre">{user.name}</Dato>
        <Dato etiqueta="Especialidades">{listarEspecialidades(especialidades.map((e) => e.category)) || '—'}</Dato>
        {matriculas.map(({ category, licenseNumber }) => (
          <Dato key={category} etiqueta={MATRICULAS[category]}>
            {licenseNumber}
          </Dato>
        ))}
        <Dato etiqueta="Barrios">{(user.technician?.neighborhoods ?? []).join(', ') || '—'}</Dato>
      </dl>
    </Tarjeta>
  )
}

function Dato({ etiqueta, children }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-caption tracking-[0.04em] text-ink-muted uppercase">{etiqueta}</dt>
      <dd className="text-body text-ink">{children}</dd>
    </div>
  )
}
