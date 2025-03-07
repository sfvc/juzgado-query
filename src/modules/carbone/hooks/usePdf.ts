 
import { useContext } from 'react'
import { apiJuzgado } from '../../../api/config'
import { useLoading } from '../../../shared'
import { formatData } from '../helpers/formatData'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { showFileWord } from '../services/carbone-actions'
import type { ActuacionResponse } from '../../actuaciones/interfaces/actuacion'

export const usePdf = () => { //** (acta?: any) */
  const useAction = useLoading()
  const { user } = useContext(AuthContext)
    
  // Mostrar pdf desde carbone
  /* const showPDFCarbone = async(path: string | undefined, notificacionId: number) => {
    useAction.actionFn( async () => {
      if(!acta) throw new Error('No se encontró la acta')

      const actaformated = await formatData(acta, user!, notificacionId)
    
      const data = {
        convertTo: 'pdf',
        data: actaformated,
        template: `${path}`
      }
    
      await showFilePDF(data)
    })
  } */

  // const showPDFCarbone = async(path: string | undefined, actuacionId: number) => {
  //   useAction.actionFn( async () => {

  //     const { data: response } = await apiJuzgado.post('actuaciones-acumuladas', { actuacion_id: actuacionId })
  //     const data: ActuacionResponse = response.data
      
  //     const actaformated = await formatData(data, user!)
      
  //     const body = {
  //       convertTo: 'pdf',
  //       data: actaformated,
  //       template: `${path}`
  //     }
      
  //     await showFilePDF(body)
  //   })
  // }
    
  // Mostrar pdf desde el s3
  const showPDFGotenberg = (url: string) => {
    window.open(url, '_blank')
  }

  // Convertir word a pdf desde el back con gotenberg
  const convertToPDF = async (url: string) => {
    const response = await apiJuzgado.post('servicios/convertir-url-pdf', { file_url: url }, { responseType: 'blob' })
    const fileBlob = response.data
    const file = new Blob([fileBlob], { type: 'application/pdf' })
    const fileURL = URL.createObjectURL(file)
    
    window.open(fileURL, '_blank')
  }

  // Descargar word desde el s3
  const downloadWordS3 = (url: string) => {
    window.open(url, '_blank')
  }

  // Mostrar pdf desde carbone
  /* const generarPDFGotenberg = async(path: string | undefined, notificacionId: number) => {
    if(!acta) throw new Error('No se encontró la acta')

    const actaformated = await formatData(acta, user!, notificacionId)
    
    const data = {
      convertTo: 'docx',
      data: actaformated,
      template: `${path}`
    }
    
    return await showFileWord(data)
  } */

  const generarPDFGotenberg = async(path: string | undefined, actuacionId: number, tipoActuacion: 'ACTUACION' | 'NOTIFICACION') => {
    const { data: response } = await apiJuzgado.post('actuaciones-acumuladas', { id: actuacionId, tipo: tipoActuacion })
    const data: ActuacionResponse = response.data
  
    const actaformated = await formatData(data)
      
    const body = {
      convertTo: 'docx',
      data: actaformated,
      template: `${path}`
    }
      
    return await showFileWord(body)
  }

  return {
    useAction,
    // showPDFCarbone,
    showPDFGotenberg,
    convertToPDF,
    downloadWordS3,
    generarPDFGotenberg
  }
}
