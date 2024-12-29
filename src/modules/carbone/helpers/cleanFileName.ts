// Función para quitar la extensión del archivo y limpiar el nombre

export const cleanFileName = (fileName: string): string => {
  // Quitar la extensión del archivo
  const lastDotIndex = fileName.lastIndexOf('.')
  let baseName = lastDotIndex !== -1 ? fileName.slice(0, lastDotIndex) : fileName
  
  // Normalizar para eliminar acentos y convertir caracteres especiales a ASCII
  baseName = baseName.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  
  // Reemplazar caracteres no alfanuméricos por guiones bajos
  baseName = baseName.replace(/[^a-zA-Z0-9]/g, '-')
  
  return baseName.toLowerCase()
}