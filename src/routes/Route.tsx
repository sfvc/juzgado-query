import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import Pais from '../modules/parametros/localizacion/pages/Pais'
import Provincia from '../modules/parametros/localizacion/pages/Provincia'

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
    ]
  },
])

export default router