import { Button, Card } from 'flowbite-react'
import { clearNames, icons } from '../../../shared'
import type { IInhabilitado } from '../interfaces'

interface Props {
  inhabilitado: IInhabilitado
  closeModal: () => void
}
export const ShowInhabilitado = ({inhabilitado, closeModal}: Props) => {

  let articuloList: string = ''

  inhabilitado?.acta?.articulos.forEach((articulo: number) => {
    if(articuloList === '') articuloList = articulo.toString()
    else articuloList = articuloList + ', ' + articulo
  })

  return (
    <div>
      <Card className='w-full'>
        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Información de Inhabilitación</h5>
        <ul className="grid grid-cols-2 gap-8">
          <li className='flex items-center'>
            <icons.Check />
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              <strong>Nombre y apellido:</strong> {clearNames(inhabilitado?.persona.apellido, inhabilitado?.persona.nombre)}
            </span>
          </li>

          <li className='flex items-center'>
            <icons.Check />
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              <strong>Documento:</strong> {inhabilitado?.persona.numero_documento}
            </span>
          </li>

          <li className='flex items-center'>
            <icons.Check />
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              <strong>Fecha de inhabilitación:</strong> {inhabilitado.fecha_desde}
            </span>
          </li>

          <li className='flex items-center'>
            <icons.Check />
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              <strong>Fecha de vencimiento:</strong> {inhabilitado.fecha_hasta}
            </span>
          </li>

          <li className='flex items-center'>
            <icons.Check />
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              <strong>Periodo de Inhabilitación:</strong> {inhabilitado.periodo_inhabilitacion_dias} Días
            </span>
          </li>

          <li className="flex space-x-3 items-center">
            <icons.Check />
            <span className="text-base font-normal text-gray-500 dark:text-gray-400"><strong>Estado: </strong></span>
            <span 
              className={`max-w-40 truncate px-2 border-none rounded-lg inline-block text-white ml-2  
                ${ inhabilitado.tiempo_transcurrido_dias ? 'bg-green-500' : 'bg-red-500' }
              `}
            >
              {inhabilitado.tiempo_transcurrido_dias ? 'HABILITADO' : 'INHABILITADO'}
            </span>
          </li>

          <li className='flex items-center'>
            <icons.Check />
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              <strong>Organismo:</strong> {inhabilitado?.juzgado.nombre}
            </span>
          </li>

          <li className='flex items-center'>
            <icons.Check />
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              <strong>Causa de Inhabilitación:</strong> {inhabilitado?.causa}
            </span>
          </li>

          <li className='flex items-center'>
            <icons.Check />
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              <strong>Instrumento legal:</strong> {inhabilitado?.instrumento}
            </span>
          </li>

          <li className='flex items-center'>
            <icons.Check />
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              <strong>Número de acta:</strong> {inhabilitado?.acta.numero_acta}
            </span>
          </li>

          <li className='flex items-center'>
            <icons.Check />
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              <strong>Retención de Licencia:</strong> {inhabilitado?.acta.retencion_licencia ? 'Si' : 'No'}
            </span>
          </li>

          <li className='flex items-center'>
            <icons.Check />
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              <strong>Articulos:</strong> {articuloList}
            </span>
          </li>

        </ul>

        <div className='flex justify-end'>
          <Button type="button" color='failure' className='px-2' onClick={closeModal}>
            Cerrar
          </Button>
        </div>
      </Card>
    </div>
  )
}
