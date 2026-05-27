
export const sanitizeData = (data: Record<string, unknown>): Record<string, unknown> => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (!value || value === ', ' || value === 'undefined' || value === 'null' || key === 'id') {
        return [key, '']
      }
      return [key, value]
    })
  )
}
