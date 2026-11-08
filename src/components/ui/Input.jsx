import { useState } from 'react'
import { fieldClassName } from './fieldStyles.js'
import FormField from './FormField.jsx'

function EyeIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {!open && <path d="M3 3l18 18" />}
    </svg>
  )
}

export default function Input({ label, name, error, type = 'text', className = '', ...props }) {
  const [showPassword, setShowPassword] = useState(false)
  const errorId = `${name}-error`
  const isPassword = type === 'password'

  return (
    <FormField label={label} name={name} error={error} errorId={errorId} className={className}>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPassword && showPassword ? 'text' : type}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${fieldClassName(error)} h-11 ${isPassword ? 'pr-10' : ''}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-ink-muted hover:text-ink"
          >
            <EyeIcon open={!showPassword} />
          </button>
        )}
      </div>
    </FormField>
  )
}
