const LOCALE = 'es-AR'

// "3 nov"
export const formatFechaCorta = (iso) =>
  new Date(iso).toLocaleDateString(LOCALE, { day: 'numeric', month: 'short' }).replace('.', '')

// "4 nov a las 14:30"
export const formatFechaHora = (iso) =>
  `${formatFechaCorta(iso)} a las ${new Date(iso).toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit' })}`

// Horas enteras que faltan hasta `iso` (0 si ya pasó).
export const horasRestantes = (iso) => Math.max(0, Math.ceil((new Date(iso) - Date.now()) / (60 * 60 * 1000)))

export const primerNombre = (nombre = '') => nombre.trim().split(' ')[0]
