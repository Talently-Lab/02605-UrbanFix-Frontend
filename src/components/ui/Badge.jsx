// Etiqueta del Figma: punto de color + texto en ink sobre un fondo suave.
export default function Badge({ dotClassName = 'bg-neutral', className = 'bg-neutral-subtle', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-caption font-semibold text-ink ${className}`}
    >
      <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${dotClassName}`} />
      {children}
    </span>
  )
}
