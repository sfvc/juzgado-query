import React, { useState } from 'react'
import { Button, Label, Table, TextInput, Tooltip } from 'flowbite-react'
import { useFormContext } from 'react-hook-form'
import { SearchInput } from '../../../../shared'
import { IPropiedad } from '../../../parametros/actas/interfaces'
import { propiedadActions } from '../../../parametros/actas'
import { icons } from '../../../../shared'
import { IActaForm } from '../../interfaces/form-interfaces'

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
            <div><strong>{item.matricula_catastral}</strong> - {item.propietario || 'SIN PROPIETARIO'}</div>
          )}
          renderInput={(item) => { return `${item.matricula_catastral} - ${item.propietario || 'SIN PROPIETARIO'}`} }
        />

        {/* // TODO: Verificar que funcione buscador de propiedades  */}
        {/* <div className='mb-4'>
          <div className='mb-2 block'>
            <Label
              htmlFor='dirección'
              value='Dirección'
            />
          </div>
          <TextInput
            {...register('dirección')}
            id='dirección'
            placeholder='Dirección'
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label
              htmlFor='propietario'
              value='Nombre del propietario'
            />
          </div>
          <TextInput
            {...register('propietario')}
            id='propietario'
            placeholder='Nombre del propietario'
          />
        </div> */}
      </div>

      {/* Tabla de propiedades */}
      {!!propiedades.length && (
        <div className='overflow-x-auto'>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className='text-center bg-gray-300'>Matricula Catastral</Table.HeadCell>
              <Table.HeadCell className='text-center bg-gray-300'>Dirección</Table.HeadCell>
              <Table.HeadCell className='text-center bg-gray-300'>Propietario</Table.HeadCell>
              <Table.HeadCell className='text-center bg-gray-300'>Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {
                propiedades.map((propiedad: IPropiedad) => (
                  <Table.Row key={propiedad.id} className='bg-white dark:border-gray-700 dark:bg-gray-800 max-h-5'>
                    <Table.Cell className='text-center dark:text-white'>{propiedad.matricula_catastral}</Table.Cell> 
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
        </div>
      )}
    </React.Fragment>
  )
}
