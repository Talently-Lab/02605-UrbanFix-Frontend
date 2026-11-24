import { api } from './api.js'
import * as mock from './authMock.js'
import { request, USE_MOCK } from './request.js'

// Contrato de API, bloques 2 a 5. Las rutas son relativas a VITE_API_URL, que termina en /api.

// Devuelve { accessToken, tokenType, expiresIn, user }.
export const login = (email, password) =>
  USE_MOCK ? mock.login(email, password) : request(() => api.post('/auth/login', { email, password }))

// Un solo endpoint para cliente y técnico: el rol va en el body. Devuelve el usuario, sin token.
export const register = (body) => (USE_MOCK ? mock.register(body) : request(() => api.post('/auth/register', body)))

export const getMe = () => (USE_MOCK ? mock.getMe() : request(() => api.get('/usuarios/me')))
