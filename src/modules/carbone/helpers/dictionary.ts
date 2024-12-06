export const dictionary = () => {
  const data = {
    // Fecha actual
    fecha: '{d.fechaActual}',
  
    // Juzgado
    juzgadoNombre: '{d.juzgadoNombre}',
    juzgadoDomicilio: '{d.juzgadoDomicilio}',
    juzgadoTelefono: '{d.juzgadoTelefono}',
  
    // Acta
    causa: '{d.causa}',
    acta: '{d.acta}',
    infractorNombreApellido: '{d.infractorNombreApellido}',
    infractorDocumento: '{d.infractorDocumento}',
    fechaActa: '{d.fechaActa}',
    actaHs: '{d.actaHs}',
    actaObservaciones: '{d.actaObservaciones}',
    lugar: '{d.lugar}'
  }
  
  return data
}