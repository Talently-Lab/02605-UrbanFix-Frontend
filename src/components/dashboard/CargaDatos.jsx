import Alert from '../ui/Alert.jsx'
import Spinner from '../ui/Spinner.jsx'

// Muestra el spinner mientras carga, el error si falló y, si salió bien, el contenido.
export default function CargaDatos({ loading, error, children }) {
  if (loading) {
    return (
      <div className="flex justify-center py-16 text-ink-muted">
        <Spinner className="h-8 w-8" label="Cargando tu panel" />
      </div>
    )
  }
  if (error) return <Alert variant="error">{error}</Alert>
  return children
}
