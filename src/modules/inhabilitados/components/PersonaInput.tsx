import { clearNames, SearchInput } from '../../../shared'
import { personaActions } from '../../personas'
import { UseFormSetValue } from 'react-hook-form'
import { IPersona } from '../../personas/interfaces'
import { FormInhabilitado } from '../interfaces'

interface Props {
  setValue: UseFormSetValue<FormInhabilitado>
  persona?: IPersona
}

export const PersonaInput = ({ setValue, persona }: Props) => {

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
        <div><strong>{clearNames(item.apellido, item.nombre)}</strong> - {item.numero_documento || 'SIN DOCUMENTO'}</div>
      )}
      renderInput={(item) => { return `${clearNames(item.apellido, item.nombre)} - ${item.numero_documento || 'SIN DOCUMENTO'}`} }
      resetInput={() => setValue('persona_id', 0)}
      defaultValue={clearNames(persona?.apellido, persona?.nombre, true)}
    />
  )
}