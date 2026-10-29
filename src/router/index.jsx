import { createBrowserRouter } from 'react-router'
import AppLayout from '../layouts/AppLayout.jsx'
import PublicLayout from '../layouts/PublicLayout.jsx'
import Admin from '../pages/Admin.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import NotFound from '../pages/NotFound.jsx'
import Perfil from '../pages/Perfil.jsx'
import Registro from '../pages/Registro.jsx'
import NuevaSolicitud from '../pages/solicitudes/NuevaSolicitud.jsx'
import SolicitudDetalle from '../pages/solicitudes/SolicitudDetalle.jsx'
import Solicitudes from '../pages/solicitudes/Solicitudes.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import { ROLES } from './roles.js'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/registro', element: <Registro /> },
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
            children: [{ path: '/admin', element: <Admin /> }],
          },
        ],
      },
    ],
  },
  { path: '*', element: <NotFound /> },
])
