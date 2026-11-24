import { createContext, useContext, useEffect, useState } from 'react'
import { MENSAJES } from '../constants/mensajes.js'
import { ROLES } from '../router/roles.js'
import { ApiError, PROBLEMAS } from '../services/apiError.js'
import { getMe, login as loginRequest, register as registerRequest } from '../services/authService.js'
import { getBarrios } from '../services/catalogosService.js'
import { clearToken, getToken, saveToken } from '../services/tokenStorage.js'
import { normalizarEmail, telefonoInternacional } from '../utils/formato.js'

const AuthContext = createContext(null)

// Arma el body de POST /auth/register según el rol (contrato, bloques 2 y 3).
// PENDIENTE (respuesta de Backend): el formulario todavía pide el barrio del cliente y el teléfono del técnico,
// pero el contrato no los acepta y rechaza los campos de más, así que no se envían.
async function armarRegistro({ role, name, email, password, phone, specialties, licenses, neighborhoods }) {
  const comunes = { name: name.trim(), email: normalizarEmail(email), password, role }
  if (role === ROLES.CLIENTE) return { ...comunes, phone: telefonoInternacional(phone) }
  if (role === ROLES.TECNICO) {
    const barrios = await getBarrios()
    return {
      ...comunes,
      // La matrícula se omite si no se cargó: el backend rechaza null.
      specialties: specialties.map((category) => {
        const licenseNumber = licenses[category]?.trim()
        return licenseNumber ? { category, licenseNumber } : { category }
      }),
      neighborhoodIds: neighborhoods.map((nombre) => barrios.find((b) => b.name === nombre)?.id).filter(Boolean),
    }
  }
  // El Admin no se registra: lo crea el sistema (definición 1A).
  throw new ApiError({ type: PROBLEMAS.VALIDACION, status: 400, detail: MENSAJES.rolInvalido })
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  // Si hay un token guardado, arrancamos cargando hasta saber de quién es.
  const [loading, setLoading] = useState(() => Boolean(getToken()))

  // Al cargar la app, recupera la sesión guardada (si hay un token) con GET /usuarios/me.
  useEffect(() => {
    const savedToken = getToken()
    if (!savedToken) return
    getMe()
      .then((currentUser) => {
        setToken(savedToken)
        setUser(currentUser)
      })
      .catch(() => clearToken())
      .finally(() => setLoading(false))
  }, [])

  // El login devuelve el token y el usuario juntos. Lanza ApiError si las credenciales no son válidas.
  const login = async (email, password) => {
    const { accessToken, user: currentUser } = await loginRequest(normalizarEmail(email), password)
    saveToken(accessToken)
    setToken(accessToken)
    setUser(currentUser)
    return currentUser
  }

  // El registro no devuelve token: después se inicia sesión con las mismas credenciales.
  const register = async (values) => {
    await registerRequest(await armarRegistro(values))
    return login(values.email, values.password)
  }

  const logout = () => {
    clearToken()
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>{children}</AuthContext.Provider>
  )
}

// oxlint-disable-next-line react/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
