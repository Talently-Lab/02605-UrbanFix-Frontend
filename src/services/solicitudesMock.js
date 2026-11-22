import { ESTADOS_SOLICITUD } from '../constants/solicitudes.js'
import { ROLES } from '../router/roles.js'
import { getCurrentUserId, listUsuarios, wait } from './authMock.js'

// Placeholder: solicitudes simuladas en localStorage hasta tener la API.
// Siguen la forma del contrato y suman campos que se pidieron a Backend para las pantallas
// (description, neighborhoodName y technicianName en los listados).
const SOLICITUDES_KEY = 'urbanfix:solicitudes-v1'

function readSolicitudes() {
  try {
    return JSON.parse(localStorage.getItem(SOLICITUDES_KEY)) ?? []
  } catch {
    return []
  }
}

const saveSolicitudes = (solicitudes) => localStorage.setItem(SOLICITUDES_KEY, JSON.stringify(solicitudes))

const lista = (items) => ({ items, nextCursor: null })

// Simula GET /solicitudes/mias: las solicitudes del cliente autenticado.
export async function getMisSolicitudes() {
  await wait()
  const clientId = getCurrentUserId()
  return lista(readSolicitudes().filter((s) => s.clientId === clientId))
}

// Simula GET /solicitudes: las que tienen una oferta vigente para el técnico autenticado.
// Sin dirección exacta antes de aceptar (D-018).
export async function getSolicitudesParaRevisar() {
  await wait()
  const technicianId = getCurrentUserId()
  const items = readSolicitudes()
    .filter((s) => s.status === ESTADOS_SOLICITUD.PENDIENTE && s.currentOffer?.technicianId === technicianId)
    .map(({ addressLine: _addressLine, ...solicitud }) => solicitud)
  return lista(items)
}

// Simula GET /tecnico/trabajos: las solicitudes asignadas al técnico autenticado.
export async function getMisTrabajos() {
  await wait()
  const technicianId = getCurrentUserId()
  return lista(readSolicitudes().filter((s) => s.technicianId === technicianId))
}

// Simula GET /admin/solicitudes: todas, solo con el barrio (D-032). Sin dirección ni teléfono.
export async function getTodasLasSolicitudes() {
  await wait()
  return lista(readSolicitudes().map(({ addressLine: _addressLine, ...solicitud }) => solicitud))
}

// --- Datos de ejemplo (solo en desarrollo) ---

const horasDesdeAhora = (horas) => new Date(Date.now() + horas * 60 * 60 * 1000).toISOString()
const diasAtras = (dias) => horasDesdeAhora(-dias * 24)

function ejemplosCliente(clientId) {
  const base = { clientId, neighborhoodName: 'Palermo', addressLine: 'Calle de ejemplo 123' }
  return [
    {
      ...base,
      category: 'ELECTRICITY',
      description: 'Salta la térmica al usar el horno',
      status: ESTADOS_SOLICITUD.PENDIENTE,
      technicianId: null,
      technicianName: null,
      currentOffer: {
        technicianId: 'tecnico-ejemplo-1',
        technicianName: 'Martín Ledesma',
        status: 'PENDING',
        expiresAt: horasDesdeAhora(18),
      },
      createdAt: diasAtras(0),
    },
    {
      ...base,
      category: 'PLUMBING',
      description: 'Pérdida bajo la bacha de la cocina',
      status: ESTADOS_SOLICITUD.ACEPTADA,
      technicianId: 'tecnico-ejemplo-2',
      technicianName: 'Lucía Benítez',
      currentOffer: null,
      createdAt: diasAtras(1),
    },
    {
      ...base,
      category: 'LOCKSMITH',
      description: 'Cambio de bombín en la puerta de entrada',
      status: ESTADOS_SOLICITUD.EN_CURSO,
      technicianId: 'tecnico-ejemplo-3',
      technicianName: 'Diego Paz',
      currentOffer: null,
      createdAt: diasAtras(2),
    },
    {
      ...base,
      category: 'GAS',
      description: 'Revisión de estufa y calefón',
      status: ESTADOS_SOLICITUD.COMPLETADA,
      technicianId: 'tecnico-ejemplo-4',
      technicianName: 'Romina Acosta',
      currentOffer: null,
      createdAt: diasAtras(10),
    },
  ]
}

function ejemplosTecnico(technicianId, technicianName) {
  const oferta = (horas) => ({ technicianId, technicianName, status: 'PENDING', expiresAt: horasDesdeAhora(horas) })
  const base = { clientId: 'cliente-ejemplo', category: 'ELECTRICITY', technicianName: null, technicianId: null }
  return [
    {
      ...base,
      description: 'Salta la térmica al usar el horno',
      neighborhoodName: 'Balvanera',
      status: ESTADOS_SOLICITUD.PENDIENTE,
      currentOffer: oferta(18),
      createdAt: diasAtras(0),
    },
    {
      ...base,
      description: 'Luz de pasillo que parpadea',
      neighborhoodName: 'Villa Crespo',
      status: ESTADOS_SOLICITUD.PENDIENTE,
      currentOffer: oferta(20),
      createdAt: diasAtras(0),
    },
    {
      ...base,
      description: 'Cambiar tablero con llaves térmicas',
      neighborhoodName: 'Palermo',
      status: ESTADOS_SOLICITUD.PENDIENTE,
      currentOffer: oferta(3),
      createdAt: diasAtras(1),
    },
    {
      ...base,
      description: 'Instalar un tomacorriente en el living',
      neighborhoodName: 'Almagro',
      status: ESTADOS_SOLICITUD.COMPLETADA,
      technicianId,
      technicianName,
      currentOffer: null,
      createdAt: diasAtras(15),
    },
  ]
}

// Carga solicitudes de ejemplo para el usuario con sesión iniciada. Se usa desde la consola del navegador:
// urbanfixMock.cargarEjemplos() · urbanfixMock.borrarSolicitudes()
function cargarEjemplos() {
  const userId = getCurrentUserId()
  const user = listUsuarios().find((u) => u.id === userId)
  if (!user) return 'Iniciá sesión como cliente o técnico y volvé a probar.'

  const ejemplos =
    user.role === ROLES.TECNICO
      ? ejemplosTecnico(user.id, user.name)
      : user.role === ROLES.CLIENTE
        ? ejemplosCliente(user.id)
        : []
  if (ejemplos.length === 0)
    return 'El admin ve las solicitudes de todos: cargá ejemplos desde un cliente o un técnico.'

  const nuevas = ejemplos.map((solicitud) => ({ id: crypto.randomUUID(), ...solicitud }))
  saveSolicitudes([...readSolicitudes(), ...nuevas])
  return `Se cargaron ${nuevas.length} solicitudes de ejemplo. Recargá la página.`
}

if (import.meta.env.DEV) {
  window.urbanfixMock = {
    cargarEjemplos,
    borrarSolicitudes: () => {
      localStorage.removeItem(SOLICITUDES_KEY)
      return 'Solicitudes borradas. Recargá la página.'
    },
  }
}
