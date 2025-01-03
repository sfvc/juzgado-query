import { useState } from 'react'
import { Button, Label, Select, Spinner } from 'flowbite-react'
import { useQuery } from '@tanstack/react-query'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DataPersona, FormValues, IPersona } from '../interfaces'
import { personaActions } from '..'
import { DomicilioForm, FisicaForm, JuridicaForm } from './components'
import { domicilioSchema, personaFisicaSchema, personaJuridicaSchema } from './validations/validationSchema'
import { usePersona } from '../hooks/usePersona'
import { TipoPersona, setDefaulValues } from './helpers'

interface Props {
  persona: IPersona | null
  onSucces: () => void
}

export const PersonaForm = ({ persona, onSucces }: Props) => {
  const [ tipoPersona, setTipoPersona ] = useState<string>(persona?.tipo_persona || TipoPersona.FISICA)
  const { createPersona, updatePersona } = usePersona()

  const { data, isLoading } = useQuery<DataPersona>({
    queryKey: ['personas-data'],
    queryFn: personaActions.getDataPersona,
    staleTime: 1000 * 60 * 5
  })

  const validationSchema = 
    tipoPersona === TipoPersona.FISICA
      ? personaFisicaSchema.concat( domicilioSchema )
      : personaJuridicaSchema.concat( domicilioSchema )
    
  const methods = useForm<FormValues>({
    defaultValues: setDefaulValues(persona, tipoPersona),
    resolver: yupResolver(validationSchema)
  })

  const changeTypePersona = (e: React.ChangeEvent<HTMLSelectElement>) => {
    methods.reset()
    
    setTipoPersona(e.target.value)
    methods.setValue('tipo_persona', e.target.value)
  }

  const onSubmit: SubmitHandler<FormValues> = async (form: FormValues) => {
    if (persona) await updatePersona.mutateAsync({id: persona.id, persona: form})
    else await createPersona.mutateAsync(form)

    onSucces()
  }

  if (isLoading) return <div className='flex justify-center'><Spinner size='lg'/></div>
  
  return (
    <div>
      <div className='mb-4'>
        <div className='mb-2 block'>
          <Label
            htmlFor='tipo_persona'
            value='Tipo de Persona'
          />
          <strong className='obligatorio'>(*)</strong>
        </div>
        <Select
          id='tipo_persona'
          value={tipoPersona}
          onChange={(e) => changeTypePersona(e)}
        >
          <option value={TipoPersona.FISICA}>Fisica</option>
          <option value={TipoPersona.JURIDICA}>Juridica</option>
        </Select>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {
            tipoPersona === TipoPersona.FISICA
              ? <FisicaForm data={ data } />
              : <JuridicaForm data={ data } />
          }

          {
            <DomicilioForm
              domicilio={persona?.domicilio}
            />
          }

          {/* Buttons */}
          <div className='flex justify-end gap-2'>
            <Button color="failure" onClick={onSucces}>Cancelar</Button>

            <Button 
              type='button' 
              disabled={methods.formState.isSubmitting} 
              isProcessing={methods.formState.isSubmitting}
              onClick={() => methods.handleSubmit(onSubmit)()}
            >
              {methods.formState.isSubmitting ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
