import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'flowbite-react'
import { ActaData, ArticuloData, InfraccionData, InfractorData, PropiedadData } from './components'
import { transitoSchema } from './validations/validationSchema'
import { useMutationActa } from '../hooks/useMutationActa'
import { useNavigateActa } from '../../../shared'
import { ACTAS } from '../../../shared/constants'
import type { IActaForm } from '../interfaces/form-interfaces'
import type { IActa } from '../interfaces'

interface Props {
  acta: IActa | null | undefined
}

export const ObrasParticularesForm = ({ acta }: Props) => {
  const { createActa, updateActa } = useMutationActa()
  const { goBack } = useNavigateActa()

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
      tipo_acta: ACTAS.OBRAS_PARTICULARES,

      infractores: acta?.infractores || [],
      infracciones_cometidas: acta?.infracciones_cometidas || [],
      propiedades: acta?.propiedades || [],
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
      <h1 className='font-semibold text-3xl mb-4 text-center dark:text-white'>Acta de Obras Particulares</h1>

      <FormProvider {...methods}>
        <form className='flex flex-col gap-4 w-full' onSubmit={methods.handleSubmit(onSubmit)}>
          <ActaData tipoActa={ACTAS.OBRAS_PARTICULARES}/>
          <InfractorData data={acta?.infractores} />
          <PropiedadData data={acta?.propiedades} />
          <InfraccionData />
          <ArticuloData data={acta?.infracciones_cometidas} />

          <div className='flex justify-end gap-4'>
            <Button type='button' color='failure' className='px-8 titulos' onClick={goBack}>Cancelar</Button>
            <Button type='submit' className='px-8 titulos'>Finalizar</Button>
          </div>
        </form>
      </FormProvider>
    </React.Fragment>
  )
}
