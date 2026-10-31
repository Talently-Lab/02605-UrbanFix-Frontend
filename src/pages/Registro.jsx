import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import AuthCard from '../components/AuthCard.jsx'
import Alert from '../components/ui/Alert.jsx'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'
import Select from '../components/ui/Select.jsx'
import { ESPECIALIDADES } from '../constants/mensajes.js'
import { useAuth } from '../context/AuthContext.jsx'
import { ROLES } from '../router/roles.js'
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

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')
    const validation = validarRegistro(values)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    try {
      register(values)
      // El técnico queda pendiente de aprobación: ProtectedRoute lo lleva a /cuenta-en-revision.
      navigate('/panel', { replace: true })
    } catch (err) {
      setFormError(err.message)
    }
  }

  const isTecnico = values.role === ROLES.TECNICO

  return (
    <AuthCard
      title="Crear cuenta"
      footer={
        <>
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" className="font-medium text-emerald-600 hover:underline">
            Iniciá sesión
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {formError && <Alert variant="error">{formError}</Alert>}

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-slate-700">¿Cómo vas a usar UrbanFix?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {ROLE_OPTIONS.map(({ value, title, description }) => (
              <label
                key={value}
                className={`cursor-pointer rounded-md border p-3 text-sm ${
                  values.role === value ? 'border-emerald-600 bg-emerald-50' : 'border-slate-300 hover:bg-slate-50'
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
                <span className="block font-semibold text-slate-800">{title}</span>
                <span className="text-slate-500">{description}</span>
              </label>
            ))}
          </div>
          {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
        </fieldset>

        <Input label="Nombre y apellido" name="name" autoComplete="name" value={values.name} onChange={handleChange} error={errors.name} />
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

        {isTecnico && (
          <Alert variant="info">Tu cuenta quedará pendiente hasta que un administrador la apruebe.</Alert>
        )}

        <Button type="submit" className="w-full">
          Crear cuenta
        </Button>
      </form>
    </AuthCard>
  )
}
