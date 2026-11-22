import EstadoBadge from '../EstadoBadge.jsx'

// Tarjetas con la cantidad de solicitudes por estado (Figma: Card-estados).
// Celular: grilla de 2 columnas. Escritorio: todas en una fila.
// `estados`: [{ estado, cantidad }]
export default function ResumenEstados({ estados, className = '' }) {
  return (
    <ul className={`grid grid-cols-2 gap-4 lg:auto-cols-fr lg:grid-flow-col ${className}`}>
      {estados.map(({ estado, cantidad }) => (
        <li
          key={estado}
          className="flex flex-col items-start gap-2 rounded-xl border border-surface-200 bg-surface-100 p-5"
        >
          <EstadoBadge estado={estado} />
          <span className="text-[2rem] leading-10 font-bold text-ink">{cantidad}</span>
        </li>
      ))}
    </ul>
  )
}
