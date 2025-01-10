/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'
import { apiJuzgado } from '../../../api/config'
import { useLoading } from '../../../shared'
import { formatData } from '../helpers/formatData'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { showFilePDF } from '../services/carbone-actions'

export const usePdf = (acta?: any) => {
  const useAction = useLoading()
  const { user } = useContext(AuthContext)
    
  // Mostrar pdf desde carbone
  const showPDFCarbone = async(path: string | undefined, notificacionId: number) => {
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
  }
    
  // Mostrar pdf desde el s3
  const showPDFGotenberg = (url: string) => {
    window.open(url, '_blank')
  }

  // Convertir word a pdf desde el back con gotenberg
  const convertToPDF = async (url: string) => {
    useAction.actionFn( async () => {
      const response = await apiJuzgado.post('servicios/convertir-url-pdf', { file_url: url }, { responseType: 'blob' })
      const fileBlob = response.data
      const file = new Blob([fileBlob], { type: 'application/pdf' })
      const fileURL = URL.createObjectURL(file)
    
      window.open(fileURL, '_blank')

    })
  }

  // Descargar word desde el s3
  const downloadWordS3 = (url: string) => {
    window.open(url, '_blank')
  }

  return {
    useAction,
    showPDFCarbone,
    showPDFGotenberg,
    convertToPDF,
    downloadWordS3
  }
}
