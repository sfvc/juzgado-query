import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Label, TextInput } from 'flowbite-react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormEstado, IEstado } from '../interfaces'
import { useEstado } from '../hooks/useEstado'
import { ColorPicker } from '../components/ColorPicker'

const validationSchema = yup.object().shape({
  nombre: yup.string().required('El nombre es requerido'),
  color: yup.string()
})

interface Props {
  estado: IEstado | null
  onSucces: () => void
}

const DEFAULT_COLOR = '#000000'
  
const EstadoForm = ({ estado, onSucces }: Props) => {
  const { createEstado, updateEstado } = useEstado()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nombre: estado?.nombre || '',
      color: estado?.color || DEFAULT_COLOR,
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormEstado> = async (data: FormEstado) => {
    console.log(data)
    if (estado) await updateEstado.mutateAsync({ id: estado.id, estado: data })
    else await createEstado.mutateAsync(data)
  
    onSucces()
  }

  // Valor actual del color
  const selectedColor: string = watch('color')!

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='nombre' value='Nombre' />
        </div>
        <TextInput
          {...register('nombre')}
          placeholder='Nombre'
          helperText={errors?.nombre && errors?.nombre?.message}
          color={errors?.nombre && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <ColorPicker 
          register={register('color')} 
          handleColor={(name: string, value: string) => setValue(name as 'color', value)} 
          selectedColor={selectedColor}
        />
      </div>

      <div className='flex justify-end'>
        <Button
          type='submit'
          size='md'
          disabled={isSubmitting}
          isProcessing={isSubmitting}
        >
          Guardar
        </Button>
      </div>
    </form>
  )
}

export default EstadoForm
