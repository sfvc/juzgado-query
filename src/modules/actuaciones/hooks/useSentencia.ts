import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { actuacionActions } from '..'
import { useInvalidate } from '../../../shared/hooks/useInvalidate'

export const useSentencia = () => {
  const navigate = useNavigate()
  const invalidate = useInvalidate()

  const createSentencia = useMutation({
    mutationFn: actuacionActions.createSentencia,
    onSuccess: () => {
      toast.success('Sentencia creada con exito')
      invalidate('all')
      navigate(-1)
    },
    onError: () => {
      toast.error('Error al crear la sentencia')
    }
  })

  return {
    createSentencia
  }
}
