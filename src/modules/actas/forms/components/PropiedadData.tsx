import React, { useState } from 'react'
import { Button, Table, Tooltip } from 'flowbite-react'
import { useFormContext } from 'react-hook-form'
import { SearchInput } from '../../../../shared'
import { propiedadActions } from '../../../parametros/actas'
import { CreatePropiedad } from '../integrations/CreatePropiedad'
import { icons } from '../../../../shared'
import type { IPropiedad } from '../../../parametros/actas/interfaces'
import type { IActaForm } from '../../interfaces/form-interfaces'
import type { Column } from '../../../../shared/interfaces'
import { formatMatricula } from '../../../../shared/helpers/utilsMatricula'

const colums: Column[] = [
  { key: 'matricula_catastral', label: 'Matricula Catastral' },
  { key: 'direccion', label: 'Dirección' },
  { key: 'propietario', label: 'Propietario' },
  { key: 'acciones', label: 'Acciones' }
]

interface Props {
  data: IPropiedad[] | undefined
}

export const PropiedadData = ({ data }: Props) => {
  const { setValue } = useFormContext<IActaForm>() 
  const [propiedades, setPropiedades] = useState<IPropiedad[]>(data || [])
  
  // Agregar propiedad al listado de propiedades
  const addPropiedad = (propiedad: IPropiedad) => {
    if(!propiedad) return
    const newPropiedades = [...propiedades, propiedad]

    setPropiedades(newPropiedades)
    setValue('propiedades', newPropiedades) // Actualizar estado del formulario
  }

  const removePropiedad = (id: number) => {
    const propiedadesUpdate = propiedades.filter((propiedad: IPropiedad) => propiedad.id !== id)
    
    setPropiedades(propiedadesUpdate)
    setValue('propiedades', propiedadesUpdate)
  }

  // Buscardor de vehiculos
  const handleSearch = async (query: string) => propiedadActions.getPropiedadByFilter(query)
  const handleSelect = (propiedad: IPropiedad) => addPropiedad(propiedad)
  
  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center'>
        <h3 className='text-xl font-semibold text-white'>Datos de Propiedad o Inmueble</h3>
      </div>

      <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
        <SearchInput<IPropiedad>
          label="Numero de Matricula Catastral"
          placeholder="Buscar por matricula"
          onSearch={handleSearch}
          onSelect={handleSelect}
          renderItem={(item) => (
            <div><strong>{formatMatricula(item.matricula_catastral)}</strong> - {item.propietario || 'SIN PROPIETARIO'}</div>
          )}
          renderInput={(item) => { return `${formatMatricula(item.matricula_catastral)} - ${item.propietario || 'SIN PROPIETARIO'}`} }
        />

        <div className='flex items-end mb-4'><CreatePropiedad /></div>
      </div>

      {/* Tabla de propiedades */}
      {(propiedades?.length > 0) &&
        <Table hoverable>
          <Table.Head>
            {colums.map((column: Column) => (
              <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className='divide-y'>
            {
              propiedades.map((propiedad: IPropiedad) => (
                <Table.Row key={propiedad.id} className='bg-white dark:border-gray-700 dark:bg-gray-800 max-h-5'>
                  <Table.Cell className='text-center dark:text-white'>{formatMatricula(propiedad.matricula_catastral)}</Table.Cell> 
                  <Table.Cell className='text-center dark:text-white'>{propiedad.domicilio}</Table.Cell> 
                  <Table.Cell className='text-center dark:text-white'>{propiedad.propietario}</Table.Cell> 
                  <Table.Cell className='text-center flex items-center justify-center'>
                    <Tooltip content='Eliminar'>
                      <Button color='failure' onClick={() => removePropiedad(propiedad.id)} className='w-8 h-8 flex items-center justify-center'>
                        <icons.Trash />
                      </Button>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      }
    </React.Fragment>
  )
}
