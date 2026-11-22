import { api } from './api.js'
import * as mock from './authMock.js'
import { request, USE_MOCK } from './request.js'

// Rutas previstas por Backend (contrato todavía sin cerrar).
export const login = (email, password) =>
  USE_MOCK ? mock.login(email, password) : request(() => api.post('/auth/login', { email, password }))

export const registerClient = (data) =>
  USE_MOCK ? mock.registerClient(data) : request(() => api.post('/auth/register/client', data))

export const registerTechnician = (data) =>
  USE_MOCK ? mock.registerTechnician(data) : request(() => api.post('/auth/register/technician', data))

export const getMe = () => (USE_MOCK ? mock.getMe() : request(() => api.get('/users/me')))
