import { useState } from 'react'
import Alert from '../../components/ui/Alert.jsx'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import Modal from '../../components/ui/Modal.jsx'
import { getEspecialidadLabel } from '../../constants/especialidades.js'
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
  const [tecnicoARechazar, setTecnicoARechazar] = useState(null)

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

  const confirmarRechazo = () => {
    handleEstado(tecnicoARechazar, ESTADOS_TECNICO.RECHAZADO)
    setTecnicoARechazar(null)
  }

  const visibles = tecnicos.filter((t) => t.estado === tab)
  const count = (estado) => tecnicos.filter((t) => t.estado === estado).length

  return (
    <section className="mx-auto max-w-4xl p-6">
      <h1 className="text-h4 font-bold text-ink">Aprobación de técnicos</h1>
      <p className="mt-1 text-body-sm text-ink-muted">
        Revisá los datos de cada técnico antes de aprobarlo. Solo los técnicos aprobados pueden recibir solicitudes.
      </p>

      <div role="tablist" className="mt-6 flex gap-2 border-b border-border">
        {TABS.map(({ estado, label }) => (
          <button
            key={estado}
            role="tab"
            aria-selected={tab === estado}
            onClick={() => {
              setTab(estado)
              setFeedback(null)
            }}
            className={`-mb-px border-b-2 px-3 py-2 text-body-sm ${
              tab === estado
                ? 'border-primary font-semibold text-primary'
                : 'border-transparent text-ink-muted hover:text-ink'
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
        <EmptyState className="mt-6" title={EMPTY_MESSAGES[tab]} />
      ) : (
        <ul className="mt-4 space-y-3">
          {visibles.map((tecnico) => (
            <Card
              as="li"
              key={tecnico.id}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="text-body-sm">
                <p className="font-semibold text-ink">{tecnico.name}</p>
                <p className="text-ink-muted">{tecnico.email}</p>
                <p className="mt-1 text-ink-muted">
                  {getEspecialidadLabel(tecnico.especialidad)} · {tecnico.zona}
                </p>
              </div>
              {tab === ESTADOS_TECNICO.PENDIENTE && (
                <div className="flex gap-2">
                  <Button onClick={() => handleEstado(tecnico, ESTADOS_TECNICO.APROBADO)}>Aprobar</Button>
                  <Button variant="danger" onClick={() => setTecnicoARechazar(tecnico)}>
                    Rechazar
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </ul>
      )}
      <Modal
        open={tecnicoARechazar !== null}
        title="Rechazar técnico"
        onClose={() => setTecnicoARechazar(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setTecnicoARechazar(null)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmarRechazo}>
              Rechazar
            </Button>
          </>
        }
      >
        ¿Seguro que querés rechazar a {tecnicoARechazar?.name}? No va a poder recibir solicitudes.
      </Modal>
    </section>
  )
}
