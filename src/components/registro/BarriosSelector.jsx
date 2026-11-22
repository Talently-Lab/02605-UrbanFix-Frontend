import { useId, useState } from 'react'
import { BARRIOS_CABA, buscarBarrio } from '../../constants/barrios.js'

// Figma "Barrios donde trabajás": caja con los barrios elegidos como tags y un buscador.
// Varios barrios de CABA (D-017). Tocar un tag lo quita.
export default function BarriosSelector({ value, onChange, error }) {
  const [busqueda, setBusqueda] = useState('')
  const listaId = useId()
  const inputId = useId()
  const disponibles = BARRIOS_CABA.filter((barrio) => !value.includes(barrio))

  // Agrega el barrio si el texto coincide con uno de la lista (al elegirlo de las sugerencias o al apretar Enter).
  const agregar = (texto) => {
    const barrio = buscarBarrio(texto)
    if (!barrio) return false
    if (!value.includes(barrio)) onChange([...value, barrio])
    setBusqueda('')
    return true
  }

  const handleChange = (e) => {
    if (!agregar(e.target.value)) setBusqueda(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      agregar(busqueda)
    }
    // Borrar con el campo vacío quita el último barrio.
    if (e.key === 'Backspace' && !busqueda && value.length > 0) onChange(value.slice(0, -1))
  }

  return (
    <div>
      <label htmlFor={inputId} className="text-input leading-6 font-semibold text-ink">
        Barrios donde trabajás
      </label>
      <div
        className={`mt-2 flex min-h-12 flex-wrap items-center gap-1.5 rounded-[6px] border bg-surface-100 px-2 py-1.75 transition-colors focus-within:border-primary-hover ${
          error ? 'border-danger' : 'border-border-strong'
        }`}
      >
        {value.map((barrio) => (
          <button
            key={barrio}
            type="button"
            onClick={() => onChange(value.filter((b) => b !== barrio))}
            aria-label={`Quitar ${barrio}`}
            className="h-8 rounded-full bg-primary-subtle px-3 text-[0.8125rem] leading-5 font-semibold text-primary hover:bg-surface-200"
          >
            {barrio}
          </button>
        ))}
        <input
          id={inputId}
          list={listaId}
          value={busqueda}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Buscar barrio de CABA"
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={`${inputId}-ayuda${error ? ` ${inputId}-error` : ''}`}
          className="min-w-40 flex-1 bg-transparent px-1 text-input text-ink outline-none placeholder:text-ink-muted"
        />
        <datalist id={listaId}>
          {disponibles.map((barrio) => (
            <option key={barrio} value={barrio} />
          ))}
        </datalist>
      </div>
      <p id={`${inputId}-ayuda`} className="mt-2 text-[0.8125rem] leading-5 text-ink-muted">
        Podés elegir varios barrios de CABA. Tocá uno para quitarlo.
      </p>
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-body-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
