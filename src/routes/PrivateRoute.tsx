import { Navigate } from 'react-router-dom'
import Layout from '../layout/Layout'
import { Barrio, Departamento, Localidad, Pais, Provincia } from '../modules/parametros/localizacion/pages'
import { Articulo, Estado, Propiedad, Rubro } from '../modules/parametros/actas'

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

      {
        path: '/articulos',
        element: <Articulo />
      },

      {
        path: '/propiedades',
        element: <Propiedad />
      },

      {
        path: '/rubros',
        element: <Rubro />
      },

      {
        path: '/estados',
        element: <Estado />
      },
    ]
  }
]