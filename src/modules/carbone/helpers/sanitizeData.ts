export const sanitizeData = (data: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (!value || value === ', ' || value === 'undefined' || value === 'null' || key === 'id') {
        return [key, '']
      }
      return [key, value]
    })
  )
}
  