import { api } from './api.js'
import { request, USE_MOCK } from './request.js'
import * as mock from './solicitudesMock.js'

// Contrato de API, bloques 10, 11, 16 y 21. Cada función devuelve un array ([] si no hay resultados).
export const getMisSolicitudes = () =>
  USE_MOCK ? mock.getMisSolicitudes() : request(() => api.get('/solicitudes/mias'))

export const getSolicitudesParaRevisar = () =>
  USE_MOCK ? mock.getSolicitudesParaRevisar() : request(() => api.get('/solicitudes'))

export const getMisTrabajos = () => (USE_MOCK ? mock.getMisTrabajos() : request(() => api.get('/tecnico/trabajos')))

export const getTodasLasSolicitudes = () =>
  USE_MOCK ? mock.getTodasLasSolicitudes() : request(() => api.get('/admin/solicitudes'))
