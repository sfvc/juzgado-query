import { apiJuzgado } from '../../../api/config'
import { useLoading } from '../../../shared'
import { formatData } from '../helpers/formatData'
import { showFileWord } from '../services/carbone-actions'
import type { ActuacionResponse } from '../../actuaciones/interfaces/actuacion'

export const usePdf = () => {
  const useAction = useLoading()

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
