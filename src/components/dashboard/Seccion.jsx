import { Link } from 'react-router'

// Sección con título y acción a la derecha ("Ver todas").
// Escritorio: tarjeta blanca con borde y el título separado por una línea (Figma C1/T1).
// Celular: sin tarjeta; el título va suelto y cada ítem es su propia tarjeta.
export default function Seccion({ titulo, action, children }) {
  return (
    <section className="lg:rounded-xl lg:border lg:border-surface-200 lg:bg-surface-100">
      <div className="flex items-center justify-between gap-4 pb-4 lg:border-b lg:border-surface-200 lg:px-6 lg:py-5">
        <h2 className="text-h5 text-ink lg:text-h4">{titulo}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

// "Ver todas" (Figma Button-link): se subraya al pasar el mouse.
export function VerTodas({ to }) {
  return (
    <Link to={to} className="text-body-sm font-semibold text-primary hover:underline lg:text-body">
      Ver todas
    </Link>
  )
}
