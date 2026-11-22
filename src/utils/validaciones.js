import { buscarBarrio } from '../constants/barrios.js'
import { MATRICULAS } from '../constants/especialidades.js'
import { MENSAJES } from '../constants/mensajes.js'
import { ROLES } from '../router/roles.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_MIN = 8
const TELEFONO_MIN_DIGITOS = 8 // Número de CABA o celular, con código de área.

// Cada validador devuelve { campo: mensaje }; objeto vacío = formulario válido.
export function validarLogin({ email, password }) {
  const errors = {}
  if (!email.trim()) errors.email = MENSAJES.campoObligatorio
  else if (!EMAIL_REGEX.test(email.trim())) errors.email = MENSAJES.emailInvalido
  if (!password) errors.password = MENSAJES.campoObligatorio
  return errors
}

export function validarRegistro(values) {
  const { role, name, email, phone, password, neighborhood, specialties, licenses, neighborhoods, terms } = values
  const errors = {}

  if (!role) errors.role = MENSAJES.rolObligatorio
  if (!name.trim()) errors.name = MENSAJES.campoObligatorio
  if (!email.trim()) errors.email = MENSAJES.campoObligatorio
  else if (!EMAIL_REGEX.test(email.trim())) errors.email = MENSAJES.emailInvalido
  if (!phone.trim()) errors.phone = MENSAJES.campoObligatorio
  else if (phone.replace(/\D/g, '').length < TELEFONO_MIN_DIGITOS) errors.phone = MENSAJES.telefonoInvalido
  if (!password) errors.password = MENSAJES.campoObligatorio
  else if (password.length < PASSWORD_MIN) errors.password = MENSAJES.passwordCorta

  if (role === ROLES.CLIENTE) {
    if (!neighborhood.trim()) errors.neighborhood = MENSAJES.campoObligatorio
    else if (!buscarBarrio(neighborhood)) errors.neighborhood = MENSAJES.barrioInvalido
  }

  if (role === ROLES.TECNICO) {
    if (specialties.length === 0) errors.specialties = MENSAJES.especialidadesObligatorias
    // Matrícula obligatoria para Gas y Electricidad (D-016).
    Object.keys(MATRICULAS).forEach((codigo) => {
      if (specialties.includes(codigo) && !licenses[codigo]?.trim())
        errors[`license-${codigo}`] = MENSAJES.campoObligatorio
    })
    if (neighborhoods.length === 0) errors.neighborhoods = MENSAJES.barriosObligatorios
  }

  if (!terms) errors.terms = MENSAJES.terminosObligatorios
  return errors
}
