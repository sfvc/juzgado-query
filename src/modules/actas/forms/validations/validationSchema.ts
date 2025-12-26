/* eslint-disable camelcase */
import * as yup from 'yup'
import { ART_ALCOHOLEMIA_ID } from '../../../../shared/constants'
import type { InfraccionActa } from '../../interfaces'

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
  ).required('Debe haber al menos un artículo cargado')
    .min(1, 'Debe haber al menos un artículo cargado'),

  // Alcoholemia debe ser requerido pero puede ser cadena vacía si se negó a realizarla
  // y a la vez permitir que el campo sea una cadena vacía si se negó a realizar la prueba.
  grado_alcohol: yup.string().when(['infracciones_cometidas', 'se_nego'], {
    is: (infracciones_cometidas: InfraccionActa[], se_nego: boolean) => {
    // Solo validar si existe la infracción de alcoholemia
      const tieneInfraccionAlcoholemia = infracciones_cometidas?.some(
        infraccion => infraccion.id === ART_ALCOHOLEMIA_ID
      )
      // Es requerido si tiene la infracción Y NO se negó
      return tieneInfraccionAlcoholemia && !se_nego
    },
    then: (schema) => schema.required('El grado de alcohol es requerido'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Infractor data

  // Vehículo data (definido sin validación)

  // Propiedades data (definido sin validación)
})
