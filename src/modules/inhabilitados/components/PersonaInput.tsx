import { SearchInput } from '../../../shared'
import { personaActions } from '../../personas'
import { UseFormSetValue } from 'react-hook-form'
import { IPersona } from '../../personas/interfaces'
import { FormInhabilitado } from '../interfaces'

interface Props {
  setValue: UseFormSetValue<FormInhabilitado>
}

export const PersonaInput = ({ setValue }: Props) => {

  // Buscardor de titulares
  const handleSearch = async (query: string) => personaActions.getPersonasByFilter(query)
  const handleSelect = (persona: IPersona) => setValue('persona_id', persona.id)

  return ( 
    <SearchInput<IPersona>
      label="Persona"
      placeholder="Buscar Persona"
      onSearch={handleSearch}
      onSelect={handleSelect}
      renderItem={(item) => (
        <div><strong>{item.apellido}</strong> - {item.numero_documento || 'SIN DOCUMENTO'}</div>
      )}
      renderInput={(item) => { return `${item.apellido} - ${item.numero_documento || 'SIN DOCUMENTO'}`} }
    />
  )
}