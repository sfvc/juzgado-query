import React, { useState, useCallback } from 'react'
import { TextInput, Spinner } from 'flowbite-react'
import { icons } from '..'

interface Props {
  onSearch: (value: string) => void
  debounceTime?: number
}

export function InputTable({ onSearch, debounceTime = 400 }: Props) {
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      try {
        await onSearch(query)
      } catch (error) {
        console.error('Error searching:', error)
      } finally {
        setIsLoading(false)
      }
    }, debounceTime),
    [onSearch, debounceTime]
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    
    setSearch(value)
    setIsLoading(true)
    debouncedSearch(value)
  }

  return (
    <div className="relative">
      <TextInput
        name="search"
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder='Buscar'
      />
      <div className={`absolute top-0 right-0 h-full flex items-center mr-2 pointer-events-none ${(!isLoading && search) && 'hidden'}`}>
        { isLoading
          ? <Spinner size="sm" />
          : <icons.Search hidden={search}/>
        }
      </div>
    </div>
  )
}

function debounce<T extends (query: string) => void>(
  func: T,
  wait: number
): (query: string) => void {

  let timeout: number | undefined

  return (query: string) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(query), wait)
  }
}