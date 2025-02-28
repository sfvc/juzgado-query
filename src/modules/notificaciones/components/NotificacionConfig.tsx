import React, { useContext } from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { IPlantilla } from '../../plantillas/interfaces'
import { ActuacionContext } from '../../../context/Actuacion/ActuacionContext'
import { useNotification } from '../hooks/useNotification'
import { SearchableSelect } from '../../../shared'
import { actuacionActions } from '../../actuaciones'
  
export const NotificacionConfig = () => {
  const { user } = useContext(AuthContext)
  const { selectedActas, plantillaId, setPlantillaId } = useContext(ActuacionContext)
  const { createNotification } = useNotification()

  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center my-4'>
        <h3 className='text-xl font-semibold text-white'>Configuración</h3>
      </div>

      <div className='grid md:grid-cols-2 gap-4 grid-cols-1 mt-2'>
        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label
              htmlFor='tipo_actuacion'
              value='Tipo de Actuación'
            />
          </div>
          <TextInput
            placeholder='NOTIFICACION'
            type='text'
            value='NOTIFICACION'
            readOnly
          />
        </div>

        <SearchableSelect<IPlantilla>
          label="Plantilla"
          placeholder="Buscar plantilla"
          onSearch={(query: string) => actuacionActions.getPlantillasSearchableSelect({ query, tipo: 'notificacion', juzgadoId: user!.juzgado.id}) }
          onSelect={(item: IPlantilla) => setPlantillaId(item.id)}
          renderItem={(item: IPlantilla) => <div><strong>{item.denominacion}</strong></div>}
          renderInput={(item) => { return `${item.denominacion}`}}
          resetInput={() => setPlantillaId(null)}
        />
      </div>

      <div className='flex justify-end gap-4 mb-4'>
        <Button 
          type='button' 
          className='px-6' 
          disabled={!selectedActas.length || !plantillaId} 
          onClick={() => createNotification.mutateAsync({ selectedActas, plantillaId, userId: user!.id })}
          isProcessing={createNotification.isPending}
        >
            Notificar
        </Button>
      </div>
    </React.Fragment>
  )
}
