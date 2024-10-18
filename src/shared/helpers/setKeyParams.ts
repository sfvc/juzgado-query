export const setKeyParams = <T>(filters: T) => {
  let objectKeys: object = {}
    
  Object.entries(filters as object).forEach(([key, value]) => {
    if (value) {
      objectKeys = {
        ...objectKeys,
        [key]: value
      }
    }
  })
    
  return objectKeys
}
  