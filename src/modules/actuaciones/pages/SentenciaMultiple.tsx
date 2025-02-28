import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Modal, Table, Tooltip } from 'flowbite-react'
import { apiJuzgado } from '../../../api/config'
import { icons, useLoading } from '../../../shared'
import { UnidadForm } from '../forms/UnidadForm'
import { TotalForm } from '../forms/TotalForm'
import { LoadingOverlay } from '../../../layout'
import type { Acta, AcumuladasResponse, Articulo } from '../interfaces/sentencia-multiple'
import type { Column } from '../../../shared/interfaces'
import type { IUnidadMulta } from '../interfaces/sentencia'

const colums: Column[] = [
  { key: 'numero', label: 'Nro. Acta' },
  { key: 'articulo', label: 'Articulo' },
  { key: 'detalle', label: 'Detalle' },
  { key: 'unidad_multa', label: 'U. Multa ($)' },
  { key: 'importe', label: 'importe' },
  { key: 'acciones', label: 'Acciones' }
]

export const SentenciaMultiple = () => {
  const { actionFn, loading } = useLoading()
  const { state: { acumuladas } } = useLocation()
  const [openModal, setOpenModal] = useState({ create: false, delete: false })
  const [activeItem, setActiveItem] = useState<Articulo | null>(null)

  const [infracciones, setInfracciones] = useState<Articulo[]>([])
  const [unidadMulta, setUnidadMulta] = useState<number>(0)

  const editUnidad = (uuid: string) => {
    const infraccion = infracciones.find((articulo: Articulo) => articulo.uuid === uuid)
    if(!infraccion) return
  
    setActiveItem(infraccion)
    onOpenModal('create', infraccion)
  }

  const updateImporte = (data: IUnidadMulta) => {
    setInfracciones((prev) => {
      const infracciones = prev.map((infraccion: Articulo) => {
        if (infraccion.uuid === activeItem?.uuid) {
          return {
            ...infraccion,
            unidad: data.unidad,
            importe: data.unidad * infraccion.precio_unidad_articulo!
          }
        }
        return infraccion
      })
  
      return infracciones
    })
  }
  
  const handleDelete = () => {
    if(!activeItem) return 

    const updateInfracciones = infracciones.filter((articulo) => articulo.uuid !== activeItem.uuid)
    setInfracciones(updateInfracciones)
    onCloseModal('delete')
  }

  const onCloseModal = (action: string) => {
    setOpenModal((prev) => { return {...prev, [action]: false} })
    setActiveItem(null)
  }
  
  const onOpenModal = (action: string, item: Articulo) => {
    setOpenModal((prev) => { return {...prev, [action]: true} })
    setActiveItem(item)
  }

  const getActasAcumaladas = async () => {
    actionFn(async () => {

      const form = {
        actas: acumuladas.actas,
        tipo_actuacion: acumuladas.tipo_actuacion
      }
  
      const response = await apiJuzgado.post('/actas-acumuladas', form)
      const { data }: AcumuladasResponse = response.data
      setUnidadMulta(+data.unidad_multa_actual)
  
      if (data?.actas) {
        data.actas.forEach((acta: Acta) => {
          acta?.articulos.forEach((articulo: Articulo) => {
            setInfracciones((prev) => {
              return [ 
                ...prev, 
                {
                  ...articulo, 
                  uuid: crypto.randomUUID(),
                  numero_acta_articulo: acta.numero_acta,
                  precio_unidad_articulo: +acta?.unidad_multa || unidadMulta, // Coloca la unidad de multa del acta, si no tiene pone la unidad la actual
                  importe: articulo.valor_desde * +acta.unidad_multa,
                  unidad: articulo.valor_desde
                }
              ]
            })
          })
        })
      }

    })
  } 

  useEffect(() => {
    getActasAcumaladas()
  }, [])

  if (loading) return <LoadingOverlay />
  
  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center mb-6'>
        <h3 className='text-xl font-semibold text-white'>Agregar Resolución</h3>
      </div>
  
      <div className='overflow-x-auto'>
        <Table>
          <Table.Head>
            {colums.map((column: Column) => (
              <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className='divide-y'>
            {
              infracciones.length
                ? infracciones.map((infraccion: Articulo) => (
                  <Table.Row key={infraccion.uuid} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='text-center dark:text-white'>{infraccion.numero_acta_articulo }</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{infraccion.numero}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>
                      <div className='truncate w-[40rem]'>{infraccion.detalle}</div>
                    </Table.Cell>
                    <Table.Cell className='text-center  dark:text-white'>$ {infraccion.precio_unidad_articulo}</Table.Cell>
                    <Table.Cell className='text-center  dark:text-white'>$ {infraccion.importe}</Table.Cell>
                    <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                      <Tooltip content='Editar'>
                        <Button
                          color='success' 
                          className='w-8 h-8 flex items-center justify-center'
                          onClick={() => editUnidad(infraccion.uuid)}
                        >
                          <icons.Pencil />
                        </Button>
                      </Tooltip>
    
                      <Tooltip content='Eliminar'>
                        <Button color='failure' className='w-8 h-8 flex items-center justify-center'
                          onClick={() => onOpenModal('delete', infraccion)}
                        >
                          <icons.Trash />
                        </Button>
                      </Tooltip>
                    </Table.Cell>
                  </Table.Row>
                ))
                : <tr><td colSpan={colums.length} className='text-center py-4 dark:bg-gray-800'>No se encontraron resultados</td></tr>
            }
          </Table.Body>
        </Table>
      </div>

      <TotalForm infracciones={infracciones} plantillaId={acumuladas.plantilla_id} actas={acumuladas.actas}/>

      {/* Modal para editar unidad tributaria de articulo */}
      <Modal show={openModal.create} onClose={() => onCloseModal('create')}>
        <Modal.Header>Editar importe</Modal.Header>
        <Modal.Body>
          <UnidadForm
            activeItem={activeItem}
            onCloseModal= {() => onCloseModal('create')}
            updateImporte={updateImporte}
          />
        </Modal.Body>
      </Modal>
      
      {/* Modal para eliminar articulo de listado */}
      { activeItem && 
        <Modal show={openModal.delete} onClose={() => onCloseModal('delete')}>
          <Modal.Header>Eliminar articulo</Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <icons.Warning />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estás seguro de que deseas eliminar el articulos del listado?
              </h3>
          
              <div className="flex justify-center gap-4">
                <Button color="gray" onClick={() => onCloseModal('delete')}>Cancelar</Button>
                <Button color="failure" onClick={handleDelete}> Sí, eliminar</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      }
    
    </React.Fragment>
  )
}
