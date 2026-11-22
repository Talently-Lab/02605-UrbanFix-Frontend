import { CirclePlus, House, LayoutDashboard, List, MessageSquare, Users } from 'lucide-react'
import { ROLES } from './roles.js'

// Menú de la app por rol. Lo usan el Sidebar (escritorio) y la barra inferior (celular).
// `corto` es el texto de la barra inferior. Cliente y técnico siguen el Figma (C1, T1);
// el menú del admin es provisorio. "Ayuda" y "Mis trabajos" se suman cuando existan esas pantallas.
const LINKS = [
  { to: '/panel', label: 'Inicio', corto: 'Inicio', icon: House },
  { to: '/solicitudes', label: 'Mis solicitudes', corto: 'Solicitudes', icon: List, roles: [ROLES.CLIENTE] },
  { to: '/solicitudes/nueva', label: 'Crear solicitud', corto: 'Crear', icon: CirclePlus, roles: [ROLES.CLIENTE] },
  { to: '/solicitudes', label: 'Solicitudes', corto: 'Solicitudes', icon: MessageSquare, roles: [ROLES.TECNICO] },
  { to: '/admin', label: 'Administración', corto: 'Admin', icon: LayoutDashboard, roles: [ROLES.ADMIN] },
  { to: '/admin/tecnicos', label: 'Técnicos', corto: 'Técnicos', icon: Users, roles: [ROLES.ADMIN] },
]

export const linksDelRol = (role) => LINKS.filter(({ roles }) => !roles || roles.includes(role))
