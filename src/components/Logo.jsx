import { Link } from 'react-router'
import isotipo from '../assets/logo/urbanfix-isotipo-compacto-positivo.svg'
import logoNegativo from '../assets/logo/urbanfix-logo-horizontal-negativo.svg'
import logoPositivo from '../assets/logo/urbanfix-logo-horizontal-positivo.svg'

// Logo de UX/UI (handoff de diseño): "positivo" sobre fondos claros, "negativo" sobre el azul noche,
// "isotipo" (solo el ícono, versión compacta) para la barra superior en celular.
const VARIANTES = {
  positivo: logoPositivo,
  negativo: logoNegativo,
  isotipo,
}

export default function Logo({ variant = 'positivo', to = '/', onClick, className = '', imgClassName = 'h-7' }) {
  return (
    <Link to={to} onClick={onClick} className={`inline-flex ${className}`}>
      <img src={VARIANTES[variant]} alt="UrbanFix" className={`w-auto ${imgClassName}`} />
    </Link>
  )
}
