import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'flowbite-react'
import { transitoSchema } from './validations/validationSchema'
import { ActaData, ArticuloData, InfraccionData, InfractorData } from './components'
import { IActaForm } from '../interfaces/form-interfaces'
import { ACTAS } from '../../../shared/constants'
import { useMutationActa } from '../hooks/useMutation'
import { IActa } from '../interfaces'
import { ComercioData } from './components/ComercioData'

interface Props {
  acta: IActa | null | undefined
}

export const BromatologiaForm = ({ acta }: Props) => {
  const { createActa, updateActa } = useMutationActa()

  const methods = useForm<IActaForm>({
    defaultValues: {
      numero_acta: acta?.numero_acta || '',
      numero_causa: acta?.numero_causa || '',
      fecha: acta?.fecha || '',
      fecha_prescripcion: acta?.fecha_prescripcion || '',
      hora: acta?.hora || '',
      prioridad_id: acta?.prioridad_id || 0,
      retencion_vehiculo: acta?.retencion_vehiculo || 0,
      retencion_licencia: acta?.retencion_licencia || 0,
      notificado: acta?.notificado || 0,
      calle: acta?.calle || '',
      observaciones: acta?.observaciones || '',
      tipo_acta: ACTAS.BROMATOLOGIA,

      infractores: acta?.infractores || [],
      infracciones_cometidas: acta?.infracciones_cometidas || [],
      rubros: acta?.comercio?.rubros || [],
      nombre_fantasia: acta?.comercio?.nombre_fantasia || ''
    },
    resolver: yupResolver(transitoSchema),
  })

  const onSubmit: SubmitHandler<IActaForm> = async (form: IActaForm) => {
    console.log(form)

    if(acta) await updateActa.mutateAsync({ id: acta.id, acta: form })
    else await createActa.mutateAsync(form)
  }

  return (
    <React.Fragment>
      <h1 className='font-semibold text-3xl mb-4 text-center dark:text-white'>Acta de Bromatologia</h1>

      <FormProvider {...methods}>
        <form className='flex flex-col gap-4 w-full' onSubmit={methods.handleSubmit(onSubmit)}>
          <ActaData tipoActa={ACTAS.BROMATOLOGIA}/>
          <InfractorData data={acta?.infractores} />
          <ComercioData data={acta?.comercio} />
          <InfraccionData />
          <ArticuloData data={acta?.infracciones_cometidas} />

          <div className='flex justify-end'>
            <Button type='submit' className='px-8 titulos'>
              Finalizar
            </Button>
          </div>
        </form>
      </FormProvider>
    </React.Fragment>
  )
}
