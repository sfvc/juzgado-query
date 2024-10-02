import styled from 'styled-components'
import type { UseFormRegisterReturn } from 'react-hook-form'

const Container = styled.span`
  display: inline-flex;
  align-items: center;
  width: 150px;
  max-width: 150px;
  padding: 0px 12px;
  border: 1px solid #bfc9d9;
  border-radius: 8px;

  input[type="color"] {
    margin-right: 8px;
    -webkit-appearance: none;
    border: none;
    width: auto;
    height: auto;
    cursor: pointer;
    background: none;
    &::-webkit-color-swatch-wrapper {
      padding: 0;
      width: 14px;
      height: 14px;
    }
    &::-webkit-color-swatch {
      border: 1px solid #bfc9d9;
      border-radius: 4px;
      padding: 0;
    }
  }

  input[type="text"] {
    border: none;
    width: 100%;
    font-size: 14px;
  }
`

interface Props {
    handleColor: (name: string, value: string) => void
    register: UseFormRegisterReturn
    selectedColor: string
}

export const ColorPicker = ({ handleColor, register, selectedColor }: Props) => {
  return (
    <Container>
      <input 
        {...register} 
        type='color' 
        onChange={(e) => handleColor('color', e.target.value)} 
      />

      <input 
        type='text' 
        className='dark:bg-gray-700 dark:text-white' 
        value={selectedColor} 
        disabled 
      />
    </Container>
  )
}