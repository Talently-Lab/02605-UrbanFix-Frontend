import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Alert from '../components/ui/Alert.jsx'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'
import Select from '../components/ui/Select.jsx'
import { ESPECIALIDADES } from '../constants/especialidades.js'
import { useAuth } from '../context/AuthContext.jsx'
import { ROLES } from '../router/roles.js'
import { guardarCredenciales } from '../utils/credenciales.js'
import { validarRegistro } from '../utils/validaciones.js'

const ROLE_OPTIONS = [
  { value: ROLES.CLIENTE, title: 'Soy cliente', description: 'Necesito contratar un servicio técnico.' },
  { value: ROLES.TECNICO, title: 'Soy técnico', description: 'Quiero ofrecer mis servicios.' },
]

const INITIAL_VALUES = {
  role: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  especialidad: '',
  zona: '',
}

export default function Registro() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    const validation = validarRegistro(values)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setSubmitting(true)
    try {
      await register(values)
      guardarCredenciales(values)
      // El técnico queda pendiente de aprobación: ProtectedRoute lo lleva a /cuenta-en-revision.
      navigate('/panel', { replace: true })
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const isTecnico = values.role === ROLES.TECNICO

  return (
    <>
      <h1 className="text-h4 font-bold text-ink">Creá tu cuenta</h1>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        {formError && <Alert variant="error">{formError}</Alert>}

        <fieldset>
          <legend className="mb-2 text-label font-semibold text-ink">¿Cómo vas a usar UrbanFix?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {ROLE_OPTIONS.map(({ value, title, description }) => (
              <label
                key={value}
                className={`cursor-pointer rounded-sm border p-3 text-body-sm ${
                  values.role === value ? 'border-primary bg-primary-subtle' : 'border-border hover:bg-surface-200'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={value}
                  checked={values.role === value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="block font-semibold text-ink">{title}</span>
                <span className="text-ink-muted">{description}</span>
              </label>
            ))}
          </div>
          {errors.role && <p className="mt-1.5 text-body-sm text-danger">{errors.role}</p>}
        </fieldset>

        <Input
          label="Nombre y apellido"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        {isTecnico && (
          <>
            <Select
              label="Especialidad"
              name="especialidad"
              options={ESPECIALIDADES}
              value={values.especialidad}
              onChange={handleChange}
              error={errors.especialidad}
            />
            <Input
              label="Zona de trabajo"
              name="zona"
              placeholder="Ej.: Palermo, CABA"
              value={values.zona}
              onChange={handleChange}
              error={errors.zona}
            />
          </>
        )}

        <Input
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          label="Repetir contraseña"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        {isTecnico && <Alert variant="info">Tu cuenta quedará pendiente hasta que un administrador la apruebe.</Alert>}

        <Button type="submit" className="w-full" loading={submitting}>
          Crear cuenta
        </Button>
      </form>

      <p className="mt-6 text-body-sm text-ink-muted">
        ¿Ya tenés cuenta?{' '}
        <Link to="/login" className="font-semibold text-ink underline hover:text-primary">
          Ingresá
        </Link>
      </p>
    </>
  )
}
