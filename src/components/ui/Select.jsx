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
        className={`w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 ${
          error ? 'border-red-500' : 'border-slate-300'
        }`}
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
