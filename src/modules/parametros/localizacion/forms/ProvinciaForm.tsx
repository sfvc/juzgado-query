import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react'
import { useQuery } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import type { FormProvincia, IProvincia, IPais } from '../interfaces/localizacion'
import { useProvincia } from '../hooks/useProvincia'
import { paisActions } from '..'

const validationSchema = yup.object().shape({
  nombre: yup.string().required('La provincia es requerida'),
  pais_id: yup.string().required('Debe seleccionar un país')
})

interface Props {
    provincia: IProvincia | null
    onSucces: () => void
  }
  
const ProvinciaForm = ({ provincia, onSucces }: Props) => {
  const { createProvincia, updateProvincia } = useProvincia()

  const { data: paises, isLoading } = useQuery({
    queryKey: ['paises', 'all'], 
    queryFn: paisActions.getAllPaises,  
    staleTime: 1000 * 60 * 5, 
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nombre: provincia?.nombre || '',
      pais_id: provincia?.pais?.id?.toString() || ''
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormProvincia> = async (data: FormProvincia) => {
    if (provincia) await updateProvincia.mutateAsync({ id: provincia.id, provincia: data })
    else await createProvincia.mutateAsync(data)
  
    onSucces()
  }

  if (isLoading) return <div className='flex justify-center'><Spinner size='lg'/></div>
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label
            color='gray'
            htmlFor='nombre'
            value='Provincia'
          />
        </div>
        
        <TextInput
          {...register('nombre')}
          placeholder='Nombre'
          helperText={errors?.nombre && errors?.nombre?.message} 
          color={errors?.nombre && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block'>
          <Label
            htmlFor='pais_id'
            value='Pais'
          />
          <strong className='obligatorio'>(*)</strong>
        </div>

        <Select {...register('pais_id')} 
          helperText={errors?.pais_id && errors?.pais_id?.message} 
          color={errors?.pais_id && 'failure'}
        >
          <option value='' hidden>Seleccione un pais</option>
          {
            paises?.map((pais: IPais) => (
              <option key={pais.id} value={pais.id}>{pais.nombre}</option>
            ))
          }

        </Select>
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

export default ProvinciaForm
