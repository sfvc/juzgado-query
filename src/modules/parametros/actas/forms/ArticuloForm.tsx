import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Label, Select, Spinner, Textarea, TextInput } from 'flowbite-react'
import { useQuery } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormArticulo, IArticulo } from '../interfaces'
import { useArticulo } from '../hooks/useArticulo'
import { articuloActions } from '..'
import { TIPO_ACTAS } from '../../../../shared/constants'
import { actaActions } from '../../../actas'

const validationSchema = yup.object().shape({
  numero: yup.string(),
  detalle: yup.string().required('El detalle es requerido'),
  inciso: yup.string(),
  tipo_acta: yup.string(),
  tipo_infraccion: yup.string(),
  norma_legal: yup.string(),
  descuento: yup.number(),
  valor_desde: yup.number(),
  valor_hasta: yup.number()
})

interface Props {
    articulo: IArticulo | null
    onSucces: () => void
}
  
const ArticuloForm = ({ articulo, onSucces }: Props) => {
  const { createArticulo, updateArticulo } = useArticulo()

  const { data, isLoading } = useQuery({
    queryKey: ['articulos-data'], 
    queryFn: actaActions.getAllTipoInfracciones,  
    staleTime: 1000 * 60 * 5, 
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      numero: articulo?.numero.toString() || '',
      detalle: articulo?.detalle || '',
      inciso: articulo?.inciso || '',
      tipo_acta: articulo?.tipo_acta || '',
      tipo_infraccion: articulo?.tipo_infraccion || '',
      norma_legal: articulo?.norma_legal || '',
      descuento: articulo?.descuento || 0,
      valor_desde: articulo?.valor_desde || 0,
      valor_hasta: articulo?.valor_hasta || 0
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormArticulo> = async (form: FormArticulo) => {
    console.log(form)
    if (articulo) await updateArticulo.mutateAsync({ id: articulo.id, articulo: form })
    else await createArticulo.mutateAsync(form)
  
    onSucces()
  }
  
  if (isLoading) return <div className='flex justify-center'><Spinner size='lg'/></div>
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='numero' value='Articulo' />
        </div>
        <TextInput
          {...register('numero')}
          placeholder='Numero de Articulo'
          type='text'
          helperText={errors?.numero && errors.numero.message}
          color={errors?.numero && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block'>
          <Label htmlFor='detalle' value='Detalle' /><strong className='obligatorio'>(*)</strong>
        </div>
        <Textarea
          {...register('detalle')}
          placeholder='Detalle de articulo...'
          rows={3}
          helperText={errors?.detalle && errors.detalle.message}
          color={errors?.detalle && 'failure'}
          className='p-2.5'
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label htmlFor='tipo_acta' value='Tipo de Acta' />
          </div>
          <Select
            {...register('tipo_acta')}
            helperText={errors?.tipo_acta && errors.tipo_acta.message}
            color={errors?.tipo_acta && 'failure'}
          >
            <option value='' hidden>Seleccione el tipo</option>
            {
              TIPO_ACTAS?.map((tipo: string, i: number) => (
                <option key={i} value={tipo}>{tipo}</option>
              ))
            }
          </Select>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label
              htmlFor='tipo_infraccion'
              value='Tipo de infraccion'
            />
          </div>
          <Select
            {...register('tipo_infraccion')}
            helperText={errors?.tipo_infraccion && errors.tipo_infraccion.message}
            color={errors?.tipo_infraccion && 'failure'}
          >
            <option value='' hidden>Seleccione el tipo de infraccion</option>
            {data?.map((infraccion: string, i: number) => (
              <option key={i} value={infraccion}>
                {infraccion}
              </option>
            ))}
          </Select>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label
              color='gray'
              htmlFor='valor_desde'
              value='Valor Desde'
            />
          </div>
          <TextInput
            type='number'
            {...register('valor_desde')}
            placeholder='Valor Desde'
            helperText={errors?.valor_desde && errors.valor_desde.message}
            color={errors?.valor_desde && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label
              color='gray'
              htmlFor='valor_hasta'
              value='Valor Hasta'
            />
          </div>
          <TextInput
            type='number'
            {...register('valor_hasta')}
            placeholder='Valor Hasta'
            helperText={errors?.valor_hasta && errors.valor_hasta.message}
            color={errors?.valor_hasta && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label
              htmlFor='norma_legal'
              value='Norma Legal'
            />
          </div>
          <TextInput
            {...register('norma_legal')}
            placeholder='Norma Legal'
            helperText={errors?.norma_legal && errors.norma_legal.message}
            color={errors?.norma_legal && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label
              htmlFor='inciso'
              value='Inciso'
            />
          </div>
          <TextInput
            {...register('inciso')}
            placeholder='Inciso'
            helperText={errors?.inciso && errors.inciso.message}
            color={errors?.inciso && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label
              htmlFor='descuento'
              value='¿Recibe Descuento?'
            />
          </div>
          <Select
            {...register('descuento')}
            helperText={errors?.descuento && errors.descuento.message}
            color={errors?.descuento && 'failure'}
          >
            <option value='' hidden>Seleccione una opcion</option>
            <option value={1}>Si</option>
            <option value={0}>No</option>
          </Select>
        </div>
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

export default ArticuloForm
