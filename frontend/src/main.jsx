import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import Admin_local from '@pages/Admin_local';
import ProtectedRoute from '@components/ProtectedRoute';
import Homecaja from '@pages/HomeCaja';
import Orders from '@pages/Orders';
import '@styles/styles.css';
import Cocineria from './pages/Cocineria';

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
        path: '/orders',
        element: <Orders/>
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