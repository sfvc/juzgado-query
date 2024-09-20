import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import { Departamento, Pais, Provincia } from '../modules/parametros/localizacion/pages'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
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
    ]
  },
])

export default router