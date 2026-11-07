import { MENSAJES } from '../constants/mensajes.js'
import { ESTADOS_TECNICO, ROLES, ROLES_REGISTRO } from '../router/roles.js'

// Placeholder: "backend" simulado en localStorage hasta tener la API.
// Las contraseñas se guardan en texto plano SOLO porque es un mock local.
const USERS_KEY = 'urbanfix:users'

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

const withoutPassword = ({ password: _password, ...user }) => user
const normalizeEmail = (email) => email.trim().toLowerCase()

// Simula la demora de la red para que la interfaz maneje el estado de carga.
const DELAY_MS = 600
const wait = () => new Promise((resolve) => setTimeout(resolve, DELAY_MS))

// Token simulado. El backend real devolverá un JWT firmado.
const TOKEN_PREFIX = 'mock-token.'
const createToken = (userId) => `${TOKEN_PREFIX}${userId}`
const getUserIdFromToken = (token) => (token?.startsWith(TOKEN_PREFIX) ? token.slice(TOKEN_PREFIX.length) : null)

export async function registerUser({ role, name, email, password, especialidad, zona }) {
  await wait()
  // Igual que deberá hacer el backend: nunca aceptar "admin" desde el registro.
  if (!ROLES_REGISTRO.includes(role)) throw new Error(MENSAJES.rolInvalido)

  const users = readUsers()
  const normalizedEmail = normalizeEmail(email)
  // Un email = un único rol (definición 3A).
  if (users.some((u) => u.email === normalizedEmail)) throw new Error(MENSAJES.emailEnUso)

  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    password,
    role,
    ...(role === ROLES.TECNICO && { especialidad, zona: zona.trim(), estado: ESTADOS_TECNICO.PENDIENTE }),
  }
  saveUsers([...users, user])
  return { token: createToken(user.id), user: withoutPassword(user) }
}

export async function loginUser(email, password) {
  await wait()
  const user = readUsers().find((u) => u.email === normalizeEmail(email) && u.password === password)
  if (!user) throw new Error(MENSAJES.credencialesInvalidas)
  return { token: createToken(user.id), user: withoutPassword(user) }
}

// Simula GET /auth/me: devuelve el usuario dueño del token, o un error si el token no es válido.
export async function getCurrentUser(token) {
  await wait()
  const user = readUsers().find((u) => u.id === getUserIdFromToken(token))
  if (!user) throw new Error(MENSAJES.sesionInvalida)
  return withoutPassword(user)
}

export function listTecnicos() {
  return readUsers()
    .filter((u) => u.role === ROLES.TECNICO)
    .map(withoutPassword)
}

// Solo el Admin aprueba o rechaza técnicos (definición 2A). El backend deberá validar el rol.
export function setEstadoTecnico(id, estado) {
  if (!Object.values(ESTADOS_TECNICO).includes(estado)) throw new Error(MENSAJES.estadoInvalido)
  const users = readUsers()
  const tecnico = users.find((u) => u.id === id && u.role === ROLES.TECNICO)
  if (!tecnico) throw new Error(MENSAJES.tecnicoNoEncontrado)
  tecnico.estado = estado
  saveUsers(users)
  return withoutPassword(tecnico)
}
