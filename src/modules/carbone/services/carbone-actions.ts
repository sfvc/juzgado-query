/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { dictionary } from '../helpers/dictionary'
import { apiJuzgado } from '../../../api/config'
import { formatData } from '../helpers/formatData'
import { cleanFileName } from '../helpers/cleanFileName'
import { getFileExtension } from '../helpers/getFileExtension'
import type { User } from '../../../auth/interfaces/auth'
import type { Notificacion, NotificationActa } from '../../notificaciones/interfaces'
import { ActuacionResponse } from '../../actuaciones/interfaces/actuacion'

const TEMPLATE_URL = `${import.meta.env.VITE_TEMPLATE_URL}`
const CARBONE_URL = `${import.meta.env.VITE_CARBONE_URL}`

const NOTIFICACION_URL = 'notificacion-detalle'
const ACTUACION_URL = 'actuacion-detalle'

// Sube una nueva plantilla a carbone
export const uploadFilePlantilla = async (file: File, path?: string):  Promise<string | undefined> => {
  try {
    // Limpia el nombre del archivo
    const cleanName = cleanFileName(file.name)

    // Sobreescribir una plantilla en carbone o crear una nueva
    const pathName = path ? path : `${cleanName}.${getFileExtension(file.name)}`

    // Crea un nuevo archivo con el nombre limpio
    const renamedFile = new File([file], pathName, {
      type: file.type,
    })

    // Agrego el archivo al formData
    const formData = new FormData()
    formData.append('file', renamedFile)
        
    // Subo el archivo al servidor de carbone
    const response = await axios.post(TEMPLATE_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
        
    if (response?.data.message === 'File uploaded successfully') return pathName
    else throw new Error('Error al subir el archivo')
  
  } catch (error) {
    console.error(error)
  }
}
  
// Descarga la plantilla original con las variables
export const downloadPlantilla = async (path: string): Promise<void> => {
  try {
    const response = await axios.get(`${TEMPLATE_URL}/download?fileName=${path}`, {
      responseType: 'blob' // Indica que esperamos una respuesta binaria
    })
  
    // Crea un enlace temporal para descargar el archivo
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', path)
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('Error al descargar la plantilla:', error)
  }
}
  
// Renderiza la plantilla original con las variables en el navegador
export const showPlantilla = async (path: string): Promise<void> => {
  try {
    const diccionario = dictionary() // Obtener los datos para visualizar plantillas
  
    const data = {
      convertTo: 'pdf',
      data: diccionario,
      template: `${path}`
    }
  
    const response = await axios.post(CARBONE_URL, data, {
      responseType: 'blob'
    })
  
    const fileBlob = response.data
    const file = new Blob([fileBlob], { type: 'application/pdf' })
    const fileURL = URL.createObjectURL(file)
  
    // Abre una nueva ventana del navegador para mostrar el PDF
    window.open(fileURL, '_blank')
  } catch (error) {
    console.error('Error al mostrar el PDF:', error)
  }
}

// Renderiza el pdf en el navegador con los datos enviados a carbone para inhabilitados
export const showFilePDF = async (data: any) => {
  try {
    const response = await axios.post(CARBONE_URL, data, {
      responseType: 'blob'
    })
  
    const fileBlob = response.data
    const file = new Blob([fileBlob], { type: 'application/pdf' })
    const fileURL = URL.createObjectURL(file)
  
    window.open(fileURL, '_blank')
    
  } catch (error) {
    console.log(error)
  }
}
    
// Descarga el word con los datos inyectados
export const downloadWordFile = async (item: Notificacion, acta: NotificationActa, user: User) => { 
  const path = item?.plantilla?.path
  const itemId = item?.id

  try {
    // const actaFormated = await formatData(acta, user, itemId)

    const { data: actuaciones } = await apiJuzgado.post('actuaciones-acumuladas', { actuacion_id: itemId })
    const data: ActuacionResponse = actuaciones.data
      
    const actaFormated = await formatData(data)

    const body = {
      convertTo: 'docx',
      data: actaFormated,
      template: `${path}`
    }

    const response = await axios.post(CARBONE_URL, body, {
      responseType: 'blob'
    })

    const fileBlob = response.data
    const file = new Blob([fileBlob], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
    const fileURL = URL.createObjectURL(file)

    // Crear un enlace temporal
    const a = document.createElement('a')
    a.href = fileURL

    // Especificar el nombre con el que se descargará el archivo
    a.download = `${acta.numero_acta} - ${path}`

    // Simular el clic en el enlace
    document.body.appendChild(a)
    a.click()

    // Limpiar el DOM
    document.body.removeChild(a)
    URL.revokeObjectURL(fileURL)
  } catch (error) {
    console.error('Error al descardar el Word:', error)
  }
}

// Subir nuevo archivo editado (word) para que el back lo convierta en PDF y almacene en la DB
// Se utiliza el mismo endpoint para subir la notificacion y la actuacion. Por lo tanto pasar la property correspondiente
export const uploadFilePDF = async (file: File, item: any, property: string, userId: number) => { // property: notificacion_id | actuacion_id
  const url = property === 'notificacion_id' ? NOTIFICACION_URL : ACTUACION_URL
  const date = new Date().getTime().toString().split('').slice(4, 12).join('')

  const name =  `${ item.numero_acta }-${ cleanFileName(item?.plantilla?.path) }` 

  const data = {
    file,
    nombre: name.concat(`-${date}`),
    [property]: item.id,
    user_id: userId
  }

  const response = await apiJuzgado.post(url, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  return response.data.url
}

// Convertir la primera vez el word al pdf y subirlo a s3
export const showFileWord = async (data: any): Promise<File | undefined> => {
  try {
    const response = await axios.post(CARBONE_URL, data, {
      responseType: 'blob'
    })

    const fileBlob = response.data
    const file = new File([fileBlob], 'document.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
    return file

  } catch (error) {
    console.log(error)
  }
}
