import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import Alert from '../components/ui/Alert.jsx'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { guardarCredenciales } from '../utils/credenciales.js'
import { validarLogin } from '../utils/validaciones.js'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname ?? '/panel'

  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    const validation = validarLogin(values)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setSubmitting(true)
    try {
      const user = await login(values.email, values.password)
      guardarCredenciales({ email: values.email, password: values.password, name: user.name })
      // Si es un técnico sin aprobar, ProtectedRoute lo redirige a /cuenta-en-revision.
      navigate(from, { replace: true })
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <h1 className="text-h4 font-bold text-ink">Ingresá a tu cuenta</h1>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        {formError && <Alert variant="error">{formError}</Alert>}
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="nombre@email.com"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button type="submit" className="w-full" loading={submitting}>
          Ingresar
        </Button>
      </form>

      <p className="mt-6 text-body-sm text-ink-muted">
        ¿Todavía no tenés cuenta?{' '}
        <Link to="/registro" className="font-semibold text-ink underline hover:text-primary">
          Creá tu cuenta
        </Link>
      </p>
    </>
  )
}
