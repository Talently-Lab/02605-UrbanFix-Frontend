// Estilo común de Input, Select y Textarea (componente "Input" del Figma).
// Estados sin variante en Figma: foco con primary, error con danger y deshabilitado como los botones.
export const fieldClassName = (error) =>
  `w-full rounded-sm border bg-surface-100 px-3 text-input text-ink outline-none transition-colors placeholder:text-ink-muted focus:ring-3 focus:ring-primary-subtle disabled:cursor-not-allowed disabled:bg-surface-200 disabled:text-ink-muted ${
    error ? 'border-danger' : 'border-border focus:border-primary'
  }`
