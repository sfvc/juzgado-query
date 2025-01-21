import * as yup from 'yup'

export const transitoSchema = yup.object().shape({
  // Acta data
  numero_acta: yup.string().required('El número de acta es requerido'),
  fecha: yup.string().required('La fecha de infracción es requerida'),
  fecha_prescripcion: yup.string().required(),
  hora: yup.string().required('La hora de la infracción es requerida'),
  retencion_vehiculo: yup.number()
    .transform(value => isNaN(value) ? null : value)
    .required(),
  retencion_licencia: yup.number()
    .transform(value => isNaN(value) ? null : value)
    .required(),
  notificado: yup.number()
    .transform(value => isNaN(value) ? null : value)
    .required(),
  prioridad_id: yup.number()
    .transform(value => isNaN(value) ? null : value)
    .required('La prioridad es requerida'),
  tipo_acta: yup.string().required(),
  // preventiva (definido pero sin validación)

  // Infractor data
  infractores: yup.array(
    yup.object().shape({
      id: yup.number().required(),
      nombre: yup.string().required(),
      apellido: yup.string().required(),
      documento: yup.string().required(),
      cuit: yup.string()
        .transform(value => (!value) ? '-' : value)
        .required(),
      antecedentes: yup.number()
        .transform(value => isNaN(value) ? null : value)
        .required(),
      responsable: yup.number()
        .transform(value => isNaN(value) ? null : value)
        .required(),
    })
  ).required(),

  // Infracción data
  calle: yup.string().required('La calle es requerida'),
  observaciones: yup.string().required('La observación es requerida'),

  // Articulos (infracciones)
  infracciones_cometidas: yup.array(
    yup.object().shape({
      id: yup.number().required(),
      detalle: yup.string().required(),
      numero: yup.string().required(),
      valor_desde: yup.number().required(),
    })
  )
    .required('Debe haber al menos un artículo cargado')
    .min(1, 'Debe haber al menos un artículo cargado'),

  // Vehículo data (definido pero sin validación)

  // Propiedades data (definido pero sin validación)
})
