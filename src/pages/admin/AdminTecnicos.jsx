import { useState } from 'react'
import Alert from '../../components/ui/Alert.jsx'
import Button from '../../components/ui/Button.jsx'
import { MENSAJES } from '../../constants/mensajes.js'
import { ESTADOS_TECNICO } from '../../router/roles.js'
import { listTecnicos, setEstadoTecnico } from '../../services/authMock.js'

const TABS = [
  { estado: ESTADOS_TECNICO.PENDIENTE, label: 'Pendientes' },
  { estado: ESTADOS_TECNICO.APROBADO, label: 'Aprobados' },
  { estado: ESTADOS_TECNICO.RECHAZADO, label: 'Rechazados' },
]

const EMPTY_MESSAGES = {
  [ESTADOS_TECNICO.PENDIENTE]: 'No hay técnicos pendientes de aprobación.',
  [ESTADOS_TECNICO.APROBADO]: 'Todavía no hay técnicos aprobados.',
  [ESTADOS_TECNICO.RECHAZADO]: 'No hay técnicos rechazados.',
}

export default function AdminTecnicos() {
  const [tecnicos, setTecnicos] = useState(listTecnicos)
  const [tab, setTab] = useState(ESTADOS_TECNICO.PENDIENTE)
  const [feedback, setFeedback] = useState(null)

  const handleEstado = (tecnico, estado) => {
    try {
      setEstadoTecnico(tecnico.id, estado)
      setTecnicos(listTecnicos())
      const message = estado === ESTADOS_TECNICO.APROBADO ? MENSAJES.tecnicoAprobado : MENSAJES.tecnicoRechazado
      setFeedback({ variant: 'success', text: message(tecnico.name) })
    } catch (err) {
      setFeedback({ variant: 'error', text: err.message })
    }
  }

  const visibles = tecnicos.filter((t) => t.estado === tab)
  const count = (estado) => tecnicos.filter((t) => t.estado === estado).length

  return (
    <section className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold text-slate-800">Aprobación de técnicos</h1>
      <p className="mt-1 text-sm text-slate-500">
        Revisá los datos de cada técnico antes de aprobarlo. Solo los técnicos aprobados pueden recibir solicitudes.
      </p>

      <div role="tablist" className="mt-6 flex gap-2 border-b border-slate-200">
        {TABS.map(({ estado, label }) => (
          <button
            key={estado}
            role="tab"
            aria-selected={tab === estado}
            onClick={() => {
              setTab(estado)
              setFeedback(null)
            }}
            className={`-mb-px border-b-2 px-3 py-2 text-sm ${
              tab === estado
                ? 'border-emerald-600 font-semibold text-emerald-700'
                : 'border-transparent text-slate-600 hover:text-slate-800'
            }`}
          >
            {label} ({count(estado)})
          </button>
        ))}
      </div>

      {feedback && (
        <div className="mt-4">
          <Alert variant={feedback.variant}>{feedback.text}</Alert>
        </div>
      )}

      {visibles.length === 0 ? (
        <p className="mt-6 rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          {EMPTY_MESSAGES[tab]}
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {visibles.map((tecnico) => (
            <li
              key={tecnico.id}
              className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="text-sm">
                <p className="font-semibold text-slate-800">{tecnico.name}</p>
                <p className="text-slate-500">{tecnico.email}</p>
                <p className="mt-1 text-slate-600">
                  {tecnico.especialidad} · {tecnico.zona}
                </p>
              </div>
              {tab === ESTADOS_TECNICO.PENDIENTE && (
                <div className="flex gap-2">
                  <Button onClick={() => handleEstado(tecnico, ESTADOS_TECNICO.APROBADO)}>Aprobar</Button>
                  <Button variant="danger" onClick={() => handleEstado(tecnico, ESTADOS_TECNICO.RECHAZADO)}>
                    Rechazar
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
