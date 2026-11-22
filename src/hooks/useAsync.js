import { useEffect, useState } from 'react'

// Ejecuta una función async al montar el componente y devuelve { data, loading, error }.
// `fn` tiene que ser estable (definida fuera del componente), si no se vuelve a ejecutar en cada render.
export function useAsync(fn) {
  const [state, setState] = useState({ data: null, loading: true, error: '' })

  useEffect(() => {
    // Si el componente se desmonta antes de que termine, no actualizamos un estado que ya no existe.
    let activo = true
    fn()
      .then((data) => activo && setState({ data, loading: false, error: '' }))
      .catch((err) => activo && setState({ data: null, loading: false, error: err.message }))
    return () => {
      activo = false
    }
  }, [fn])

  return state
}
