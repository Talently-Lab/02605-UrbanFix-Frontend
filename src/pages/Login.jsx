import { useLocation, useNavigate } from 'react-router'
import Placeholder from '../components/Placeholder.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { ROLE_LABELS } from '../router/roles.js'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname ?? '/panel'

  const handleLogin = (role) => {
    login(role)
    navigate(from, { replace: true })
  }

  return (
    <Placeholder title="Iniciar sesión">
      <p className="mb-4 text-sm text-slate-500">Acceso simulado mientras no hay backend:</p>
      <div className="flex flex-wrap gap-3">
        {Object.entries(ROLE_LABELS).map(([role, label]) => (
          <button
            key={role}
            onClick={() => handleLogin(role)}
            className="rounded-md border border-slate-300 px-4 py-2 hover:bg-slate-100"
          >
            Entrar como {label.toLowerCase()}
          </button>
        ))}
      </div>
    </Placeholder>
  )
}
