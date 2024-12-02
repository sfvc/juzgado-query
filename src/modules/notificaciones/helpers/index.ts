import { apiJuzgado } from '../../../api/config'

export const getHistoryByNotificacion = async (actuacionId: number) => {
  const response = await apiJuzgado.get(`notificacion-detalle/${actuacionId}`)
  const { data } = response.data
  return data
}

export const createNotificacion = async (
  e: React.ChangeEvent<HTMLInputElement>,
  notificacion: { id: number, plantilla?: { path: string } }
) => {
  const fileUpload = e.target.files?.[0]
  if (!fileUpload) {
    throw new Error('No file selected.')
  }

  const date = new Date().getTime().toString().slice(4, 12)

  const fileName = cleanFileName(fileUpload.name)

  const data = {
    file: fileUpload,
    nombre: fileName.concat(`-${cleanFileName}-${date}`),
    notificacion_id: notificacion.id
  }

  const response = await apiJuzgado.post('notificacion-detalle', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  console.log(response)
}

export const showPDF = (url: string) => {
  window.open(url, '_blank')
}

export const deleteNotificacion = async (historyId: number) => {
  const response = await apiJuzgado.delete(`notificacion-detalle/${historyId}`)
  console.log(response)
}

// TODO: Agregar esta funcion al crear un plantilla
// Función para quitar la extensión del archivo y limpiar el nombre
export const cleanFileName = (fileName: string): string => {
  // Quitar la extensión del archivo
  const lastDotIndex = fileName.lastIndexOf('.')
  let baseName = lastDotIndex !== -1 ? fileName.slice(0, lastDotIndex) : fileName

  // Normalizar para eliminar acentos y convertir caracteres especiales a ASCII
  baseName = baseName.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // Reemplazar caracteres no alfanuméricos por guiones bajos
  baseName = baseName.replace(/[^a-zA-Z0-9]/g, '_')

  return baseName.toUpperCase()
}
