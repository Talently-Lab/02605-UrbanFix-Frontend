import { ESTADOS_SOLICITUD } from '../constants/solicitudes.js'
import { ROLES } from '../router/roles.js'
import { findUser, getCurrentUserId, wait } from './authMock.js'
import { BARRIOS_MOCK } from './catalogosService.js'

// Placeholder: solicitudes simuladas en localStorage hasta tener la API.
// Cada listado devuelve los campos de su bloque del contrato (docs/api-contract.md). La dirección exacta
// y el teléfono nunca salen en los listados (D-018, D-032).
const SOLICITUDES_KEY = 'urbanfix:solicitudes-v1'

function readSolicitudes() {
  try {
    const guardadas = JSON.parse(localStorage.getItem(SOLICITUDES_KEY)) ?? []
    // Las guardadas antes de este cambio usaban `currentOffer`.
    return guardadas.map(({ currentOffer, ...s }) => ({ ...s, offer: s.offer ?? currentOffer ?? null }))
  } catch {
    return []
  }
}

const saveSolicitudes = (solicitudes) => localStorage.setItem(SOLICITUDES_KEY, JSON.stringify(solicitudes))

const neighborhoodId = (s) => BARRIOS_MOCK.find((b) => b.name === s.neighborhoodName)?.id ?? null

// Campos comunes a todos los listados.
const resumen = (s) => ({
  id: s.id,
  category: s.category,
  description: s.description,
  neighborhoodId: neighborhoodId(s),
  neighborhoodName: s.neighborhoodName,
  preferredTime: s.preferredTime ?? 'ANY',
  status: s.status,
})

// Simula GET /solicitudes/mias: las solicitudes del cliente autenticado (bloque 10).
// `offer` no está en el contrato: se pidió a Backend para mostrar al técnico elegido y su plazo de 24 h.
export async function getMisSolicitudes() {
  await wait()
  const clientId = getCurrentUserId()
  return readSolicitudes()
    .filter((s) => s.clientId === clientId)
    .map((s) => ({
      ...resumen(s),
      technicianId: s.technicianId,
      technicianName: s.technicianName,
      createdAt: s.createdAt,
      acceptedAt: s.acceptedAt ?? null,
      offer: s.offer && { technicianName: s.offer.technicianName, expiresAt: s.offer.expiresAt },
    }))
}

// Simula GET /solicitudes: las ofertas vigentes dirigidas al técnico autenticado (bloque 11).
export async function getSolicitudesParaRevisar() {
  await wait()
  const technicianId = getCurrentUserId()
  const ahora = new Date().toISOString()
  return readSolicitudes()
    .filter(
      (s) =>
        s.status === ESTADOS_SOLICITUD.PENDIENTE && s.offer?.technicianId === technicianId && s.offer.expiresAt > ahora,
    )
    .map((s) => ({
      ...resumen(s),
      offer: { id: s.offer.id, status: s.offer.status, createdAt: s.offer.createdAt, expiresAt: s.offer.expiresAt },
    }))
}

// Simula GET /tecnico/trabajos: las solicitudes asignadas al técnico autenticado (bloque 16).
export async function getMisTrabajos() {
  await wait()
  const technicianId = getCurrentUserId()
  return readSolicitudes()
    .filter((s) => s.technicianId === technicianId)
    .map((s) => ({
      ...resumen(s),
      acceptedAt: s.acceptedAt ?? null,
      completedAt: s.completedAt ?? null,
      cancelledAt: s.cancelledAt ?? null,
    }))
}

// Simula GET /admin/solicitudes: todas, con el barrio como único dato de ubicación (bloque 21).
// Sin descripción: el contrato todavía no confirma si el admin la recibe.
export async function getTodasLasSolicitudes() {
  await wait()
  return readSolicitudes().map((s) => {
    const { description: _description, ...campos } = resumen(s)
    const cliente = findUser(s.clientId)
    return {
      ...campos,
      clientId: s.clientId,
      clientName: cliente?.name ?? 'Cliente de ejemplo',
      clientEmail: cliente?.email ?? null,
      technicianId: s.technicianId,
      technicianName: s.technicianName,
      createdAt: s.createdAt,
      acceptedAt: s.acceptedAt ?? null,
      completedAt: s.completedAt ?? null,
      cancelledAt: s.cancelledAt ?? null,
    }
  })
}

