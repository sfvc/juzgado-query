/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Column } from '../../../shared/interfaces'
import type { Actuacion, ActuacionActa } from '../interfaces'
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
import { ultimaSentencia } from '../helpers/ultimaSentencia'
import { soloNumeros } from '../../../shared/helpers/formatNumber'
import { formatDate } from '../../../shared/helpers/formatDate'

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
  const { deleteActuacion, generateComprobante, deleteComprobante, createCuota } = useActuacion()

  const [modal, setModal] = useState({ delete: false, history: false, comprobante: false, cuotas: false })
  const [activeItem, setActiveItem] = useState<Actuacion | null>(null)

  const [entrega, setEntrega] = useState('')
  const [cantidadCuotas, setCantidadCuotas] = useState(2)
  const [selectedCuota, setSelectedCuota] = useState<any | null>(null)

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

  const handleGenerateComprobante = async () => {
    if (!activeItem) return
    const response = await generateComprobante.mutateAsync(activeItem.id)

    if (!response) return
    toggleModal('delete', false)
  }

  const handleDeleteComprobante = async () => {
    if (!activeItem) return
    const response = await deleteComprobante.mutateAsync(activeItem.id)

    if (!response) return
    toggleModal('delete', false)
  }

  const handleSaveCuotas = async () => {
    if (!activeItem) return
    try {
      await createCuota.mutateAsync({
        actuacionId: activeItem.id,
        entrega,
        cuotas: cantidadCuotas
      })

      const updated = await queryClient.fetchQuery({
        queryKey: ['acta-actuacion', { id: String(acta.id) }]
      })

      const refreshed = updated?.actuaciones?.find((a: Actuacion) => a.id === activeItem.id)
      if (refreshed) setActiveItem(refreshed)

      setEntrega('')
      setCantidadCuotas(2)

      toggleModal('cuotas', true, refreshed)
    } catch (error) {
      console.error('Error al guardar cuotas:', error)
    }
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
                        (actuacion.id === sentencia?.id && validateStatus && !actuacion?.planPago) &&
                        (
                          !actuacion?.estado_pago
                            ? (
                              <Tooltip content='Enviar a bandeja'>
                                <Button
                                  color='purple'
                                  onClick={() => toggleModal('comprobante', true, actuacion)}
                                  className='w-8 h-8 flex items-center justify-center'
                                >
                                  <icons.ReportMoney />
                                </Button>
                              </Tooltip>
                            )
                            : (
                              !validateFinalizado && (
                                <Tooltip content='Eliminar de bandeja'>
                                  <Button
                                    onClick={() => toggleModal('comprobante', true, actuacion)}
                                    className='w-8 h-8 flex items-center justify-center bg-slate-600'
                                  >
                                    <icons.ReportMoney />
                                  </Button>
                                </Tooltip>
                              )
                            )
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
        <Modal show={modal.comprobante} onClose={() => toggleModal('comprobante', false)}>
          <Modal.Header>Enviar a bandeja de cobro</Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <icons.Warning />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {selectedCuota
                  ? `Confirma para enviar la cuota N°${selectedCuota.cuota} a caja`
                  : !activeItem.estado_pago
                    ? 'Confirma para enviar a bandeja de cobro'
                    : '¿Desea eliminar de la bandeja de cobro?'}
              </h3>

              <div className="flex justify-center gap-4">
                <Button color="gray" onClick={() => {
                  setSelectedCuota(null)
                  toggleModal('comprobante', false)
                }}>Cancelar</Button>

                {selectedCuota ? (
                  <Button
                    color="success"
                    onClick={async () => {
                      await generateComprobante.mutateAsync(activeItem.id)
                      setSelectedCuota(null)
                      toggleModal('comprobante', false)
                    }}
                    isProcessing={generateComprobante.isPending}
                    disabled={generateComprobante.isPending}
                  >
                    Sí, enviar
                  </Button>
                ) : !activeItem.estado_pago ? (
                  <Button
                    onClick={handleGenerateComprobante}
                    isProcessing={generateComprobante.isPending}
                    disabled={generateComprobante.isPending}
                    color='success'
                  >
                    Sí, enviar
                  </Button>
                ) : (
                  <Button
                    onClick={handleDeleteComprobante}
                    isProcessing={deleteComprobante.isPending}
                    disabled={deleteComprobante.isPending}
                    color='failure'
                  >
                    Sí, eliminar
                  </Button>
                )}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      }

      {activeItem && (
        <Modal show={modal.cuotas} onClose={() => toggleModal('cuotas', false)} size="xl">
          <Modal.Header>Plan de Pago</Modal.Header>
          <Modal.Body>
            {activeItem?.planPago ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    Resumen
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Total:</span> ${activeItem.planPago.total}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Entrega:</span> ${activeItem.planPago.entrega}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Restante:</span>{' '}
                      ${Number(activeItem.planPago.total) - Number(activeItem.planPago.entrega)}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Cuotas:</span> {activeItem.planPago.cuotas}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    Detalle de Cuotas
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {activeItem?.planPago?.detalle_cuotas?.map((cuota: any, index: number) => (
                      <div
                        key={cuota.id}
                        className={`p-3 rounded-xl shadow-sm border text-sm ${cuota.pagado
                          ? 'bg-green-100 border-green-300 dark:bg-green-800/40 dark:border-green-600'
                          : 'bg-yellow-100 border-yellow-300 dark:bg-yellow-800/40 dark:border-yellow-600'
                        }`}
                      >
                        <p className="font-medium text-gray-800 dark:text-gray-100">
                          Cuota {index + 1}: ${cuota.importe}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Vencimiento:{' '}
                          <span className="font-medium">{formatDate(cuota.fecha_vencimiento)}</span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Estado:{' '}
                          <span className={cuota.pagado ? 'text-green-600 dark:text-green-400' : 'text-yellow-700 dark:text-yellow-300'}>
                            {cuota.pagado ? 'Pagado' : 'Pendiente'}
                          </span>
                        </p>

                        {cuota?.path_comprobante && (
                          <div className="mt-3 flex justify-end">
                            <Button
                              color="blue"
                              size="xs"
                              onClick={() => window.open(cuota.path_comprobante, '_blank')}
                            >
                              <icons.World /> <span className='mt-1 ml-1'>Comprobante</span>
                            </Button>
                          </div>
                        )}

                        {!cuota.pagado && (
                          <div className="mt-3 flex justify-end">
                            <Button
                              color={cuota.caja ? 'failure' : 'purple'}
                              size="xs"
                              onClick={async () => {
                                setActiveItem({ ...activeItem })
                                setSelectedCuota(cuota)

                                if (cuota.caja) {
                                  await handleDeleteComprobante()
                                  const updated = await queryClient.fetchQuery({
                                    queryKey: ['acta-actuacion', { id: String(acta.id) }]
                                  })
                                  const refreshed = updated?.actuaciones?.find((a: Actuacion) => a.id === activeItem.id)
                                  if (refreshed) setActiveItem(refreshed)
                                } else {
                                  toggleModal('comprobante', true, activeItem)
                                }
                              }}
                              disabled={
                                activeItem?.planPago?.detalle_cuotas?.some(
                                  (c: any) => !c.pagado && c.id < cuota.id
                                )
                              }
                            >
                              <icons.ReportMoney />
                              <span className='mt-1 ml-1'>{cuota.caja ? 'Retirar de caja' : 'Enviar a caja'}</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSaveCuotas()
                }}
              >
                {activeItem?.total && (
                  <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm shadow-sm">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Monto total:</span> ${activeItem.total}
                    </p>
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Entrega:</span> ${entrega || 0}
                    </p>
                    {Number(entrega || 0) > Number(activeItem.total) && (
                      <p className="text-red-600 font-medium">La entrega no puede superar el monto total</p>
                    )}
                    {Number(entrega || 0) < 100000 && (
                      <p className="text-red-600 font-medium">La entrega mínima es de $100.000</p>
                    )}
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Saldo:</span>{' '}
                      ${Math.max(Number(activeItem.total) - Number(entrega || 0), 0)}
                    </p>
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Valor de cada cuota:</span>{' '}
                      {cantidadCuotas > 0
                        ? (
                          Math.max(Number(activeItem.total) - Number(entrega || 0), 0) /
                          cantidadCuotas
                        ).toFixed(2)
                        : 0}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Entrega
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese entrega"
                    value={entrega}
                    onChange={(e) => setEntrega(e.target.value)}
                    onInput={soloNumeros}
                    className="w-full rounded-lg border border-gray-300 p-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Cantidad de Cuotas
                  </label>
                  <select
                    value={cantidadCuotas}
                    onChange={(e) => setCantidadCuotas(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-300 p-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {[2, 3, 4].map((cuotas) => (
                      <option key={cuotas} value={cuotas}>
                        {cuotas}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  <Button color="gray" onClick={() => toggleModal('cuotas', false)}>
                    Cancelar
                  </Button>
                  <Button
                    color="success"
                    type="submit"
                    isProcessing={createCuota.isPending}
                    disabled={
                      createCuota.isPending ||
                      Number(entrega || 0) > Number(activeItem.total) ||
                      Number(entrega || 0) < 100000
                    }
                  >
                    Guardar
                  </Button>
                </div>
              </form>
            )}
          </Modal.Body>
        </Modal>
      )}
    </>
  )
}
