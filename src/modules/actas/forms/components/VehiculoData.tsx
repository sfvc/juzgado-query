import React, { useState } from 'react'
import { Button, Table, Tooltip } from 'flowbite-react'
import { useFormContext } from 'react-hook-form'
import { SearchInput } from '../../../../shared'
import { icons } from '../../../../shared'
import { vehiculoActions } from '../../../vehiculos'
import { formatVehiculo } from '../../helpers/formatVehiculo'
import { CreateVehiculo } from '../integrations/CreateVehiculo'
import { clearNames } from '../../../../shared'
import type { IActaForm } from '../../interfaces/form-interfaces'
import type { VehiculoActa } from '../../interfaces'
import type { IVehiculo } from '../../../vehiculos/interfaces'
import type { Column } from '../../../../shared/interfaces'

const columns: Column[] = [
  { key: 'titular', label: 'Titular' },
  { key: 'dominio', label: 'Dominio' },
  { key: 'marca', label: 'Marca' },
  { key: 'modelo', label: 'Modelo' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'color', label: 'Color' },
  { key: 'numero_chasis', label: 'Numero de Chasis' },
  { key: 'numero_motor', label: 'Numero de Motor' },
  { key: 'numero_taxi', label: 'Numero de Taxi' },
  { key: 'acciones', label: 'Acciones' }
]

interface Props {
  data: VehiculoActa | null
}

export const VehiculoData = ({ data }: Props) => {
  const { setValue } = useFormContext<IActaForm>() 
  const [vehiculo, setVehiculo] = useState<VehiculoActa | null>(data)
  
  // Agregar vehiculo al listado de vehiculos
  const addVehiculo = (vehiculo: IVehiculo) => {
    if(!vehiculo) return
    const newVehiculo = formatVehiculo(vehiculo)

    setVehiculo(newVehiculo)
    setValue('vehiculo_id', newVehiculo?.id) // Actualizar estado del formulario
  }

  const removeVehiculo = () => {
    setVehiculo(null)
    setValue('vehiculo_id', null)
  }

  // Buscardor de vehiculos
  const handleSearch = async (query: string) => vehiculoActions.getVehiculosByFilter(query)
  const handleSelect = (vehiculo: IVehiculo) => addVehiculo(vehiculo)
  
  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center'>
        <h3 className='text-xl font-semibold text-white'>Datos del vehiculo</h3>
      </div>

      <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
        <SearchInput<IVehiculo>
          label="Vehículo"
          placeholder="Buscar por patente"
          onSearch={handleSearch}
          onSelect={handleSelect}
          renderItem={(item) => (
            <div><strong>{item.dominio}</strong> - {clearNames(item.titular?.apellido, item.titular?.nombre) || 'SIN TITULAR'}</div>
          )}
          renderInput={(item) => { return `${item.dominio} - ${clearNames(item.titular?.apellido, item.titular?.nombre) || 'SIN TITULAR'}`} }
        />

        <div className='flex items-end mb-4'><CreateVehiculo /></div>
      </div>

      {/* Tabla de vehiculo */}
      {vehiculo && (
        <div className='overflow-x-auto'>
          <Table hoverable>
            <Table.Head>
              {columns.map((colum: Column) => (
                <Table.HeadCell key={colum.key} className='text-center bg-gray-300'>{colum.label}</Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className='divide-y'>
              {
                <Table.Row key={vehiculo.id} className='bg-white dark:border-gray-700 dark:bg-gray-800 max-h-5'>
                  <Table.Cell className='text-center dark:text-white'>{clearNames(vehiculo?.titular?.apellido, vehiculo?.titular?.nombre) || 'SIN TITULAR'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.dominio}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.marca}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.modelo}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.tipo}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.color}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.numero_chasis}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.numero_motor}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.numero_taxi_remis}</Table.Cell>
                  <Table.Cell className='text-center flex items-center justify-center'>
                    <Tooltip content='Eliminar'>
                      <Button color='failure' onClick={removeVehiculo} className='w-8 h-8 flex items-center justify-center'>
                        <icons.Trash />
                      </Button>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              }
            </Table.Body>
          </Table>
        </div>
      )}
    </React.Fragment>
  )
}
