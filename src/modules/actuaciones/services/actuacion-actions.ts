import { apiJuzgado } from '../../../api/config'
import { ISentenciaForm } from '../interfaces/sentencia'

export const getActuacionesByActa = async (id: number) => {
  const response = await apiJuzgado.get(`/actas/${id}/actuacion`)
  const { data } = response.data
  return data
}

export const getPlantillasByActuacion = async (tipo: string, juzgadoId: number) => {
  const response = await apiJuzgado.get(`/plantillas/tipos?tipo_actuacion=${tipo}&juzgado=${juzgadoId}`)
  const { data } = response.data
  return data
}

export const deleteActuacion = async (actaId: number, actuacionId: number) => {
  const response = await apiJuzgado.delete(`/actuaciones/${actuacionId}/${actaId}`)
  const { data } = response.data
  return data
}

// Crear multiples actuaciones (Decretos u Oficios) a la vez
export const createActuacion = async (selectedActas: number[], plantillaId: number | null, tipoActuacion: string) => {
  if (selectedActas.length === 0 || !plantillaId || !tipoActuacion) throw new Error('No hay actas o plantilla seleccionada')

  // const notificationsPromise = selectedActas.map((actaId: number) => {
  //   return apiJuzgado.post('/actuaciones', {
  //     actas: [actaId],
  //     plantilla_id: plantillaId,
  //     tipo_actuacion: tipoActuacion
  //   })
  // })

  // await Promise.all(notificationsPromise)

  // TODO: Terminar la funcionalidad

  const actas = selectedActas.map((actaId) => actaId.toString())
  console.log(actas)

  const response = await apiJuzgado.post('/actuaciones', {
    actas: actas,
    plantilla_id: plantillaId,
    tipo_actuacion: tipoActuacion
  })
  console.log(response)
}

export const createSentencia = async (form: ISentenciaForm) => {
  const response = await apiJuzgado.post('/actuaciones', form)
}