import { Link } from 'react-router'
import logoNegativo from '../assets/logo/urbanfix-logo-horizontal-negativo.svg'
import logoPositivo from '../assets/logo/urbanfix-logo-horizontal-positivo.svg'

// Logo de UX/UI (handoff de diseño): "positivo" sobre fondos claros, "negativo" sobre el azul noche.
const VARIANTES = {
  positivo: logoPositivo,
  negativo: logoNegativo,
}

export default function Logo({ variant = 'positivo', to = '/', onClick, className = '' }) {
  return (
    <Link to={to} onClick={onClick} className={`inline-flex ${className}`}>
      <img src={VARIANTES[variant]} alt="UrbanFix" className="h-7 w-auto" />
    </Link>
  )
}
