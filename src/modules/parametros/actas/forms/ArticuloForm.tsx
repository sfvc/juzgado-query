import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Label, Modal, Select, Spinner, Textarea, TextInput } from 'flowbite-react'
import { useQuery } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useArticulo } from '../hooks/useArticulo'
import { TIPO_ACTAS } from '../../../../shared/constants'
import { actaActions } from '../../../actas'
import type { FormArticulo, IArticulo, IConducta } from '../interfaces'

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

  const [conductas, setConductas] = useState<IConducta[]>(
    articulo?.conductas?.length
      ? articulo.conductas
      : articulo?.conducta
        ? [{ conducta: articulo.conducta, valor_desde: 0, valor_hasta: 0 }]
        : []
  )
  const [openConducta, setOpenConducta] = useState<boolean>(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [conductaForm, setConductaForm] = useState({ conducta: '', valor_desde: '', valor_hasta: '' })
  const [conductaError, setConductaError] = useState<string>('')

  const onOpenConducta = (index: number | null = null) => {
    const actual = index !== null ? conductas[index] : null
    setEditIndex(index)
    setConductaForm({
      conducta: actual?.conducta || '',
      valor_desde: actual ? String(actual.valor_desde) : '',
      valor_hasta: actual ? String(actual.valor_hasta) : ''
    })
    setConductaError('')
    setOpenConducta(true)
  }

  const onSaveConducta = () => {
    const desde = Number(conductaForm.valor_desde || 0)
    const hasta = Number(conductaForm.valor_hasta || 0)

    if (!conductaForm.conducta.trim()) return setConductaError('La conducta es requerida')
    if (hasta < desde) return setConductaError('El valor hasta no puede ser menor al valor desde')

    const item: IConducta = {
      ...(editIndex !== null ? conductas[editIndex] : {}),
      conducta: conductaForm.conducta.trim(),
      valor_desde: desde,
      valor_hasta: hasta
    }

    setConductas(prev => editIndex !== null ? prev.map((c, i) => i === editIndex ? item : c) : [...prev, item])
    setOpenConducta(false)
  }

  const onSubmit: SubmitHandler<FormArticulo> = async (formData: FormArticulo) => {
    const form = { ...formData, conductas }
    if (articulo) await updateArticulo.mutateAsync({ id: articulo.id, articulo: form })
    else await createArticulo.mutateAsync(form)

    onSucces()
  }

  if (isLoading) return <div className='flex justify-center'><Spinner size='lg' /></div>

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

      <div className='mb-4'>
        <div className='mb-2 flex items-center justify-between'>
          <Label value='Conductas' />
          <Button type='button' size='xs' onClick={() => onOpenConducta()}>Agregar conducta</Button>
        </div>
        <div className='border rounded-lg divide-y dark:border-gray-600 dark:divide-gray-600'>
          {conductas.length > 0
            ? conductas.map((c, i) => (
              <div key={i} className='flex items-center justify-between gap-4 p-2.5 text-sm dark:text-white'>
                <div className='flex-1'>
                  <p>{c.conducta}</p>
                  <p className='text-gray-500 dark:text-gray-400'>Multa de {c.valor_desde} a {c.valor_hasta} UM</p>
                </div>
                <div className='flex gap-2'>
                  <Button type='button' size='xs' color='success' onClick={() => onOpenConducta(i)}>Editar</Button>
                  <Button type='button' size='xs' color='failure' onClick={() => setConductas(prev => prev.filter((_, idx) => idx !== i))}>Quitar</Button>
                </div>
              </div>
            ))
            : <p className='p-2.5 text-sm text-gray-500 dark:text-gray-400'>Sin conductas agregadas</p>}
        </div>
      </div>

      <Modal show={openConducta} onClose={() => setOpenConducta(false)} size='lg'>
        <Modal.Header>{editIndex === null ? 'Agregar Conducta' : 'Editar Conducta'}</Modal.Header>
        <Modal.Body>
          <div className='mb-4'>
            <div className='mb-2 block'>
              <Label htmlFor='conducta_nueva' value='Conducta' /><strong className='obligatorio'>(*)</strong>
            </div>
            <Textarea
              id='conducta_nueva'
              rows={3}
              placeholder='Conducta del articulo...'
              value={conductaForm.conducta}
              onChange={(e) => setConductaForm({ ...conductaForm, conducta: e.target.value })}
              className='p-2.5'
            />
          </div>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <div className='mb-2 block'><Label htmlFor='conducta_desde' value='Valor Desde (UM)' /></div>
              <TextInput
                id='conducta_desde'
                type='number'
                value={conductaForm.valor_desde}
                onChange={(e) => setConductaForm({ ...conductaForm, valor_desde: e.target.value })}
              />
            </div>
            <div>
              <div className='mb-2 block'><Label htmlFor='conducta_hasta' value='Valor Hasta (UM)' /></div>
              <TextInput
                id='conducta_hasta'
                type='number'
                value={conductaForm.valor_hasta}
                onChange={(e) => setConductaForm({ ...conductaForm, valor_hasta: e.target.value })}
              />
            </div>
          </div>
          {conductaError && <p className='text-sm text-red-600 mb-4'>{conductaError}</p>}
          <div className='flex justify-end'>
            <Button type='button' onClick={onSaveConducta}>Aceptar</Button>
          </div>
        </Modal.Body>
      </Modal>

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
          type='button'
          size='md'
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

export default ArticuloForm
