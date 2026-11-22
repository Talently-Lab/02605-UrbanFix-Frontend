import iconoAlbanileria from '../assets/iconos/icono-oficio-albanileria.svg'
import iconoCerrajeria from '../assets/iconos/icono-oficio-cerrajeria.svg'
import iconoElectricidad from '../assets/iconos/icono-oficio-electricidad.svg'
import iconoGas from '../assets/iconos/icono-oficio-gas.svg'
import iconoPlomeria from '../assets/iconos/icono-oficio-plomeria.svg'

// Categorías de servicio confirmadas por el equipo (códigos del contrato de la API).
// Orden y textos del Figma; los íconos son los de la entrega de UX/UI.
export const ESPECIALIDADES = [
  { value: 'ELECTRICITY', label: 'Electricidad', icono: iconoElectricidad },
  { value: 'PLUMBING', label: 'Plomería', icono: iconoPlomeria },
  { value: 'GAS', label: 'Gasista', icono: iconoGas },
  { value: 'MASONRY', label: 'Albañilería', icono: iconoAlbanileria },
  { value: 'LOCKSMITH', label: 'Cerrajería', icono: iconoCerrajeria },
]

export const getEspecialidadLabel = (value) =>
  ESPECIALIDADES.find((especialidad) => especialidad.value === value)?.label ?? value

// Especialidades que exigen matrícula (D-016).
export const MATRICULAS = {
  ELECTRICITY: 'Matrícula de electricista',
  GAS: 'Matrícula de gasista',
}

// "Cerrajería y Gasista", "Electricidad, Plomería y Gasista"
export const listarEspecialidades = (codigos = []) => unirConY(codigos.map(getEspecialidadLabel))

export const unirConY = (items) =>
  items.length <= 1 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} y ${items.at(-1)}`
