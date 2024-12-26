import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import type { FormPais, IPais } from '../interfaces/localizacion'
import { Button, Label, TextInput } from 'flowbite-react'
import { usePaises } from '../'

const validationSchema = yup.object().shape({
  nombre: yup.string().required('El pais es requerido')
})

interface Props {
    pais: IPais | null
    onSucces: () => void
  }
  
const PaisForm = ({ pais, onSucces }: Props) => {
  const { createPais, updatePais, } = usePaises()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { nombre: pais?.nombre || '' },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormPais> = async (data: FormPais) => {
    if (pais) await updatePais.mutateAsync({id: pais.id, pais: data})
    else await createPais.mutateAsync(data)
  
    onSucces()
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label
            color='gray'
            htmlFor='nombre'
            value='Pais'
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
          disabled={isSubmitting}
          isProcessing={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}

export default PaisForm
