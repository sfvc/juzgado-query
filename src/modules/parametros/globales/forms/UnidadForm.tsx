import { Button, Label, Select, TextInput } from 'flowbite-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormUnidad, IUnidad } from '../interfaces'
import { useUnidad } from '../hooks/useUnidad'


const validationSchema = yup.object().shape({
  valor: yup.number()
    .transform((valor) => isNaN(valor) ? null : valor)
    .required('El valor es requerido'),
  fecha_desde: yup.string().required('La fecha desde es requerida'),
  fecha_hasta: yup.string().required('La fecha hasta es requerida'),
})

interface Props {
    unidad: IUnidad | null
    onSucces: () => void
  }
  
const UnidadForm = ({ unidad, onSucces }: Props) => {
  const { createUnidad, updateUnidad } = useUnidad()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { 
      valor: unidad?.valor || '',
      fecha_desde: unidad?.fecha_desde || '',
      fecha_hasta: unidad?.fecha_hasta || '',
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormUnidad> = async (data: FormUnidad) => {
    if (unidad) await updateUnidad.mutateAsync({id: unidad.id, unidad: data})
    else await createUnidad.mutateAsync(data)
  
    onSucces()
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='valor' value='Valor' /><strong className='obligatorio'>(*)</strong>
        </div>
        <TextInput
          {...register('valor')}
          type='number'
          placeholder='Valor'
          helperText={errors?.valor && errors?.valor?.message} 
          color={errors?.valor && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='fecha_desde' value='Fecha desde' /><strong className='obligatorio'>(*)</strong>
        </div>
        <TextInput
          {...register('fecha_desde')}
          type='date'
          helperText={errors?.fecha_desde && errors?.fecha_desde?.message} 
          color={errors?.fecha_desde && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='fecha_hasta' value='Fecha hasta' /><strong className='obligatorio'>(*)</strong>
        </div>
        <TextInput
          {...register('fecha_hasta')}
          type='date'
          helperText={errors?.fecha_hasta && errors?.fecha_hasta?.message} 
          color={errors?.fecha_hasta && 'failure'}
        />
      </div>

      <div className='flex justify-end gap-2'>
        <Button color="failure" onClick={onSucces}>Cancelar</Button>
        <Button 
          size='md'
          type='submit' 
          color="gray"
          disabled={isSubmitting}
          isProcessing={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}

export default UnidadForm
