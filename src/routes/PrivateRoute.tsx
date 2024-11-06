import { Navigate } from 'react-router-dom'
import { Layout } from '../layout'
import { Barrio, Departamento, Localidad, Pais, Provincia } from '../modules/parametros/localizacion/pages'
import { Articulo, Estado, Propiedad, Rubro } from '../modules/parametros/actas'
import { Juzgado, Usuario } from '../modules/parametros/globales'
import { Vehiculo } from '../modules/vehiculos'
import { Plantilla } from '../modules/plantillas'
import { Persona } from '../modules/personas'
import { Acta, ActaBromatologia, ActaInspeccion, ActaObrasParticulares, ActaTransito } from '../modules/actas'
import { EstadoActa } from '../modules/estados'

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
        path: '/acta/transito/crear',
        element: <ActaTransito />
      },

      {
        path: '/acta/transito/editar/:id',
        element: <ActaTransito />
      },

      {
        path: '/acta/inspeccion/crear',
        element: <ActaInspeccion />
      },

      {
        path: '/acta/inspeccion/editar/:id',
        element: <ActaInspeccion />
      },

      {
        path: '/acta/bromatologia/crear',
        element: <ActaBromatologia />
      },

      {
        path: '/acta/bromatologia/editar/:id',
        element: <ActaBromatologia />
      },

      {
        path: '/acta/obrasparticulares/crear',
        element: <ActaObrasParticulares />
      },

      {
        path: '/acta/obrasparticulares/editar/:id',
        element: <ActaBromatologia />
      },

      {
        path: '/acta/:id/estados',
        element: <EstadoActa />
      },
    ]
  }
]