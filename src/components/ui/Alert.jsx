const VARIANTS = {
  error: 'border-red-200 bg-red-50 text-red-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  info: 'border-sky-200 bg-sky-50 text-sky-700',
}

export default function Alert({ variant = 'info', children }) {
  return (
    <div role={variant === 'error' ? 'alert' : 'status'} className={`rounded-md border px-4 py-3 text-sm ${VARIANTS[variant]}`}>
      {children}
    </div>
  )
}
