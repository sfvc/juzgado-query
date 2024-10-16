import { Button } from 'flowbite-react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DataPersona, IPersona, PersonaFisica } from '../../interfaces'
import { validationPFisica } from '../validations/validationSchema'
import { FisicaForm, DomicilioForm } from '../components'

interface Props {
    persona: IPersona | null,
    tipoPersona: string
    showDomicilio: boolean,
    setShowDomicilio: (value: boolean) => void,
    data: DataPersona,
    isLoading: boolean,
    onSucces: () => void
}

export const FisicaProvider = ({ persona, tipoPersona, showDomicilio, setShowDomicilio, data, isLoading, onSucces }: Props) => {
  
  const methods = useForm<PersonaFisica>({
    defaultValues: { 
      apellido: persona?.apellido || '',
      nombre: persona?.nombre || '',
      tipo_documento: persona?.tipo_documento || '',
      numero_documento: persona?.numero_documento || '',
      estado_civil: persona?.estado_civil || '',
      fecha_nacimiento: persona?.fecha_nacimiento || '',
      cuil: persona?.cuil || '',
      sexo: persona?.sexo || '',
      email: persona?.email || '',
      nacionalidad_id: persona?.nacionalidad?.id || null,
      tipo_persona: persona?.tipo_persona || tipoPersona,
  
      domicilio: {
        pais_id: persona?.domicilio?.pais_id || null,
        provincia_id: persona?.domicilio?.provincia_id || null,
        departamento_id: persona?.domicilio?.departamento_id || null,
        barrio_id: persona?.domicilio?.barrio_id || null,
        calle: persona?.domicilio?.calle || '',
        numero: persona?.domicilio?.numero || null,
        lote_dpto: persona?.domicilio?.lote_dpto || null,
        manzana_piso: persona?.domicilio?.manzana_piso || null,
      }
    },
    context: { showDomicilio },
    resolver: yupResolver(validationPFisica)
  })

  const onSubmit: SubmitHandler<PersonaFisica> = async (form: PersonaFisica) => {
    console.log(form)
    onSucces()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>

        {/* Persona Fisica */}
        <FisicaForm
          data={data as DataPersona}
          isLoading={isLoading}
        />
        
        {/* Domicilio */}
        <DomicilioForm
          showDomicilio={showDomicilio} 
          setShowDomicilio={setShowDomicilio}
          domicilio= {persona?.domicilio || null}
        />
        
        {/* Buttons */}
        <div className='flex justify-end gap-2'>
          <Button color="failure" onClick={onSucces}>Cancelar</Button>

          <Button color='gray' type='submit' disabled={methods.formState.isSubmitting} isProcessing={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>

      </form>
    </FormProvider>
  )
}