import { ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import CargaDatos from '../../components/dashboard/CargaDatos.jsx'
import ResumenEstados from '../../components/dashboard/ResumenEstados.jsx'
import Seccion, { VerTodas } from '../../components/dashboard/Seccion.jsx'
import EstadoBadge from '../../components/EstadoBadge.jsx'
import Badge from '../../components/ui/Badge.jsx'
import ButtonLink from '../../components/ui/ButtonLink.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import { getEspecialidadLabel, listarEspecialidades } from '../../constants/especialidades.js'
import { ESTADOS_SOLICITUD } from '../../constants/solicitudes.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import { getMisTrabajos, getSolicitudesParaRevisar } from '../../services/solicitudesService.js'
import { horasRestantes, primerNombre } from '../../utils/fechas.js'

// Los dos pedidos a la vez: lo que tiene para revisar y sus trabajos asignados.
const cargarPanel = async () => {
  const [paraRevisar, trabajos] = await Promise.all([getSolicitudesParaRevisar(), getMisTrabajos()])
  return { paraRevisar, trabajos }
}

// Aceptada y En curso cuentan como trabajo activo; el técnico tiene como máximo uno (definición 4B).
const ESTADOS_ACTIVOS = [ESTADOS_SOLICITUD.ACEPTADA, ESTADOS_SOLICITUD.EN_CURSO]

// "Mis trabajos" todavía no existe: mientras tanto, los links van al listado de solicitudes.
const RUTA_TRABAJOS = '/solicitudes'

// Figma T1 - Dashboard técnico y T1 - Dashboard técnico - mobile.
export default function DashboardTecnico() {
  const { user } = useAuth()
  const especialidades = listarEspecialidades((user.technician?.specialties ?? []).map((e) => e.category))
  const { data, loading, error } = useAsync(cargarPanel)

  return (
    <div className="mx-auto flex max-w-260 flex-col gap-10 px-4 pb-8 lg:gap-8 lg:px-10 lg:pt-4 lg:pb-14">
      <div className="flex flex-col gap-2">
        <h1 className="flex items-center gap-1 text-h4 text-ink lg:text-h3">
          Hola, {primerNombre(user.name)}
          <ShieldCheck className="hidden h-6 w-6 text-primary lg:block" aria-hidden="true" />
          <span className="sr-only">(cuenta aprobada)</span>
        </h1>
        <p className="text-input leading-6 text-ink-muted lg:text-body">
          Revisá las solicitudes que te enviaron. Podés tener un trabajo activo a la vez.
        </p>
        <div className="mt-2 lg:hidden">
          <Pill fondo="bg-success-subtle" punto="bg-success">
            Cuenta aprobada{especialidades ? ` · ${especialidades}` : ''}
          </Pill>
        </div>
      </div>
      <CargaDatos loading={loading} error={error}>
        {data && <Contenido {...data} />}
      </CargaDatos>
    </div>
  )
}

function Contenido({ paraRevisar, trabajos }) {
  const activo = trabajos.find((t) => ESTADOS_ACTIVOS.includes(t.status))
  const enCurso = trabajos.filter((t) => t.status === ESTADOS_SOLICITUD.EN_CURSO).length
  const completadas = trabajos.filter((t) => t.status === ESTADOS_SOLICITUD.COMPLETADA).length

  return (
    <>
      {paraRevisar.length > 0 && <AvisoParaRevisar cantidad={paraRevisar.length} />}

      <ResumenEstados
        className="hidden lg:grid"
        estados={[
          { estado: ESTADOS_SOLICITUD.PENDIENTE, cantidad: paraRevisar.length },
          { estado: ESTADOS_SOLICITUD.EN_CURSO, cantidad: enCurso },
          { estado: ESTADOS_SOLICITUD.COMPLETADA, cantidad: completadas },
        ]}
      />
      {/* Celular: filas con la etiqueta a la izquierda y el número a la derecha (Figma T1 mobile). */}
      <ul className="flex flex-col gap-4 lg:hidden">
        <FilaResumen
          etiqueta="Para revisar"
          cantidad={paraRevisar.length}
          fondo="bg-warning-subtle"
          punto="bg-warning"
        />
        {/* Sin variable en el Figma: #FDEBDC (naranja claro). */}
        <FilaResumen etiqueta="En curso" cantidad={enCurso} fondo="bg-[#fdebdc]" punto="bg-accent" />
        <FilaResumen etiqueta="Completados" cantidad={completadas} fondo="bg-success-subtle" punto="bg-success" />
      </ul>

      <TrabajoActivo trabajo={activo} />

      <Seccion titulo="Solicitudes para revisar" action={paraRevisar.length > 0 && <VerTodas to="/solicitudes" />}>
        {paraRevisar.length === 0 ? (
          <EmptyState
            className="lg:m-6"
            title="No tenés solicitudes para revisar"
            description="Cuando un cliente te elija, la vas a ver acá. Tenés 24 horas para responder cada una."
          />
        ) : (
          <ListaParaRevisar solicitudes={paraRevisar} />
        )}
      </Seccion>
    </>
  )
}

// Pill con punto de color y texto Medium 13 (Figma T1 mobile).
function Pill({ fondo, punto, children }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.8125rem] leading-5 font-medium text-ink ${fondo}`}
    >
      <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${punto}`} />
      {children}
    </span>
  )
}

