import React from 'react'

export const useAsyncFn = (fn, deps) => {
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasError, setHasError] = React.useState(false)

  const runAsyncFn = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fn()
      setData(response)
    } catch (error) {
      setHasError(error)
    } finally {
      setIsLoading(false)
    }
  }, deps)

  return [
    {
      data,
      isLoading,
      hasError
    },
    runAsyncFn
  ]
}
