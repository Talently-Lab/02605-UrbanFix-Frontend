import { fieldClassName } from './fieldStyles.js'
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
        className={`${fieldClassName(error)} resize-y py-2.5`}
        {...props}
      />
    </FormField>
  )
}
