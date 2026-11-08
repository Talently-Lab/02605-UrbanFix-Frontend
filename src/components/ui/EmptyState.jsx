export default function EmptyState({ title, description, action, className = '' }) {
  return (
    <div className={`rounded-md border border-dashed border-border p-8 text-center ${className}`}>
      <p className="font-medium text-ink">{title}</p>
      {description && <p className="mt-1 text-body-sm text-ink-muted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
