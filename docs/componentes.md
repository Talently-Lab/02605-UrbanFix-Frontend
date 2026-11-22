# Inventario de componentes — UrbanFix Frontend

Inventario de los componentes de interfaz del MVP (UF-W01-012). Basado en el alcance del Acta de Constitución v0.1 y en las definiciones votadas para el Test Plan. Se actualiza a medida que se implementan componentes o se validan los flujos y wireframes de UX/UI.

**Estado:** ✅ hecho · 🟡 parcial o placeholder · ⬜ pendiente

**Tipos:**

- **UI base:** piezas reutilizables sin lógica de negocio (botones, campos, alertas).
- **Pantalla:** una página asociada a una ruta (ver [Arquitectura de rutas](rutas.md)).
- **Bloque:** sección de una pantalla con lógica propia (listados, formularios, acciones).

## Resumen

| Sección                    | ✅  | 🟡  | ⬜  |
| -------------------------- | :-: | :-: | :-: |
| 1. Estructura y navegación |  8  |  0  |  0  |
| 2. UI base                 | 13  |  0  |  1  |
| 3. Autenticación           |  4  |  0  |  0  |
| 4. Solicitudes de servicio |  1  |  3  |  5  |
| 5. Panel y perfil          |  4  |  2  |  0  |
| 6. Panel de administración |  1  |  1  |  3  |

## 1. Estructura y navegación

| Componente       | Tipo     | Descripción                                                                                                                                                       | Ubicación                       | Estado                       |
| ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------------------------- |
| `AuthLayout`     | Layout   | Login y registro (Figma A1/A2): panel azul con foto recortada en forma de escudo y tarjeta destacada; en celular, panel chico (login) o barra con logo (registro) | `src/layouts/AuthLayout.jsx`    | ✅                           |
| `RootRedirect`   | Ruteo    | `/` lleva a `/login` o a `/panel` según la sesión                                                                                                                 | `src/router/RootRedirect.jsx`   | ✅                           |
| `AppLayout`      | Layout   | App autenticada (Figma C1/T1): escritorio con `Sidebar` y chip del usuario; celular con barra superior (isotipo + avatar) y `BottomNav`                           | `src/layouts/AppLayout.jsx`     | ✅                           |
| `Sidebar`        | Bloque   | Menú lateral de escritorio según rol (links en `src/router/navegacion.js`)                                                                                        | `src/components/Sidebar.jsx`    | ✅ menú del admin provisorio |
| `BottomNav`      | Bloque   | Navegación fija abajo en celular (Figma Navigation - mobile)                                                                                                      | `src/components/BottomNav.jsx`  | ✅                           |
| `UserMenu`       | Bloque   | Chip del usuario (Top-bar-user) con menú: Mi perfil y Cerrar sesión                                                                                               | `src/components/UserMenu.jsx`   | ✅                           |
| `ProtectedRoute` | Ruteo    | Bloquea rutas sin sesión, técnicos sin aprobar y roles sin permiso                                                                                                | `src/router/ProtectedRoute.jsx` | ✅                           |
| `NotFound`       | Pantalla | Página 404                                                                                                                                                        | `src/pages/NotFound.jsx`        | ✅                           |

## 2. UI base (reutilizables)

| Componente   | Descripción                                                                                            | Ubicación                          | Estado                        |
| ------------ | ------------------------------------------------------------------------------------------------------ | ---------------------------------- | ----------------------------- |
| `Button`     | Variantes `primary` / `secondary` / `danger`, estado deshabilitado y de carga (`loading`)              | `src/components/ui/Button.jsx`     | ✅                            |
| `FormField`  | Estructura común de los campos: etiqueta arriba y mensaje de error abajo                               | `src/components/ui/FormField.jsx`  | ✅                            |
| `Input`      | Campo con etiqueta y mensaje de error; en contraseñas, botón para mostrar u ocultar                    | `src/components/ui/Input.jsx`      | ✅                            |
| `Select`     | Lista desplegable con opciones `{ value, label }`                                                      | `src/components/ui/Select.jsx`     | ✅                            |
| `Textarea`   | Campo de texto largo (descripción de la solicitud)                                                     | `src/components/ui/Textarea.jsx`   | ✅                            |
| `Alert`      | Mensajes de error, éxito e información                                                                 | `src/components/ui/Alert.jsx`      | ✅                            |
| `Badge`      | Etiqueta de estado con variantes `neutral` / `success` / `warning` / `danger` / `info`                 | `src/components/ui/Badge.jsx`      | ✅                            |
| `Card`       | Contenedor para listados y resúmenes; la prop `as` define la etiqueta HTML (p. ej. `li`)               | `src/components/ui/Card.jsx`       | ✅ usado en `AdminTecnicos`   |
| `Spinner`    | Indicador de carga accesible (texto para lectores de pantalla)                                         | `src/components/ui/Spinner.jsx`    | ✅                            |
| `EmptyState` | Mensaje cuando no hay datos, con descripción y acción opcionales                                       | `src/components/ui/EmptyState.jsx` | ✅ usado en `AdminTecnicos`   |
| `Modal`      | Confirmaciones con `<dialog>` nativo: cierra con Escape o clic en el fondo y mantiene el foco          | `src/components/ui/Modal.jsx`      | ✅ usado al rechazar técnicos |
| `ButtonLink` | Link con aspecto de `Button`, para acciones que llevan a otra pantalla                                 | `src/components/ui/ButtonLink.jsx` | ✅ usado en los dashboards    |
| `Logo`       | Logo final de UX/UI con link; variantes `positivo`, `negativo` e `isotipo` (barra superior en celular) | `src/components/Logo.jsx`          | ✅                            |
| `Tabs`       | Pestañas con contador; hoy está dentro de `AdminTecnicos`, a extraer cuando se reutilice               | —                                  | ⬜                            |

