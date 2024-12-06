import React, { useState } from 'react'
import { Button, Label, Table, TextInput, Tooltip } from 'flowbite-react'
import { useFormContext } from 'react-hook-form'
import { SearchInput } from '../../../../shared'
import { rubroActions } from '../../../parametros/actas'
import { CreateRubro } from '../integrations/CreateRubro'
import { icons } from '../../../../shared'
import type { IRubro } from '../../../parametros/actas/interfaces'
import type { Comercio } from '../../interfaces'
import type { IActaForm } from '../../interfaces/form-interfaces'

interface Props {
  data: Comercio | undefined
}

export const ComercioData = ({ data }: Props) => {
  const { setValue, register } = useFormContext<IActaForm>() 
  const [rubros, setRubros] = useState<IRubro[]>(data?.rubros || [])
  
  // Agregar rubro al listado de rubros
  const addRubro= (rubro: IRubro) => {
    if(!rubro) return
    const rubrosUpdate = [...rubros, rubro]

    setRubros(rubrosUpdate)
    setValue('rubros', rubrosUpdate) // Actualizar estado del formulario
  }

  const removeRubro = (id: number) => {
    const rubrosUpdate = rubros.filter((rubro: IRubro) => rubro.id !== id)
    
    setRubros(rubrosUpdate)
    setValue('rubros', rubrosUpdate)
  }

  // Buscardor de vehiculos
  const handleSearch = async (query: string) => rubroActions.getRubroByFilter(query)
  const handleSelect = (rubro: IRubro) => addRubro(rubro)
  
  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center'>
        <h3 className='text-xl font-semibold text-white'>Datos de Comercio</h3>
      </div>

      <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label htmlFor='nombre_fantasia' value='Nombre de fantasia' />
          </div>
          <TextInput
            {...register('nombre_fantasia')}
            id='nombre_fantasia'
            placeholder='Nombre de fantasia'
          />
        </div>
        
        <div className='flex gap-2'>
          <SearchInput<IRubro>
            label="Rubro Comercial"
            placeholder="Buscar por tipo de rubro"
            onSearch={handleSearch}
            onSelect={handleSelect}
            renderItem={(item) => (
              <div><strong>{item.id}</strong> - {item.nombre}</div>
            )}
            renderInput={(item) => { return `${item.id} - ${item.nombre}`} }
          />


          <div className='flex items-end mb-4'><CreateRubro /></div>
        </div>
      </div>

      {/* Tabla de rubros */}
      {!!rubros.length && (
        <div className='overflow-x-auto'>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className='text-center bg-gray-300'>Rubro comercial</Table.HeadCell>
              <Table.HeadCell className='text-center bg-gray-300'>Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {
                rubros.map((rubro: IRubro) => (
                  <Table.Row key={rubro.id} className='bg-white dark:border-gray-700 dark:bg-gray-800 max-h-5'>
                    <Table.Cell className='text-center dark:text-white'>{rubro.nombre}</Table.Cell> 
                    <Table.Cell className='text-center flex items-center justify-center'>
                      <Tooltip content='Eliminar'>
                        <Button color='failure' onClick={() => removeRubro(rubro.id)} className='w-8 h-8 flex items-center justify-center'>
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
