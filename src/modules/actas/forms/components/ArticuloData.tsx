import React, { useState } from 'react'
import { Button, Label, Table, TextInput, Tooltip, Checkbox } from 'flowbite-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { SearchInput } from '../../../../shared'
import { articuloActions } from '../../../parametros/actas'
import { CreateArticulo } from '../integrations/CreateArticulo'
import { icons } from '../../../../shared'
import { ART_ALCOHOLEMIA_ID } from '../../../../shared/constants'
import type { InfraccionActa } from '../../interfaces'
import type { IArticulo } from '../../../parametros/actas/interfaces'
import type { IActaForm } from '../../interfaces/form-interfaces'

interface Props {
  data: InfraccionActa[] | undefined
}

export const ArticuloData = ({ data }: Props) => {
  const { setValue, register, getValues, formState: { errors }, control } = useFormContext<IActaForm>() 
  const [infracciones, setInfracciones] = useState<InfraccionActa[]>(data || [])

  const seNego = useWatch({
    name: 'se_nego', 
    control
  })

  const addArticulo = (articulo: IArticulo) => {
    if(!articulo) return

    const newArticulo = {
      id: articulo.id,
      detalle: articulo.detalle,
      numero: articulo.numero,
      valor_desde: articulo.valor_desde
    }

    setInfracciones((prev) => [...prev, newArticulo])
    setValue('infracciones_cometidas', [...getValues('infracciones_cometidas') || [], newArticulo])
  }

  const handleAlcoholemiaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const cleanedValue = value.replace(/[^\d]/g, '')
  
    const maxLength = 3
    if (cleanedValue.length > maxLength) return
  
    let formattedAlcoholemia = cleanedValue
    if (cleanedValue.length === 2) {
      formattedAlcoholemia = `${cleanedValue[0]},${cleanedValue[1]}`
    } else if (cleanedValue.length === 3) {
      formattedAlcoholemia = `${cleanedValue[0]},${cleanedValue.slice(1)}`
    }
  
    setValue('grado_alcohol', formattedAlcoholemia)
  }
  
  const removeArticulo = (id: number) => {
    const updateInfracciones = infracciones.filter((infraccion: InfraccionActa) => infraccion.id !== id)
    setInfracciones(updateInfracciones)
    setValue('infracciones_cometidas', updateInfracciones)

    // Si se elimina el artículo de alcoholemia, limpiar los campos relacionados
    if (id === ART_ALCOHOLEMIA_ID) {
      setValue('grado_alcohol', '')
      setValue('se_nego', false)
    }
  }

  const handleSeNegoChange = (checked: boolean) => {
    setValue('se_nego', checked)
    if (checked) {
      setValue('grado_alcohol', '')
    }
  }

  const handleSearch = async (query: string) => articuloActions.getArticulosByFilter(query)
  const handleSelect = (articulo: IArticulo) => addArticulo(articulo)

  const inputAlcoholemia = infracciones.find(infraccion => infraccion.id === ART_ALCOHOLEMIA_ID)

  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center'>
        <h3 className='text-xl font-semibold text-white'>Datos de la Infracción</h3>
      </div>

      <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
        <SearchInput<IArticulo>
          label={<><span>Infracciones</span> <strong className='obligatorio'>(*)</strong></>}
          placeholder="Código de la infracción"
          onSearch={handleSearch}
          onSelect={handleSelect}
          helperText={errors?.infracciones_cometidas?.message}
          color={errors?.infracciones_cometidas && 'failure'}
          renderItem={(item) => (
            <div><strong>{item.numero}</strong> - {item.detalle || 'SIN DETALLE'}</div>
          )}
          renderInput={(item) => { return `${item.numero}`} }
        />

        <div className='mt-8'>
          <CreateArticulo />
        </div>

        {inputAlcoholemia && (
          <div className='mb-4'>
            <div className='mb-6 flex items-center gap-2'>
              <Checkbox
                id='se_nego'
                {...register('se_nego')}
                checked={seNego}
                onChange={(e) => handleSeNegoChange(e.target.checked)}
              />
              <Label htmlFor='se_nego' className='dark:text-white'>
                Se negó al control de alcoholemia
              </Label>
            </div>

            {!seNego && (
              <div>
                <div className='mb-2 block dark:text-white'>
                  <Label htmlFor='grado_alcohol' value='Alcoholemia' />
                  <strong className='obligatorio'>(*)</strong>
                </div>
                <TextInput
                  {...register('grado_alcohol')}
                  id='grado_alcohol'
                  placeholder='Ingrese el grado de alcoholemia'
                  helperText={errors?.grado_alcohol?.message}
                  color={errors?.grado_alcohol && 'failure'}
                  maxLength={4}
                  onChange={handleAlcoholemiaChange}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tabla de infracciones */}
      {(infracciones?.length > 0) && (
        <div className='overflow-x-auto'>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className='text-center bg-gray-300'>Descripción</Table.HeadCell>
              <Table.HeadCell className='text-center bg-gray-300'>Artículo</Table.HeadCell>
              <Table.HeadCell className='text-center bg-gray-300'>Unidades</Table.HeadCell>
              <Table.HeadCell className='text-center bg-gray-300'>Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {infracciones.map((infraccion: InfraccionActa) => (
                <Table.Row key={infraccion.id} className='bg-white dark:border-gray-700 dark:bg-gray-800 max-h-5'>
                  <Table.Cell className='text-center dark:text-white max-w-96 truncate'>{infraccion.detalle}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{infraccion.numero}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{infraccion.valor_desde}</Table.Cell>
                  <Table.Cell className='text-center flex items-center justify-center'>
                    <Tooltip content='Eliminar'>
                      <Button color='failure' onClick={() => removeArticulo(infraccion.id)} className='w-8 h-8 flex items-center justify-center'>
                        <icons.Trash />
                      </Button>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </React.Fragment>
  )
}
