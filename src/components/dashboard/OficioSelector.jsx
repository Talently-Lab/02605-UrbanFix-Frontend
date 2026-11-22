import { Link } from 'react-router'
import { ESPECIALIDADES } from '../../constants/especialidades.js'

// Accesos por oficio a "Crear solicitud", con el oficio ya elegido (Figma: Selection-oficio / Oficio).
// Escritorio: el círculo toma Azul/50 al pasar el mouse. Celular: el círculo tiene Azul/50 siempre.
export default function OficioSelector() {
  return (
    <ul className="grid grid-cols-5 gap-1 lg:gap-4">
      {ESPECIALIDADES.map(({ value, label, icono }) => (
        <li key={value}>
          <Link
            to={`/solicitudes/nueva?categoria=${value}`}
            className="group flex flex-col items-center gap-2 rounded-lg px-1 py-3 text-center focus-visible:outline-2 focus-visible:outline-primary"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-subtle transition-colors lg:bg-transparent lg:group-hover:bg-primary-subtle">
              <img src={icono} alt="" className="h-8 w-8" />
            </span>
            <span className="text-caption text-ink lg:text-input lg:leading-6 lg:font-semibold">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
