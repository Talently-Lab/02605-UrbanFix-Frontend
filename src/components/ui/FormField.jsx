// Estructura común de los campos de formulario: etiqueta arriba y mensaje de error abajo.
export default function FormField({ label, name, error, errorId, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
