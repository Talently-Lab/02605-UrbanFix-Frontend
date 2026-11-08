const VARIANTS = {
  error: 'border-danger bg-danger-subtle text-ink',
  success: 'border-success bg-success-subtle text-ink',
  info: 'border-info bg-info-subtle text-ink',
}

export default function Alert({ variant = 'info', children }) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={`rounded-sm border px-4 py-3 text-body-sm ${VARIANTS[variant]}`}
    >
      {children}
    </div>
  )
}
