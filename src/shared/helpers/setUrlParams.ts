export const setUrlParams = (filters: object) => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (key === 'paginate' && value === 'false') return

    if (value !== undefined && value !== null && value !== '' && value !== false) {
      params.append(key, value.toString())
    }
  })

  return params
}
