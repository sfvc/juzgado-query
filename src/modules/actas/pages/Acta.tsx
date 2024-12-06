import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Label, Select } from 'flowbite-react'
import { ActaFilter } from '../components/ActaFilter'
import { TIPO_ACTAS } from '../../../shared/constants'

export const Acta = () => {
  const navigate = useNavigate()
  const [tipoActa, setTipoActa] = useState<string>('')

  const handleRedirect = () => navigate(`/acta/${tipoActa}/crear`)

  return (
    <React.Fragment>
      <div>
        {/* Creacion de Actas */}
        <div className='titulos  rounded-md py-2 text-center mb-2'>
          <h3 className='text-xl font-semibold text-white'>Agregar Acta</h3>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 mb-4'>
          <div>
            <div className='mb-2 block'>
              <Label
                htmlFor='create_acta'
                value='Tipo de Acta'
              />
            </div>

            <div className='flex justify-between gap-2'>
              <Select className='flex-1' name='create_acta' 
                onChange={(e) => setTipoActa((e.target.value).toLocaleLowerCase().replace(/\s+/g, ''))}
              >
                <option value='' hidden>Seleccione el tipo de acta</option>
                {
                  TIPO_ACTAS.map((tipo: string, index: number) => (
                    <option key={index} value={tipo}>{tipo}</option>
                  ))
                }
              </Select>

              <Button type='button' className='px-2 titulos' onClick={handleRedirect}>
                Nueva
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filtro de actas */}
      <ActaFilter />

    </React.Fragment>
  )
}
