import { useParams } from 'react-router'
import Placeholder from '../../components/Placeholder.jsx'

export default function SolicitudDetalle() {
  const { id } = useParams()
  return <Placeholder title={`Solicitud #${id}`} />
}
