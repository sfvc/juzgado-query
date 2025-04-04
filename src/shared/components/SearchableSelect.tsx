import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Label, TextInput, Spinner } from 'flowbite-react'
import { icons } from '..'

interface SearchItem {
  id: string | number
  nombre?: string
}

interface SearchInputProps<T extends SearchItem> {
  label?: string
  placeholder?: string
  onSearch: (query: string) => Promise<T[]>
  onSelect: (item: T) => void
  renderItem?: (item: T) => React.ReactNode
  debounceTime?: number
  renderInput: (item: T) => string
  defaultValue?: string
  resetInput: () => void
  disabled?: boolean
}

export function SearchableSelect<T extends SearchItem>({
  label = 'Buscar',
  placeholder = 'Buscar...',
  onSearch,
  onSelect,
  renderItem,
  debounceTime = 300,
  renderInput,
  defaultValue,
  resetInput,
  disabled
}: SearchInputProps<T>) {
  const [search, setSearch] = useState(defaultValue || '')
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      setIsLoading(true)
      try {
        const results = await onSearch(query)
        setData(results)
      } catch (error) {
        console.error('Error searching:', error)
        setData([])
      } finally {
        setIsLoading(false)
      }
    }, debounceTime),
    [onSearch, debounceTime]
  )

  const handleSearch = (value: string) => {
    setSearch(value)
    setShowResults(true)
    debouncedSearch(value)
  }

  const handleSelect = (item: T) => {
    onSelect(item)
    setSearch( renderInput(item) )
    setShowResults(false)
    setData([])
  }

  const onFocusInput = () => {
    resetInput()
    handleSearch('')
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setShowResults(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={containerRef} className="mb-4 relative w-full">
      <div className="mb-2 block dark:text-white">
        <Label color="gray" htmlFor="search" value={label} />
      </div>
      <div className="relative">
        <TextInput
          name="search"
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          value={search}
          placeholder={placeholder}
          className="w-full"
          onFocus={onFocusInput}
          autoComplete='off'
          disabled={disabled}
        />
        <div className={`absolute top-0 right-0 h-full flex items-center mr-2 pointer-events-none ${(!isLoading && search) && 'hidden'}`}>
          { isLoading
            ? <Spinner size="sm" />
            : <icons.Search hidden={search}/>
          }
        </div>
      </div>
      { showResults && (
        <ul className="w-full overflow-y-auto max-h-32 absolute z-10 bg-white dark:bg-gray-700 dark:text-white shadow-md rounded-md mt-1">
          {
            data.length > 0 
              ? 
              (data.map((item) => (
                <li key={item.id} className="hover:bg-gray-100 dark:hover:bg-gray-600 border-b last:border-b-0">
                  <button
                    type="button"
                    className="w-full text-start py-2 px-4"
                    onClick={() => handleSelect(item)}
                  >
                    {renderItem ? renderItem(item) : item?.nombre}
                  </button>
                </li>
              ))) 
              : <li className="py-2 px-4">{ isLoading ? 'Cargando...' : 'No se encontraron resultados.' }</li>
          }
        </ul>
      )}
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