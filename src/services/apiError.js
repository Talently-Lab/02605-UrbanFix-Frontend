import { MENSAJES } from '../constants/mensajes.js'

// Tipos de problema del contrato que el front usa para decidir qué hacer.
export const PROBLEMAS = {
  VALIDACION: '/problems/validation-error',
  EMAIL_REGISTRADO: '/problems/email-already-registered',
  CREDENCIALES: '/problems/invalid-credentials',
  SESION_INVALIDA: '/problems/invalid-token',
  NO_ENCONTRADO: '/problems/not-found',
  ERROR_INTERNO: '/problems/internal-error',
}

// Error con el formato del contrato (RFC 9457). `message` es el `detail` que se muestra a la persona;
// `errors` trae los campos del formulario que fallaron.
export class ApiError extends Error {
  constructor({ type = PROBLEMAS.ERROR_INTERNO, status = 500, detail = MENSAJES.errorInesperado, errors = [] } = {}) {
    super(detail)
    this.name = 'ApiError'
    this.type = type
    this.status = status
    this.errors = errors
  }

  // { campo: mensaje }, para mostrar cada error debajo de su campo.
  get fieldErrors() {
    return Object.fromEntries(this.errors.map(({ field, detail }) => [field, detail]))
  }
}
