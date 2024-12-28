import { Button, TextInput } from 'flowbite-react'
import {icons} from '../../../shared'
import type { Concepto } from '../interfaces/sentencia'

interface Props {
  entries: Concepto[]
  setEntries: (entries: Concepto[]) => void
}

export const ConceptoForm = ({ entries, setEntries }: Props) => {

  const handleInputChange = (index: number, field: keyof Concepto, value: string | number) => {
    const newEntries = [...entries]

    if (field === 'monto') {
      // Permite valores vacíos temporalmente
      if (value === '') {
        newEntries[index] = { ...newEntries[index], [field]: 0 }
      } else {
        const parsedValue = parseFloat(value as string)
        newEntries[index] = { ...newEntries[index], [field]: isNaN(parsedValue) ? 0 : Math.max(0, parsedValue) }
      }
    } else if (field === 'concepto') {
      // Asegurar que siempre sea un string
      newEntries[index] = { ...newEntries[index], [field]: value as string }
    }

    setEntries(newEntries)
  }
  
  // Agregar un nuevo campo
  const handleAddEntry = () => {
    setEntries([...entries, { concepto: '', monto: 0 }])
  }

  // Eliminar un campo
  const handleRemoveEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index)
    setEntries(newEntries)
  }

  return (
    <div>
      <div className='titulos rounded-md py-2 text-center my-6'>
        <h3 className='text-xl font-semibold text-white'>Agregar Conceptos</h3>
      </div>

      {entries.map((entry, index) => (
        <div key={index} className='grid md:grid-cols-2 gap-4 grid-cols-1 mb-4'>
          <TextInput
            type="text"
            placeholder="Concepto"
            value={entry.concepto}
            onChange={(e) => handleInputChange(index, 'concepto', e.target.value)}
          />

          <div className='flex gap-4'>
            <TextInput
              type="number"
              placeholder="Importe"
              value={entry.monto === 0 ? '' : entry.monto}
              onChange={(e) => handleInputChange(index, 'monto', parseFloat(e.target.value))}
              className='flex flex-1'
            />

            <Button
              type="button"
              color='failure'
              onClick={() => handleRemoveEntry(index)}
            >
              Eliminar
            </Button>

          </div>
        </div>
      ))}

      <Button type="button" onClick={handleAddEntry}>
        <icons.Plus/>
        Agregar Entrada
      </Button>
    </div>
  )
}
