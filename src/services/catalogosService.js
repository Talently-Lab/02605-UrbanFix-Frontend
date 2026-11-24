import { BARRIOS_CABA } from '../constants/barrios.js'
import { api } from './api.js'
import { request, USE_MOCK } from './request.js'

// Simula GET /barrios con ids fijos, para que el registro y los datos guardados en el mock no cambien.
const idDeEjemplo = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, '0')}`
export const BARRIOS_MOCK = BARRIOS_CABA.map((name, i) => ({ id: idDeEjemplo(i + 1), name }))

// Contrato, bloque 7: [{ id, name }]. Los ids se usan en el registro del técnico, la búsqueda y las solicitudes.
export const getBarrios = () => (USE_MOCK ? Promise.resolve(BARRIOS_MOCK) : request(() => api.get('/barrios')))
