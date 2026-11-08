import { fieldClassName } from './fieldStyles.js'
import FormField from './FormField.jsx'

export default function Select({
  label,
  name,
  error,
  options,
  placeholder = 'Seleccioná una opción',
  className = '',
  ...props
}) {
  const errorId = `${name}-error`
  return (
    <FormField label={label} name={name} error={error} errorId={errorId} className={className}>
      <select
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`${fieldClassName(error)} h-11`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  )
}
