/* eslint-disable @typescript-eslint/no-explicit-any */
import { clearNames } from '../../../shared'
import { numberToWords } from './numberToWords'
import type { User } from '../../../auth/interfaces/auth'
  
const matchMakeAndModel = (vehiculo: any) => {
  if (!vehiculo) return ''

  const marca = vehiculo?.marca || ''
  const modelo = vehiculo?.modelo || ''
  return `${marca} ${modelo}`.trim()
}

const formatDomicilio = async (domicilio: any) => {
  return `${domicilio?.calle || ''}`.trim()
}

export const formatData = async (acta: any, user: User, actuacionId: number) => {
  const f = new Date()
  const fechaActual = f.toLocaleDateString('es-AR')
  const horaActual = f.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
  
  const domicilios = []
  let personas = ''
  let documentos = ''
  let titular = ''
  // let actuacionesFormatted = ''
  let infraccionesFormatted = ''
  let actuacionSeleccionada = null
  let fechaNotificacion = []
  let conceptos = ''
  let numeroArticulo = ''

  for (const [i, infractor] of acta?.infractores?.entries() || []) {
    const domicilioFormatted = await formatDomicilio(infractor?.domicilio)

    if (i === 0) {
      personas = clearNames(infractor?.apellido, infractor?.nombre)
      documentos = infractor?.documento || ''
      domicilios.push(domicilioFormatted)
    } else {
      personas += `, ${clearNames(infractor?.apellido, infractor?.nombre)}`
      documentos += `, ${infractor?.documento || ''}`
      domicilios.push(domicilioFormatted)
    }

    if (acta?.notificaciones && acta?.notificaciones.length) {
      fechaNotificacion = acta.notificaciones.map((notificacion: any) => notificacion.created_at).join(', ')
    }
  }

  const domiciliosFormatted = domicilios.join('; ')
  const vehiculoFormatted = matchMakeAndModel(acta?.vehiculo)

  if (acta?.vehiculo?.titular) {
    const nombreApellido = clearNames(acta?.vehiculo?.titular?.apellido, acta?.vehiculo?.titular?.nombre)
    const numeroDocumento = acta?.vehiculo?.titular?.numero_documento || ''

    titular = `${nombreApellido} - ${numeroDocumento}`
  }

  if (acta?.actuaciones) {
    actuacionSeleccionada = acta.actuaciones.find((actuacion: any) => actuacion.id === actuacionId)
    // actuacionesFormatted = `Tipo: ${actuacionSeleccionada?.tipo || ''}, Monto: $${actuacionSeleccionada?.total || ''}, Observaciones: ${actuacionSeleccionada?.observaciones || ''}.`

    actuacionSeleccionada?.conceptos.forEach((item: any) => {
      conceptos += `${item?.concepto} de $${item?.monto}, `
    })
  }

  if (acta?.infracciones_cometidas) {
    infraccionesFormatted = acta.infracciones_cometidas.map((infraccion: any, index: number) => {
      numeroArticulo = 
        index === 0 
          ? `${infraccion?.numero}` 
          : `${numeroArticulo}, ${infraccion?.numero}`

      return `Artículo: ${infraccion?.numero || ''}, Detalle: ${infraccion?.detalle || ''}`
    }).join('; ')
  }

  const data = {
    // Fecha actual
    fechaActual: fechaActual || '',
    horaActual: horaActual || '',

    // Juzgado
    juzgadoNombre: user?.juzgado?.nombre || '',
    juzgadoDomicilio: user?.juzgado?.direccion || '',
    juzgadoTelefono: user?.juzgado?.telefono || '',
    nombreJuez: user?.juzgado?.juez || '',
    nombreSecretario: user?.juzgado?.secretario || '',

    // Acta
    causa: acta?.numero_causa || '',
    acta: acta?.numero_acta || '',
    infractorNombreApellido: personas || '',
    infractorDocumento: documentos || '',
    infractorDomicilio: domiciliosFormatted || '',
    fechaActa: acta?.fecha || '',
    actaHs: acta?.hora || '',
    actaObservaciones: acta?.observaciones || '',
    lugar: acta?.lugar || '',
    numeroArticulo,

    // Vehiculo
    titular,
    patente: acta?.vehiculo?.dominio || '',
    chasis: acta?.vehiculo?.numero_chasis || '',
    motor: acta?.vehiculo?.numero_motor || '',
    tipo: acta?.vehiculo?.tipo || '',
    color: acta?.vehiculo?.color || '',
    numeroTaxiRemis: acta?.vehiculo?.numero_taxi_remis || '',
    vehiculo: vehiculoFormatted || '',

    // Actuaciones e Infracciones Cometidas
    // actuaciones: actuacionesFormatted || '',
    actuaciones: numeroArticulo || '', // ** Momentaneamente reemplazado asi. Hay que chequear luego por cualquier cosa */
    infracciones: infraccionesFormatted || '',
    total: actuacionSeleccionada?.total || '',
    importe: actuacionSeleccionada?.total || '',
    subTotal: actuacionSeleccionada?.sub_total,
    descuento: actuacionSeleccionada?.descuento,
    recargo: actuacionSeleccionada?.recargo,
    conceptos,
    fechaSentencia: actuacionSeleccionada?.fecha || '',
    ImporteLetrasSinDescuento: numberToWords(+actuacionSeleccionada?.sub_total),
    ImporteLetrasConDescuento: numberToWords(+actuacionSeleccionada?.total),
    importeInfraccionMultiple: actuacionSeleccionada?.sub_total || '', //** Es lo mismo que total. REVISAR */

    // Notificaciones
    fechaNotificacion: fechaNotificacion || ''
  }

  return data
}
