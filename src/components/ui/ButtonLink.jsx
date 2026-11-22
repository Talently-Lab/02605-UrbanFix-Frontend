import { Link } from 'react-router'
import { buttonClassName } from './buttonStyles.js'

// Un link con aspecto de botón: para acciones que llevan a otra pantalla ("Crear solicitud", "Ver detalle").
// Si la acción hace algo en la misma pantalla (guardar, confirmar), va Button.
export default function ButtonLink({ to, variant = 'primary', size = 'md', className = '', children }) {
  return (
    <Link to={to} className={`${buttonClassName(variant, { link: true, size })} ${className}`}>
      {children}
    </Link>
  )
}
