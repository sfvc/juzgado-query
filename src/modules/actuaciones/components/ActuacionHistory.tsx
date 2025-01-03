import { useContext, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, FileInput, Label, Modal, Spinner, Table, Tooltip } from 'flowbite-react'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { icons } from '../../../shared'
import { usePdf } from '../../carbone'
import { LoadingOverlay } from '../../../layout'
import { useUploadFile } from '../../carbone/hooks/useUploadFile'
import { useActuacion } from '../hooks/useActuacion'
import { actuacionActions } from '..'
import type { Actuacion, ActuacionActa } from '../interfaces'
import type { Column } from '../../../shared/interfaces'
import type { IActuacionHistory } from '../interfaces/actuacion-history'
import { RoleGuard, UserRole } from '../../../auth'

const colums: Column[] = [
  { key: 'icon', label: '' },
  { key: 'id', label: 'id' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'fecha', label: 'Fecha' },
  { key: 'usuario', label: 'Usuario' },
  { key: 'acciones', label: 'Acciones' }
]

interface Props {
  acta: ActuacionActa,
  actuacion: Actuacion,
  onCloseModal: () => void
}

export const ActuacionHistory = ({ acta, actuacion, onCloseModal }: Props) => {
  const { deleteActuacionHistory } = useActuacion()
  const { uploadFile, downloadWord } = useUploadFile()
  const { showPDFGotenberg } = usePdf()
  const { user } = useContext(AuthContext)
  const refFile = useRef(null)
  
  const [ openDeleteModal, setOpenDeleteModal ] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<IActuacionHistory | null>(null)

  // Obtener el historial de cambios de la actuacion
  const { data: history = [], isLoading } = useQuery<IActuacionHistory[]>({
    queryKey: ['history', {id: actuacion.id}],
    queryFn: () => actuacionActions.getHistoryByActuacion(actuacion.id),
    staleTime: 1000 * 60 * 5
  })

  const onOpenModalHistory = (actuacion: IActuacionHistory) => {
    setActiveItem(actuacion)
    setOpenDeleteModal(true)
  }

  const onCloseModalHistory = () => {
    setOpenDeleteModal(false)
    setActiveItem(null)
  }

  const onUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if (!file) return

    await uploadFile.mutateAsync({ file, item: actuacion, property: 'actuacion_id', queryKey: ['acta-actuacion',{id: acta.id}] })
  }

  const onDownloadWord = async () => {
    downloadWord.mutate({ item: actuacion, acta, user: user! })
  }

  const onDeleteActuacion = async () => {
    if (!activeItem) return
    
    const response = await deleteActuacionHistory.mutateAsync({id: activeItem.id, queryKey: ['history', {id: actuacion.id}]})
    if (response.status === 200) onCloseModalHistory()
  }
    
  return (
    <div>
      <div className='mb-4 relative'>
        <div className='mb-2 block'>
          <Label className='text-sm font-medium' htmlFor='file'>Subir Archivo</Label>
        </div>
        <div className='flex'>
          <div className='relative w-full'>
            <FileInput
              name='file'
              placeholder='Seleccionar el archivo'
              onChange={(e) => onUploadFile(e)}
              accept='.doc,.docx'
              ref={refFile}
            />
          </div>
        </div>
      </div>

      {
        isLoading
          ? <div className='flex justify-center items-center'><Spinner size='xl' /></div>
          : 
          <Table className='shadow-md'>
            <Table.Head>
              {colums.map((column: Column) => (
                <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className='divide-y'>
              {
                history?.length
                  ? history.map((actuacion: IActuacionHistory) => (
                    <Table.Row key={actuacion.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>
                        <div className='flex justify-center text-red-600'>
                          <icons.Pdf />
                        </div>
                      </Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{actuacion.id}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{actuacion.nombre}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{actuacion?.fecha || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{actuacion?.usuario || '-'}</Table.Cell>
                      <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                        <Tooltip content='Ver' placement='top'>
                          <Button color='warning' onClick={() => showPDFGotenberg(actuacion.url)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.Print />
                          </Button>
                        </Tooltip>

                        <RoleGuard roles={[UserRole.ADMIN, UserRole.JEFE, UserRole.JUEZ, UserRole.SECRETARIO]}>
                          <Tooltip content='Eliminar' placement='top'>
                            <Button color='failure' onClick={() => onOpenModalHistory(actuacion)} className='w-8 h-8 flex items-center justify-center'>
                              <icons.Trash />
                            </Button>
                          </Tooltip>
                        </RoleGuard>
                      </Table.Cell>
                    </Table.Row>
                  ))
                  : <tr><td colSpan={colums.length} className='text-center py-4 dark:bg-gray-800'>No se encontraron resultados</td></tr>
              }
            </Table.Body>
          </Table>
      }

      <footer className='flex flex-col'>
        <Alert color='warning' className='mt-4' icon={icons.Error}>
          <span>
            <span className='font-medium mr-1'>Importante!</span>   
            Descargue el archivo, modifique el contenido y luego seleccione el archivo actualizado para guardarlo.
          </span>
        </Alert>
                
        <div className='flex justify-end gap-4 mt-4'>
          <Button color='gray' type='button' className='px-4' onClick={onDownloadWord}>
            <icons.Dowloand size={18}/> 
          &#160; Descargar Actuación
          </Button>
        
          <Button color='red' type='button' className='px-4' onClick={onCloseModal}>Cerrar</Button>
        </div>
      </footer>

      { (uploadFile.isPending || downloadWord.isPending) && <LoadingOverlay /> }

      {/* Modal para eliminar actuación del historial */}
      { activeItem && 
        <Modal show={openDeleteModal} onClose={onCloseModalHistory}>
          <Modal.Header>Eliminar actuación</Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <icons.Warning />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estás seguro de que deseas eliminar la actuación del historial?
              </h3>
          
              <div className="flex justify-center gap-4">
                <Button color="gray" onClick={onCloseModalHistory}>Cancelar</Button>
                <Button 
                  color="failure" 
                  onClick={onDeleteActuacion} 
                  isProcessing={deleteActuacionHistory.isPending}
                  disabled={deleteActuacionHistory.isPending}
                > 
                  Sí, eliminar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      }
    </div>
  )
}
