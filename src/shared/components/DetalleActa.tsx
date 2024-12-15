import { useState } from 'react'
import { Label, TextInput, Tooltip } from 'flowbite-react'
import { clearNames, icons } from '..'
import { NotificationActa } from '../../modules/notificaciones/interfaces'
import { ActuacionActa } from '../../modules/actuaciones/interfaces'
import { AntecedentesList } from '../../modules/actas/forms/integrations/AntecedentesList'

interface Props {
  acta: NotificationActa | ActuacionActa
  title: string
}
export const DetalleActa = ({ acta, title }: Props) => {

  // Modal de antecedentes
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<number | null>(null)

  const toggleModal = (id?: number) => {
    setIsOpen(!isOpen)

    if (id) setActiveItem(id)
    else setActiveItem(null)
  }

  return (
    <div>
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white'>{title}</h1>
      </div>

      <div className='titulos rounded-md py-2 text-center mb-6'>
        <h3 className='text-xl font-semibold text-white'>Datos del Acta</h3>
      </div>

      <div className='grid md:grid-cols-2 gap-4 grid-cols-1 mt-2'>
        <div className='mb-4 relative'>
          <div className='mb-2 block'>
            <Label className='text-sm font-medium' htmlFor='numero_causa'>Número de Causa</Label>
          </div>
          <div className='flex'>
            <div className='relative w-full'>
              <TextInput
                name='numero_causa'
                type='text'
                placeholder='Numero de Causa'
                value={acta.numero_causa}
                disabled
              />
            </div>
          </div>
        </div>

        <div className='relative'>
          <div className='mb-2 block'>
            <Label className='text-sm font-medium' htmlFor='numero_acta'>Número de Acta</Label>
          </div>
          <div className='flex'>
            <div className='relative w-full'>
              <TextInput
                name='numero_causa'
                type='text'
                placeholder='Numero de Acta'
                value={acta.numero_acta}
                disabled
              />
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label className='text-sm font-medium text-gray-900 dark:text-white' htmlFor='fecha'>Fecha de Acta</Label>
          </div>
          <div className='flex'>
            <div className='relative w-full'>
              <TextInput
                name='fecha'
                placeholder='Numero de Acta'
                value={acta.fecha}
                disabled
              />
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label className='text-sm font-medium text-gray-900 dark:text-white' htmlFor='estado'>Estado</Label>
          </div>
          <div className='flex'>
            <div className='relative w-full'>
              <TextInput
                name='estado'
                type='text'
                placeholder='Estado'
                value={acta?.estados[acta.estados.length - 1].nombre}
                disabled
              />
            </div>
          </div>
        </div>

        <div className='relative'>
          <div className='mb-2 block'>
            <Label className='text-sm font-medium' htmlFor='Infractor'>Infractor</Label>
          </div>
          <div className='flex'>
            <div className='relative w-full'>
              <TextInput
                name='infractor'
                type='text'
                placeholder='Infractor'
                value={acta?.infractores?.length && `${ clearNames(acta.infractores[0]?.apellido, acta.infractores[0]?.nombre) }`}
                disabled
              />
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label className='text-sm font-medium text-gray-900 dark:text-white' htmlFor='antecedentes'>
                Antecedentes
            </Label>
          </div>

          <div className='flex items-center gap-4'>
            <div className='w-full'>
              <TextInput
                name='antecedentes'
                type='text'
                placeholder='Antecedentes'
                disabled
              />
            </div>
            
            <Tooltip content='Ver antecedentes'>
              <button 
                type='button' 
                onClick={() => toggleModal(acta?.infractores[0]?.id)}
                className='flex items-center rounded-md border border-gray-300 h-9 w-9 hover:bg-gray-200 
                hover:border-gray-200 dark:hover:bg-gray-500'
              >
                <icons.Antecedente />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      <AntecedentesList
        id={activeItem}
        isOpen={isOpen}
        toggleModal={toggleModal}
      />
    </div>
  )
}
