// Contenedor común de las pantallas de login, registro y cuenta en revisión.
export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-lg border border-border bg-surface-100 p-6 shadow-sm sm:p-8">
        <h1 className="text-h4 font-bold text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-body-sm text-ink-muted">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
      {footer && <div className="mt-4 text-center text-body-sm text-ink-muted">{footer}</div>}
    </section>
  )
}
