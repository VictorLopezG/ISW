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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <Error404/>,
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/cocineria',
        element: <Cocineria/>
      },
      {
        path: '/menu',
        element: <Menu/>
      },
      {
        path: '/pedidos',
        element: <Pedidos/>
      },
      {
        path: '/homecaja',
        element: <Homecaja/>
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
        <ProtectedRoute allowedRoles={['administrador','administrador_local']}>
          <Admin_local/>
        </ProtectedRoute>
        ),
      },
      {
        path: '/home_admin',
        element: (
        <ProtectedRoute allowedRoles={['administrador','administrador_local']}>
          <Home_admin/>
        </ProtectedRoute>
        ),
      },
      {
        path: '/admin_mesas',
        element: (
        <ProtectedRoute allowedRoles={['administrador','administrador_local']}>
          <Admin_mesas/>
        </ProtectedRoute>
        ),
      },
      {
        path: '/CajaCobro',
        element: <CajaCobro/>
      },
      {
        path: '/gestionarPedidos',
        element: <GestionarPedidos/>
      }
    ]
  },
  {
    path: '/auth',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)