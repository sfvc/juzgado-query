import { Label, Select } from 'flowbite-react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface Props {
  register: UseFormRegisterReturn
  label: string
}

export const CustomSelect = ({ register, label }: Props) => {
  return (
    <div className='w-full mb-4' id='select'>
      <div className='mb-2 block'>
        <Label
          htmlFor={register.name}
          value={label}
        />
      </div>
    
      <Select {...register} defaultValue={0} required>
        <option value={1}>
              Si
        </option>
        <option value={0}>
              No
        </option>
      </Select>
    </div>
  )
}
