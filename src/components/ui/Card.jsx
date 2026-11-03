export default function Card({ as: Component = 'div', className = '', children }) {
  return (
    <Component className={`rounded-lg border border-slate-200 bg-white p-4 shadow-sm ${className}`}>
      {children}
    </Component>
  )
}
