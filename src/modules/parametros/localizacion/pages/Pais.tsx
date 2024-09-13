import React, { useState } from 'react'
import { Button, Label, Modal, Table, TextInput, Tooltip } from 'flowbite-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import type { Pais } from '../interfaces/localizacion'
import { usePaises, usePaisMutation } from '../index'
import { useQueryClient } from '@tanstack/react-query'

interface Column {
  key: string
  label: string
}

interface FormInputs {
  nombre: string
}

const colums: Column[] = [
  { key: 'id', label: 'Id' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'acciones', label: 'Acciones' }
]

const validationSchema = yup.object().shape({
  nombre: yup.string().required('El pais es requerido')
})

const Pais = () => {
  const [openModal, setOpenModal] = useState(false)
  const [activePais, setActivePais] = useState<Pais | null>(null)
  const { paises = [] , isError, isFetching, isLoading } = usePaises({})
  const paisMutation = usePaisMutation()

  const useQuery = useQueryClient()

  /* const paisMutation = useMutation({
    mutationFn: paisActions.createPais,
    onSuccess: () => {
      console.log('Creado con exito')
      setOpenModal(false)
    },
    onError: () => {
      console.log('Error al crear')
    }
  }) */

  const editPais = (id: number) => {
    const paises: Pais[] = useQuery.getQueryData(['paises', {}]) || []
    const pais = paises.find((pais: Pais) => pais.id === id) || null
    setActivePais(pais)

    setOpenModal(true)
  }

  const {
    register,
    handleSubmit,
    formState,
    reset
  } = useForm({
    defaultValues: { nombre: activePais?.nombre || '' },
    resolver: yupResolver(validationSchema)
  })

  const onCloseModal = async () => {
    setOpenModal(false)
    reset()
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data: Pais) => {
    console.log(data)
    paisMutation.mutate(data)
    reset()
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Países</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <div className='relative'>
              <TextInput
                name='search'
                placeholder='Buscar'
              />

              <div className='absolute top-3 right-2'>
                <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-search dark:stroke-white' width='16' height='16' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
                  <path d='M21 21l-6 -6' />
                </svg>
              </div>
            </div>

            <Button 
              type='submit' 
              color="gray"
              onClick={() => setOpenModal(true)}
            >
              Crear
            </Button>
          </div>
        </div>
      </div>

      <Table>
        <Table.Head>
          {
            colums.map((column: Column) => (
              <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
            ))
          }
        </Table.Head>

        <Table.Body className='divide-y'>
          {
            (paises.length > 0)
              ? (paises.map((pais: Pais) => (
                <Table.Row key={pais.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>{pais.id}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{pais.nombre}</Table.Cell>
                  <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                    <Tooltip content='Editar'>
                      <Button color='success' onClick={() => editPais(pais.id!)} className='w-8 h-8'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-edit' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <path d='M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1' />
                          <path d='M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z' />
                          <path d='M16 5l3 3' />
                        </svg>
                      </Button>
                    </Tooltip>

                    <Tooltip content='Eliminar'>
                      <Button color='failure' onClick={() => console.log('first')} className='w-8 h-8'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-x' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <path d='M18 6l-12 12' />
                          <path d='M6 6l12 12' />
                        </svg>
                      </Button>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              )))
              : (<tr><td colSpan={colums.length} className='text-center py-4 dark:bg-gray-800'>No se encontraron resultados</td></tr>)
          }
        </Table.Body>
      </Table>

      {/* Modal crear pais */} 
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Agregar Pais</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <div className='mb-2 block dark:text-white'>
                <Label
                  color='gray'
                  htmlFor='nombre'
                  value='Pais'
                />
              </div>
              <TextInput
                {...register('nombre')}
                placeholder='Nombre'
              />
            </div>

            <div className='flex justify-end gap-2'>
              <Button color="failure" onClick={onCloseModal}>Cancelar</Button>
              <Button 
                type='submit' 
                color="gray"
                disabled={paisMutation.isPending}
                isProcessing={paisMutation.isPending}
              >Guardar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default Pais
