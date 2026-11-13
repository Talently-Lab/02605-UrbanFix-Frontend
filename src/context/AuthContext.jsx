import { createContext, useContext, useEffect, useState } from 'react'
import { MENSAJES } from '../constants/mensajes.js'
import { ROLES } from '../router/roles.js'
import { getMe, login as loginRequest, registerClient, registerTechnician } from '../services/authService.js'
import { clearToken, getToken, saveToken } from '../services/tokenStorage.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  // Si hay un token guardado, arrancamos cargando hasta saber de quién es.
  const [loading, setLoading] = useState(() => Boolean(getToken()))

  // Al cargar la app, recupera la sesión guardada (si hay un token).
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

  // La API devuelve solo el token: se guarda y después se piden los datos del usuario a /users/me.
  const startSession = async ({ accessToken }) => {
    saveToken(accessToken)
    try {
      const currentUser = await getMe()
      setToken(accessToken)
      setUser(currentUser)
      return currentUser
    } catch (error) {
      clearToken()
      throw error
    }
  }

  // Lanzan Error con el mensaje para mostrar si las credenciales o los datos no son válidos.
  const login = async (email, password) => startSession(await loginRequest(email, password))

  // Cada rol tiene su ruta de registro, y solo se mandan los datos que le corresponden.
  // El Admin no se registra: lo crea el sistema (definición 1A).
  const register = async ({ role, name, email, password, especialidad, zona }) => {
    if (role === ROLES.CLIENTE) return startSession(await registerClient({ name, email, password }))
    if (role === ROLES.TECNICO) {
      return startSession(await registerTechnician({ name, email, password, especialidad, zona }))
    }
    throw new Error(MENSAJES.rolInvalido)
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
