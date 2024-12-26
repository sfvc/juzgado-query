import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react'
import { useQuery } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { estadoActions } from '../../parametros/actas'
import { useMutationEstado } from '../hooks/useMutationEstado'
import type { IEstadoActa, EstadoActaForm } from '../interfaces'

const validationSchema = yup.object().shape({
  estado_id: yup.number()
    .transform((value) => isNaN(value) ? '' : value)
    .required('El estado es requerido'),
})
  
interface Props {
  actaId: number,
  onSucces: () => void
}

const EstadoForm = ({ actaId, onSucces }: Props) => {
  const { createEstado } = useMutationEstado()

  const { data: estados, isLoading } = useQuery<IEstadoActa[]>({
    queryKey: ['estados-actas'],
    queryFn: estadoActions.getAllEstadosActa,
    staleTime: 1000 * 60 * 5
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EstadoActaForm>({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<EstadoActaForm> = async (form: EstadoActaForm) => {
    await createEstado.mutateAsync({ id: actaId, form })
    onSucces()
  }

  if (isLoading) return <div className='flex justify-center'><Spinner size='lg'/></div>
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className='mb-4'>
        <div className='mb-2 block'>
          <Label htmlFor='estado_id' value='Estado' /><strong className='obligatorio'>(*)</strong>
        </div>
        <Select
          {...register('estado_id', { valueAsNumber: true })}
          helperText={errors?.estado_id && errors.estado_id.message}
          color={errors?.estado_id && 'failure'}
        >
          <option value='' hidden>Seleccione el estado</option>
          {
            estados?.map((estado: IEstadoActa) => (
              <option key={estado.id} value={estado.id}>{estado.nombre}</option>
            ))
          }
        </Select>
      </div>

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label htmlFor='observaciones' value='Observaciones' />
        </div>
        <TextInput
          {...register('observaciones')}
          type='text'
          placeholder='Observaciones'
        />
      </div>

      {/* Buttons */}
      <div className='flex justify-end gap-2'>
        <Button color="failure" onClick={onSucces}>Cancelar</Button>

        <Button 
          size='md'
          type='submit' 
          disabled={isSubmitting}
          isProcessing={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
      
    </form>
  )
}

export default EstadoForm
