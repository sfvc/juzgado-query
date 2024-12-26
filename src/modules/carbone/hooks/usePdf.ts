import { useContext } from 'react'
import { useLoading } from '../../../shared'
import { formatData } from '../helpers/formatData'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { showFilePDF } from '../services/carbone-actions'

export const usePdf = (acta?: any) => {
  const useAction = useLoading()
  const { user } = useContext(AuthContext)
    
  const showPDFCarbone = async(path: string | undefined, notificacionId: number) => {
    useAction.actionFn( async () => {
      if(!acta) throw new Error('No se encontró la acta')

      const actaformated = await formatData(acta, user!, notificacionId)
      console.log(actaformated)
    
      const data = {
        convertTo: 'pdf',
        data: actaformated,
        template: `${path}`
      }
    
      await showFilePDF(data)
    })
  }
    
  const showPDFGotenberg = (url: string) => {
    window.open(url, '_blank')
  }
      
  return {
    useAction,
    showPDFCarbone,
    showPDFGotenberg
  }
}
