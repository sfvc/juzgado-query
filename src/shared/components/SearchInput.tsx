import React, { useState, useCallback, useEffect } from 'react'
import { Label, TextInput, Spinner } from 'flowbite-react'
import { icons } from '..'

interface SearchItem {
  id: string | number
  nombre?: string
}

interface SearchInputProps<T extends SearchItem> {
  label?: React.ReactNode  // Cambiado de string a React.ReactNode
  placeholder?: string
  onSearch: (query: string) => Promise<T[]>
  onSelect: (item: T) => void
  renderItem?: (item: T) => React.ReactNode
  debounceTime?: number
  renderInput: (item: T) => string
  resetInput?: () => void
  resetForm?: boolean,
  defaultValue?: string,
  helperText?: string,
  color?: string
}

export function SearchInput<T extends SearchItem>({
  label = 'Buscar',
  placeholder = 'Buscar...',
  onSearch,
  onSelect,
  renderItem,
  debounceTime = 300,
  renderInput,
  resetInput,
  resetForm,
  defaultValue,
  helperText,
  color
}: SearchInputProps<T>) {
  const [search, setSearch] = useState<string>(defaultValue || '')
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.length < 2) {
        setData([])
        return
      }

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearch(value)
    setShowResults(true)
    debouncedSearch(value)
  }

  const handleSelect = (item: T) => {
    onSelect(item)
    setSearch(renderInput(item))
    setShowResults(false)
    setData([])
  }

  const onFocusInput = () => {
    setSearch('')
    if (resetInput) resetInput()
  }

  useEffect(() => {
    if (resetForm) onFocusInput()
  }, [resetForm])

  return (
    <div className="mb-4 relative w-full">
      <div className="mb-2 dark:text-white">
        <Label color="gray" htmlFor="search" value={label} />
      </div>
      <div className="relative">
        <TextInput
          name="search"
          type="text"
          onChange={handleSearch}
          value={search}
          placeholder={placeholder}
          className={`${
            color === 'failure' ? 'text-red-500 bg-white border border-red-500 placeholder-red-500 rounded-lg' : ''
          }`}
          onFocus={onFocusInput}
          autoComplete="off"
        />
        <div className={`absolute top-0 right-0 h-full flex items-center mr-2 pointer-events-none ${!isLoading && search ? 'hidden' : ''}`}>
          {isLoading ? <Spinner size="sm" /> : <icons.Search hidden={search} />}
        </div>
      </div>

      {showResults && search.length >= 2 && (
        <ul className="w-full overflow-y-auto max-h-32 absolute z-10 bg-white dark:bg-gray-700 dark:text-white shadow-md rounded-md mt-1">
          {data.length > 0 ? (
            data.map((item) => (
              <li key={item.id} className="hover:bg-gray-100 dark:hover:bg-gray-600 border-b last:border-b-0">
                <button
                  type="button"
                  className="w-full text-start py-2 px-4"
                  onClick={() => handleSelect(item)}
                >
                  {renderItem ? renderItem(item) : item?.nombre}
                </button>
              </li>
            ))
          ) : (
            <li className="py-2 px-4">No se encontraron resultados.</li>
          )}
        </ul>
      )}

      {helperText && (
        <div className={`mt-2 text-sm ${color === 'failure' ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
          {helperText}
        </div>
      )}
    </div>
  )
}

function debounce<T extends (query: string) => void>(func: T, wait: number): (query: string) => void {
  let timeout: number | undefined

  return (query: string) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(query), wait)
  }
}
