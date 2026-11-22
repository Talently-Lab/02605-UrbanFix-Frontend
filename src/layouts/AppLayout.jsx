import { Outlet, useNavigate } from 'react-router'
import BottomNav from '../components/BottomNav.jsx'
import Logo from '../components/Logo.jsx'
import Sidebar from '../components/Sidebar.jsx'
import UserMenu from '../components/UserMenu.jsx'
import { useAuth } from '../context/AuthContext.jsx'

// App autenticada (Figma C1/T1). Escritorio: Sidebar a la izquierda y chip del usuario arriba a la derecha.
// Celular: barra superior con el isotipo y el avatar, y la navegación fija abajo.
export default function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-surface-100 lg:flex">
      <Sidebar role={user.role} onLogout={handleLogout} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-surface-200 bg-surface-100 px-4 lg:h-22 lg:justify-end lg:border-b-0 lg:px-10">
          <Logo variant="isotipo" to="/panel" className="lg:hidden" imgClassName="h-8" />
          <UserMenu name={user.name} onLogout={handleLogout} />
        </header>

        {/* pb-16: espacio para que la barra inferior no tape el final del contenido en celular. */}
        <main className="flex-1 pt-6 pb-16 lg:pt-0 lg:pb-0">
          <Outlet />
        </main>
      </div>

      <BottomNav role={user.role} />
    </div>
  )
}
