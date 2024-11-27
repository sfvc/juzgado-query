import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button, Label, Select, TextInput } from 'flowbite-react'
import { apiJuzgado } from '../../../api/config'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { IPlantilla } from '../../plantillas/interfaces'
import { ActuacionContext } from '../../../context/Actuacion/ActuacionContext'
import { useNotification } from '../hooks/useNotification'

const handleTipoPlantillas = async (id: number) => {
  const response = await apiJuzgado.get(`/plantillas/tipos?tipo_actuacion=NOTIFICACION&juzgado=${id}`)
  const { data } = response.data
  return data
}
  
export const NotificacionConfig = () => {
  const { user } = useContext(AuthContext)
  const { selectedActas, plantillaId, setPlantillaId } = useContext(ActuacionContext)
  const { createNotification } = useNotification()

  const { data: plantillas, isLoading } = useQuery<IPlantilla[]>({
    queryKey: ['actuacion', { tipo_actuacion: 'notificacion', juzgado: user?.juzgado.id }],
    queryFn: () => handleTipoPlantillas(user!.juzgado.id),
    staleTime: 1000 * 60 * 5
  })

  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center my-4'>
        <h3 className='text-xl font-semibold text-white'>Configuración</h3>
      </div>
      <div className='overflow-x-auto'>
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

          <div className='mb-4'>
            <div className='mb-2 block'>
              <Label
                htmlFor='plantilla_id'
                value='Plantillas'
              />
            </div>
            <Select disabled={isLoading} onChange={(e) => setPlantillaId(+e.target.value)}>
              <option value='' hidden>Seleccione una plantilla</option>
              {
                !!plantillas?.length &&
                  plantillas.map((plantilla: IPlantilla) => (
                    <option key={plantilla.id} value={plantilla.id}>{plantilla.denominacion}</option>
                  ))
              }
            </Select>
          </div>
        </div>

        <div className='flex justify-end gap-4 mb-4'>
          <Button 
            type='button' 
            className='px-6' 
            disabled={!selectedActas.length || !plantillaId} 
            onClick={() => createNotification.mutateAsync({ selectedActas, plantillaId })}
            isProcessing={createNotification.isPending}
          >
            Notificar
          </Button>
        </div>

      </div>
    </React.Fragment>
  )
}
