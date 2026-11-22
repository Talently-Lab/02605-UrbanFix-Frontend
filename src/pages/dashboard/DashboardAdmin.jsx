import { ClipboardList, UserCheck, Users } from 'lucide-react'
import { Link } from 'react-router'
import CargaDatos from '../../components/dashboard/CargaDatos.jsx'
import ResumenEstados from '../../components/dashboard/ResumenEstados.jsx'
import ButtonLink from '../../components/ui/ButtonLink.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import { ESTADOS_SOLICITUD } from '../../constants/solicitudes.js'
import { useAsync } from '../../hooks/useAsync.js'
import { ESTADOS_TECNICO, getApprovalStatus, ROLES } from '../../router/roles.js'
import { getUsuarios } from '../../services/adminService.js'
import { getTodasLasSolicitudes } from '../../services/solicitudesService.js'

const cargarPanel = async () => {
  const [usuarios, solicitudes] = await Promise.all([getUsuarios(), getTodasLasSolicitudes()])
  return { usuarios: usuarios.items, solicitudes: solicitudes.items }
}

// PROVISORIO: el admin no tiene dashboard en el Figma. Usa los mismos bloques que C1 y T1,
// con los datos que el admin puede ver: técnicos, usuarios y solicitudes solo con barrio (D-032).
export default function DashboardAdmin() {
  const { data, loading, error } = useAsync(cargarPanel)

  return (
    <div className="mx-auto flex max-w-260 flex-col gap-8 px-4 pb-8 lg:px-10 lg:pt-4 lg:pb-14">
      <div className="flex flex-col gap-2">
        <h1 className="text-h4 lg:text-h3 text-ink">Panel de administración</h1>
        <p className="text-body text-ink-muted">Aprobá técnicos y seguí la actividad de la plataforma.</p>
      </div>
      <CargaDatos loading={loading} error={error}>
        {data && <Contenido {...data} />}
      </CargaDatos>
    </div>
  )
}

function Contenido({ usuarios, solicitudes }) {
  const tecnicos = usuarios.filter((u) => u.role === ROLES.TECNICO)
  const pendientes = tecnicos.filter((t) => getApprovalStatus(t) === ESTADOS_TECNICO.PENDIENTE).length
  const aprobados = tecnicos.filter((t) => getApprovalStatus(t) === ESTADOS_TECNICO.APROBADO).length
  const clientes = usuarios.filter((u) => u.role === ROLES.CLIENTE).length
  const resumen = Object.values(ESTADOS_SOLICITUD).map((estado) => ({
    estado,
    cantidad: solicitudes.filter((s) => s.status === estado).length,
  }))

  return (
    <>
      {pendientes > 0 ? (
        <section className="flex flex-col gap-4 rounded-xl bg-warning-subtle p-4 lg:flex-row lg:items-center lg:gap-6 lg:p-6">
          <div className="flex flex-1 gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sobre-oscuro">
              <UserCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="text-h5 text-ink">
                {pendientes === 1 ? 'Hay 1 técnico' : `Hay ${pendientes} técnicos`} esperando aprobación
              </h2>
              <p className="text-body text-ink">
                Revisá sus datos y matrícula antes de que puedan recibir solicitudes.
              </p>
            </div>
          </div>
          <ButtonLink to="/admin/tecnicos" className="shrink-0">
            Revisar técnicos
          </ButtonLink>
        </section>
      ) : (
        <EmptyState
          title="No hay técnicos pendientes de aprobación"
          description="Cuando un técnico se registre, lo vas a ver acá para revisarlo."
        />
      )}

      <ul className="grid gap-4 lg:grid-cols-2">
        <Metrica icono={Users} etiqueta="Clientes registrados" valor={clientes} />
        <Metrica icono={UserCheck} etiqueta="Técnicos aprobados" valor={aprobados} to="/admin/tecnicos" />
      </ul>

      <section className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2 text-h5 text-ink lg:text-h4">
          <ClipboardList className="h-6 w-6 text-primary" aria-hidden="true" />
          Solicitudes por estado
        </h2>
        {solicitudes.length === 0 ? (
          <EmptyState
            title="Todavía no hay solicitudes"
            description="Cuando los clientes creen solicitudes, vas a ver acá cuántas hay en cada estado."
          />
        ) : (
          <ResumenEstados estados={resumen} />
        )}
      </section>
    </>
  )
}

function Metrica({ icono: Icono, etiqueta, valor, to }) {
  const contenido = (
    <>
      <Icono className="h-6 w-6 text-primary" aria-hidden="true" />
      <span className="text-body text-ink-muted">{etiqueta}</span>
      <span className="text-[2rem] leading-10 font-bold text-ink">{valor}</span>
    </>
  )
  const clases = 'flex flex-col gap-2 rounded-xl border border-surface-200 bg-surface-100 p-5'
  return (
    <li>
      {to ? (
        <Link to={to} className={`${clases} hover:border-primary`}>
          {contenido}
        </Link>
      ) : (
        <div className={clases}>{contenido}</div>
      )}
    </li>
  )
}
