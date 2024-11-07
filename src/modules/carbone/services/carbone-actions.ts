import axios from 'axios'
import { dictionary } from '../helpers/dictionary'

const TEMPLATE_URL = `${import.meta.env.VITE_TEMPLATE_URL}`
const CARBONE_URL = `${import.meta.env.VITE_CARBONE_URL}`

export const uploadFilePlantilla = async (file: File):  Promise<string | undefined> => {
  try {
    // Agrego el archivo al form
    const formData = new FormData()
    formData.append('file', file)
      
    // Obtengo el archivo del formData
    const formFile = formData.get('file')
      
    if (formFile instanceof File) {
      // Obtengo el nombre del archivo con su extensión
      const name = formFile.name 
        
      // Subo el archivo al servidor de carbone
      const response = await axios.post(TEMPLATE_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        
      if (response?.data.message === 'File uploaded successfully') return name
      else throw new Error('Error al subir el archivo')
  
    } else {
      throw new Error('No valid file')
    }
  } catch (error) {
    console.error(error)
  }
}
  
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
    