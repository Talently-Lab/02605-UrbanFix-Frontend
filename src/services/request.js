import { ApiError } from './apiError.js'

// Mientras no esté el backend se usa el mock. Para usar la API real: VITE_USE_MOCK=false en el .env.
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

// Ejecuta un pedido de Axios y devuelve el cuerpo de la respuesta (el contrato no lo envuelve en { data }).
// Los errores se convierten en ApiError. Si no hubo respuesta (sin conexión) o el cuerpo no trae `detail`,
// queda el mensaje genérico.
export async function request(call) {
  try {
    const response = await call()
    return response.data
  } catch (error) {
    const problem = error.response?.data
    throw new ApiError(problem?.detail ? problem : { status: error.response?.status })
  }
}
