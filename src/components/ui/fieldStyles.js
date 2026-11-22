// Estilo común de Input, Select y Textarea (componente "Input" del Figma).
// Default: borde 1.5 Border/border, radio 6. Focus: borde Components/hover. Disabled: fondo Surface/200 sin borde.
// El Figma no tiene variante de error: se usa danger.
export const fieldClassName = (error) =>
  `w-full rounded-[6px] border-[1.5px] bg-surface-100 px-3 text-input text-ink outline-none transition-colors placeholder:text-ink-muted disabled:cursor-not-allowed disabled:border-transparent disabled:bg-surface-200 disabled:text-ink-muted ${
    error ? 'border-danger' : 'border-border focus:border-primary-hover'
  }`
