import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from 'flowbite-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { transitoSchema } from './validations/validationSchema'
import { ActaData, ArticuloData, InfraccionData, InfractorData, VehiculoData } from './components'
import { IActaForm } from '../interfaces/form-interfaces'
import { ACTAS } from '../../../shared/constants'
import { useMutationActa } from '../hooks/useMutationActa'
import { IActa } from '../interfaces'
import { formatVehiculo } from '../helpers/formatVehiculo'
import { useNavigateActa } from '../../../shared'

interface Props {
  acta: IActa | null | undefined
}

export const TransitoForm = ({ acta }: Props) => {
  const { createActa, updateActa } = useMutationActa()
  const { goBack } = useNavigateActa()
  

  const methods = useForm<IActaForm>({
    defaultValues: {
      numero_acta: acta?.numero_acta || '',
      numero_causa: acta?.numero_causa || '',
      fecha: acta?.fecha || '',
      fecha_prescripcion: acta?.fecha_prescripcion || '',
      hora: acta?.hora || '',
      prioridad_id: acta?.prioridad_id,
      retencion_vehiculo: acta?.retencion_vehiculo || 0,
      retencion_licencia: acta?.retencion_licencia || 0,
      notificado: acta?.notificado || 0,
      calle: acta?.calle || '',
      observaciones: acta?.observaciones || '',
      tipo_acta: ACTAS.TRANSITO,

      infractores: acta?.infractores || [],
      infracciones_cometidas: acta?.infracciones_cometidas || [],
      vehiculo_id: acta?.vehiculo?.id
    },
    resolver: yupResolver(transitoSchema),
  })

  const onSubmit: SubmitHandler<IActaForm> = async (form: IActaForm) => {
    if(acta) await updateActa.mutateAsync({ id: acta.id, acta: form })
    else await createActa.mutateAsync(form)
  }

  return (
    <React.Fragment>
      <h1 className='font-semibold text-3xl mb-4 text-center dark:text-white'>Acta de Transito</h1>

      <FormProvider {...methods}>
        <form className='flex flex-col gap-4 w-full' onSubmit={methods.handleSubmit(onSubmit)}>
          <ActaData tipoActa={ACTAS.TRANSITO}/>
          <InfractorData data={acta?.infractores} />
          <InfraccionData />
          <ArticuloData data={acta?.infracciones_cometidas} />
          <VehiculoData data={formatVehiculo(acta?.vehiculo)} />

          <div className='flex justify-end gap-4'>
            <Button type='button' color='failure' className='px-4' onClick={goBack}>Cancelar</Button>
            <Button type='submit' className='px-4'>Finalizar</Button>
          </div>
        </form>
      </FormProvider>
    </React.Fragment>
  )
}
