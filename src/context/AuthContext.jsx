import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser, loginUser, registerUser } from '../services/authMock.js'
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
    getCurrentUser(savedToken)
      .then((currentUser) => {
        setToken(savedToken)
        setUser(currentUser)
      })
      .catch(() => clearToken())
      .finally(() => setLoading(false))
  }, [])

  const startSession = ({ token: newToken, user: newUser }) => {
    saveToken(newToken)
    setToken(newToken)
    setUser(newUser)
    return newUser
  }

  // Lanzan Error con el mensaje para mostrar si las credenciales o los datos no son válidos.
  const login = async (email, password) => startSession(await loginUser(email, password))
  const register = async (data) => startSession(await registerUser(data))

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
