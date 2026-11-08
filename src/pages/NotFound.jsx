import { Link } from 'react-router'

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-surface-50 p-6">
      <h1 className="text-h3 font-bold text-ink">404</h1>
      <p className="mt-2 text-ink-muted">La página no existe.</p>
      <Link to="/" className="mt-6 font-semibold text-primary underline hover:text-primary-hover">
        Volver al inicio
      </Link>
    </section>
  )
}
