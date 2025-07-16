export const setUrlParams = (filters: object) => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value.toString())
    }
  })

  return params
}
