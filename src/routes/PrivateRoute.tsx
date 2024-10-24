import { Navigate } from 'react-router-dom'
import { Layout } from '../layout'
import { Barrio, Departamento, Localidad, Pais, Provincia } from '../modules/parametros/localizacion/pages'
import { Articulo, Estado, Propiedad, Rubro } from '../modules/parametros/actas'
import { Juzgado, Usuario } from '../modules/parametros/globales'
import { Vehiculo } from '../modules/vehiculos'
import { Plantilla } from '../modules/plantillas'
import { Persona } from '../modules/personas'
import { Acta, ActaBromatologia, ActaInspeccion, ActaObrasParticulares, ActaTransito } from '../modules/actas'

export const PrivateRoute = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/actas' />
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

      {
        path: '/juzgados',
        element: <Juzgado />
      },

      {
        path: '/usuarios',
        element: <Usuario />
      },

      {
        path: '/vehiculos',
        element: <Vehiculo />
      },

      {
        path: '/plantillas',
        element: <Plantilla />
      },

      {
        path: '/personas',
        element: <Persona />
      },

      // Actas
      {
        path: '/actas',
        element: <Acta />
      },

      {
        path: '/actas/transito/crear',
        element: <ActaTransito />
      },

      {
        path: '/actas/transito/editar/:id',
        element: <ActaTransito />
      },

      {
        path: '/actas/inspeccion',
        element: <ActaInspeccion />
      },

      {
        path: '/actas/bromatologia',
        element: <ActaBromatologia />
      },

      {
        path: '/actas/obrasparticulares',
        element: <ActaObrasParticulares />
      },
    ]
  }
]