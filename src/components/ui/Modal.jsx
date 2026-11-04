import { useEffect, useId, useRef } from 'react'

export default function Modal({ open, title, onClose, children, footer }) {
  const dialogRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Cerrar al hacer clic en el fondo oscuro (fuera del contenido).
  const handleClick = (e) => {
    if (e.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleClick}
      aria-labelledby={titleId}
      className="m-auto w-full max-w-md rounded-lg p-0 shadow-xl backdrop:bg-slate-900/50"
    >
      <div className="p-6">
        <h2 id={titleId} className="text-lg font-semibold text-slate-800">
          {title}
        </h2>
        <div className="mt-3 text-sm text-slate-600">{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
      </div>
    </dialog>
  )
}
