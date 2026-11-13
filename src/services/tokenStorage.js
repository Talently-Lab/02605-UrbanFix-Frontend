// Dónde se guarda el JWT de la sesión. Lo usan AuthContext y el cliente de la API.
const TOKEN_KEY = 'urbanfix:token'

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token)

export const clearToken = () => localStorage.removeItem(TOKEN_KEY)
