import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Label, Select, Tooltip } from 'flowbite-react'
import { actuacionActions } from '..'
import { AuthContext, UserContext } from '../../../context/Auth/AuthContext'
import { ActuacionContext, IActuacionContext } from '../../../context/Actuacion/ActuacionContext'
import { ACTUACION, TIPO_ACTUACION } from '../../../shared/constants'
import { icons, SearchableSelect } from '../../../shared'
import { useActuacion } from '../hooks/useActuacion'
import type { IPlantilla } from '../../plantillas/interfaces'
import type { ActuacionActa, IActuacionForm } from '../interfaces'

const ACTUACIONES = TIPO_ACTUACION.filter((tipo: string) => tipo !== 'NOTIFICACION')

export const GenerateActuacion = ({acta}: {acta: ActuacionActa}) => {
  const { createActuacion } = useActuacion()
  const navigate = useNavigate()
  const { user } = useContext<UserContext>(AuthContext)
  const { tipoActuacion, setTipoActuacion, plantillaId, setPlantillaId} = useContext<IActuacionContext>(ActuacionContext)

  const handlePlantillas = async (tipo: string) => {      
    setTipoActuacion(tipo)
    setPlantillaId(null)
  }

  const handleActuacion = async () => {
    if (tipoActuacion === ACTUACION.SENTENCIA) {
      navigate('sentencia', { state: { acta, plantillaId } })
      return
    }

    const form: IActuacionForm = {
      actas: [ acta.id ],
      plantilla_id: plantillaId,
      tipo_actuacion: tipoActuacion,
      user_id: user!.id
    }

    await createActuacion.mutateAsync(form)
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

        {/* <div className='mb-4'>
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
        </div> */}

        <SearchableSelect<IPlantilla>
          label="Plantilla"
          placeholder="Buscar plantilla"
          onSearch={(query: string) => actuacionActions.getPlantillasSearchableSelect({ query, tipo: tipoActuacion, juzgadoId: user!.juzgado.id}) }
          onSelect={(item: IPlantilla) => setPlantillaId(item.id)}
          renderItem={(item: IPlantilla) => <div><strong>{item.denominacion}</strong></div>}
          renderInput={(item) => { return `${item.denominacion}`}}
          resetInput={() => setPlantillaId(null)}
          disabled={ !tipoActuacion }
        />
      </div>

      <div className='flex justify-end mb-4'>
        <Tooltip content='Generar actuación'>
          <Button 
            onClick={handleActuacion}
            isProcessing={createActuacion.isPending} 
            disabled={!plantillaId || createActuacion.isPending}
          > 
            <icons.FilePlus /> Nuevo
          </Button>
        </Tooltip>
      </div>
    </React.Fragment>
  )
}
