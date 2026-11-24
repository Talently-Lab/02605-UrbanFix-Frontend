import { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import BarriosSelector from '../components/registro/BarriosSelector.jsx'
import EspecialidadesChips from '../components/registro/EspecialidadesChips.jsx'
import Alert from '../components/ui/Alert.jsx'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'
import { BARRIOS_CABA } from '../constants/barrios.js'
import { MATRICULAS } from '../constants/especialidades.js'
import { useAuth } from '../context/AuthContext.jsx'
import { ROLES } from '../router/roles.js'
import { guardarCredenciales } from '../utils/credenciales.js'
import { validarRegistro } from '../utils/validaciones.js'

const ROLE_OPTIONS = [
  { value: ROLES.CLIENTE, title: 'Soy cliente', description: 'Necesito un arreglo' },
  { value: ROLES.TECNICO, title: 'Soy técnico', description: 'Ofrezco mis servicios' },
]

// En el Figma arranca con "Soy cliente" elegido.
const INITIAL_VALUES = {
  role: ROLES.CLIENTE,
  name: '',
  email: '',
  phone: '',
  password: '',
  neighborhood: '',
  specialties: [],
  licenses: { ELECTRICITY: '', GAS: '' },
  neighborhoods: [],
  terms: false,
}

// Pasa los campos de error de la API (contrato, bloque 2 de errores) a los nombres del formulario.
function erroresDelFormulario(fieldErrors = {}) {
  const errores = {}
  for (const [campo, mensaje] of Object.entries(fieldErrors)) {
    if (campo === 'neighborhoodIds') errores.neighborhoods = mensaje
    else if (campo.startsWith('specialties')) errores.specialties = mensaje
    else errores[campo] = mensaje
  }
  return errores
}

// Figma A2 - Registro-cliente y A2 - Registro-técnico (y sus versiones mobile).
export default function Registro() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const barriosListId = useId()

  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const setValue = (name, value) => setValues({ ...values, [name]: value })
  const handleChange = (e) => setValue(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value)
  const handleLicense = (codigo) => (e) => setValue('licenses', { ...values.licenses, [codigo]: e.target.value })

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
      setErrors(erroresDelFormulario(err.fieldErrors))
    } finally {
      setSubmitting(false)
    }
  }

  const isTecnico = values.role === ROLES.TECNICO

  return (
    <div className="flex flex-col gap-4.5">
      <h1 className="text-h3 text-ink">Creá tu cuenta</h1>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4.5">
        {formError && <Alert variant="error">{formError}</Alert>}

        <fieldset>
          <legend className="sr-only">¿Cómo vas a usar UrbanFix?</legend>
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {ROLE_OPTIONS.map(({ value, title, description }) => {
              const elegido = values.role === value
              return (
                <label
                  key={value}
                  className={`flex cursor-pointer flex-col gap-1 rounded-[10px] p-4 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary lg:px-6 ${
                    elegido
                      ? 'border-2 border-primary bg-primary text-sobre-oscuro'
                      : 'border border-border bg-surface-100 text-ink hover:bg-surface-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={value}
                    checked={elegido}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-body font-semibold">{title}</span>
                  <span className={`text-body-sm ${elegido ? 'text-sobre-oscuro-2' : ''}`}>{description}</span>
                </label>
              )
            })}
          </div>
          {errors.role && <p className="mt-1.5 text-body-sm text-danger">{errors.role}</p>}
        </fieldset>

        <div className="flex flex-col gap-3">
          <Input
            label="Nombre y apellido"
            name="name"
            autoComplete="name"
            placeholder="Ej: Laura Martínez"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nombre@email.com"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Teléfono"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Ej.: 11 5555-0000"
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />

          {!isTecnico && (
            <>
              <Input
                label="Ubicación"
                name="neighborhood"
                list={barriosListId}
                autoComplete="off"
                placeholder="Barrio de CABA"
                value={values.neighborhood}
                onChange={handleChange}
                error={errors.neighborhood}
              />
              <datalist id={barriosListId}>
                {BARRIOS_CABA.map((barrio) => (
                  <option key={barrio} value={barrio} />
                ))}
              </datalist>
            </>
          )}
        </div>

        {isTecnico && (
          <>
            <EspecialidadesChips
              value={values.specialties}
              onChange={(specialties) => setValue('specialties', specialties)}
              error={errors.specialties}
            />
            {/* Matrícula obligatoria solo para las especialidades que la exigen (D-016). */}
            {Object.entries(MATRICULAS)
              .filter(([codigo]) => values.specialties.includes(codigo))
              .map(([codigo, label]) => (
                <Input
                  key={codigo}
                  label={label}
                  name={`license-${codigo}`}
                  placeholder="Ej.: 12.345"
                  value={values.licenses[codigo]}
                  onChange={handleLicense(codigo)}
                  error={errors[`license-${codigo}`]}
                />
              ))}
            <BarriosSelector
              value={values.neighborhoods}
              onChange={(neighborhoods) => setValue('neighborhoods', neighborhoods)}
              error={errors.neighborhoods}
            />
            <p className="text-[0.8125rem] leading-5 text-ink-muted">
              Tu cuenta queda pendiente hasta que el equipo de UrbanFix revise tus datos.
            </p>
          </>
        )}

        <div>
          <label className="flex cursor-pointer items-start gap-2.5 text-body-sm text-ink">
            <input
              type="checkbox"
              name="terms"
              checked={values.terms}
              onChange={handleChange}
              aria-invalid={Boolean(errors.terms)}
              aria-describedby={errors.terms ? 'terms-error' : undefined}
              className="mt-px h-4.5 w-4.5 shrink-0 cursor-pointer accent-primary"
            />
            <span>
              Acepto los <strong className="font-semibold">términos y condiciones</strong> y la{' '}
              <strong className="font-semibold">política de privacidad</strong>.
            </span>
          </label>
          {errors.terms && (
            <p id="terms-error" className="mt-1.5 text-body-sm text-danger">
              {errors.terms}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" loading={submitting}>
          Crear cuenta
        </Button>
      </form>

      <p className="flex flex-wrap justify-center gap-1.5 text-input text-ink-muted">
        ¿Ya tenés cuenta?
        <Link to="/login" className="font-semibold text-ink underline hover:text-primary">
          Iniciá sesión
        </Link>
      </p>
    </div>
  )
}
