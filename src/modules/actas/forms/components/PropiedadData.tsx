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
  const [matriculaInput, setMatriculaInput] = useState<string>('')
  
  const addPropiedad = (propiedad: IPropiedad) => {
    if(!propiedad) return
    const newPropiedades = [...propiedades, propiedad]

    setPropiedades(newPropiedades)
    setValue('propiedades', newPropiedades)
  }

  const removePropiedad = (id: number) => {
    const propiedadesUpdate = propiedades.filter((propiedad: IPropiedad) => propiedad.id !== id)
    
    setPropiedades(propiedadesUpdate)
    setValue('propiedades', propiedadesUpdate)
  }

  const formatMatriculaSearch = (value: string) => {
    const cleanedValue = value.replace(/[^\d]/g, '')
    if (cleanedValue.length <= 10) {
      // Formato parcial basado en la longitud
      if (cleanedValue.length > 2 && cleanedValue.length <= 4) {
        return cleanedValue.replace(/^(\d{2})(\d*)$/, '$1-$2')
      } else if (cleanedValue.length > 4 && cleanedValue.length <= 6) {
        return cleanedValue.replace(/^(\d{2})(\d{2})(\d*)$/, '$1-$2-$3')
      } else if (cleanedValue.length > 6) {
        return cleanedValue.replace(/^(\d{2})(\d{2})(\d{2})(\d*)$/, '$1-$2-$3-$4')
      }
      return cleanedValue
    }
    return cleanedValue.slice(0, 10).replace(/^(\d{2})(\d{2})(\d{2})(\d{4})$/, '$1-$2-$3-$4')
  }

  const handleInputChange = (value: string) => {
    setMatriculaInput(value)
  }
  
  const cleanMatricula = (value: string) => value.replace(/[^\d]/g, '')
  const handleSearch = async (query: string) => {
    const cleanQuery = cleanMatricula(query)
    return propiedadActions.getPropiedadByFilter(cleanQuery)
  }
  const handleSelect = (propiedad: IPropiedad) => addPropiedad(propiedad)
  
  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center'>
        <h3 className='text-xl font-semibold text-white'>Datos de Propiedad o Inmueble</h3>
      </div>

      <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
        <SearchInput<IPropiedad>
          label="Número de Matricula Catastral"
          placeholder="Buscar por matricula"
          onSearch={handleSearch}
          onSelect={handleSelect}
          formatInputValue={formatMatriculaSearch}
          onInputChange={handleInputChange}
          inputValue={matriculaInput}
          renderItem={(item) => (
            <div><strong>{formatMatricula(item.matricula_catastral)}</strong> - {item.propietario || 'SIN PROPIETARIO'}</div>
          )}
          renderInput={(item) => { 
            return `${formatMatricula(item.matricula_catastral)} - ${item.propietario || 'SIN PROPIETARIO'}` 
          }}
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
