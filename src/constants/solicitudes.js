// Estados de una solicitud, con los valores que usan la base de datos y la API (confirmados por Backend).
// El rechazo del técnico no es un estado: la solicitud vuelve a PENDING (D-014).
export const ESTADOS_SOLICITUD = {
  PENDIENTE: 'PENDING',
  ACEPTADA: 'ACCEPTED',
  EN_CURSO: 'IN_PROGRESS',
  COMPLETADA: 'COMPLETED',
  CANCELADA: 'CANCELLED',
}
