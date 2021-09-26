import React from 'react'
import { useAsyncFn } from './useAsyncFn'

const URL = 'https://randomuser.me/api?results=10'
let renderCount = 0

window.fetchUserFunctions = []

export const App = () => {
  const loadUsers = React.useCallback(async () => {
    const r = await fetch(URL)
    const responseData = await r.json()
    return responseData.results
  }, [])

  const [fetchState, fetchUsers] = useAsyncFn(loadUsers, [loadUsers])

  React.useEffect(() => {
    fetchUsers()
  // mount only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    console.log('RENDER NUMER ' + renderCount)
    renderCount = renderCount + 1
  })

  window.fetchUserFunctions[renderCount] = fetchUsers

  return (
    <>
      <button
        disabled={fetchState.isLoading}
        onClick={fetchUsers}
      >
        FETCH
      </button>
      <ul>
        {
       fetchState.hasError ?
         'Error!'
         :
         fetchState.isLoading ?
           'Loading'
           :
             !Array.isArray(fetchState.data) ?
               'No data'
               :
               fetchState.data.map((user) => {
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
