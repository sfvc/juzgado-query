import { useState } from 'react'
import { Label, Select } from 'flowbite-react'
import { DataPersona, IPersona } from '../interfaces'
import { HumanaForm } from './HumanaForm'
import { useQuery } from '@tanstack/react-query'
import { personaActions } from '..'
// import { JuridicaForm } from './JuridicaForm'

interface Props {
    persona: IPersona | null
    onSucces: () => void
}

const enum TipoPersona {
  HUMANA = 'HUMANA',
  JURIDICA = 'JURIDICA'
}

export const PersonaForm = ({ persona, onSucces }: Props) => {
  const [ tipoPersona, setTipoPersona ] = useState<string>(persona?.tipo_persona || TipoPersona.HUMANA)

  const { data, isLoading } = useQuery<DataPersona>({
    queryKey: ['personas-data'],
    queryFn: personaActions.getDataPersona,
    staleTime: 1000 * 60 * 5
  })
  
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
          onChange={(e) => setTipoPersona(e.target.value)}
        >
          <option value={TipoPersona.HUMANA}>Humana</option>
          <option value={TipoPersona.JURIDICA}>Juridica</option>
        </Select>
      </div>

      {/* {
        tipoPersona === TipoPersona.HUMANA
          ? <HumanaForm persona={persona} onSucces={onSucces} /> 
          : <JuridicaForm persona={persona} onSucces={onSucces} />
      } */}

      {
        tipoPersona === TipoPersona.HUMANA && 
        <HumanaForm 
          persona={persona} 
          onSucces={onSucces} 
          tipoPersona={tipoPersona}
          data={data as DataPersona}
          isLoading={isLoading}
        /> 
      }
    </div>
  )
}
