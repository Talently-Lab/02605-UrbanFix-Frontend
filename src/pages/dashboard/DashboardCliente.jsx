import { ArrowRight, Check, Plus } from 'lucide-react'
import { Link } from 'react-router'
import fotoHero from '../../assets/dashboard-hero.jpg'
import CargaDatos from '../../components/dashboard/CargaDatos.jsx'
import OficioSelector from '../../components/dashboard/OficioSelector.jsx'
import ResumenEstados from '../../components/dashboard/ResumenEstados.jsx'
import Seccion, { VerTodas } from '../../components/dashboard/Seccion.jsx'
import EstadoBadge from '../../components/EstadoBadge.jsx'
import ButtonLink from '../../components/ui/ButtonLink.jsx'
import { getEspecialidadLabel } from '../../constants/especialidades.js'
import { ESTADOS_SOLICITUD } from '../../constants/solicitudes.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import { getMisSolicitudes } from '../../services/solicitudesService.js'
import { formatFechaCorta, formatFechaHora, primerNombre } from '../../utils/fechas.js'

const ESTADOS_RESUMEN = [
  ESTADOS_SOLICITUD.PENDIENTE,
  ESTADOS_SOLICITUD.ACEPTADA,
  ESTADOS_SOLICITUD.EN_CURSO,
  ESTADOS_SOLICITUD.COMPLETADA,
]

// "Cómo funciona": el texto de "Elegí un técnico" cambia entre escritorio y celular en el Figma.
const PASOS = [
  {
    titulo: 'Creá tu solicitud',
    texto: 'Elegí el servicio y contanos qué necesitás reparar.',
  },
  {
    titulo: 'Elegí un técnico',
    texto: 'Mirá los técnicos de tu zona y elegí a quién enviársela.',
    textoMobile: 'Mirá los de tu barrio y elegí a quién enviársela.',
  },
  {
    titulo: 'Seguí cómo avanza',
    texto: 'El técnico la acepta o la rechaza y vos ves el estado en tu panel.',
  },
]

const RECIENTES = 4

// Figma C1 - Dashboard cliente (con solicitudes) y C1b - Dashboard sin solicitudes, con sus versiones mobile.
export default function DashboardCliente() {
  const { user } = useAuth()
  const { data, loading, error } = useAsync(getMisSolicitudes)
  const solicitudes = data ?? []
  const vacio = !loading && solicitudes.length === 0

  return (
    <div className={`mx-auto flex max-w-260 flex-col gap-10 pb-20 lg:px-10 ${vacio ? 'lg:gap-8' : ''}`}>
      <Hero nombre={primerNombre(user.name)} />
      <div className="flex flex-col gap-10 px-4 lg:px-0">
        <CargaDatos loading={loading} error={error}>
          {vacio ? <SinSolicitudes /> : <ConSolicitudes solicitudes={solicitudes} />}
        </CargaDatos>
      </div>
    </div>
  )
}

