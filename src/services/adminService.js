import { api } from './api.js'
import { listUsuarios, wait } from './authMock.js'
import { request, USE_MOCK } from './request.js'

// Simula GET /admin/usuarios (incluye a los técnicos con su estado de aprobación).
const getUsuariosMock = async () => {
  await wait()
  return { items: listUsuarios(), nextCursor: null }
}

export const getUsuarios = () => (USE_MOCK ? getUsuariosMock() : request(() => api.get('/admin/usuarios')))
