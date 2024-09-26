import { Barrio, Departamento, Localidad, Pais, Provincia } from '../modules/parametros/localizacion/pages'
import Layout from '../layout/Layout'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/paises' />
      },
      {
        path: '/paises',
        element: <Pais />
      },
  
      {
        path: '/provincias',
        element: <Provincia />
      },
  
      {
        path: '/departamentos',
        element: <Departamento />
      },
  
      {
        path: '/localidades',
        element: <Localidad />
      },
  
      {
        path: '/barrios',
        element: <Barrio />
      },
    ]
  }
]