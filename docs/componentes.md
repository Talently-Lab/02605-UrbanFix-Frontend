# Listado inicial de componentes — UrbanFix Frontend

Basado en el alcance del MVP del Acta de Constitución v0.1. Es una propuesta inicial: se ajustará cuando se validen los flujos de usuario y los wireframes de UX/UI.

Estado: ✅ hecho (placeholder) · ⬜ pendiente

## 1. Estructura y navegación

| Componente | Descripción | Estado |
|---|---|---|
| `PublicLayout` | Cabecera con logo y accesos a login/registro | ✅ |
| `AppLayout` | Cabecera de la app autenticada con menú según rol y botón de salir | ✅ |
| `ProtectedRoute` | Bloquea rutas sin sesión o sin el rol requerido | ✅ |
| `Navbar` responsive | Menú colapsable para móvil (hamburguesa) | ⬜ |
| `NotFound` | Página 404 | ✅ |

## 2. UI base (reutilizables)

| Componente | Descripción | Estado |
|---|---|---|
| `Button` | Variantes primario / secundario / peligro, estado de carga | ✅ (sin estado de carga) |
| `Input`, `Textarea`, `Select` | Campos de formulario con etiqueta y mensaje de error | ✅ `Input`, `Select` · ⬜ `Textarea` |
| `Card` | Contenedor para listados y resúmenes | ⬜ |
| `Badge` | Etiqueta de estado de la solicitud | ⬜ |
| `Modal` | Confirmaciones (p. ej. aceptar/rechazar trabajo) | ⬜ |
| `Spinner` / `Loader` | Indicador de carga | ⬜ |
| `EmptyState` | Mensaje cuando no hay datos | ⬜ |
| `Alert` / `Toast` | Mensajes de éxito y error | ✅ `Alert` · ⬜ `Toast` |

## 3. Autenticación (tres roles)

| Componente | Descripción | Estado |
|---|---|---|
| `LoginForm` | Email y contraseña con validaciones | ✅ (contra mock) |
| `RegisterForm` | Registro con selección de rol (cliente / técnico, sin Admin); el técnico carga especialidad y zona | ✅ (contra mock) |
| `CuentaEnRevision` | Pantalla para técnicos pendientes de aprobación o rechazados | ✅ |
| `AuthContext` | Sesión del usuario, login, registro y logout | ✅ (simulado) |

## 4. Solicitudes de servicio

| Componente | Rol | Descripción | Estado |
|---|---|---|---|
| `SolicitudForm` | Cliente | Crear solicitud (tipo de servicio, descripción, dirección, fecha) | ⬜ |
| `SolicitudesList` | Cliente / Técnico | Listado de solicitudes con filtros por estado | ⬜ |
| `SolicitudCard` | Cliente / Técnico | Resumen de una solicitud en el listado | ⬜ |
| `SolicitudDetalle` | Cliente / Técnico | Vista completa de una solicitud y su estado | ⬜ |
| `EstadoBadge` | Todos | Muestra el estado de la solicitud | ⬜ |
| `AccionesTecnico` | Técnico | Botones aceptar / rechazar trabajo | ⬜ |
| `AccionesCliente` | Cliente | Editar / cancelar solicitud | ⬜ |

> Los estados de una solicitud están pendientes de definir con el equipo (Acta, punto 11).

## 5. Panel y perfil

| Componente | Rol | Descripción | Estado |
|---|---|---|---|
| `Dashboard` | Todos | Resumen según rol | ✅ placeholder |
| `PerfilForm` | Todos | Ver y editar datos del usuario | ⬜ |

## 6. Panel de administración básico

| Componente | Descripción | Estado |
|---|---|---|
| `AdminUsuariosTable` | Listado de usuarios por rol | ⬜ |
| `AdminSolicitudesTable` | Listado general de solicitudes | ⬜ |
| `AdminStats` | Indicadores básicos (n.º de solicitudes, usuarios) | ⬜ |

## 7. Integración

| Elemento | Descripción | Estado |
|---|---|---|
| Cliente API (`services/api.js`) | Llamadas al backend con token | ⬜ (depende del backend) |
| Variables de entorno | `VITE_API_URL` | ⬜ |
