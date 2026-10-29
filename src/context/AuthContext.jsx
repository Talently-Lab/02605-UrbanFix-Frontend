import { createContext, useContext, useState } from 'react'
import { ROLE_LABELS, ROLES } from '../router/roles.js'

// Placeholder: sesión simulada en localStorage hasta conectar con el backend.
const STORAGE_KEY = 'urbanfix:user'

const AuthContext = createContext(null)

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)

  const login = (role = ROLES.CLIENTE) => {
    const fakeUser = { name: ROLE_LABELS[role], role }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser))
    setUser(fakeUser)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
