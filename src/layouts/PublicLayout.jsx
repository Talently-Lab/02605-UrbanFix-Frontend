import { Link, Outlet } from 'react-router'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <Link to="/" className="text-xl font-bold text-emerald-600">
          UrbanFix
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/login" className="text-slate-600 hover:text-emerald-600">
            Iniciar sesión
          </Link>
          <Link to="/registro" className="text-slate-600 hover:text-emerald-600">
            Registrarse
          </Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
