import { createBrowserRouter } from 'react-router'
import AppLayout from '../layouts/AppLayout.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'
import Admin from '../pages/Admin.jsx'
import AdminTecnicos from '../pages/admin/AdminTecnicos.jsx'
import CuentaEnRevision from '../pages/CuentaEnRevision.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Login from '../pages/Login.jsx'
import NotFound from '../pages/NotFound.jsx'
import Perfil from '../pages/Perfil.jsx'
import Registro from '../pages/Registro.jsx'
import NuevaSolicitud from '../pages/solicitudes/NuevaSolicitud.jsx'
import SolicitudDetalle from '../pages/solicitudes/SolicitudDetalle.jsx'
import Solicitudes from '../pages/solicitudes/Solicitudes.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import RootRedirect from './RootRedirect.jsx'
import { ROLES } from './roles.js'

export const router = createBrowserRouter([
  { path: '/', element: <RootRedirect /> },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/registro', element: <Registro /> },
      // Requiere sesión, pero solo para técnicos sin aprobar: la propia página redirige al resto.
      { path: '/cuenta-en-revision', element: <CuentaEnRevision /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/panel', element: <Dashboard /> },
          { path: '/perfil', element: <Perfil /> },
          {
            element: <ProtectedRoute roles={[ROLES.CLIENTE, ROLES.TECNICO]} />,
            children: [
              { path: '/solicitudes', element: <Solicitudes /> },
              { path: '/solicitudes/:id', element: <SolicitudDetalle /> },
            ],
          },
          {
            element: <ProtectedRoute roles={[ROLES.CLIENTE]} />,
            children: [{ path: '/solicitudes/nueva', element: <NuevaSolicitud /> }],
          },
          {
            element: <ProtectedRoute roles={[ROLES.ADMIN]} />,
            children: [
              { path: '/admin', element: <Admin /> },
              { path: '/admin/tecnicos', element: <AdminTecnicos /> },
            ],
          },
        ],
      },
    ],
  },
  { path: '*', element: <NotFound /> },
])
