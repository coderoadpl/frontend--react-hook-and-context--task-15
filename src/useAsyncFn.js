import React from 'react'

export const useAsyncFn = (fn, deps) => {
  const [value, setValue] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const runAsyncFn = React.useCallback(async () => {
    setLoading(true)
    try {
      const response = await fn()
      setValue(response)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return [
    {
      value,
      loading,
      error
    },
    runAsyncFn
  ]
}
