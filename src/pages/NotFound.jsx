import { Link } from 'react-router'

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
      <h1 className="text-3xl font-bold text-slate-800">404</h1>
      <p className="mt-2 text-slate-500">La página no existe.</p>
      <Link to="/" className="mt-6 text-emerald-600 hover:underline">
        Volver al inicio
      </Link>
    </section>
  )
}
