import { Link } from 'react-router'

export default function Home() {
  return (
    <section className="mx-auto max-w-3xl p-6 text-center">
      <h1 className="mt-12 text-h2 font-bold text-ink">UrbanFix</h1>
      <p className="mt-4 text-ink-muted">
        Encuentra técnicos independientes y sigue el estado de tus solicitudes de servicio.
      </p>
      <Link
        to="/login"
        className="mt-8 inline-block rounded-sm bg-primary px-5 py-3 text-button font-semibold text-sobre-oscuro hover:bg-primary-hover"
      >
        Empezar
      </Link>
    </section>
  )
}
