import { Button, Label, TextInput } from 'flowbite-react'
import { SearchInput } from '../../../shared'
import { FormVehiculo, IVehiculo, Titular } from '../interfaces'
import { personaActions } from '../../personas'
import { UseFormSetValue } from 'react-hook-form'

interface Props {
  vehiculo: IVehiculo | null
  editTitular: boolean
  setEditTitular: (value: boolean) => void
  setValue: UseFormSetValue<FormVehiculo>
}

export const TitularInput = ({vehiculo, editTitular, setEditTitular, setValue}: Props) => {

  // Buscardor de titulares
  const handleSearch = async (query: string) => personaActions.getPersonasByFilter(query)
  const handleSelect = (titular: Titular) => setValue('titular_id', titular.id)

  const onEditTitular = () => {
    setEditTitular(!editTitular)
    setValue('titular_id', null)
  }

  return ( vehiculo && !editTitular )
    ? (
      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='titular_id' value='Titular' />
        </div>

        <div className='flex justify-between gap-x-2'>
          <TextInput
            type='text'
            className='flex-1'
            name='titular'
            value={
              vehiculo?.titular
                ? `${vehiculo.titular.apellido}`
                : 'SIN TITULAR'
            }
            readOnly
          />

          <div className='flex items-end'>
            <Button onClick={onEditTitular} color='blue'>Editar</Button>
          </div>
        </div>
      </div>
    )
    : (
      <SearchInput<Titular>
        label="Titular"
        placeholder="Buscar Titular"
        onSearch={handleSearch}
        onSelect={handleSelect}
        renderItem={(item) => (
          <div><strong>{item.apellido}</strong> - {item.numero_documento || 'SIN DOCUMENTO'}</div>
        )}
        renderInput={(item) => { return `${item.apellido} - ${item.numero_documento || 'SIN DOCUMENTO'}`} }
      />
    )
}