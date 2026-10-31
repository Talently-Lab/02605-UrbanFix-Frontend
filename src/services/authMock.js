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

export function registerUser({ role, name, email, password, especialidad, zona }) {
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
  return withoutPassword(user)
}

export function loginUser(email, password) {
  const user = readUsers().find((u) => u.email === normalizeEmail(email) && u.password === password)
  if (!user) throw new Error(MENSAJES.credencialesInvalidas)
  return withoutPassword(user)
}

export function getUserById(id) {
  const user = readUsers().find((u) => u.id === id)
  return user ? withoutPassword(user) : null
}
