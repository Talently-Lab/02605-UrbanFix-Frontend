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
| `/panel`, `/perfil` | Cualquier usuario autenticado |
| `/solicitudes`, `/solicitudes/:id` | Cliente y técnico |
| `/solicitudes/nueva` | Cliente |
| `/admin` | Administrador |

Las rutas y sus permisos se definen en `src/router/index.jsx`; los roles, en `src/router/roles.js`.

> **Sesión simulada:** mientras no exista el backend, `/login` permite entrar como cliente, técnico o administrador con un clic. La sesión se guarda en `localStorage` (`src/context/AuthContext.jsx`) y se reemplazará por la autenticación real.

## Estructura

```
src/
├── components/   Componentes reutilizables
├── context/      Estado global (sesión)
├── layouts/      Layout público y layout de la app autenticada
├── pages/        Una carpeta/archivo por pantalla
└── router/       Rutas, protección por rol y roles
```

## Documentación

- [Listado inicial de componentes](docs/componentes.md)
