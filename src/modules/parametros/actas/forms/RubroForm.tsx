import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Label, TextInput } from 'flowbite-react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormRubro, IRubro } from '../interfaces'
import { useRubro } from '../hooks/useRubro'

const validationSchema = yup.object().shape({
  nombre: yup.string().required('El rubro es requerido'),
})

interface Props {
  rubro: IRubro | null
  onSucces: () => void
}
  
const RubroForm = ({ rubro, onSucces }: Props) => {
  const { createRubro, updateRubro } = useRubro()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nombre: rubro?.nombre || '',
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormRubro> = async (data: FormRubro) => {
    if (rubro) await updateRubro.mutateAsync({ id: rubro.id, rubro: data })
    else await createRubro.mutateAsync(data)
  
    onSucces()
  }

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='nombre' value='Rubro Comercial' /><strong className='obligatorio'>(*)</strong>
        </div>
        <TextInput
          {...register('nombre')}
          placeholder='Rubro'
          type='text'
          helperText={errors?.nombre && errors.nombre.message}
          color={errors?.nombre && 'failure'}
        />
      </div>

      <div className='flex justify-end'>
        <Button 
          size='md'
          type='button' 
          disabled={isSubmitting}
          isProcessing={isSubmitting}
          onClick={() => handleSubmit(onSubmit)()}
        >
          Guardar
        </Button>
      </div>
    </form>
  )
}

export default RubroForm