function FilaResumen({ etiqueta, cantidad, fondo, punto }) {
  return (
    <li className="flex items-center justify-between rounded-xl border border-surface-200 bg-surface-100 px-4 py-3">
      <Badge className={fondo} dotClassName={punto}>
        <span className="text-[0.8125rem] leading-5 font-medium">{etiqueta}</span>
      </Badge>
      <span className="text-[1.5rem] leading-8 font-bold text-ink">{cantidad}</span>
    </li>
  )
}

// En el Figma la alerta solo está en escritorio.
function AvisoParaRevisar({ cantidad }) {
  const titulo = cantidad === 1 ? 'Tenés 1 solicitud para revisar' : `Tenés ${cantidad} solicitudes para revisar`
  return (
    <section className="hidden items-center gap-6 rounded-xl bg-warning-subtle px-7 py-6 lg:flex">
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-h5 font-bold text-sobre-oscuro"
      >
        !
      </span>
      <div className="flex flex-1 flex-col gap-1">
        <h2 className="text-h5 text-ink">{titulo}</h2>
        <p className="text-body text-ink">
          Tenés 24 horas para responder cada una. Si no respondés, vuelven al cliente para que elija a otro técnico.
        </p>
      </div>
      <ButtonLink to="/solicitudes" className="shrink-0">
        Revisar
      </ButtonLink>
    </section>
  )
}

function TrabajoActivo({ trabajo }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-surface-200 bg-surface-100 p-5 lg:p-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-[1.1875rem] leading-7 font-semibold text-ink lg:text-h4">Trabajo activo</h2>
        <span className="lg:hidden">
          {trabajo ? (
            <EstadoBadge estado={trabajo.status} />
          ) : (
            <Pill fondo="bg-neutral-subtle" punto="bg-neutral">
              Sin trabajo activo
            </Pill>
          )}
        </span>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {trabajo ? (
          <div className="flex flex-col gap-1">
            <span className="flex flex-wrap items-center gap-2 text-body font-semibold text-ink">
              {getEspecialidadLabel(trabajo.category)}
              <span className="hidden lg:inline">
                <EstadoBadge estado={trabajo.status} />
              </span>
            </span>
            <span className="text-body text-ink">{trabajo.description}</span>
            <span className="text-body-sm text-ink-muted">{trabajo.neighborhoodName}</span>
          </div>
        ) : (
          <p className="text-body text-ink">
            No tenés un trabajo activo. Cuando aceptes una solicitud, la vas a ver acá y en Mis trabajos.
          </p>
        )}
        <ButtonLink
          to={trabajo ? `/solicitudes/${trabajo.id}` : RUTA_TRABAJOS}
          className="order-last w-full shrink-0 lg:order-0 lg:w-auto"
        >
          {trabajo ? 'Ver detalle' : 'Ver en mis trabajos'}
        </ButtonLink>
        <p className="rounded-[10px] bg-primary-subtle px-4 py-3 text-body text-ink lg:hidden">
          Solo podés tener un trabajo activo a la vez. Mientras lo tengas, no recibís solicitudes nuevas ni podés
          aceptar otras.
        </p>
      </div>

      <p className="hidden rounded-[10px] bg-primary-subtle px-4 py-3 text-body text-ink lg:block">
        Solo podés tener un trabajo activo a la vez. Mientras lo tengas, no recibís solicitudes nuevas ni podés aceptar
        otras.
      </p>
    </section>
  )
}

// Celular: tarjetas que se tocan enteras. Escritorio: filas con el botón "Ver detalle".
function ListaParaRevisar({ solicitudes }) {
  return (
    <ul className="flex flex-col gap-4 lg:gap-0 lg:divide-y lg:divide-surface-200">
      {solicitudes.map((s) => {
        const horas = horasRestantes(s.offer.expiresAt)
        return (
          <li key={s.id}>
            <Link
              to={`/solicitudes/${s.id}`}
              className="flex flex-col gap-1 rounded-xl border border-surface-200 bg-surface-100 p-4 hover:border-transparent hover:bg-primary-subtle lg:hidden"
            >
              <span className="text-body font-semibold text-ink">{s.description}</span>
              <span className="text-body-sm text-ink-muted">
                {s.neighborhoodName} · quedan {horas} h
              </span>
            </Link>
            <div className="hidden items-center justify-between gap-3 px-6 py-4 lg:flex">
              <div className="flex flex-col gap-1">
                <span className="text-body font-semibold text-ink">{s.description}</span>
                <span className="text-body-sm text-ink-muted">
                  {s.neighborhoodName} · quedan {horas} h para responder
                </span>
              </div>
              <ButtonLink to={`/solicitudes/${s.id}`} variant="secondary" className="shrink-0">
                Ver detalle
              </ButtonLink>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