// --- Datos de ejemplo (solo en desarrollo) ---

const horasDesdeAhora = (horas) => new Date(Date.now() + horas * 60 * 60 * 1000).toISOString()
const diasAtras = (dias) => horasDesdeAhora(-dias * 24)

const oferta = (technicianId, technicianName, horasRestantes) => ({
  id: crypto.randomUUID(),
  technicianId,
  technicianName,
  status: 'PENDING',
  createdAt: horasDesdeAhora(horasRestantes - 24),
  expiresAt: horasDesdeAhora(horasRestantes),
})

function ejemplosCliente(clientId) {
  const base = { clientId, neighborhoodName: 'Palermo', preferredTime: 'ANY' }
  return [
    {
      ...base,
      category: 'ELECTRICITY',
      description: 'Salta la térmica al usar el horno',
      status: ESTADOS_SOLICITUD.PENDIENTE,
      technicianId: null,
      technicianName: null,
      offer: oferta('tecnico-ejemplo-1', 'Martín Ledesma', 18),
      createdAt: diasAtras(0),
    },
    {
      ...base,
      category: 'PLUMBING',
      description: 'Pérdida bajo la bacha de la cocina',
      status: ESTADOS_SOLICITUD.ACEPTADA,
      technicianId: 'tecnico-ejemplo-2',
      technicianName: 'Lucía Benítez',
      offer: null,
      createdAt: diasAtras(1),
      acceptedAt: diasAtras(0.5),
    },
    {
      ...base,
      category: 'LOCKSMITH',
      description: 'Cambio de bombín en la puerta de entrada',
      status: ESTADOS_SOLICITUD.EN_CURSO,
      technicianId: 'tecnico-ejemplo-3',
      technicianName: 'Diego Paz',
      offer: null,
      createdAt: diasAtras(2),
      acceptedAt: diasAtras(1.5),
    },
    {
      ...base,
      category: 'GAS',
      description: 'Revisión de estufa y calefón',
      status: ESTADOS_SOLICITUD.COMPLETADA,
      technicianId: 'tecnico-ejemplo-4',
      technicianName: 'Romina Acosta',
      offer: null,
      createdAt: diasAtras(10),
      acceptedAt: diasAtras(9),
      completedAt: diasAtras(8),
    },
  ]
}

function ejemplosTecnico(technicianId, technicianName) {
  const base = { clientId: 'cliente-ejemplo', category: 'ELECTRICITY', preferredTime: 'ANY' }
  const pendiente = { ...base, status: ESTADOS_SOLICITUD.PENDIENTE, technicianId: null, technicianName: null }
  return [
    {
      ...pendiente,
      description: 'Salta la térmica al usar el horno',
      neighborhoodName: 'Balvanera',
      offer: oferta(technicianId, technicianName, 18),
      createdAt: diasAtras(0),
    },
    {
      ...pendiente,
      description: 'Luz de pasillo que parpadea',
      neighborhoodName: 'Villa Crespo',
      offer: oferta(technicianId, technicianName, 20),
      createdAt: diasAtras(0),
    },
    {
      ...pendiente,
      description: 'Cambiar tablero con llaves térmicas',
      neighborhoodName: 'Palermo',
      offer: oferta(technicianId, technicianName, 3),
      createdAt: diasAtras(1),
    },
    {
      ...base,
      description: 'Instalar un tomacorriente en el living',
      neighborhoodName: 'Almagro',
      status: ESTADOS_SOLICITUD.COMPLETADA,
      technicianId,
      technicianName,
      offer: null,
      createdAt: diasAtras(15),
      acceptedAt: diasAtras(14),
      completedAt: diasAtras(13),
    },
  ]
}

// Carga solicitudes de ejemplo para el usuario con sesión iniciada. Se usa desde la consola del navegador:
// urbanfixMock.cargarEjemplos() · urbanfixMock.borrarSolicitudes()
function cargarEjemplos() {
  const user = findUser(getCurrentUserId())
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
