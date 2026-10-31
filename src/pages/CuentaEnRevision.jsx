import { Navigate, useNavigate } from 'react-router'
import AuthCard from '../components/AuthCard.jsx'
import Alert from '../components/ui/Alert.jsx'
import Button from '../components/ui/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { ESTADOS_TECNICO, necesitaAprobacion } from '../router/roles.js'

// Única pantalla accesible para un técnico que todavía no fue aprobado (definición 2A).
export default function CuentaEnRevision() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) return <Navigate to="/login" replace />
  if (!necesitaAprobacion(user)) return <Navigate to="/panel" replace />

  const rechazado = user.estado === ESTADOS_TECNICO.RECHAZADO

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <AuthCard title={rechazado ? 'Solicitud no aprobada' : 'Tu cuenta está en revisión'}>
      <div className="space-y-4">
        {rechazado ? (
          <Alert variant="error">Tu cuenta de técnico no fue aprobada. Si creés que es un error, contactá al equipo de UrbanFix.</Alert>
        ) : (
          <Alert variant="info">
            Un administrador está revisando tus datos. Cuando tu cuenta sea aprobada vas a poder recibir solicitudes.
          </Alert>
        )}
        <dl className="space-y-1 text-sm text-slate-600">
          <div>
            <dt className="inline font-medium">Nombre: </dt>
            <dd className="inline">{user.name}</dd>
          </div>
          <div>
            <dt className="inline font-medium">Email: </dt>
            <dd className="inline">{user.email}</dd>
          </div>
          <div>
            <dt className="inline font-medium">Especialidad: </dt>
            <dd className="inline">{user.especialidad}</dd>
          </div>
          <div>
            <dt className="inline font-medium">Zona: </dt>
            <dd className="inline">{user.zona}</dd>
          </div>
        </dl>
        <Button variant="secondary" onClick={handleLogout} className="w-full">
          Cerrar sesión
        </Button>
      </div>
    </AuthCard>
  )
}
