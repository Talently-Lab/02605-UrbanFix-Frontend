# Arquitectura de rutas — UrbanFix Frontend

Propuesta para revisión del equipo (UF-W01-011). Basada en el alcance del MVP y en las definiciones votadas para el Test Plan (Admin creado por el sistema, técnico con aprobación, un rol por email, un trabajo activo por técnico).

Estado: ✅ implementada (placeholder o funcional) · 🆕 propuesta, todavía no implementada

## 1. Resumen

La app tiene dos zonas:

- **Pública:** cualquiera puede entrar, con o sin sesión.
- **Privada:** requiere sesión. Dentro, cada ruta indica qué roles pueden verla.

Hay tres roles: **cliente**, **técnico** y **administrador**. Cada usuario tiene uno solo.

## 2. Rutas públicas

| Ruta | Pantalla | Propósito | Estado |
|---|---|---|---|
| `/` | Inicio | Presentación de UrbanFix y accesos a registrarse o iniciar sesión | ✅ placeholder |
| `/login` | Iniciar sesión | Email y contraseña, igual para los tres roles | ✅ |
| `/registro` | Crear cuenta | Registro como cliente o técnico. **No existe registro de Admin** | ✅ |
| `/cuenta-en-revision` | Cuenta en revisión | Única pantalla que ve un técnico pendiente de aprobación o rechazado | ✅ |
| `*` | Página no encontrada | Cualquier ruta inexistente | ✅ |

## 3. Rutas privadas

| Ruta | Pantalla | Cliente | Técnico | Admin | Propósito | Estado |
|---|---|:-:|:-:|:-:|---|---|
| `/panel` | Panel | ✔ | ✔ | ✔ | Pantalla de inicio después del login; el contenido cambia según el rol | ✅ placeholder |
| `/perfil` | Mi perfil | ✔ | ✔ | ✔ | Ver y editar los datos propios | ✅ placeholder |
| `/solicitudes` | Solicitudes | ✔ | ✔ | | Cliente: sus solicitudes. Técnico: las solicitudes que recibió | ✅ placeholder |
| `/solicitudes/nueva` | Nueva solicitud | ✔ | | | Crear una solicitud y elegir un técnico disponible | ✅ placeholder |
| `/solicitudes/:id` | Detalle de solicitud | ✔ | ✔ | | Ver una solicitud, su estado y las acciones posibles (aceptar, rechazar, cancelar, finalizar) | ✅ placeholder |
| `/admin` | Administración | | | ✔ | Resumen del panel admin | ✅ placeholder |
| `/admin/tecnicos` | Aprobación de técnicos | | | ✔ | Listado de técnicos pendientes para aprobar o rechazar; desactivar técnicos | 🆕 |
| `/admin/usuarios` | Usuarios | | | ✔ | Listado de usuarios por rol | 🆕 |
| `/admin/solicitudes` | Solicitudes (admin) | | | ✔ | Listado general de todas las solicitudes | 🆕 |

## 4. Reglas de acceso y redirecciones

Se aplican en este orden cada vez que se entra a una ruta privada:

1. **Sin sesión** → redirige a `/login`. Después de iniciar sesión, vuelve a la ruta a la que quería entrar.
2. **Técnico pendiente o rechazado** → redirige a `/cuenta-en-revision`. No puede ver ninguna otra pantalla privada hasta que el Admin lo apruebe.
3. **Rol sin permiso** para esa ruta (por ejemplo, un técnico que entra a `/solicitudes/nueva`) → redirige a `/panel`.

Otras reglas:

- Después del **registro**: el cliente va a `/panel`; el técnico va a `/cuenta-en-revision`.
- Un usuario que **no** es un técnico pendiente y entra a `/cuenta-en-revision` → redirige a `/panel`.
- El menú de la app muestra solo los enlaces que el rol del usuario puede ver.

```
Entra a una ruta privada
        │
        ├─ ¿Tiene sesión? ── No ──► /login
        │
        ├─ ¿Es técnico sin aprobar? ── Sí ──► /cuenta-en-revision
        │
        ├─ ¿Su rol tiene permiso? ── No ──► /panel
        │
        └─ Muestra la pantalla
```

> **Importante:** estas reglas solo ocultan pantallas. La protección real de los datos la tiene que hacer el backend, validando el rol en cada endpoint.

## 5. Decisiones de diseño

- **Un solo `/panel` para todos los roles**, con contenido distinto según el rol, en lugar de `/cliente/...`, `/tecnico/...`, `/admin/...`. Las rutas quedan más cortas y las pantallas compartidas (solicitudes, perfil) no se duplican.
- **`/solicitudes` compartida entre cliente y técnico.** Es la misma pantalla con datos y acciones distintos: el cliente ve las que creó y el técnico las que recibió.
- **No hay una ruta de "técnicos disponibles".** El cliente elige al técnico dentro de `/solicitudes/nueva`, y ahí solo se listan los técnicos aprobados y sin trabajo activo (definición 4B.B).
- **El Admin usa el mismo `/login`** que el resto; no tiene registro propio (definición 1A).

## 6. Puntos a validar con el equipo

- Si el flujo de estados de las solicitudes cambia (por ejemplo, si la solicitud queda abierta para que la tome cualquier técnico en lugar de elegirlo el cliente), `/solicitudes/nueva` y `/solicitudes/:id` se ajustan.
- Si se agrega un interruptor manual de disponibilidad para el técnico, iría dentro de `/perfil`.
- Las rutas de administración marcadas como 🆕 dependen de lo que se defina para el panel admin básico.

## 7. Dónde está en el código

- Rutas y permisos: `src/router/index.jsx`
- Protección de rutas: `src/router/ProtectedRoute.jsx`
- Roles y estados del técnico: `src/router/roles.js`
- Menú según rol: `src/layouts/AppLayout.jsx`
