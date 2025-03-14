import { numberToWords } from './numberToWords'
import { clearNames } from '../../../shared'
import { sanitizeData } from './sanitizeData'
import type { 
  ActuacionResponse, 
  Vehiculo,
  Domicilio
} from '../../actuaciones/interfaces/actuacion'

const f = new Date()
const añoActual = f.getFullYear()
const fechaActual = f.toLocaleDateString('es-AR')
const horaActual = f.toLocaleTimeString('es-AR', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
})

const matchMakeAndModel = (vehiculo: Vehiculo): string => {
  if (!vehiculo) return ''

  const marca = vehiculo?.marca?.nombre || ''
  const modelo = vehiculo?.modelo || ''
  return `${marca} ${modelo}`.trim()
}

const formatAddress = (domicilio: Domicilio) => {
  if ( !domicilio ) return ''
  /* const domicilioFormatedd = sanitizeData(domicilio)

  let newDomicilio = ''
  Object.entries(domicilioFormatedd).forEach(([key, value]) => {
    newDomicilio += value
  })

  return newDomicilio */

  return `${domicilio?.calle || ''} ${domicilio?.numero || ''}`.trim()
}

export const formatData = async (data: ActuacionResponse) => {
  const { 
    actas,
    notificaciones, 
    infractores, 
    vehiculos, 
    articulos,
    total,
    descuento,
    recargo,
    conceptos,
    fecha: fechaSentencia,
    sub_total: subTotal,
    usuario
  } = data

  const juzgadoNombre = usuario.juzgado.nombre
  const juzgadoDomicilio = usuario.juzgado?.direccion || ''
  const juzgadoTelefono = usuario.juzgado?.telefono || ''
  const nombreJuez = usuario.juzgado?.juez || ''
  const nombreSecretario = usuario.juzgado?.secretario || ''

  const numeroActa = actas.map(acta => acta.numero_acta).join(', ')
  const numeroCausa = actas.map(acta => acta.numero_causa).join(', ')
  const fechaActa = actas.map(acta => acta.fecha).join(', ')
  const actaHs = actas.map(acta => acta.hora).join(', ')
  const actaObservaciones = actas.map(acta => acta.observaciones).join(', ')
  const lugar = actas.map(acta => acta.lugar).join(', ')

  const infractorNombreApellido = infractores?.map(infractor => clearNames(infractor.apellido, infractor.nombre)).join(', ')
  const infractorDocumento = infractores?.map(infractor => infractor.documento).join(', ')
  const infractorDomicilio = infractores?.map(infractor => (`${infractor?.domicilio?.calle || ''} ` + `${infractor?.domicilio?.numero || ''}`).trim()).join(', ')
  const infractorDomicilioCompleto = infractores?.map(infractor => formatAddress(infractor?.domicilio)).join(', ')
  
  const patente = vehiculos?.map(vehiculo => vehiculo.dominio).join(', ')
  const chasis = vehiculos?.map(vehiculo => vehiculo.numero_chasis).join(', ')
  const motor = vehiculos?.map(vehiculo => vehiculo.numero_motor).join(', ')
  const tipo = vehiculos?.map(vehiculo => vehiculo?.tipo?.nombre).join(', ')
  const color = vehiculos?.map(vehiculo => vehiculo?.color?.nombre).join(', ')
  const numeroTaxiRemis = vehiculos?.map(vehiculo => vehiculo.numero_taxi_remis).join(', ')
  const vehiculoFormatted = vehiculos?.map(vehiculo => matchMakeAndModel(vehiculo)).join(', ')

  const numeroArticulo = articulos.map(articulo => articulo.numero).join(', ')
  const detalleArticulos = articulos.map(articulo => articulo.detalle).join(' ')
  const codigoInfracciones = articulos.map(articulo => `${articulo.numero} - ${articulo.detalle}`).join(' ')

  const conceptosActuacion = conceptos?.map(item => `${item.concepto} de $${item.monto}`).join(', ')
  const totalConceptos = conceptos?.reduce((sum, item) => sum + +item.monto, 0)

  const fechaNotificacion = notificaciones?.map(notificacion => notificacion.created_at).join(', ')

  const totalSinConceptos = +total - totalConceptos

  const importeLetrasSinDescuento = numberToWords(+subTotal)
  const importeLetrasConDescuento = numberToWords(+total)
  const importeInfraccionMultiple = numberToWords(+total)
  const totalLetrasSinConceptos = numberToWords(+totalSinConceptos)
  
  const dataFormatted = {
    // Fecha actual
    añoActual,
    fechaActual,
    horaActual,

    // Juzgado
    juzgadoNombre,
    juzgadoDomicilio,
    juzgadoTelefono,
    nombreJuez,
    nombreSecretario,

    // Acta
    acta: numeroActa,
    causa: numeroCausa,
    fechaActa,
    actaHs,
    actaObservaciones,
    lugar,

    // Personas
    infractorNombreApellido,
    infractorDocumento,
    infractorDomicilio,                         //** Formato de domicilio [Calle - Numero] */
    infractorDomicilioCompleto,                 //** Formato de domicilio [Calle - Numero, Barrio, Localidad, Departamento] */

    // Vehichulo
    patente,
    chasis,
    motor,
    tipo,
    color,
    numeroTaxiRemis,
    vehiculo: vehiculoFormatted,                //** Formato de vehiculo [Marca - Modelo] */

    // Infracciones
    infracciones: detalleArticulos,             //** Formato de infracciones [Detalles] */
    numeroArticulo,                             //** Formato de infracciones [Codigos] */
    codigo_infracciones: codigoInfracciones,    //** Formato de infracciones [Numero - Detalle] */
    actuaciones: numeroArticulo,                //** Formato de infracciones [Codigos] */

    // Actuaciones
    total,
    importe: total,
    subTotal,
    descuento,
    recargo,
    importeLetrasSinDescuento,
    importeLetrasConDescuento,
    importeInfraccionMultiple,
    fechaSentencia,
    conceptos: conceptosActuacion,              //** Listado de conceptos [Descripcion - Monto] */
    totalConceptos,                             //** Total con conceptos [$] */
    totalSinConceptos,                          //** Total sin conceptos [$] */
    totalLetrasSinConceptos,                    //** Total sin conceptos en letras [String] */

    // Notificaciones
    fechaNotificacion
  }

  return sanitizeData(dataFormatted) 
}
