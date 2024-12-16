import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { actaActions } from '..'
import { IActaForm } from '../interfaces/form-interfaces'
import { useNavigate } from 'react-router-dom'
import { IActa } from '../interfaces'
import { useQueryParams } from '../../../shared'

export const useMutationActa = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { filters } = useQueryParams()

  const createActa = useMutation({
    mutationFn: actaActions.createActa,
    onSuccess: (data: IActa) => {
      navigate(`/actas?numero_acta=${data.numero_acta}`)

      toast.success('Acta creada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el acta')
      console.log(error)
    }
  })

  const updateActa = useMutation({
    mutationFn: ({ id, acta }: { id: number, acta: IActaForm }) => actaActions.updateActa(id, acta),
    onSuccess: (data: IActa) => {
      navigate(`/actas?numero_acta=${data.numero_acta}`)

      toast.success('Acta actualizada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al actualizar el acta')
      console.log(error)
    }
  })

  const deleteActa = useMutation({
    mutationFn: (id: number) => actaActions.deleteActa(id),
    onSuccess: () => {
      toast.success('Acta eliminada con exito')
      queryClient.invalidateQueries({ queryKey: ['actas', {...filters}] })
    },
    onError: (error) => {
      toast.error('Error al eliminar el acta')
      console.log(error)
    }
  })

  return {
    createActa,
    updateActa,
    deleteActa
  }
}
