import { MENSAJES } from '../constants/mensajes.js'
import { ROLES } from '../router/roles.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_MIN = 8

// Cada validador devuelve { campo: mensaje }; objeto vacío = formulario válido.
export function validarLogin({ email, password }) {
  const errors = {}
  if (!email.trim()) errors.email = MENSAJES.campoObligatorio
  else if (!EMAIL_REGEX.test(email.trim())) errors.email = MENSAJES.emailInvalido
  if (!password) errors.password = MENSAJES.campoObligatorio
  return errors
}

export function validarRegistro({ role, name, email, password, confirmPassword, especialidad, zona }) {
  const errors = {}
  if (!role) errors.role = MENSAJES.rolObligatorio
  if (!name.trim()) errors.name = MENSAJES.campoObligatorio
  if (!email.trim()) errors.email = MENSAJES.campoObligatorio
  else if (!EMAIL_REGEX.test(email.trim())) errors.email = MENSAJES.emailInvalido
  if (!password) errors.password = MENSAJES.campoObligatorio
  else if (password.length < PASSWORD_MIN) errors.password = MENSAJES.passwordCorta
  if (!confirmPassword) errors.confirmPassword = MENSAJES.campoObligatorio
  else if (confirmPassword !== password) errors.confirmPassword = MENSAJES.passwordsNoCoinciden
  if (role === ROLES.TECNICO) {
    if (!especialidad) errors.especialidad = MENSAJES.campoObligatorio
    if (!zona.trim()) errors.zona = MENSAJES.campoObligatorio
  }
  return errors
}
