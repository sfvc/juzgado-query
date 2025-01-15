
import { Drawer } from 'flowbite-react'
import { useActaById } from '../hooks/useActaById'
import { clearNames } from '../../../shared'
import { SkeletonDrawer } from './SkeletonDrawer'

interface Props {
  id: string
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const ActaDrawer = ({ id, isOpen, setIsOpen }: Props) => {
  const { acta, isLoading } = useActaById(id)

  const handleClose = () => setIsOpen(false)

  return (
    <>
      <Drawer open={isOpen} onClose={handleClose} position="right" className="w-1/2">
        <Drawer.Header title="Información del Acta" />
        <Drawer.Items className='relative'>
          {
            isLoading
              ? <SkeletonDrawer />
              :
              <div>
                <ul className="grid grid-cols-1 gap-8">
                  <li className='flex items-center space-x-1'>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      <strong>Numero de acta:</strong> {acta?.numero_acta}
                    </span>
                  </li>

                  <li className='flex items-center space-x-1'>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      <strong>Numero de causa:</strong> {acta?.numero_causa}
                    </span>
                  </li>
            
                  <li className='flex items-center space-x-1'>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      <strong>Hora de infracción:</strong> {acta?.fecha}
                    </span>
                  </li>
            
                  <li className='flex items-center space-x-1'>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      <strong>Fecha de infracción:</strong> {acta?.fecha}
                    </span>
                  </li>

                  <li className='flex items-center space-x-1'>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      <strong>Fecha de prescripción:</strong> {acta?.fecha_prescripcion}
                    </span>
                  </li>
            
                  <div className='flex justify-between gap-2'>
                    <li className='flex items-center space-x-1'>
                      <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                        <strong>Retención de Vehiculo:</strong> {acta?.retencion_vehiculo ? 'Si' : 'No'}
                      </span>
                    </li>

                    <li className='flex items-center space-x-1'>
                      <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                        <strong>Retención de Licencia:</strong> {acta?.retencion_licencia ? 'Si' : 'No'}
                      </span>
                    </li>

                    <li className='flex items-center space-x-1'>
                      <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                        <strong>Notificado:</strong> {acta?.notificado ? 'Si' : 'No'}
                      </span>
                    </li>
                  </div>

                  <div>
                    <h4 className='text-xl font-normal leading-tight text-gray-500 dark:text-gray-400 mb-2'>Infractores</h4>
                    {
                      acta?.infractores.map((infractor) => (
                        <div className='grid grid-cols-2 gap-2'>
                          <li className='flex items-center space-x-1'>
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                              <strong>Nombre y apellido:</strong> {clearNames(infractor.apellido, infractor.nombre)}
                            </span>
                          </li>

                          <li className='flex items-center space-x-1'>
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                              <strong>Documento:</strong> {acta?.infractores[0].documento}
                            </span>
                          </li>
                        </div>
                      ))
                    }
                  </div>

                  <li className='flex items-center space-x-1'>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      <strong>Calle:</strong> {acta?.calle}
                    </span>
                  </li>

                  <li className='flex items-center space-x-1'>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      <strong>Observaciones:</strong> {acta?.observaciones}
                    </span>
                  </li>

                  <div>
                    <h4 className='text-xl font-normal leading-tight text-gray-500 dark:text-gray-400 mb-2'>Insfracciones Cometidas</h4>
                    {
                      acta?.infracciones_cometidas.map((infraccion) => (
                        <div className='flex flex-col justify-between gap-2'>
                          <li className='flex items-center space-x-1'>
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                              <strong>Articulo:</strong> {infraccion.numero}
                            </span>
                          </li>

                          <li className='flex items-center space-x-1'>
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                              <strong>Descripción:</strong> {infraccion.detalle}
                            </span>
                          </li>
                        </div>
                      ))
                    }
                  </div>

                  {
                    <div>
                      <h4 className='text-xl font-normal leading-tight text-gray-500 dark:text-gray-400 mb-2'>Vehiculo</h4>
                      <div className='grid grid-cols-2 gap-2'>
                        <li className='flex items-center space-x-1'>
                          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                            <strong>Titular:</strong> {clearNames(acta?.vehiculo?.titular?.apellido, acta?.vehiculo?.titular?.nombre)}
                          </span>
                        </li>

                        <li className='flex items-center space-x-1'>
                          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                            <strong>Dominio:</strong> {acta?.vehiculo?.dominio || '-'}
                          </span>
                        </li>

                        <li className='flex items-center space-x-1'>
                          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                            <strong>Marca:</strong> {acta?.vehiculo?.marca?.nombre || '-'}
                          </span>
                        </li>

                        <li className='flex items-center space-x-1'>
                          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                            <strong>Modelo:</strong> {acta?.vehiculo?.modelo || '-'}
                          </span>
                        </li>

                        <li className='flex items-center space-x-1'>
                          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                            <strong>Tipo:</strong> {acta?.vehiculo?.tipo?.nombre || '-'}
                          </span>
                        </li>

                        <li className='flex items-center space-x-1'>
                          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                            <strong>Color:</strong> {acta?.vehiculo?.color?.nombre || '-'}
                          </span>
                        </li>
                      </div>
                    </div>
                  }
              
                </ul>
              </div>
          }
        </Drawer.Items>
      </Drawer>
    </>
  )
}
