import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { actuacionActions } from '..'

export const useSentencia = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const createSentencia = useMutation({
    mutationFn: actuacionActions.createSentencia,
    onSuccess: () => {
      toast.success('Sentencia creada con exito')
      queryClient.clear()
      navigate(-1)
    },
    onError: (error) => {
      toast.error('Error al crear la sentencia')
      console.log(error)
    }
  })

  return {
    createSentencia
  }
}
