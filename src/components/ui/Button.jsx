import Spinner from './Spinner.jsx'

// Variantes del Figma (Design System). Disabled y foco son comunes a todas.
const VARIANTS = {
  primary: 'bg-primary text-sobre-oscuro enabled:hover:bg-primary-hover disabled:bg-surface-200',
  accent: 'bg-accent text-sobre-oscuro enabled:hover:bg-accent-hover disabled:bg-surface-200',
  secondary: 'border-[1.5px] border-primary text-ink enabled:hover:bg-primary-subtle disabled:border-border',
  danger: 'border-[1.5px] border-danger text-danger enabled:hover:bg-danger-subtle disabled:border-border',
}

export default function Button({ variant = 'primary', loading = false, disabled, className = '', children, ...props }) {
  return (
    <button
      disabled={disabled || loading}
      aria-busy={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-button font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:text-ink-muted ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {loading && <Spinner className="h-4 w-4" />}
      {children}
    </button>
  )
}