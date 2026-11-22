import { ESTADOS_SOLICITUD } from '../constants/solicitudes.js'
import Badge from './ui/Badge.jsx'

// Cómo se ve cada estado, según el componente "Badge de estado" del Figma.
const ESTILOS = {
  [ESTADOS_SOLICITUD.PENDIENTE]: { label: 'Pendiente', fondo: 'bg-warning-subtle', punto: 'bg-warning' },
  [ESTADOS_SOLICITUD.ACEPTADA]: { label: 'Aceptada', fondo: 'bg-info-subtle', punto: 'bg-info' },
  [ESTADOS_SOLICITUD.EN_CURSO]: { label: 'En curso', fondo: 'bg-neutral-subtle', punto: 'bg-brand-orange' },
  [ESTADOS_SOLICITUD.COMPLETADA]: { label: 'Completada', fondo: 'bg-success-subtle', punto: 'bg-success' },
  [ESTADOS_SOLICITUD.CANCELADA]: { label: 'Cancelada', fondo: 'bg-danger-subtle', punto: 'bg-danger' },
}

export default function EstadoBadge({ estado }) {
  const { label, fondo, punto } = ESTILOS[estado]
  return (
    <Badge className={fondo} dotClassName={punto}>
      {label}
    </Badge>
  )
}
