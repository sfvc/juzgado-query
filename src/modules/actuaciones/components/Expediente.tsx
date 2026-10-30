import type { Column } from '../../../shared/interfaces'
import type { Actuacion, ActuacionActa, Cuota } from '../interfaces'
import { useContext, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { Button, Modal, Table, Tooltip } from 'flowbite-react'
import { icons } from '../../../shared'
import { useActuacion } from '../hooks/useActuacion'
import { RoleGuard, UserRole } from '../../../auth'
import { carboneActions, usePdf } from '../../carbone'
import { LoadingOverlay } from '../../../layout'
import { ActuacionHistory } from './ActuacionHistory'
import { ComprobanteModal } from './ComprobanteModal'
import { PlanPagoModal } from './PlanPagoModal'
import { ultimaSentencia } from '../helpers/ultimaSentencia'
// import { generarComprobanteDigital } from '../../../shared/helpers/generarComprobanteDigital'

const colums: Column[] = [
  { key: 'id', label: 'id' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'numero_acta', label: 'Nro. de acta' },
  { key: 'numero_causa', label: 'Nro. Causa' },
  { key: 'fecha', label: 'Fecha de inicio' },
  { key: 'monto', label: 'Importe' },
  { key: 'usuario', label: 'Usuario' },
  { key: 'acciones', label: 'Acciones' },
]

const ESTADO_RESOLUCION_PENDIENTE = 7
const ESTADO_RESOLUCION_PAGADA = 5

export const Expediente = ({ acta, actuaciones }: { acta: ActuacionActa, actuaciones: Actuacion[] }) => {
  const queryClient = useQueryClient()
  const { user } = useContext(AuthContext)

  const sentencia = ultimaSentencia(actuaciones)
  const validateStatus = acta?.estados?.find((estado) => estado.id === ESTADO_RESOLUCION_PENDIENTE)
  const validateFinalizado = acta?.estados?.find((estado) => estado.id === ESTADO_RESOLUCION_PAGADA)

  const { useAction, generarPDFGotenberg, convertToPDF } = usePdf()
  const { deleteActuacion } = useActuacion()

  const [modal, setModal] = useState({ delete: false, history: false, comprobante: false, cuotas: false })
  const [activeItem, setActiveItem] = useState<Actuacion | null>(null)

  const [selectedCuota, setSelectedCuota] = useState<Cuota | null>(null)

  const toggleModal = (action: string, value: boolean, actuacion?: Actuacion) => {
    if (actuacion) {
      setActiveItem(actuacion)
      setModal((prevState) => ({ ...prevState, [action]: value }))
    } else {
      setActiveItem(null)
      setModal((prevState) => ({ ...prevState, [action]: value }))
    }
  }

  const handleDeleteActuacion = async () => {
    if (!activeItem) return
    const response = await deleteActuacion.mutateAsync({ actaId: acta.id, actuacionId: activeItem.id })

    if (!response) return
    toggleModal('delete', false)
  }

  const onGeneratePDF = async (actuacion: Actuacion) => {
    await useAction.actionFn(async () => {
      const file = await generarPDFGotenberg(actuacion.plantilla?.path, actuacion.id, 'ACTUACION')
      if (!file) return

      const url = await carboneActions.uploadFilePDF(file, { ...actuacion, numero_acta: acta.numero_acta }, 'actuacion_id', user!.id)
      if (url) convertToPDF(url)
    })

    queryClient.invalidateQueries({ queryKey: ['acta-actuacion', { id: String(acta.id) }] })
    queryClient.invalidateQueries({ queryKey: ['history', { id: actuacion.id }] })
  }

  const handleconvertToPDF = async (url: string) => {
    useAction.actionFn(async () => {
      await convertToPDF(url)
    })
  }

  return (
    <>
      <div className='titulos rounded-md py-2 text-center mb-6'>
        <h3 className='text-xl font-semibold text-white'>Expedientes</h3>
      </div>

      <div>
        <Table>
          <Table.Head>
            {colums.map((colum: Column) => (
              <Table.HeadCell key={colum.key} className='text-center bg-gray-300'>{colum.label}</Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className='divide-y'>
            {
              actuaciones?.length
                ? actuaciones.map((actuacion: Actuacion) => (
                  <Table.Row key={actuacion.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='text-center dark:text-white'>{actuacion.id}</Table.Cell>
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>{actuacion.tipo}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{acta.numero_acta}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{acta.numero_causa}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{actuacion?.fecha || 'Plantilla Vieja (civitas)'}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{actuacion?.total ? `$ ${actuacion.total}` : 'Plantilla Vieja (civitas)'}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{actuacion?.usuario || 'Plantilla Vieja (civitas)'}</Table.Cell>
                    <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                      <Tooltip content='Ver'>
                        <Button color='warning'
                          className='w-8 h-8 flex items-center justify-center'
                          onClick={() => {
                            if (actuacion?.url)
                              handleconvertToPDF(actuacion.url)
                            else
                              onGeneratePDF(actuacion)
                          }}
                          disabled={!actuacion?.url && !actuacion?.plantilla?.path}
                        >
                          <icons.Print />
                        </Button>
                      </Tooltip>

                      <Tooltip content='Editar'>
                        <Button color='success' onClick={() => toggleModal('history', true, actuacion)} className='w-8 h-8 flex items-center justify-center'>
                          <icons.Pencil />
                        </Button>
                      </Tooltip>

                      <RoleGuard roles={[UserRole.ADMIN, UserRole.JEFE, UserRole.JUEZ, UserRole.SECRETARIO]}>
                        <Tooltip content='Eliminar'>
                          <Button color='failure' onClick={() => toggleModal('delete', true, actuacion)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.Trash />
                          </Button>
                        </Tooltip>
                      </RoleGuard>

                      {
                        (actuacion.id === sentencia?.id &&
                          validateStatus &&
                          !actuacion?.planPago &&
                          actuacion.estado_pago !== true) && (
                          <>
                            {actuacion.caja === false ? (
                              <Tooltip content='Enviar a bandeja'>
                                <Button
                                  color='purple'
                                  onClick={() => {
                                    setSelectedCuota(null)
                                    setActiveItem(actuacion)
                                    toggleModal('comprobante', true, actuacion)
                                  }}
                                  className='w-8 h-8 flex items-center justify-center'
                                >
                                  <icons.ReportMoney />
                                </Button>
                              </Tooltip>
                            ) : (
                              <Tooltip content='Retirar de bandeja'>
                                <Button
                                  color='info'
                                  onClick={() => {
                                    setSelectedCuota(null)
                                    setActiveItem(actuacion)
                                    toggleModal('comprobante', true, actuacion)
                                  }}
                                  className='w-8 h-8 flex items-center justify-center'
                                >
                                  <icons.ReportMoney />
                                </Button>
                              </Tooltip>
                            )}
                          </>
                        )
                      }

                      {actuacion?.path_comprobante && !actuacion?.planPago && (
                        <Tooltip content='Ver comprobante'>
                          <Button
                            color='purple'
                            onClick={() => window.open(actuacion.path_comprobante, '_blank')}
                            className='w-8 h-8 flex items-center justify-center'
                          >
                            <icons.World />
                          </Button>
                        </Tooltip>
                      )}

                      {/* <Tooltip content='Comprobante Digital'>
                        <Button
                          color='dark'
                          onClick={() =>
                            generarComprobanteDigital({
                              acta,
                              actuacion
                            })
                          }
                          className='w-8 h-8 flex items-center justify-center'
                        >
                          <icons.Show />
                        </Button>
                      </Tooltip> */}

                      {
                        (actuacion.id === sentencia?.id && validateStatus) &&
                        (
                          (!actuacion?.estado_pago || !validateFinalizado || actuacion?.planPago) && (
                            <Tooltip content='Cuotas'>
                              <Button
                                color='blue'
                                onClick={() => toggleModal('cuotas', true, actuacion)}
                                className='w-8 h-8 flex items-center justify-center'
                              >
                                <icons.Cuotas />
                              </Button>
                            </Tooltip>
                          )
                        )
                      }
                    </Table.Cell>
                  </Table.Row>
                ))
                : <tr><td colSpan={colums.length} className='text-center py-4 dark:bg-gray-800'>No se encontraron resultados</td></tr>
            }
          </Table.Body>
        </Table>
      </div>

      {(useAction.loading) && <LoadingOverlay />}

      <Modal size='4xl' show={modal.history} onClose={() => toggleModal('history', false)}>
        <Modal.Header>Editar Actuacion</Modal.Header>
        <Modal.Body>
          {activeItem && <ActuacionHistory acta={acta} actuacion={activeItem} onCloseModal={() => toggleModal('history', false)} />}
        </Modal.Body>
      </Modal>

      {activeItem &&
        <Modal show={modal.delete} onClose={() => toggleModal('delete', false)}>
          <Modal.Header>Eliminar actuación</Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <icons.Warning />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estás seguro de que deseas eliminar la actuación del listado?
              </h3>

              <div className="flex justify-center gap-4">
                <Button color="gray" onClick={() => toggleModal('delete', false)}>Cancelar</Button>
                <Button
                  color="failure"
                  onClick={handleDeleteActuacion}
                  isProcessing={deleteActuacion.isPending}
                  disabled={deleteActuacion.isPending}
                >
                  Sí, eliminar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      }

      {activeItem &&
        <ComprobanteModal
          show={modal.comprobante}
          onClose={() => {
            setSelectedCuota(null)
            toggleModal('comprobante', false)
          }}
          actuacion={activeItem}
          cuota={selectedCuota}
        />
      }

      {activeItem &&
        <PlanPagoModal
          show={modal.cuotas}
          onClose={() => toggleModal('cuotas', false)}
          actaId={acta.id}
          actuacion={activeItem}
          onActuacionChange={setActiveItem}
          onSelectCuota={setSelectedCuota}
          onOpenComprobante={() => toggleModal('comprobante', true, activeItem)}
        />
      }
    </>
  )
}