## 3. Autenticación

| Componente         | Tipo     | Descripción                                                                                                                                                     | Ubicación                        | Estado                                                   |
| ------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------- |
| `Login`            | Pantalla | Figma A1: correo y contraseña, estado "Ingresando…"; ofrece guardar la contraseña en el navegador                                                               | `src/pages/Login.jsx`            | ✅ contra mock                                           |
| `Registro`         | Pantalla | Figma A2: tarjetas cliente/técnico, teléfono y barrio (cliente); especialidades en chips, matrículas de Gas y Electricidad y varios barrios (técnico); términos | `src/pages/Registro.jsx`         | ✅ contra mock (campos nuevos pendientes en el contrato) |
| `CuentaEnRevision` | Pantalla | Figma T0: estado de la revisión paso a paso y datos enviados; versión para cuenta rechazada                                                                     | `src/pages/CuentaEnRevision.jsx` | ✅                                                       |
| `AuthContext`      | Estado   | Sesión: login en dos pasos (token → datos del usuario), registro por rol y logout                                                                               | `src/context/AuthContext.jsx`    | ✅ simulado                                              |

## 4. Solicitudes de servicio

> Estados confirmados por Backend: Pendiente, Aceptada, En curso, Completada y Cancelada (D-014). Permisos por rol: D-025 a D-029 y D-031 a D-033. Los campos de la solicitud (RN-017) están pendientes.

| Componente         | Tipo     | Rol               | Descripción                                                      | Ubicación                                    | Estado         |
| ------------------ | -------- | ----------------- | ---------------------------------------------------------------- | -------------------------------------------- | -------------- |
| `Solicitudes`      | Pantalla | Cliente / Técnico | Cliente: sus solicitudes. Técnico: las que recibió               | `src/pages/solicitudes/Solicitudes.jsx`      | 🟡 placeholder |
| `NuevaSolicitud`   | Pantalla | Cliente           | Crear una solicitud                                              | `src/pages/solicitudes/NuevaSolicitud.jsx`   | 🟡 placeholder |
| `SolicitudDetalle` | Pantalla | Cliente / Técnico | Vista completa de una solicitud, su estado y acciones            | `src/pages/solicitudes/SolicitudDetalle.jsx` | 🟡 placeholder |
| `SolicitudForm`    | Bloque   | Cliente           | Tipo de servicio, descripción, dirección y fecha                 | —                                            | ⬜             |
| `TecnicoSelector`  | Bloque   | Cliente           | Elegir técnico: solo aprobados y sin trabajo activo (4A, 4B)     | —                                            | ⬜             |
| `SolicitudCard`    | Bloque   | Cliente / Técnico | Resumen de una solicitud en el listado                           | —                                            | ⬜             |
| `EstadoBadge`      | UI       | Todos             | Estado de la solicitud con los 5 estados del Figma (usa `Badge`) | `src/components/EstadoBadge.jsx`             | ✅             |
| `AccionesTecnico`  | Bloque   | Técnico           | Aceptar / rechazar; iniciar y completar solo el asignado (D-028) | —                                            | ⬜             |
| `AccionesCliente`  | Bloque   | Cliente           | Cancelar solo en Pendiente (D-025) / elegir otro técnico         | —                                            | ⬜             |

## 5. Panel y perfil

