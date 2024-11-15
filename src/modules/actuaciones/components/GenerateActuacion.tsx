import { Button, Label, Select, Tooltip } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { actuacionActions } from '..'
import { AuthContext, UserContext } from '../../../context/Auth/AuthContext'
import { ActuacionContext, IActuacionContext } from '../../../context/Actuacion/ActuacionContext'
import { IPlantilla } from '../../plantillas/interfaces'
import { TIPO_ACTUACION } from '../../../shared/constants'
import { icons } from '../../../shared'

const ACTUACIONES = TIPO_ACTUACION.filter((tipo: string) => tipo !== 'NOTIFICACION')

export const GenerateActuacion = () => {
  const { user } = useContext<UserContext>(AuthContext)
  const { selectedActas, tipoActuacion, setTipoActuacion, resetProvider } = useContext<IActuacionContext>(ActuacionContext)

  const [plantillas, setPlantillas] = useState<IPlantilla[]>([])
  const [selectedPlantilla, setSelectedPlantilla] = useState<number | null>(null)

  const handlePlantillas = async (tipo: string) => {
    if(tipo === 'SENTENCIA') resetProvider()

    const plantillas = await actuacionActions.getPlantillasByActuacion(tipo, user!.juzgado.id)
    setPlantillas(plantillas)
    setTipoActuacion(tipo)
  }
      
  return (
    <React.Fragment>
      <div className='grid grid-cols-2 gap-4 mt-4'>
        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='tipo_actuacion' value='Tipo de Actuación' /><strong className='obligatorio'>(*)</strong>
          </div>
          <Select onChange={(e) => handlePlantillas(e.target.value)}>
            <option value='' hidden>Seleccione el tipo de actuación</option>
            {
              ACTUACIONES.map((tipo: string, i: number) => (
                <option key={i} value={tipo}>{tipo}</option>
              ))
            }
          </Select>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='plantilla' value='Plantilla' /><strong className='obligatorio'>(*)</strong>
          </div>
          <Select disabled={!plantillas.length} onChange={(e) => setSelectedPlantilla(+e.target.value)}>
            <option value='' hidden>Seleccione la plantilla</option>
            {
              plantillas?.map((plantilla: IPlantilla) => (
                <option key={plantilla.id} value={plantilla.id}>{plantilla.denominacion}</option>
              ))
            }
          </Select>
        </div>
      </div>

      <div className='flex justify-end mb-4'>
        <Tooltip content='Generar actuación'>
          <Button 
            /* Parmas (Lista de actas seleccionas, Id de plantilla, Tipo de Actuación) */
            onClick={() => actuacionActions.createActuacion(selectedActas, selectedPlantilla ,tipoActuacion)} 
          > 
            <icons.FilePlus />  Nuevo
          </Button>
        </Tooltip>
      </div>
    </React.Fragment>
  )
}
