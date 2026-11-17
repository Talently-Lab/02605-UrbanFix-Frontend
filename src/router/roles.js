// Valores del contrato de la API (enum UserRole). Los textos para mostrar están en ROLE_LABELS.
export const ROLES = {
  CLIENTE: 'CLIENT',
  TECNICO: 'TECHNICIAN',
  ADMIN: 'ADMIN',
}

export const ROLE_LABELS = {
  [ROLES.CLIENTE]: 'Cliente',
  [ROLES.TECNICO]: 'Técnico',
  [ROLES.ADMIN]: 'Administrador',
}

// Roles que se pueden elegir al registrarse. El Admin lo crea el sistema (definición 1A).
export const ROLES_REGISTRO = [ROLES.CLIENTE, ROLES.TECNICO]

// El técnico necesita aprobación del Admin antes de operar (definición 2A).
// Valores del contrato de la API (enum TechnicianApprovalStatus).
export const ESTADOS_TECNICO = {
  PENDIENTE: 'PENDING',
  APROBADO: 'APPROVED',
  RECHAZADO: 'REJECTED',
}

// En la API, el estado de aprobación viene dentro de `technician` (GET /usuarios/me).
export const getApprovalStatus = (user) => user.technician?.approvalStatus

export const necesitaAprobacion = (user) =>
  user.role === ROLES.TECNICO && getApprovalStatus(user) !== ESTADOS_TECNICO.APROBADO
