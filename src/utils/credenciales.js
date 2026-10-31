// Ofrece guardar la contraseña en el gestor del navegador (Chrome/Edge) después de un login
// o registro exitoso. En una SPA el navegador no siempre detecta el envío del formulario.
export function guardarCredenciales({ email, password, name }) {
  if (!('PasswordCredential' in window)) return
  try {
    const credential = new window.PasswordCredential({ id: email.trim().toLowerCase(), password, name })
    navigator.credentials.store(credential).catch(() => {})
  } catch {
    // Navegador sin soporte o el usuario lo bloqueó: no es un error para la app.
  }
}
