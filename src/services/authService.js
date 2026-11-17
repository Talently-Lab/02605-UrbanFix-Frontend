import { MENSAJES } from '../constants/mensajes.js'
import { api } from './api.js'
import * as mock from './authMock.js'

// Mientras no esté el backend se usa el mock. Para usar la API real: VITE_USE_MOCK=false en el .env.
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

// Convierte el error de Axios en un Error con un mensaje para mostrar en pantalla.
// Formato de error de la API a confirmar con Backend: por ahora se asume { message }.
async function request(call) {
  try {
    const response = await call()
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? MENSAJES.errorInesperado)
  }
}

// Rutas previstas por Backend (contrato todavía sin cerrar).
export const login = (email, password) =>
  USE_MOCK ? mock.login(email, password) : request(() => api.post('/auth/login', { email, password }))

export const registerClient = (data) =>
  USE_MOCK ? mock.registerClient(data) : request(() => api.post('/auth/register/client', data))

export const registerTechnician = (data) =>
  USE_MOCK ? mock.registerTechnician(data) : request(() => api.post('/auth/register/technician', data))

export const getMe = () => (USE_MOCK ? mock.getMe() : request(() => api.get('/users/me')))
