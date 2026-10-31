# Inventario de componentes — UrbanFix Frontend

Inventario de los componentes de interfaz del MVP (UF-W01-012). Basado en el alcance del Acta de Constitución v0.1 y en las definiciones votadas para el Test Plan. Se actualiza a medida que se implementan componentes o se validan los flujos y wireframes de UX/UI.

**Estado:** ✅ hecho · 🟡 parcial o placeholder · ⬜ pendiente

**Tipos:**
- **UI base:** piezas reutilizables sin lógica de negocio (botones, campos, alertas).
- **Pantalla:** una página asociada a una ruta (ver [Arquitectura de rutas](rutas.md)).
- **Bloque:** sección de una pantalla con lógica propia (listados, formularios, acciones).

## Resumen

| Sección | ✅ | 🟡 | ⬜ |
|---|:-:|:-:|:-:|
| 1. Estructura y navegación | 5 | 0 | 1 |
| 2. UI base | 4 | 1 | 7 |
| 3. Autenticación | 4 | 0 | 0 |
| 4. Solicitudes de servicio | 0 | 3 | 6 |
| 5. Panel y perfil | 0 | 2 | 0 |
| 6. Panel de administración | 1 | 1 | 3 |

## 1. Estructura y navegación

| Componente | Tipo | Descripción | Ubicación | Estado |
|---|---|---|---|---|
| `PublicLayout` | Layout | Cabecera con logo y accesos a login/registro (o "Ir a mi cuenta" con sesión) | `src/layouts/PublicLayout.jsx` | ✅ |
| `AppLayout` | Layout | Cabecera de la app autenticada con menú según rol y botón de salir | `src/layouts/AppLayout.jsx` | ✅ |
| `ProtectedRoute` | Ruteo | Bloquea rutas sin sesión, técnicos sin aprobar y roles sin permiso | `src/router/ProtectedRoute.jsx` | ✅ |
| `NotFound` | Pantalla | Página 404 | `src/pages/NotFound.jsx` | ✅ |
| `Home` | Pantalla | Inicio público | `src/pages/Home.jsx` | ✅ placeholder |
| `Navbar` responsive | Bloque | Menú colapsable para celular (hamburguesa) | — | ⬜ |

## 2. UI base (reutilizables)

| Componente | Descripción | Ubicación | Estado |
|---|---|---|---|
| `Button` | Variantes `primary` / `secondary` / `danger` y estado deshabilitado | `src/components/ui/Button.jsx` | ✅ |
| `Input` | Campo con etiqueta y mensaje de error; en contraseñas, botón para mostrar u ocultar | `src/components/ui/Input.jsx` | ✅ |
| `Select` | Lista desplegable con etiqueta y mensaje de error | `src/components/ui/Select.jsx` | ✅ |
| `Alert` | Mensajes de error, éxito e información | `src/components/ui/Alert.jsx` | ✅ |
| `AuthCard` | Contenedor de las pantallas de login, registro y cuenta en revisión | `src/components/AuthCard.jsx` | 🟡 específico de autenticación |
| `Textarea` | Campo de texto largo (descripción de la solicitud) | — | ⬜ |
| `Tabs` | Pestañas con contador; hoy está dentro de `AdminTecnicos`, a extraer cuando se reutilice | — | ⬜ |
| `Card` | Contenedor para listados y resúmenes | — | ⬜ |
| `Badge` | Etiqueta de estado (solicitud, técnico) | — | ⬜ |
| `Modal` | Confirmaciones (p. ej. rechazar o cancelar) | — | ⬜ |
| `Spinner` | Indicador de carga (cuando haya llamadas al backend) | — | ⬜ |
| `EmptyState` | Mensaje cuando no hay datos; hoy resuelto dentro de `AdminTecnicos` | — | ⬜ |

## 3. Autenticación

| Componente | Tipo | Descripción | Ubicación | Estado |
|---|---|---|---|---|
| `Login` | Pantalla | Email y contraseña con validaciones; ofrece guardar la contraseña en el navegador | `src/pages/Login.jsx` | ✅ contra mock |
| `Registro` | Pantalla | Elección de rol cliente o técnico (sin Admin); el técnico carga especialidad y zona | `src/pages/Registro.jsx` | ✅ contra mock |
| `CuentaEnRevision` | Pantalla | Única pantalla para técnicos pendientes de aprobación o rechazados | `src/pages/CuentaEnRevision.jsx` | ✅ |
| `AuthContext` | Estado | Sesión del usuario: login, registro y logout | `src/context/AuthContext.jsx` | ✅ simulado |

