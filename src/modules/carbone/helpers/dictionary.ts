export const dictionary = () => {
  const data = {
    // Fecha actual
    añoActual: '{d.añoActual}',
    fecha: '{d.fechaActual}',
    horaActual: '{d.horaActual}',
  
    // Juzgado
    juzgadoNombre: '{d.juzgadoNombre}',
    juzgadoDomicilio: '{d.juzgadoDomicilio}',
    juzgadoTelefono: '{d.juzgadoTelefono}',
    nombreJuez: '{d.nombreJuez}',
    nombreSecretario: '{d.nombreSecretario}',
  
    // Acta
    causa: '{d.causa}',
    acta: '{d.acta}',
    infractorNombreApellido: '{d.infractorNombreApellido}',
    infractorDocumento: '{d.infractorDocumento}',
    infractorDomicilio: '{d.infractorDomicilio}',
    infractorDomicilioCompleto: '{d.infractorDomicilioCompleto}',
    fechaActa: '{d.fechaActa}',
    actaHs: '{d.actaHs}',
    actaObservaciones: '{d.actaObservaciones}',
    lugar: '{d.lugar}',
    numeroArticulo: '{d.numeroArticulo}',

    // Vehiculo
    patente: '{d.patente}',
    modelo: '{d.modelo}',
    chasis: '{d.chasis}',
    titular: '{d.titular}',
    tipo: '{d.tipo}',
    numeroTaxiRemis: '{d.numeroTaxiRemis}',
    vehiculo: '{d.vehiculo}',

    // Actuaciones
    actuaciones: '{d.actuaciones}',
    infracciones: '{d.infracciones}', //** Formato de infracciones [Codigo - Detalle] */
    codigo_infracciones: '{d.codigo_infracciones}', //** Formato de infracciones [Detalle - Unidad Tributaria] */
    total: '{d.total}',
    importe: '{d.importe}',
    subTotal: '{d.subTotal}',
    descuento: '{d.descuento}',
    recargo: '{d.recargo}',
    conceptos: '{d.conceptos}',
    fechaSentencia: '{d.fechaSentencia}',
    importeLetrasSinDescuento: '{d.importeLetrasSinDescuento}',
    importeLetrasConDescuento: '{d.importeLetrasConDescuento}',
    importeInfraccionMultiple: '{d.importeInfraccionMultiple}',

    // Notificaciones
    fechaNotificacion: '{d.fechaNotificacion}',

    // Variables solicitadas
    totalSinConceptos: '{d.totalSinConceptos}',
    totalLetrasSinConceptos: '{d.totalLetrasSinConceptos}'
  }
  
  return data
}