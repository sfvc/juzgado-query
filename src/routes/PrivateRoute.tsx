import { Navigate } from 'react-router-dom'
import { Layout } from '../layout'
import { Barrio, Departamento, Localidad, Nacionalidad, Pais, Provincia } from '../modules/parametros/localizacion/pages'
import { Articulo, Estado, Propiedad, Rubro } from '../modules/parametros/actas'
import { Juzgado, Profile, Unidad, Usuario } from '../modules/parametros/globales'
import { Vehiculo } from '../modules/vehiculos'
import { Plantilla } from '../modules/plantillas'
import { Persona } from '../modules/personas'
import { EstadoActa } from '../modules/estados'
import { Notificacion, NotificacionActa } from '../modules/notificaciones'
import { Actuacion, Acumuladas, Sentencia, SentenciaMultiple } from '../modules/actuaciones'
import { Inhabilitado } from '../modules/inhabilitados'
import { Dashboard } from '../modules/dashboard'
import { 
  Acta, 
  ActaBromatologia, 
  ActaInspeccion,
  ActaObrasParticulares, 
  ActaTransito 
} from '../modules/actas'


export const PrivateRoute = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/actas' />
      },

      // Parametros
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
        path: '/nacionalidades',
        element: <Nacionalidad />
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
        path: '/profile',
        element: <Profile />
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

      {
        path: '/unidades',
        element: <Unidad />
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

      // Estados
      {
        path: '/acta/:id/estados',
        element: <EstadoActa />
      },

      // Notificaciones
      {
        path: '/acta/:id/notificaciones',
        element: <NotificacionActa />
      },

      {
        path: '/notificaciones',
        element: <Notificacion />
      },

      // Actuaciones
      {
        path: '/acta/:id/actuaciones',
        element: <Actuacion />
      },

      {
        path: '/acumuladas',
        element: <Acumuladas />
      },

      // Sentencia
      {
        path: '/acta/:id/actuaciones/sentencia',
        element: <Sentencia />
      },

      {
        path: '/acta/acumuladas/sentencia-multiple',
        element: <SentenciaMultiple />
      },

      // Inhabilitados
      {
        path: '/inhabilitados',
        element: <Inhabilitado />
      },

      // Dashboard
      {
        path: '/dashboard',
        element: <Dashboard />
      },

      {
        path: '*',
        element: <Navigate to='/actas' replace />
      }
    ]
  }
]