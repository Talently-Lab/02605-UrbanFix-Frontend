export default function Placeholder({ title, children }) {
  return (
    <section className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      <p className="mt-2 text-slate-500">Página en construcción.</p>
      {children && <div className="mt-6">{children}</div>}
    </section>
  )
}
