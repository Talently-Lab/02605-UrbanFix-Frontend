import { MENSAJES } from '../constants/mensajes.js'
import { ESTADOS_TECNICO, ROLES, ROLES_REGISTRO } from '../router/roles.js'
import { ApiError, PROBLEMAS } from './apiError.js'
import { BARRIOS_MOCK } from './catalogosService.js'
import { getToken } from './tokenStorage.js'

// Placeholder: "backend" simulado en localStorage hasta tener la API.
// Devuelve las mismas respuestas y errores que el contrato (docs/api-contract.md).
// Las contraseñas se guardan en texto plano SOLO porque es un mock local.
const USERS_KEY = 'urbanfix:users-v2'

// Simula el seed del backend (definición 1A). El real lee la contraseña de variables de entorno.
const ADMIN_SEED = {
  id: 'admin-seed',
  name: 'Administrador',
  email: 'admin@urbanfix.com',
  password: 'admin1234',
  role: ROLES.ADMIN,
}

function readUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) ?? []
    return users.some((u) => u.id === ADMIN_SEED.id) ? users : [ADMIN_SEED, ...users]
  } catch {
    return [ADMIN_SEED]
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// Simula la demora de la red para que la interfaz maneje el estado de carga.
const DELAY_MS = 600
export const wait = () => new Promise((resolve) => setTimeout(resolve, DELAY_MS))

// Token simulado. El backend real devuelve un JWT firmado que vence en 1 hora.
const TOKEN_PREFIX = 'mock-token.'
const TOKEN_DURATION_S = 3600
const getUserIdFromToken = (token) => (token?.startsWith(TOKEN_PREFIX) ? token.slice(TOKEN_PREFIX.length) : null)

// El backend saca el usuario del token; los otros mocks lo usan para filtrar "lo mío".
export const getCurrentUserId = () => getUserIdFromToken(getToken())

// Para los datos de ejemplo de la consola (solicitudesMock).
export const findUser = (id) => readUsers().find((u) => u.id === id)

// Barrios del técnico como { id, name }. Los usuarios guardados antes de este cambio tienen los nombres.
const barriosDe = (technician) =>
  technician.neighborhoodIds
    ? BARRIOS_MOCK.filter((b) => technician.neighborhoodIds.includes(b.id))
    : BARRIOS_MOCK.filter((b) => (technician.neighborhoods ?? []).includes(b.name))

// En el mock, el perfil técnico usa el mismo id que la cuenta.
const technicianId = (user) => user.technician?.id ?? user.id

// Identidad de la cuenta (contrato, bloque 5). `specialties` y `neighborhoods` dentro de `technician`
// los confirmó Backend el 22/11 para "cuenta en revisión" y el dashboard del técnico; todavía no figuran en el contrato.
const toUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  accountStatus: user.accountStatus ?? 'ACTIVE',
  technician: user.technician
    ? {
        id: technicianId(user),
        approvalStatus: user.technician.approvalStatus,
        specialties: user.technician.specialties ?? [],
        neighborhoods: barriosDe(user.technician),
      }
    : null,
})

const errorDeValidacion = (field, detail) =>
  new ApiError({ type: PROBLEMAS.VALIDACION, status: 400, detail, errors: [{ field, detail }] })

// Simula POST /auth/register (contrato, bloques 2 y 3). Devuelve el usuario, sin token.
export async function register({ role, name, email, password, phone, specialties, neighborhoodIds }) {
  await wait()
  // Igual que el backend: nunca aceptar "admin" desde el registro.
  if (!ROLES_REGISTRO.includes(role)) throw errorDeValidacion('role', MENSAJES.rolInvalido)
  if (email !== email.toLowerCase()) throw errorDeValidacion('email', MENSAJES.emailEnMayusculas)

  const users = readUsers()
  // Un email = un único rol (definición 3A).
  if (users.some((u) => u.email === email)) {
    throw new ApiError({ type: PROBLEMAS.EMAIL_REGISTRADO, status: 409, detail: MENSAJES.emailEnUso })
  }

  const id = crypto.randomUUID()
  const user = {
    id,
    name,
    email,
    password,
    role,
    accountStatus: 'ACTIVE',
    createdAt: new Date().toISOString(),
    // Solo el cliente tiene teléfono (contrato, bloque 1C).
    phone: role === ROLES.CLIENTE ? phone : null,
    technician:
      role === ROLES.TECNICO ? { id, approvalStatus: ESTADOS_TECNICO.PENDIENTE, specialties, neighborhoodIds } : null,
  }
  saveUsers([...users, user])
  return toUser(user)
}

// Simula POST /auth/login.
export async function login(email, password) {
  await wait()
  const user = readUsers().find((u) => u.email === email && u.password === password)
  if (!user) {
    throw new ApiError({ type: PROBLEMAS.CREDENCIALES, status: 401, detail: MENSAJES.credencialesInvalidas })
  }
  return {
    accessToken: `${TOKEN_PREFIX}${user.id}`,
    tokenType: 'Bearer',
    expiresIn: TOKEN_DURATION_S,
    user: toUser(user),
  }
}

// Simula GET /usuarios/me: devuelve el usuario dueño del token guardado.
export async function getMe() {
  await wait()
  const user = findUser(getCurrentUserId())
  if (!user) throw new ApiError({ type: PROBLEMAS.SESION_INVALIDA, status: 401, detail: MENSAJES.sesionInvalida })
  return toUser(user)
}

// --- Administración (contrato, bloques 20, 22 y 24) ---

// Simula GET /admin/usuarios. Sin teléfono (D-033).
export async function getUsuarios() {
  await wait()
  return readUsers().map(({ id, name, email, role, accountStatus = 'ACTIVE', createdAt = null }) => ({
    id,
    name,
    email,
    role,
    accountStatus,
    createdAt,
  }))
}

// Simula GET /admin/tecnicos.
export async function getTecnicos() {
  await wait()
  return readUsers()
    .filter((u) => u.role === ROLES.TECNICO)
    .map((user) => ({
      id: technicianId(user),
      userId: user.id,
      name: user.name,
      email: user.email,
      accountStatus: user.accountStatus ?? 'ACTIVE',
      approvalStatus: user.technician.approvalStatus,
      specialties: (user.technician.specialties ?? []).map(({ category, licenseNumber = null }) => ({
        category,
        licenseNumber,
      })),
      neighborhoods: barriosDe(user.technician),
    }))
}

// Simula PATCH /admin/tecnicos/:id/aprobacion. Solo el Admin aprueba o rechaza (definición 2A).
export async function setAprobacion(id, approvalStatus) {
  await wait()
  if (![ESTADOS_TECNICO.APROBADO, ESTADOS_TECNICO.RECHAZADO].includes(approvalStatus)) {
    throw errorDeValidacion('approvalStatus', MENSAJES.estadoInvalido)
  }
  const users = readUsers()
  const tecnico = users.find((u) => u.role === ROLES.TECNICO && technicianId(u) === id)
  if (!tecnico) {
    throw new ApiError({ type: PROBLEMAS.NO_ENCONTRADO, status: 404, detail: MENSAJES.tecnicoNoEncontrado })
  }
  tecnico.technician = { ...tecnico.technician, approvalStatus }
  saveUsers(users)
  return { id, approvalStatus }
}
