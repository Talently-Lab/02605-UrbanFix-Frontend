// Categorías de servicio confirmadas por el equipo (enum ServiceCategory del Backend)
export const ESPECIALIDADES = [
  { value: 'ELECTRICITY', label: 'Electricidad' },
  { value: 'PLUMBING', label: 'Plomería' },
  { value: 'GAS', label: 'Gas' },
  { value: 'LOCKSMITH', label: 'Cerrajería' },
  { value: 'MASONRY', label: 'Albañilería' },
]

export const getEspecialidadLabel = (value) =>
  ESPECIALIDADES.find((especialidad) => especialidad.value === value)?.label ?? value
