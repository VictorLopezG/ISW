import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import Home_admin from '@pages/Home_Admin';
import Admin_local from '@pages/Admin_local';
import Admin_mesas from '@pages/Admin_mesas';
import ProtectedRoute from '@components/ProtectedRoute';
import Homecaja from '@pages/HomeCaja';
import '@styles/styles.css';
import Cocineria from './pages/Cocineria';
import Pedidos from '@pages/Pedidos';
import CajaCobro from '@pages/CajaCobro';
import Menu from './pages/Menu';
import GestionarPedidos from './pages/GestionarPedidos';
import RankingPage from './pages/RankingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/ranking',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'administrador_local']}>
            <RankingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/cocineria',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'administrador_local', 'cocinero']}>
            <Cocineria />
          </ProtectedRoute>
        ),
      },
      {
        path: '/menu',
        element: <Menu />
      },
      {
        path: '/pedidos',
        element: <Pedidos />
      },
      {
        path: '/homecaja',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'administrador_local', 'cajero']}>
            <Homecaja />
          </ProtectedRoute>
        ),
      },
      {
        path: '/users',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin_local',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'administrador_local', 'cocinero']}>
            <Admin_local />
          </ProtectedRoute>
        ),
      },
      {
        path: '/home_admin',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'administrador_local']}>
            <Home_admin />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin_mesas',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'administrador_local']}>
            <Admin_mesas />
          </ProtectedRoute>
        ),
      },
      {
        path: '/CajaCobro',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'administrador_local', 'cajero', 'mesero']}>
            <CajaCobro />
          </ProtectedRoute>
        ),
      },
      {
        path: '/gestionarPedidos',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'administrador_local']}>
            <GestionarPedidos />
          </ProtectedRoute>)
      },
      {

        path: '/register',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'administrador_local']}>
            <Register />
          </ProtectedRoute>)
      }
    ]
  },
  {
    path: '/auth',
    element: <Login />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)