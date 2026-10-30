import { ComponentType, lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { Layout } from '../layout'

// Carga cada pantalla bajo demanda (code splitting). Se importa el archivo de la pagina
// y no el index del modulo, para que no arrastre el resto de exports del modulo al chunk principal.
const page = <K extends string>(load: () => Promise<Record<K, ComponentType>>, name: K) =>
  lazy(() => load().then((module) => ({ default: module[name] })))

// Parametros - localizacion
const Pais = page(() => import('../modules/parametros/localizacion/pages/Pais'), 'Pais')
const Provincia = page(() => import('../modules/parametros/localizacion/pages/Provincia'), 'Provincia')
const Departamento = page(() => import('../modules/parametros/localizacion/pages/Departamento'), 'Departamento')
const Localidad = page(() => import('../modules/parametros/localizacion/pages/Localidad'), 'Localidad')
const Barrio = page(() => import('../modules/parametros/localizacion/pages/Barrio'), 'Barrio')
const Nacionalidad = page(() => import('../modules/parametros/localizacion/pages/Nacionalidad'), 'Nacionalidad')

// Parametros - actas
const Articulo = page(() => import('../modules/parametros/actas/pages/Articulo'), 'Articulo')
const Propiedad = page(() => import('../modules/parametros/actas/pages/Propiedad'), 'Propiedad')
const Rubro = page(() => import('../modules/parametros/actas/pages/Rubro'), 'Rubro')
const Estado = page(() => import('../modules/parametros/actas/pages/Estado'), 'Estado')

// Parametros - globales
const Juzgado = page(() => import('../modules/parametros/globales/pages/Juzgado'), 'Juzgado')
const Usuario = page(() => import('../modules/parametros/globales/pages/Usuario'), 'Usuario')
const Unidad = page(() => import('../modules/parametros/globales/pages/Unidad'), 'Unidad')
const Profile = page(() => import('../modules/parametros/globales/pages/Profile'), 'Profile')

// Actas
const Acta = page(() => import('../modules/actas/pages/Acta'), 'Acta')
const ActaTransito = page(() => import('../modules/actas/pages/ActaTransito'), 'ActaTransito')
const ActaInspeccion = page(() => import('../modules/actas/pages/ActaInspeccion'), 'ActaInspeccion')
const ActaBromatologia = page(() => import('../modules/actas/pages/ActaBromatologia'), 'ActaBromatologia')
const ActaObrasParticulares = page(() => import('../modules/actas/pages/ActaObrasParticulares'), 'ActaObrasParticulares')
const ActaPoliciaAmbiental = page(() => import('../modules/actas/pages/ActaPoliciaAmbiental'), 'ActaPoliciaAmbiental')

// Resto de modulos
const Vehiculo = page(() => import('../modules/vehiculos/pages/Vehiculo'), 'Vehiculo')
const Plantilla = page(() => import('../modules/plantillas/page/Plantilla'), 'Plantilla')
const LibreDeuda = page(() => import('../modules/libreDeuda/page/LibreDeuda'), 'LibreDeuda')
const Persona = page(() => import('../modules/personas/pages/Persona'), 'Persona')
const EstadoActa = page(() => import('../modules/estados/pages/EstadoActa'), 'EstadoActa')
const Notificacion = page(() => import('../modules/notificaciones/pages/Notificacion'), 'Notificacion')
const NotificacionActa = page(() => import('../modules/notificaciones/pages/NotificacionActa'), 'NotificacionActa')
const Actuacion = page(() => import('../modules/actuaciones/pages/Actuacion'), 'Actuacion')
const Acumuladas = page(() => import('../modules/actuaciones/pages/Acumuladas'), 'Acumuladas')
const Sentencia = page(() => import('../modules/actuaciones/pages/Sentencia'), 'Sentencia')
const SentenciaMultiple = page(() => import('../modules/actuaciones/pages/SentenciaMultiple'), 'SentenciaMultiple')
const Inhabilitado = page(() => import('../modules/inhabilitados/pages/Inhabilitado'), 'Inhabilitado')
const Dashboard = page(() => import('../modules/dashboard/page/Dashboard'), 'Dashboard')
const Auditoria = page(() => import('../modules/auditoria/pages/Auditoria'), 'Auditoria')
const Recaudacion = page(() => import('../modules/recaudacion/pages/Recaudacion'), 'Recaudacion')
const Descargo = page(() => import('../modules/descargo/page/Descargo'), 'Descargo')

const routes: { path: string, component: ComponentType }[] = [
  // Parametros
  { path: '/paises', component: Pais },
  { path: '/provincias', component: Provincia },
  { path: '/departamentos', component: Departamento },
  { path: '/localidades', component: Localidad },
  { path: '/barrios', component: Barrio },
  { path: '/nacionalidades', component: Nacionalidad },
  { path: '/articulos', component: Articulo },
  { path: '/propiedades', component: Propiedad },
  { path: '/rubros', component: Rubro },
  { path: '/estados', component: Estado },
  { path: '/juzgados', component: Juzgado },
  { path: '/usuarios', component: Usuario },
  { path: '/profile', component: Profile },
  { path: '/unidades', component: Unidad },

  { path: '/vehiculos', component: Vehiculo },
  { path: '/plantillas', component: Plantilla },
  { path: '/personas', component: Persona },

  // Actas
  { path: '/actas', component: Acta },
  { path: '/acta/transito/crear', component: ActaTransito },
  { path: '/acta/transito/editar/:id', component: ActaTransito },
  { path: '/acta/inspeccion/crear', component: ActaInspeccion },
  { path: '/acta/inspeccion/editar/:id', component: ActaInspeccion },
  { path: '/acta/bromatologia/crear', component: ActaBromatologia },
  { path: '/acta/bromatologia/editar/:id', component: ActaBromatologia },
  { path: '/acta/obrasparticulares/crear', component: ActaObrasParticulares },
  { path: '/acta/obrasparticulares/editar/:id', component: ActaObrasParticulares },
  { path: '/acta/policiaambiental/crear', component: ActaPoliciaAmbiental },
  { path: '/acta/policiaambiental/editar/:id', component: ActaPoliciaAmbiental },
  { path: '/acta/:id/estados', component: EstadoActa },
  { path: '/acta/:id/notificaciones', component: NotificacionActa },
  { path: '/acta/:id/actuaciones', component: Actuacion },
  { path: '/acta/:id/actuaciones/sentencia', component: Sentencia },
  { path: '/acta/acumuladas/sentencia-multiple', component: SentenciaMultiple },

  { path: '/notificaciones', component: Notificacion },
  { path: '/acumuladas', component: Acumuladas },
  { path: '/inhabilitados', component: Inhabilitado },
  { path: '/dashboard', component: Dashboard },
  { path: '/auditoria', component: Auditoria },
  { path: '/recaudacion', component: Recaudacion },
  { path: '/libre-deuda', component: LibreDeuda },
  { path: '/descargo', component: Descargo }
]

export const PrivateRoute = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Navigate to='/actas' /> },
      ...routes.map(({ path, component: Component }) => ({ path, element: <Component /> })),
      { path: '*', element: <Navigate to='/actas' replace /> }
    ]
  }
]
