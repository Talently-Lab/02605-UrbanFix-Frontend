import { createContext, useContext, useState } from 'react'
import { getUserById, loginUser, registerUser } from '../services/authMock.js'

// Placeholder: guarda solo el id del usuario; los datos se leen del mock para reflejar
// cambios de estado (p. ej. un técnico aprobado). Se reemplazará por el token del backend.
const STORAGE_KEY = 'urbanfix:session'

const AuthContext = createContext(null)

function readStoredUser() {
  try {
    const id = localStorage.getItem(STORAGE_KEY)
    return id ? getUserById(id) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)

  const startSession = (newUser) => {
    localStorage.setItem(STORAGE_KEY, newUser.id)
    setUser(newUser)
    return newUser
  }

  // Lanzan Error con el mensaje para mostrar si las credenciales o los datos no son válidos.
  const login = (email, password) => startSession(loginUser(email, password))
  const register = (data) => startSession(registerUser(data))

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
