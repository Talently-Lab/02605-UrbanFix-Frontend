import { Check } from 'lucide-react'
import { ESPECIALIDADES } from '../../constants/especialidades.js'

// Figma "checkboxes" (chip de especialidad): Default y Selected. Selección múltiple (D-016).
export default function EspecialidadesChips({ value, onChange, error }) {
  const toggle = (codigo) => onChange(value.includes(codigo) ? value.filter((c) => c !== codigo) : [...value, codigo])

  return (
    <fieldset aria-describedby={error ? 'specialties-error' : undefined}>
      <legend className="text-input leading-6 font-semibold text-ink">Especialidades</legend>
      <p className="mt-1 text-[0.8125rem] leading-5 text-ink-muted">
        Podés elegir varias. Si ofrecés Gas o Electricidad, cargá la matrícula.
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {ESPECIALIDADES.map(({ value: codigo, label }) => {
          const elegida = value.includes(codigo)
          return (
            <label
              key={codigo}
              className={`flex h-11 cursor-pointer items-center gap-2 rounded-full border-[1.5px] px-4 text-body-sm font-semibold text-ink transition-colors has-focus-visible:outline-2 has-focus-visible:outline-primary ${
                elegida ? 'border-primary bg-primary-subtle' : 'border-surface-50 bg-surface-50 hover:border-border'
              }`}
            >
              <input type="checkbox" checked={elegida} onChange={() => toggle(codigo)} className="sr-only" />
              <span
                aria-hidden="true"
                className={`flex h-4 w-4 items-center justify-center rounded-[2px] ${
                  elegida ? 'bg-primary text-sobre-oscuro' : 'border border-border-strong bg-surface-100'
                }`}
              >
                {elegida && <Check className="h-3 w-3" strokeWidth={3} />}
              </span>
              {label}
            </label>
          )
        })}
      </div>
      {error && (
        <p id="specialties-error" className="mt-1.5 text-body-sm text-danger">
          {error}
        </p>
      )}
    </fieldset>
  )
}
