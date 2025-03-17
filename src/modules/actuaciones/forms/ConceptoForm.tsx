import { useState } from 'react'
import { Button, TextInput, Alert } from 'flowbite-react'
import { icons } from '../../../shared'
import type { Concepto } from '../interfaces/sentencia'

interface Props {
  entries: Concepto[]
  setEntries: (entries: Concepto[]) => void
}

export const ConceptoForm = ({ entries, setEntries }: Props) => {
  const [hasError, setHasError] = useState(false)

  const handleInputChange = (index: number, field: keyof Concepto, value: string | number) => {
    const newEntries = [...entries]

    if (field === 'monto') {
      if (value === '') {
        newEntries[index] = { ...newEntries[index], [field]: 0 }
      } else {
        const parsedValue = parseFloat(value as string)
        newEntries[index] = { ...newEntries[index], [field]: isNaN(parsedValue) ? 0 : Math.max(0, parsedValue) }
      }
    } else if (field === 'concepto') {
      newEntries[index] = { ...newEntries[index], [field]: value as string }
    }

    setEntries(newEntries)
    validateEntries(newEntries)
  }

  const handleAddEntry = () => {
    setEntries([...entries, { concepto: '', monto: 0 }])
    setHasError(true)
  }

  const handleRemoveEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index)
    setEntries(newEntries)
    validateEntries(newEntries)
  }

  const validateEntries = (entries: Concepto[]) => {
    setHasError(entries.some(entry => entry.concepto.trim() === ''))
  }

  return (
    <div>
      <div className='titulos rounded-md py-2 text-center my-6'>
        <h3 className='text-xl font-semibold text-white'>Agregar Conceptos</h3>
      </div>

      {hasError && (
        <Alert color="failure" className="mb-4">
          Todos los conceptos deben estar completos antes de continuar.
        </Alert>
      )}

      {entries.map((entry, index) => (
        <div key={index} className='grid md:grid-cols-2 gap-4 grid-cols-1 mb-4'>
          <TextInput
            type="text"
            placeholder="Concepto *"
            value={entry.concepto}
            onChange={(e) => handleInputChange(index, 'concepto', e.target.value)}
            color={entry.concepto.trim() === '' ? 'failure' : undefined} // Resaltar si está vacío
          />

          <div className='flex gap-4'>
            <TextInput
              type="text"
              placeholder="Importe *"
              value={entry.monto === 0 ? '' : entry.monto}
              onChange={(e) => handleInputChange(index, 'monto', e.target.value)}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '')
              }}
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
        <icons.Plus />
        Agregar Entrada
      </Button>
    </div>
  )
}
