// El backend rechaza los emails con mayúsculas (contrato, bloque 1A): se envían en minúsculas.
export const normalizarEmail = (email) => email.trim().toLowerCase()

// El contrato pide el teléfono en formato internacional, sin espacios ni guiones: +5491155550001.
// Si la persona no escribió el +, se asume un celular de Argentina (+54 9) y se saca el 0 del código de área.
export function telefonoInternacional(telefono) {
  const digitos = telefono.replace(/\D/g, '')
  if (telefono.trim().startsWith('+')) return `+${digitos}`
  return `+549${digitos.replace(/^0/, '')}`
}
