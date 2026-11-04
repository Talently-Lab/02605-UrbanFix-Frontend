export default function EmptyState({ title, description, action, className = '' }) {
  return (
    <div className={`rounded-lg border border-dashed border-slate-300 p-8 text-center ${className}`}>
      <p className="font-medium text-slate-700">{title}</p>
      {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
