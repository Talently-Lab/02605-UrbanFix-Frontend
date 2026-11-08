// Estructura común de los campos de formulario: etiqueta arriba y mensaje de error abajo.
export default function FormField({ label, name, error, errorId, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-label font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} className="mt-1.5 text-body-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
