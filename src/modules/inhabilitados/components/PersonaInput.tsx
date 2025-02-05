import { clearNames, SearchInput } from '../../../shared'
import { personaActions } from '../../personas'
import { UseFormSetValue } from 'react-hook-form'
import { TipoPersona } from '../../personas/forms/helpers'
import type { IPersona } from '../../personas/interfaces'
import type { FormInhabilitado } from '../interfaces'

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
        <div>
          {
            (item.tipo_persona === TipoPersona.FISICA) 
              ? <span><strong>{clearNames(item.apellido, item.nombre)}</strong> - {item.numero_documento || 'SIN DNI'}</span>
              : <span><strong>{item.razon_social}</strong> - {item.cuit || 'SIN CUIT'}</span>
          }
        </div>
      )}
      renderInput={(item) => { 
        return (item.tipo_persona === TipoPersona.FISICA) 
          ? `${clearNames(item.apellido, item.nombre)} - ${item.numero_documento || 'SIN DOCUMENTO'}`
          : `${item.razon_social} - ${item.razon_social|| 'SIN CUIT'}` }
      }
      resetInput={() => setValue('persona_id', 0)}
      defaultValue={clearNames(persona?.apellido, persona?.nombre, true)}
    />
  )
}