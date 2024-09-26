import { Navigate } from 'react-router-dom'
import { Login } from '../auth'

export const PublicRoute = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/*',
    element: <Navigate to='/login' />
  }
]