# UrbanFix — Frontend

Plataforma web que conecta a clientes que necesitan servicios técnicos con técnicos independientes. Proyecto del equipo O2605 (Talently Lab).

**Stack:** React + JavaScript, Vite, Tailwind CSS v4, React Router. Despliegue previsto en Vercel.

## Requisitos

- Node.js 20.19 o superior (recomendado: 22 LTS o 24)
- npm

## Puesta en marcha

```bash
git clone https://github.com/Talently-Lab/02605-UrbanFix-Frontend.git
cd 02605-UrbanFix-Frontend
npm install
cp .env.example .env   # en Windows: copy .env.example .env
npm run dev
```

La app queda en http://localhost:5173.

### Variables de entorno

| Variable        | Qué hace                                                                       |
| --------------- | ------------------------------------------------------------------------------ |
| `VITE_API_URL`  | URL base de la API del backend                                                 |
| `VITE_USE_MOCK` | `true` o sin definir: usa datos simulados. `false`: se conecta con la API real |

Sin `.env`, la app funciona igual con los datos simulados.

### Scripts

| Script                 | Qué hace                                 |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Servidor de desarrollo                   |
| `npm run build`        | Build de producción en `dist/`           |
| `npm run preview`      | Sirve el build localmente                |
| `npm run lint`         | Linter (oxlint)                          |
| `npm run format`       | Formatea el código con Prettier          |
| `npm run format:check` | Revisa el formato sin modificar archivos |

## Rutas

| Ruta                               | Acceso                                      |
| ---------------------------------- | ------------------------------------------- |
| `/`                                | Redirige a `/login` o a `/panel`            |
| `/login`, `/registro`              | Público                                     |
| `/cuenta-en-revision`              | Técnico pendiente de aprobación o rechazado |
| `/panel`, `/perfil`                | Cualquier usuario autenticado               |
| `/solicitudes`, `/solicitudes/:id` | Cliente y técnico                           |
| `/solicitudes/nueva`               | Cliente                                     |
| `/admin`, `/admin/tecnicos`        | Administrador                               |

Las rutas y sus permisos se definen en `src/router/index.jsx`; los roles, en `src/router/roles.js`.

## Conexión con el backend

Todas las llamadas pasan por servicios en `src/services/`; las pantallas no saben si hablan con la API o con el mock.

- `api.js`: cliente de Axios. Manda el token (`Authorization: Bearer`) en cada pedido y, ante un 401, cierra la sesión y lleva a `/login`.
- `authService.js`: login, registro y datos del usuario. Usa el mock o la API según `VITE_USE_MOCK`.
- `authMock.js`: backend simulado en `localStorage`, con la misma forma de respuesta que el contrato de la API.

Los valores de roles (`CLIENT`, `TECHNICIAN`, `ADMIN`) y estados siguen el contrato de Backend; los textos en pantalla están en español.

> **Datos de prueba (mock):**
>
> - Registro en `/registro` como cliente o técnico (no hay registro de Admin). Los técnicos quedan **pendientes de aprobación** y solo ven `/cuenta-en-revision` hasta que el Admin los apruebe en `/admin/tecnicos`.
> - Admin de prueba (simula el seed del backend): `admin@urbanfix.com` / `admin1234`.
> - Para empezar de cero, borrar `urbanfix:users-v2` y `urbanfix:token` en DevTools → Application → Local Storage.
> - Los textos de error están en `src/constants/mensajes.js` y son provisorios hasta tener los del Kit del cliente.

## Design system

Los estilos salen del Figma del equipo (Variables y Estilos de texto) y están definidos como design tokens en `src/index.css`:

- **Colores:** primitivos (`--azul-700`, `--gris-300`…) y semánticos, que son los únicos que usan los componentes: `bg-primary`, `text-ink`, `text-ink-muted`, `border-border`, `bg-surface-50`, `bg-warning-subtle`, etc. La paleta por defecto de Tailwind está desactivada.
- **Tipografía:** IBM Plex Sans, con las clases `text-h1` … `text-h5`, `text-body`, `text-body-sm`, `text-button`, `text-label`, `text-input` y `text-caption`.
- **Radios:** `rounded-sm` (8px), `rounded-md` (12px), `rounded-lg` (16px) y `rounded-full`.
- **Espaciados:** coinciden con la escala de Tailwind (`p-4` = 16px).

El formato del código lo aplica Prettier (`npm run format`); conviene instalar la extensión recomendada de VS Code.

## Estructura

```
src/
├── assets/       Imágenes y logo
├── components/   Componentes con lógica propia (Sidebar, Logo, EstadoBadge)
│   └── ui/       Componentes base del design system (Button, Input, Badge, Card, Modal…)
├── constants/    Textos de mensajes y catálogos (especialidades, estados)
├── context/      Estado global (sesión)
├── layouts/      Layout de acceso (login/registro) y de la app autenticada
├── pages/        Una carpeta/archivo por pantalla
├── router/       Rutas, protección por rol y roles
├── services/     Acceso a datos: cliente de API, servicios y mocks
└── utils/        Validaciones de formularios
```

## Documentación

- [Inventario de componentes](docs/componentes.md)
- [Arquitectura de rutas](docs/rutas.md)
