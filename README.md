# UrbanFix — Frontend

Plataforma web que conecta a clientes que necesitan servicios técnicos con técnicos independientes. Proyecto del equipo O2605 (Talently Lab).

**Stack:** React + JavaScript, Vite, Tailwind CSS v4, React Router. Despliegue previsto en Vercel.

## Requisitos

- Node.js 20.19 o superior (recomendado: 22 LTS o 24)
- npm

## Puesta en marcha

```bash
git clone <url-del-repo>
cd urban-fix
npm install
npm run dev
```

La app queda en http://localhost:5173.

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build localmente |
| `npm run lint` | Linter (oxlint) |

## Rutas

| Ruta | Acceso |
|---|---|
| `/`, `/login`, `/registro` | Público |
| `/cuenta-en-revision` | Técnico pendiente de aprobación o rechazado |
| `/panel`, `/perfil` | Cualquier usuario autenticado |
| `/solicitudes`, `/solicitudes/:id` | Cliente y técnico |
| `/solicitudes/nueva` | Cliente |
| `/admin`, `/admin/tecnicos` | Administrador |

Las rutas y sus permisos se definen en `src/router/index.jsx`; los roles, en `src/router/roles.js`.

> **Autenticación simulada:** mientras no exista el backend, los usuarios se guardan en `localStorage` (`src/services/authMock.js`) y se reemplazará por la API real.
>
> - Registro en `/registro` como cliente o técnico (no hay registro de Admin). Los técnicos quedan **pendientes de aprobación** y solo ven `/cuenta-en-revision` hasta que el Admin los apruebe en `/admin/tecnicos`.
> - Admin de prueba (simula el seed del backend): `admin@urbanfix.com` / `admin1234`.
> - Los textos de error están en `src/constants/mensajes.js` y son provisorios hasta tener los del Kit del cliente.

## Estructura

```
src/
├── components/   Componentes reutilizables (ui/: Button, Input, Select, Alert)
├── constants/    Textos de mensajes y catálogos
├── context/      Estado global (sesión)
├── layouts/      Layout público y layout de la app autenticada
├── pages/        Una carpeta/archivo por pantalla
├── router/       Rutas, protección por rol y roles
├── services/     Acceso a datos (hoy: mock en localStorage)
└── utils/        Validaciones de formularios
```

## Documentación

- [Listado inicial de componentes](docs/componentes.md)
- [Arquitectura de rutas](docs/rutas.md)
