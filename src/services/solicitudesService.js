import { api } from './api.js'
import { request, USE_MOCK } from './request.js'
import * as mock from './solicitudesMock.js'

// Rutas del contrato de la API. Cada función devuelve { items, nextCursor }.
export const getMisSolicitudes = () =>
  USE_MOCK ? mock.getMisSolicitudes() : request(() => api.get('/solicitudes/mias'))

export const getSolicitudesParaRevisar = () =>
  USE_MOCK ? mock.getSolicitudesParaRevisar() : request(() => api.get('/solicitudes'))

export const getMisTrabajos = () => (USE_MOCK ? mock.getMisTrabajos() : request(() => api.get('/tecnico/trabajos')))

export const getTodasLasSolicitudes = () =>
  USE_MOCK ? mock.getTodasLasSolicitudes() : request(() => api.get('/admin/solicitudes'))
