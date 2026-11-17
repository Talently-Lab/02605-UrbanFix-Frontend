import axios from 'axios'
import { clearToken, getToken } from './tokenStorage.js'

// Cliente de la API: todas las llamadas al backend pasan por acá.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Antes de cada pedido: si hay sesión, manda el token.
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Después de cada respuesta: un 401 significa que el token venció o no es válido.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // En el login, un 401 es "contraseña incorrecta": se muestra el error en el formulario.
    const isLoginRequest = error.config?.url === '/auth/login'
    if (error.response?.status === 401 && !isLoginRequest) {
      clearToken()
      window.location.replace('/login')
    }
    return Promise.reject(error)
  },
)
