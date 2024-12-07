import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Color, FormVehiculo, IVehiculo, Marca, Tipo } from '../interfaces'
import { useVehiculo } from '../hooks/useVehiculo'
import { vehiculoActions } from '..'
import { TitularInput } from '../components/TitularInput'

const validationSchema = yup.object().shape({
  dominio: yup.string().required('El dominio es requerido'),
  titular_id: yup.number().nullable(),
  marca_id: yup.number().nullable(),
  tipo_id: yup.number().nullable(),
  color_id: yup.number().nullable(),
  modelo: yup.string(),
  numero_chasis: yup.string(),
  numero_motor: yup.string(),
})

interface Props {
  vehiculo: IVehiculo | null
  onSucces: () => void
}
  
const VehiculoForm = ({ vehiculo, onSucces }: Props) => {
  const [ editTitular, setEditTitular ] = useState<boolean>(false)
  const { createVehiculo, updateVehiculo } = useVehiculo()
  
  const { data, isLoading } = useQuery({
    queryKey: ['vehiculos-data'],
    queryFn: vehiculoActions.getDataVehiculo,
    staleTime: 1000 * 60 * 5
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormVehiculo>({
    defaultValues: { 
      dominio: vehiculo?.dominio || '',
      titular_id: vehiculo?.titular?.id || null,
      marca_id: vehiculo?.marca?.id  || null,
      tipo_id: vehiculo?.tipo?.id  || null,
      color_id: vehiculo?.color?.id  || null,
      modelo: vehiculo?.modelo || '',
      numero_chasis: vehiculo?.numero_chasis || '',
      numero_motor: vehiculo?.numero_motor || '',
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormVehiculo> = async (form: FormVehiculo) => {
    if (vehiculo) await updateVehiculo.mutateAsync({id: vehiculo.id, vehiculo: form})
    else await createVehiculo.mutateAsync(form)
  
    onSucces()
  }

  if (isLoading) return <div className='flex justify-center'><Spinner size='lg'/></div>
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className='grid grid-cols-2 gap-4'>
        <TitularInput vehiculo={vehiculo} editTitular={editTitular} setEditTitular={setEditTitular} setValue={setValue} />
      
        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='dominio' value='Dominio' /><strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('dominio')}
            type='text'
            placeholder='Dominio'
            helperText={errors?.dominio && errors?.dominio?.message} 
            color={errors?.dominio && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label htmlFor='tipo_infraccion' value='Tipo de infraccion' />
          </div>
          <Select
            {...register('marca_id', { valueAsNumber: true })}
            helperText={errors?.marca_id && errors.marca_id.message}
            color={errors?.marca_id && 'failure'}
          >
            <option value='' hidden>Seleccione la marca</option>
            {data?.marcas.map((marca: Marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </Select>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='modelo' value='Modelo' />
          </div>
          <TextInput
            {...register('modelo')}
            type='text'
            placeholder='Modelo'
            helperText={errors?.modelo && errors?.modelo?.message} 
            color={errors?.modelo && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label htmlFor='tipo_id' value='Tipo de Vehiculo' />
          </div>
          <Select
            {...register('tipo_id', { valueAsNumber: true })}
            helperText={errors?.tipo_id && errors.tipo_id.message}
            color={errors?.tipo_id && 'failure'}
          >
            <option value='' hidden>Seleccione el tipo</option>
            {data?.tipo.map((tipo: Tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </Select>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label htmlFor='color_id' value='Color' />
          </div>
          <Select
            {...register('color_id', { valueAsNumber: true })}
            helperText={errors?.color_id && errors.color_id.message}
            color={errors?.color_id && 'failure'}
          >
            <option value='' hidden>Seleccione el color</option>
            {data?.colores.map((color: Color) => (
              <option key={color.id} value={color.id}>
                {color.nombre}
              </option>
            ))}
          </Select>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='numero_chasis' value='Numero de Chasis' />
          </div>
          <TextInput
            {...register('numero_chasis')}
            type='text'
            placeholder='Numero de Chasis'
            helperText={errors?.numero_chasis && errors?.numero_chasis?.message} 
            color={errors?.numero_chasis && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='numero_motor' value='Numero de Motor' />
          </div>
          <TextInput
            {...register('numero_motor')}
            type='text'
            placeholder='Numero de Motor'
            helperText={errors?.numero_motor && errors?.numero_motor?.message} 
            color={errors?.numero_motor && 'failure'}
          />
        </div>
      </div>

      {/* Buttons */}
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

export default VehiculoForm
