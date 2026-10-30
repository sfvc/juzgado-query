export type TipoNovedad = 'nuevo' | 'mejora' | 'correccion'

export interface Novedad {
  fecha: string // YYYY-MM-DD
  tipo: TipoNovedad
  titulo: string
  descripcion: string
}

/**
 * Historial de cambios del sistema que ve el usuario en "Novedades del sistema".
 * Agregar las nuevas al principio, con lenguaje simple y sin términos técnicos.
 */
export const NOVEDADES: Novedad[] = [
  {
    fecha: '2026-10-30',
    tipo: 'mejora',
    titulo: 'El sistema abre más rápido',
    descripcion: 'Ahora las pantallas se cargan a medida que las usás, por lo que al ingresar el sistema aparece antes. Además, al guardar un cambio ya no se vuelve a cargar toda la información: solo se actualiza lo necesario.'
  },
  {
    fecha: '2026-10-28',
    tipo: 'correccion',
    titulo: 'La fecha de hoy se completa sola en las plantillas',
    descripcion: 'En los documentos generados desde una plantilla, la fecha actual ahora aparece automáticamente y siempre es la del día en que se genera el documento.'
  },
  {
    fecha: '2026-10-20',
    tipo: 'mejora',
    titulo: 'Actas de otro juzgado',
    descripcion: 'Si un acta pertenece al otro juzgado, ahora se indica a qué juzgado corresponde y se puede ver el historial de estados por los que pasó, para hacer el seguimiento.'
  },
  {
    fecha: '2026-10-14',
    tipo: 'nuevo',
    titulo: 'Varias conductas por artículo',
    descripcion: 'Cada artículo ahora puede tener más de una conducta. Cada una se carga con su denominación, quién la comete, la sanción y el valor desde y hasta de unidades de multa.'
  },
  {
    fecha: '2026-08-31',
    tipo: 'nuevo',
    titulo: 'Archivos adjuntos en las actas',
    descripcion: 'Se pueden adjuntar fotos, videos y documentos a un acta y verlos desde el listado de actas, en la opción "Archivos".'
  },
  {
    fecha: '2026-08-20',
    tipo: 'nuevo',
    titulo: 'Conducta en los artículos',
    descripcion: 'Se agregó el campo "Conducta" a los artículos, para describir qué acción constituye la infracción.'
  },
  {
    fecha: '2026-05-29',
    tipo: 'correccion',
    titulo: 'Domicilio en el formulario de personas',
    descripcion: 'Se solucionó un problema que hacía que el domicilio se recargara una y otra vez al completar los datos de una persona.'
  }
]
