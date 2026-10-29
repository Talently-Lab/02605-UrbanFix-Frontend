import { Link } from 'react-router'

export default function Home() {
  return (
    <section className="mx-auto max-w-3xl p-6 text-center">
      <h1 className="mt-12 text-4xl font-bold text-slate-800">UrbanFix</h1>
      <p className="mt-4 text-slate-600">Encuentra técnicos independientes y sigue el estado de tus solicitudes de servicio.</p>
      <Link
        to="/login"
        className="mt-8 inline-block rounded-md bg-emerald-600 px-5 py-2 font-medium text-white hover:bg-emerald-700"
      >
        Empezar
      </Link>
    </section>
  )
}
