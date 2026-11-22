// Variantes del Figma (Design System). Disabled y foco son comunes a todas.
const VARIANTS = {
  primary:
    'bg-primary text-sobre-oscuro enabled:hover:bg-primary-hover enabled:hover:text-sobre-oscuro-2 disabled:bg-surface-200',
  accent: 'bg-accent text-sobre-oscuro enabled:hover:bg-accent-hover disabled:bg-surface-200',
  secondary: 'bg-primary-subtle text-primary enabled:hover:text-ink disabled:bg-surface-200',
  danger: 'border-[1.5px] border-danger text-danger enabled:hover:bg-danger-subtle disabled:border-border',
}

// md: Button-primary / Button-secondary (radio 8, texto 14).
// cta: botones destacados de los dashboards — Button-icon, "Crear solicitud" y "Ver solicitud" (radio 10, texto 15).
const SIZES = {
  md: 'rounded-sm text-button',
  cta: 'rounded-[10px] text-input',
}

const BASE =
  'inline-flex h-12 items-center justify-center gap-2 px-5 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:text-ink-muted'

// Clases de Button y ButtonLink, para que un link se vea igual que un botón.
// Los links no tienen estado `enabled`, así que en ellos el hover se aplica siempre.
export const buttonClassName = (variant = 'primary', { link = false, size = 'md' } = {}) => {
  const colores = link ? VARIANTS[variant].replaceAll('enabled:hover:', 'hover:') : VARIANTS[variant]
  return `${BASE} ${SIZES[size]} ${colores}`
}
