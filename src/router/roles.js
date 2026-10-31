export const ROLES = {
  CLIENTE: 'cliente',
  TECNICO: 'tecnico',
  ADMIN: 'admin',
}

export const ROLE_LABELS = {
  [ROLES.CLIENTE]: 'Cliente',
  [ROLES.TECNICO]: 'Técnico',
  [ROLES.ADMIN]: 'Administrador',
}

// Roles que se pueden elegir al registrarse. El Admin lo crea el sistema (definición 1A).
export const ROLES_REGISTRO = [ROLES.CLIENTE, ROLES.TECNICO]

// El técnico necesita aprobación del Admin antes de operar (definición 2A).
export const ESTADOS_TECNICO = {
  PENDIENTE: 'pendiente',
  APROBADO: 'aprobado',
  RECHAZADO: 'rechazado',
}

export const necesitaAprobacion = (user) => user.role === ROLES.TECNICO && user.estado !== ESTADOS_TECNICO.APROBADO