## 4. Solicitudes de servicio

> Dependen de la definición de los estados de la solicitud, todavía pendiente de validar con el equipo.

| Componente | Tipo | Rol | Descripción | Ubicación | Estado |
|---|---|---|---|---|---|
| `Solicitudes` | Pantalla | Cliente / Técnico | Cliente: sus solicitudes. Técnico: las que recibió | `src/pages/solicitudes/Solicitudes.jsx` | 🟡 placeholder |
| `NuevaSolicitud` | Pantalla | Cliente | Crear una solicitud | `src/pages/solicitudes/NuevaSolicitud.jsx` | 🟡 placeholder |
| `SolicitudDetalle` | Pantalla | Cliente / Técnico | Vista completa de una solicitud, su estado y acciones | `src/pages/solicitudes/SolicitudDetalle.jsx` | 🟡 placeholder |
| `SolicitudForm` | Bloque | Cliente | Tipo de servicio, descripción, dirección y fecha | — | ⬜ |
| `TecnicoSelector` | Bloque | Cliente | Elegir técnico: solo aprobados y sin trabajo activo (4A, 4B) | — | ⬜ |
| `SolicitudCard` | Bloque | Cliente / Técnico | Resumen de una solicitud en el listado | — | ⬜ |
| `EstadoBadge` | UI | Todos | Estado de la solicitud (usa `Badge`) | — | ⬜ |
| `AccionesTecnico` | Bloque | Técnico | Aceptar / rechazar / finalizar | — | ⬜ |
| `AccionesCliente` | Bloque | Cliente | Cancelar / elegir otro técnico | — | ⬜ |

## 5. Panel y perfil

| Componente | Tipo | Rol | Descripción | Ubicación | Estado |
|---|---|---|---|---|---|
| `Dashboard` | Pantalla | Todos | Resumen y accesos según el rol | `src/pages/Dashboard.jsx` | 🟡 placeholder |
| `Perfil` | Pantalla | Todos | Ver y editar los datos propios | `src/pages/Perfil.jsx` | 🟡 placeholder |

## 6. Panel de administración

| Componente | Tipo | Descripción | Ubicación | Estado |
|---|---|---|---|---|
| `AdminTecnicos` | Pantalla | Aprobación de técnicos: pestañas por estado, aprobar / rechazar pendientes | `src/pages/admin/AdminTecnicos.jsx` | ✅ contra mock |
| `Admin` | Pantalla | Resumen del panel admin | `src/pages/Admin.jsx` | 🟡 placeholder |
| `AdminUsuarios` | Pantalla | Listado de usuarios por rol | — | ⬜ |
| `AdminSolicitudes` | Pantalla | Listado general de solicitudes | — | ⬜ |
| `AdminStats` | Bloque | Indicadores básicos (cantidad de solicitudes y usuarios) | — | ⬜ |

## 7. Soporte (no visuales)

| Elemento | Descripción | Ubicación | Estado |
|---|---|---|---|
| Roles y estados del técnico | Constantes y regla `necesitaAprobacion` | `src/router/roles.js` | ✅ |
| Mensajes | Textos de error y confirmación, provisorios hasta tener los del Kit del cliente | `src/constants/mensajes.js` | 🟡 provisorio |
| Validaciones | Reglas de los formularios de login y registro | `src/utils/validaciones.js` | ✅ |
| Mock de autenticación | Usuarios en `localStorage` mientras no hay backend | `src/services/authMock.js` | 🟡 temporal |
| Cliente API | Llamadas al backend con token | `src/services/api.js` | ⬜ depende del backend |
| Variables de entorno | `VITE_API_URL` | `.env` | ⬜ |

## Cómo mantener este inventario

- Al crear un componente, agregalo en la sección que corresponde con su ubicación y estado.
- Si un componente se repite en dos pantallas, se mueve a `src/components/` y pasa a **UI base**.
- Al conectar con el backend, actualizar las filas marcadas "contra mock" o "simulado".
