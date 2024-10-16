import * as yup from 'yup'

export const personaFisicaSchema = yup.object().shape({
  apellido: yup.string().required('El apellido es requerido'),
  nombre: yup.string().required('El nombre es requerido'),
  tipo_documento: yup.string().required('El tipo de documento es requerido'),
  numero_documento: yup.string().required('El número de documento es requerido'),
  fecha_nacimiento: yup.string().notRequired(),
  estado_civil:  yup.string().notRequired(),
  cuil: yup.string().required('El cuil es requerido'),
  sexo: yup.string().required('El sexo es requerido'),
  email: yup.string().email('Email no válido').notRequired(),
  nacionalidad_id: yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .required('La nacionalidad es requerida'),
  tipo_persona: yup.string().required('El tipo de persona es requerido'),
})

export const personaJuridicaSchema = yup.object().shape({
  razon_social: yup.string().required('La razon social es requerida'),
  nombre: yup.string().required('El nombre es requerido'),
  tipo_documento: yup.string().required('El tipo de documento es requerido'),
  cuit: yup.string().required('El cuit es requerido'),
  email: yup.string().email('Email no válido').notRequired(),
  numero_inscripcion: yup.string().notRequired(),
  tipo_sociedad_id: yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .notRequired(),
  tipo_persona: yup.string().required('El tipo de persona es requerido'),
})


export const domicilioSchema = yup.object({
  pais_id: yup.string()
    .when('$showDomicilio', {
      is: true,
      then: (schema) => schema.required('El país es requerido'),
      otherwise: (schema) => schema.notRequired(),
    }),
  provincia_id: yup.string()
    .when('$showDomicilio', {
      is: true,
      then: (schema) => schema.required('La provincia es requerida'),
      otherwise: (schema) => schema.notRequired(),
    }),
  departamento_id: yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .notRequired(),
  barrio_id: yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .notRequired(),
  calle: yup.string()
    .when('$showDomicilio', {
      is: true,
      then: (schema) => schema.required('La calle es requerida'),
      otherwise: (schema) => schema.notRequired(),
    }),
  numero: yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .notRequired(),
  lote_dpto: yup.string().notRequired(),
  manzana_piso: yup.string().notRequired()
})