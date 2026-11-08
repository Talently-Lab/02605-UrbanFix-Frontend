export default function Placeholder({ title, children }) {
  return (
    <section className="mx-auto max-w-3xl p-6">
      <h1 className="text-h4 font-bold text-ink">{title}</h1>
      <p className="mt-2 text-ink-muted">Página en construcción.</p>
      {children && <div className="mt-6">{children}</div>}
    </section>
  )
}
