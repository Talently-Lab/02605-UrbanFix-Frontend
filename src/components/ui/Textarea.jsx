import FormField from './FormField.jsx'

export default function Textarea({ label, name, error, rows = 4, className = '', ...props }) {
  const errorId = `${name}-error`
  return (
    <FormField label={label} name={name} error={error} errorId={errorId} className={className}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`w-full resize-y rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 ${
          error ? 'border-red-500' : 'border-slate-300'
        }`}
        {...props}
      />
    </FormField>
  )
}
