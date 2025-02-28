import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Label, Select, Tooltip } from 'flowbite-react'
import { ToastContainer } from 'react-toastify'
import { AuthContext, UserContext } from '../../../context/Auth/AuthContext'
import { ActuacionContext, IActuacionContext } from '../../../context/Actuacion/ActuacionContext'
import { ACTUACION, TIPO_ACTUACION } from '../../../shared/constants'
import { icons, SearchableSelect, showErrors } from '../../../shared'
import { actuacionActions } from '..'
import type { IPlantilla } from '../../plantillas/interfaces'
import type { IActuacionForm } from '../interfaces'

const ACTUACIONES = TIPO_ACTUACION.filter((tipo: string) => tipo !== 'NOTIFICACION')

export const GenerateActuacionMultiple = () => {
  const navigate = useNavigate()
  const { user } = useContext<UserContext>(AuthContext)
  const { tipoActuacion, setTipoActuacion, selectedActas } = useContext<IActuacionContext>(ActuacionContext)

  const [selectedPlantilla, setSelectedPlantilla] = useState<number | null>(null)

  const handlePlantillas = async (tipo: string) => {      
    setTipoActuacion(tipo)

    setSelectedPlantilla(null)
  }

  const handleActuacion = async () => {
    const data: IActuacionForm = {
      actas: selectedActas,
      plantilla_id: selectedPlantilla,
      tipo_actuacion: tipoActuacion,
      user_id: user!.id
    }

    if (tipoActuacion !== ACTUACION.SENTENCIA) {
      showErrors('La actuación debe ser de tipo SENTENCIA')
      return
    }

    if (selectedActas.length === 0) {
      showErrors('No hay actas seleccionadas')
      return
    }
    
    navigate('/acta/acumuladas/sentencia-multiple', { state: { acumuladas: data } })
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

        <SearchableSelect<IPlantilla>
          label="Plantilla"
          placeholder="Buscar plantilla"
          onSearch={ (query: string) => actuacionActions.getPlantillasSearchableSelect({ query, tipo: tipoActuacion, juzgadoId: user!.juzgado.id}) }
          onSelect={ (item: IPlantilla) => setSelectedPlantilla(item.id) }
          renderItem={ (item: IPlantilla) => <div><strong>{item.denominacion}</strong></div> }
          renderInput={ (item) => { return `${item.denominacion}`} }
          resetInput={ () => setSelectedPlantilla(null) }
          disabled={ !tipoActuacion }
        />

      </div>

      <div className='flex justify-end mb-4'>
        <Tooltip content='Generar actuación'>
          <Button 
            onClick={handleActuacion}
            disabled={!selectedPlantilla || !selectedActas.length}
          > 
            <icons.FilePlus /> Nuevo
          </Button>
        </Tooltip>
      </div>

      <ToastContainer containerId="custom" className="custom-toast-container" />
    </React.Fragment>
  )
}