| Componente                                      | Tipo     | Rol     | Descripción                                                                                           | Ubicación                                  | Estado                     |
| ----------------------------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------ | -------------------------- |
| `Dashboard`                                     | Pantalla | Todos   | Elige el panel según el rol en `/panel` (UF-S4-046)                                                   | `src/pages/Dashboard.jsx`                  | ✅                         |
| `DashboardCliente`                              | Pantalla | Cliente | Figma C1 / C1b: bienvenida, oficios, resumen por estado, recientes y aviso; vacío con "Cómo funciona" | `src/pages/dashboard/DashboardCliente.jsx` | ✅ contra mock             |
| `DashboardTecnico`                              | Pantalla | Técnico | Figma T1: aviso de solicitudes para revisar, resumen, trabajo activo y lista para revisar             | `src/pages/dashboard/DashboardTecnico.jsx` | ✅ contra mock             |
| `DashboardAdmin`                                | Pantalla | Admin   | Técnicos pendientes, usuarios y solicitudes por estado                                                | `src/pages/dashboard/DashboardAdmin.jsx`   | 🟡 sin diseño (provisorio) |
| `OficioSelector` · `ResumenEstados` · `Seccion` | Bloque   | Todos   | Accesos por oficio, tarjetas por estado y contenedor de sección                                       | `src/components/dashboard/`                | ✅                         |
| `Perfil`                                        | Pantalla | Todos   | Ver y editar los datos propios                                                                        | `src/pages/Perfil.jsx`                     | 🟡 placeholder             |

## 6. Panel de administración

| Componente         | Tipo     | Descripción                                                                  | Ubicación                           | Estado         |
| ------------------ | -------- | ---------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| `AdminTecnicos`    | Pantalla | Aprobación de técnicos: pestañas por estado, aprobar / rechazar pendientes   | `src/pages/admin/AdminTecnicos.jsx` | ✅ contra mock |
| `Admin`            | Pantalla | Resumen del panel admin                                                      | `src/pages/Admin.jsx`               | 🟡 placeholder |
| `AdminUsuarios`    | Pantalla | Listado de usuarios por rol; suspender y reactivar cuentas (D-027)           | —                                   | ⬜             |
| `AdminSolicitudes` | Pantalla | Todas las solicitudes, solo con el barrio: sin dirección ni teléfono (D-032) | —                                   | ⬜             |
| `AdminStats`       | Bloque   | Indicadores básicos (cantidad de solicitudes y usuarios)                     | —                                   | ⬜             |

## 7. Soporte (no visuales)

| Elemento                    | Descripción                                                                                                              | Ubicación                            | Estado                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ | ----------------------- |
| Roles y estados del técnico | Valores del contrato (`CLIENT`, `TECHNICIAN`, `PENDING`…) y regla `necesitaAprobacion`                                   | `src/router/roles.js`                | ✅                      |
| Mensajes                    | Textos de error y confirmación, provisorios hasta tener los del Kit del cliente                                          | `src/constants/mensajes.js`          | 🟡 provisorio           |
| Validaciones                | Reglas de los formularios de login y registro                                                                            | `src/utils/validaciones.js`          | ✅                      |
| Servicio de solicitudes     | Listados del cliente, del técnico y del admin; mock con datos de ejemplo (`urbanfixMock.cargarEjemplos()` en la consola) | `src/services/solicitudesService.js` | ✅ contra mock          |
| Servicio de auth            | Login, registro y datos del usuario; usa el mock o la API según `VITE_USE_MOCK`                                          | `src/services/authService.js`        | ✅ contra mock          |
| Mock de autenticación       | Usuarios en `localStorage` con la forma de respuesta del contrato de la API                                              | `src/services/authMock.js`           | 🟡 temporal             |
| Cliente API                 | Axios: manda el JWT en cada pedido y ante un 401 cierra la sesión y va a `/login`                                        | `src/services/api.js`                | ✅ sin conectar todavía |
| Token de sesión             | Guardar, leer y borrar el JWT (lo usan `AuthContext` y el cliente API)                                                   | `src/services/tokenStorage.js`       | ✅                      |
| Variables de entorno        | `VITE_API_URL` y `VITE_USE_MOCK`: copiar `.env.example` como `.env`                                                      | `.env.example`                       | ✅                      |

## Cómo mantener este inventario

- Al crear un componente, agregalo en la sección que corresponde con su ubicación y estado.
- Si un componente se repite en dos pantallas, se mueve a `src/components/` y pasa a **UI base**.
- Al conectar con el backend, actualizar las filas marcadas "contra mock" o "simulado".
