import React from 'react'

const URL = 'https://randomuser.me/api?results=10'
let renderCount = 0

window.fetchUserFunctions = []

export const App = () => {
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    fetchUsers()
  // mount only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    console.log('RENDER NUMER ' + renderCount)
    renderCount = renderCount + 1
  })

  const loadUsers = React.useCallback(async () => {
    const r = await fetch(URL)
    const responseData = await r.json()
    setData(responseData.results)
  }, [])

  const fetchUsers = React.useCallback(async () => {
    setIsLoading(true)
    try {
      await loadUsers()
    } catch (error) {
      setHasError(error)
    } finally {
      setIsLoading(false)
    }
  }, [loadUsers])

  window.fetchUserFunctions[renderCount] = fetchUsers

  return (
    <>
      <button
        disabled={isLoading}
        onClick={fetchUsers}
      >
        FETCH
      </button>
      <ul>
        {
       hasError ?
         'Error!'
         :
         isLoading ?
           'Loading'
           :
             !Array.isArray(data) ?
               'No data'
               :
               data.map((user) => {
                 return (
                   <li key={user.email}>
                     {user.email}
                   </li>
                 )
               })
      }
      </ul>
    </>
  )
}

export default App
