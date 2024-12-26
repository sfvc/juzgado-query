import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Label, TextInput } from 'flowbite-react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import type { IBarrio, FormBarrio, ILocalidad } from '../interfaces/localizacion'
import { localidadActions } from '..'
import { useBarrio } from '../hooks/useBarrio'
import { SearchInput } from '../../../../shared'

const validationSchema = yup.object().shape({
  nombre: yup.string().required('El departamento es requerido'),
  localidad_id: yup.string().required('Debe seleccionar una localidad')
})

interface Props {
    barrio: IBarrio | null
    onSucces: () => void
  }
  
const BarrioForm = ({ barrio, onSucces }: Props) => {
  const { createBarrio, updateBarrio } = useBarrio()

  // Buscardor de localidades
  const handleSearch = async (query: string) => localidadActions.getLocalidadesByFilter(query)

  const handleSelect = (localidad: ILocalidad) => setValue('localidad_id', localidad.id.toString())

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nombre: barrio?.nombre || '',
      localidad_id: barrio?.localidad?.id?.toString() || ''
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormBarrio> = async (data: FormBarrio) => {
    if (barrio) await updateBarrio.mutateAsync({ id: barrio.id, barrio: data })
    else await createBarrio.mutateAsync(data)
  
    onSucces()
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label
            color='gray'
            htmlFor='nombre'
            value='Barrio'
          />
        </div>
        
        <TextInput
          {...register('nombre')}
          placeholder='Nombre'
          helperText={errors?.nombre && errors?.nombre?.message} 
          color={errors?.nombre && 'failure'}
        />
      </div>

      <SearchInput<ILocalidad>
        label="Localidad"
        placeholder="Buscar localidad"
        onSearch={handleSearch}
        onSelect={handleSelect}
        renderItem={(item) => (
          <div><strong>{item.nombre}</strong> - CP. {item.codigo_postal}</div>
        )}
        renderInput={(item) => { return `${item.nombre} - CP. ${item.codigo_postal}`} }
      />

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

export default BarrioForm
