import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Label, TextInput } from 'flowbite-react'
import { useNacionalidad } from '../hooks/useNacionalidad';
import { FormNacionalidad, INacionalidad } from '../interfaces/localizacion';

const validationSchema = yup.object().shape({
  nombre: yup.string().required('La nacionalidad es requerida')
})

interface Props {
    nacionalidad: INacionalidad | null
    onSucces: () => void
  }
  
const NacionalidadForm = ({ nacionalidad, onSucces }: Props) => {
  const { createNacionalidad, updateNacionalidad, } = useNacionalidad()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { nombre: nacionalidad?.nombre || '' },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormNacionalidad> = async (data: FormNacionalidad) => {
    if (nacionalidad) await updateNacionalidad.mutateAsync({id: nacionalidad.id, nacionalidad: data})
    else await createNacionalidad.mutateAsync(data)
  
    onSucces()
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label
            color='gray'
            htmlFor='nombre'
            value='Nacionalidad'
          />
        </div>
        <TextInput
          {...register('nombre')}
          placeholder='Nombre'
          helperText={errors?.nombre && errors?.nombre?.message} 
          color={errors?.nombre && 'failure'}
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

export default NacionalidadForm
