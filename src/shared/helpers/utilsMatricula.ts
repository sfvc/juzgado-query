const maxLength = 14
let formattedMatricula: string = ''

// Función para formatear en tiempo real
export const formatMatricula = (value: string) => {
  const cleanedValue = value.replace(/[^\d]/g, '')

  if (cleanedValue.length > maxLength) return formattedMatricula

  if (cleanedValue.length <= 14) {
    formattedMatricula = cleanedValue.replace(/^(\d{2})(\d{2})(\d{2})(\d{4})(\d{4})$/, '$1-$2-$3-$4/$5')
  } else {
    formattedMatricula = cleanedValue.slice(0, 14).replace(/^(\d{2})(\d{2})(\d{2})(\d{4})(\d{4})$/, '$1-$2-$3-$4/$5')
    formattedMatricula += '/' + cleanedValue.slice(14)
  }

  return formattedMatricula
}

// Función para limpiar antes de enviar
export const cleanMatricula = (formattedMatricula: string) => {
  return formattedMatricula.replace(/[^\d]/g, '')
}