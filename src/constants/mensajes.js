// Textos provisorios: reemplazar por los del Kit del cliente (definición 5A).
export const MENSAJES = {
  campoObligatorio: 'Este campo es obligatorio.',
  emailInvalido: 'Ingresá un email válido.',
  passwordCorta: 'La contraseña debe tener al menos 8 caracteres.',
  passwordsNoCoinciden: 'Las contraseñas no coinciden.',
  rolObligatorio: 'Elegí si te registrás como cliente o como técnico.',
  rolInvalido: 'El rol elegido no es válido.',
  emailEnUso: 'Ya existe una cuenta con este email.',
  credencialesInvalidas: 'Email o contraseña incorrectos.',
  estadoInvalido: 'El estado elegido no es válido.',
  tecnicoNoEncontrado: 'No se encontró el técnico.',
  tecnicoAprobado: (name) => `${name} fue aprobado y ya puede recibir solicitudes.`,
  tecnicoRechazado: (name) => `${name} fue rechazado.`,
}

// Provisorio hasta definir el catálogo de servicios con el equipo.
export const ESPECIALIDADES = [
  'Electricidad',
  'Plomería',
  'Gas',
  'Cerrajería',
  'Pintura',
  'Albañilería',
  'Carpintería',
  'Climatización',
]
