export const dictionary = () => {
  const data = {
    // Fecha actual
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
    fechaActa: '{d.fechaActa}',
    actaHs: '{d.actaHs}',
    actaObservaciones: '{d.actaObservaciones}',
    lugar: '{d.lugar}',

    // Vehiculo
    patente: '{d.patente}',
    marca: '{d.marca}',
    color: '{d.color}',
    modelo: '{d.modelo}',
    chasis: '{d.chasis}',
    titular: '{d.titular}',
    tipo: '{d.tipo}',
    numeroTaxiRemis: '{d.numeroTaxiRemis}',
    vehiculo: '{d.vehiculo}',

    // Actuaciones
    actuaciones: '{d.actuaciones}',
    infracciones: '{d.infracciones}',
    total: '{d.total}',
    subTotal: '{d.subTotal}',
    descuento: '{d.descuento}',
    recargo: '{d.recargo}',
    conceptos: '{d.conceptos}',
    // ImporteLetrasSinDescuento: '{d.ImporteLetrasSinDescuento}',
    // importeInfraccionMultiple: '{d.importeInfraccionMultiple}',
    fechaSentencia: '{d.fechaSentencia}',

    // Notificaciones
    fechaNotificacion: '{d.fechaNotificacion}'
  }
  
  return data
}