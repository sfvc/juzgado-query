import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { actaActions } from '..'
import { IActaForm } from '../interfaces/form-interfaces'
import { useNavigate } from 'react-router-dom'
import { IActa } from '../interfaces'
import { useQueryParams } from '../../../shared'

// Definir el tipo para el error que viene del backend
interface BackendError {
  response?: {
    data?: {
      mensaje?: string;
      errores?: Record<string, string[]>;
    };
  };
}

export const useMutationActa = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { filters } = useQueryParams()

  const createActa = useMutation({
    mutationFn: actaActions.createActa,
    onSuccess: (data: IActa) => {
      navigate(`/actas?numero_acta=${data.numero_acta}`)
      toast.success('Acta creada con éxito')
      queryClient.clear()
    },
    onError: (error: BackendError) => {
      if (error.response?.data?.errores) {
        // Obtener el primer error específico del campo
        const errores = error.response.data.errores
        const [campo, mensajes] = Object.entries(errores)[0]
        const mensajeError = mensajes[0]

        // Mostrar el mensaje específico en un toast
        toast.error(`Error en ${campo}: ${mensajeError}`)
      } else {
        // Mensaje genérico si no hay detalles específicos
        toast.error('Error al crear el acta')
      }
      console.error(error) // Mantener el log para depuración
    }
  })

  const updateActa = useMutation({
    mutationFn: ({ id, acta }: { id: number; acta: IActaForm }) =>
      actaActions.updateActa(id, acta),
    onSuccess: (data: IActa) => {
      navigate(`/actas?numero_acta=${data.numero_acta}`)
      toast.success('Acta actualizada con éxito')
      queryClient.clear()
    },
    onError: (error: BackendError) => {
      if (error.response?.data?.errores) {
        const errores = error.response.data.errores
        const [campo, mensajes] = Object.entries(errores)[0]
        const mensajeError = mensajes[0]
        toast.error(`Error en ${campo}: ${mensajeError}`)
      } else {
        toast.error('Error al actualizar el acta')
      }
      console.error(error)
    }
  })

  const deleteActa = useMutation({
    mutationFn: (id: number) => actaActions.deleteActa(id),
    onSuccess: () => {
      toast.success('Acta eliminada con éxito')
      queryClient.invalidateQueries({ queryKey: ['actas', { ...filters }] })
    },
    onError: (error: BackendError) => {
      if (error.response?.data?.mensaje) {
        toast.error(error.response.data.mensaje)
      } else {
        toast.error('Error al eliminar el acta')
      }
      console.error(error)
    }
  })

  return {
    createActa,
    updateActa,
    deleteActa
  }
}
