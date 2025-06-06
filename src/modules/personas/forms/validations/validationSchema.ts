import * as yup from 'yup'

export const personaFisicaSchema = yup.object().shape({
  apellido: yup.string().required('El apellido es requerido'),
  nombre: yup.string().required('El nombre es requerido'),
  tipo_documento: yup.string().required('El tipo de documento es requerido'),
  numero_documento: yup.string().required('El número de documento es requerido'),
  fecha_nacimiento: yup.string().notRequired(),
  estado_civil:  yup.string().notRequired(),
  sexo: yup.string().required('El sexo es requerido'),
  email: yup.string().email('Email no válido').notRequired(),
  telefono: yup.string().notRequired(),
  nacionalidad_id: yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .required('La nacionalidad es requerida'),
  tipo_persona: yup.string().required('El tipo de persona es requerido'),
})

export const personaJuridicaSchema = yup.object().shape({
  razon_social: yup.string().required('La razon social es requerida'),
  tipo_documento: yup.string().required('El tipo de documento es requerido'),
  cuit: yup.string().required('El cuit es requerido'),
  email: yup.string().email('Email no válido').notRequired(),
  telefono: yup.string().notRequired(),
  numero_inscripcion: yup.string().notRequired(),
  tipo_sociedad_id: yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .notRequired(),
  tipo_persona: yup.string().required('El tipo de persona es requerido'),
})

export const domicilioSchema = yup.object({
  pais_id: yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .notRequired(),
  provincia_id: yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .notRequired(),
  departamento_id: yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .notRequired(),
  localidad_id: yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .notRequired(),
  barrio_id: yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .notRequired(),
  calle: yup.string().notRequired(),
  numero: yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .notRequired(),
  lote_dpto: yup.string().notRequired(),
  manzana_piso: yup.string().notRequired()
})