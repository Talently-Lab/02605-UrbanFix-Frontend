import { MENSAJES } from '../constants/mensajes.js'

// Mientras no esté el backend se usa el mock. Para usar la API real: VITE_USE_MOCK=false en el .env.
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

// Ejecuta un pedido de Axios y devuelve el contenido de la respuesta.
// Según el contrato, la API envuelve todas las respuestas en { data: ... }.
// Formato de error a confirmar con Backend: por ahora se asume { message }.
export async function request(call) {
  try {
    const response = await call()
    return response.data.data
  } catch (error) {
    throw new Error(error.response?.data?.message ?? MENSAJES.errorInesperado)
  }
}
