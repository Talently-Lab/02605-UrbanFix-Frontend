export default function Card({ as: Component = 'div', className = '', children }) {
  return (
    <Component className={`rounded-md border border-border bg-surface-100 p-5 shadow-sm ${className}`}>
      {children}
    </Component>
  )
}
