import { buttonClassName } from './buttonStyles.js'
import Spinner from './Spinner.jsx'

export default function Button({ variant = 'primary', loading = false, disabled, className = '', children, ...props }) {
  return (
    <button
      disabled={disabled || loading}
      aria-busy={loading}
      className={`${buttonClassName(variant)} ${className}`}
      {...props}
    >
      {loading && <Spinner className="h-4 w-4" />}
      {children}
    </button>
  )
}
