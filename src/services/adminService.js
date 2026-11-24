import { api } from './api.js'
import * as mock from './authMock.js'
import { request, USE_MOCK } from './request.js'

// Contrato de API, bloques 20, 22 y 24.

// [{ id, name, email, role, accountStatus, createdAt }]
export const getUsuarios = () => (USE_MOCK ? mock.getUsuarios() : request(() => api.get('/admin/usuarios')))

// [{ id, userId, name, email, accountStatus, approvalStatus, specialties, neighborhoods }]
export const getTecnicos = () => (USE_MOCK ? mock.getTecnicos() : request(() => api.get('/admin/tecnicos')))

// approvalStatus: APPROVED o REJECTED. `id` es el del perfil técnico, no el de la cuenta.
export const setAprobacion = (id, approvalStatus) =>
  USE_MOCK
    ? mock.setAprobacion(id, approvalStatus)
    : request(() => api.patch(`/admin/tecnicos/${id}/aprobacion`, { approvalStatus }))