function Hero({ nombre }) {
  return (
    <div className="px-4 lg:px-0">
      <section className="relative isolate overflow-hidden rounded-xl">
        <img
          src={fotoHero}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full origin-bottom scale-140 object-cover object-[50%_100%] lg:scale-100 lg:object-[50%_76%]"
        />
        {/* Degradado del Figma: azul noche sólido abajo (30% en celular, 19% en escritorio) hasta transparente arriba. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-t from-brand-night from-30% to-primary/0 lg:from-[19%]"
        />
        <div className="flex min-h-82.5 flex-col justify-end gap-3 p-5 text-sobre-oscuro lg:min-h-90 lg:flex-row lg:items-end lg:justify-between lg:gap-4 lg:p-10">
          <div className="flex flex-col gap-2">
            <p className="text-body-sm font-semibold">
              <span className="lg:hidden">Arreglos del hogar en CABA</span>
              <span className="hidden lg:inline">Arreglos y mantenimiento del hogar en CABA</span>
            </p>
            <h1 className="text-h3">Hola, {nombre}</h1>
            <p className="text-body">
              ¿Tenés algo para reparar en casa? Elegí el <span className="lg:hidden">oficio</span>
              <span className="hidden lg:inline">servicio</span>, contanos qué pasa y creá tu solicitud.
            </p>
          </div>
          <ButtonLink to="/solicitudes/nueva" variant="accent" size="cta" className="w-full shrink-0 lg:w-auto">
            <Plus className="h-4.5 w-4.5" strokeWidth={1.5} aria-hidden="true" />
            Crear solicitud
          </ButtonLink>
        </div>
      </section>
    </div>
  )
}

function SinSolicitudes() {
  return (
    <>
      <section className="flex flex-col gap-4 rounded-xl border border-surface-200 bg-surface-100 px-5 py-6 lg:gap-8 lg:p-10">
        <div className="flex flex-col gap-4 lg:gap-5">
          <h2 className="text-[1.1875rem] leading-7 font-semibold text-ink lg:text-h4">
            <span className="lg:hidden">¿Tenés algo para reparar en casa?</span>
            <span className="hidden lg:inline">Todavía no tenés solicitudes</span>
          </h2>
          <p className="text-input leading-6 text-ink-muted lg:text-body">
            <span className="lg:hidden">
              Tocá el oficio que necesitás, contanos qué pasa y creá tu solicitud. Después elegís al técnico que querés
              que la revise.
            </span>
            <span className="hidden lg:inline">
              Cuando necesites resolver algo en tu casa, podés crear una solicitud y consultar su estado desde acá.
            </span>
          </p>
        </div>
        <OficioSelector />
        <ButtonLink to="/solicitudes/nueva" size="cta" className="w-full lg:w-auto lg:self-start">
          <Plus className="h-4.5 w-4.5" aria-hidden="true" />
          <span className="lg:hidden">Crear mi primera solicitud</span>
          <span className="hidden lg:inline">Crear una solicitud</span>
          <ArrowRight className="h-4.5 w-4.5 lg:hidden" aria-hidden="true" />
        </ButtonLink>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[1.1875rem] leading-7 font-semibold text-ink lg:text-h4">Cómo funciona</h2>

        {/* Celular: lista con el título en negrita al principio de cada paso. */}
        <ol className="flex flex-col gap-3 lg:hidden">
          {PASOS.map(({ titulo, texto, textoMobile }, index) => (
            <li key={titulo} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-[0.8125rem] font-bold text-primary">
                {index + 1}
              </span>
              <p className="text-input leading-6 text-ink">
                <span className="font-semibold">{titulo}.</span> {textoMobile ?? texto}
              </p>
            </li>
          ))}
        </ol>

        {/* Escritorio: una tarjeta por paso. */}
        <ol className="hidden grid-cols-3 gap-4 lg:grid">
          {PASOS.map(({ titulo, texto }, index) => (
            <li key={titulo} className="flex flex-col gap-2 rounded-xl border border-surface-200 bg-surface-100 p-5">
              <span className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-primary-subtle text-body font-semibold text-primary">
                {index + 1}
              </span>
              <h3 className="text-h5 text-ink">{titulo}</h3>
              <p className="text-body text-ink-muted">{texto}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}

function ConSolicitudes({ solicitudes }) {
  const aceptada = solicitudes.find((s) => s.status === ESTADOS_SOLICITUD.ACEPTADA)
  const pendiente = solicitudes.find((s) => s.status === ESTADOS_SOLICITUD.PENDIENTE && s.offer)
  const recientes = [...solicitudes].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, RECIENTES)
  const resumen = ESTADOS_RESUMEN.map((estado) => ({
    estado,
    cantidad: solicitudes.filter((s) => s.status === estado).length,
  }))

  return (
    <>
      {/* En escritorio el aviso va pegado al hero (gap 16); en celular, separado como una sección más. */}
      {aceptada && <AvisoAceptada solicitud={aceptada} />}

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-h4 text-ink">¿Qué necesitás arreglar?</h2>
          <p className="text-input leading-6 text-ink-muted lg:text-body">Elegí el oficio y creá tu solicitud.</p>
        </div>
        <OficioSelector />
      </section>

      <ResumenEstados estados={resumen} />

      <div className="grid items-start gap-10 lg:grid-cols-[1fr_20.25rem] lg:gap-4">
        <Seccion titulo="Solicitudes recientes" action={<VerTodas to="/solicitudes" />}>
          <ListaRecientes solicitudes={recientes} />
        </Seccion>
        {pendiente && (
          <aside className="flex flex-col gap-2 rounded-xl border border-surface-200 bg-surface-100 px-5 py-6 lg:p-5">
            <h2 className="text-h5 text-ink">Una solicitud sigue pendiente</h2>
            <p className="text-body text-ink-muted">
              {pendiente.offer.technicianName} tiene hasta el {formatFechaHora(pendiente.offer.expiresAt)} para
              responder tu solicitud de {getEspecialidadLabel(pendiente.category).toLowerCase()}. Si no responde, vas a
              poder elegir otro técnico.
            </p>
          </aside>
        )}
      </div>
    </>
  )
}

function AvisoAceptada({ solicitud }) {
  return (
    <section className="-mt-4 flex flex-col gap-6 rounded-xl bg-info-subtle p-4 lg:-mt-6 lg:flex-row lg:items-center lg:p-6">
      <div className="flex flex-1 gap-4 lg:gap-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-info text-sobre-oscuro">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1">
          <h2 className="text-[1.1875rem] leading-7 font-semibold text-ink lg:text-[1.25rem]">
            {solicitud.technicianName} aceptó tu solicitud de {getEspecialidadLabel(solicitud.category)}
          </h2>
          {/* El Figma dice "con ella": se usa un texto sin género, porque el técnico puede ser cualquier persona. */}
          <p className="text-input leading-6 text-ink">
            Coordiná la visita: el teléfono está en el detalle de la solicitud.
          </p>
        </div>
      </div>
      <ButtonLink to={`/solicitudes/${solicitud.id}`} size="cta" className="w-full shrink-0 px-6 lg:w-auto">
        Ver solicitud
      </ButtonLink>
    </section>
  )
}

// Celular: una tarjeta por solicitud (Card-solicitud). Escritorio: tabla (Figma C1).
function ListaRecientes({ solicitudes }) {
  return (
    <>
      <ul className="flex flex-col gap-4 lg:hidden">
        {solicitudes.map((s) => (
          <li key={s.id}>
            <Link
              to={`/solicitudes/${s.id}`}
              className="flex flex-col gap-2 rounded-xl border border-surface-200 bg-surface-100 px-5 py-4 hover:border-transparent hover:bg-primary-subtle"
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-body font-semibold text-ink">{getEspecialidadLabel(s.category)}</span>
                <EstadoBadge estado={s.status} />
              </span>
              <span className="text-body-sm text-ink">{s.description}</span>
              <span className="text-caption text-ink-muted">
                {nombreTecnico(s)} · {formatFechaCorta(s.createdAt)}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <table className="hidden w-full text-left lg:table">
        <thead className="bg-surface-50 text-caption text-ink-muted">
          <tr>
            <th scope="col" className="w-33 py-3 pr-2 pl-6">
              SERVICIO
            </th>
            <th scope="col" className="px-2 py-3">
              PROBLEMA
            </th>
            <th scope="col" className="w-27.5 px-2 py-3">
              TÉCNICO
            </th>
            <th scope="col" className="w-31 px-2 py-3">
              ESTADO
            </th>
            <th scope="col" className="w-20 py-3 pr-6 pl-2">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-200">
          {solicitudes.map((s) => (
            <tr key={s.id}>
              <td className="py-4 pr-2 pl-6 text-body font-semibold text-ink">{getEspecialidadLabel(s.category)}</td>
              <td className="px-2 py-4 text-body-sm text-ink">
                {s.description}
                <span className="block text-[0.8125rem] leading-5 text-ink-muted">
                  Creada el {formatFechaCorta(s.createdAt)}
                </span>
              </td>
              <td className="px-2 py-4 text-body-sm text-ink">{nombreTecnico(s)}</td>
              <td className="px-2 py-4">
                <EstadoBadge estado={s.status} />
              </td>
              <td className="py-4 pr-6 pl-2">
                <Link to={`/solicitudes/${s.id}`} className="text-input font-semibold text-primary hover:underline">
                  Ver<span className="sr-only"> solicitud de {getEspecialidadLabel(s.category)}</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

// Asignado, o el que tiene la oferta mientras está pendiente.
const nombreTecnico = (s) => s.technicianName ?? s.offer?.technicianName ?? 'Sin técnico'
