import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Label, Select, Tooltip } from 'flowbite-react'
import { actuacionActions } from '..'
import { AuthContext, UserContext } from '../../../context/Auth/AuthContext'
import { ActuacionContext, IActuacionContext } from '../../../context/Actuacion/ActuacionContext'
import { ACTUACION, TIPO_ACTUACION } from '../../../shared/constants'
import { icons } from '../../../shared'
import type { IPlantilla } from '../../plantillas/interfaces'
import type { ActuacionActa } from '../interfaces'

const ACTUACIONES = TIPO_ACTUACION.filter((tipo: string) => tipo !== 'NOTIFICACION')

export const GenerateActuacion = ({acta}: {acta: ActuacionActa}) => {
  const navigate = useNavigate()
  const { user } = useContext<UserContext>(AuthContext)
  const { selectedActas, tipoActuacion, setTipoActuacion } = useContext<IActuacionContext>(ActuacionContext)

  const [plantillas, setPlantillas] = useState<IPlantilla[]>([])
  const [selectedPlantilla, setSelectedPlantilla] = useState<number | null>(null)

  const handlePlantillas = async (tipo: string) => {      
    setTipoActuacion(tipo)
    const plantillas = await actuacionActions.getPlantillasByActuacion(tipo, user!.juzgado.id)
    
    setPlantillas(plantillas)
    setTipoActuacion(tipo)
  }

  const handleActuacion = async () => {
    if(tipoActuacion === ACTUACION.SENTENCIA) {
      navigate('sentencia', { state: { acta, plantillaId: selectedPlantilla } })
      return
    }

    await actuacionActions.createActuacion(selectedActas, selectedPlantilla ,tipoActuacion)
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
            //** Params (Lista de actas seleccionas, Id de plantilla, Tipo de Actuación) */
            onClick={handleActuacion} 
          > 
            <icons.FilePlus />  Nuevo
          </Button>
        </Tooltip>
      </div>
    </React.Fragment>
  )
}
