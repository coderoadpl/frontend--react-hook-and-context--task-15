import React from 'react'
import { useAsyncFn } from './useAsyncFn'

const URL = 'https://randomuser.me/api?results=10'

export const App = () => {
  const [{ value, loading, error }, fetchUsers] = useAsyncFn(async () => {
    const r = await fetch(URL)
    const responseData = await r.json()
    return responseData.results
  }, [])

  React.useEffect(() => {
    fetchUsers()
  // mount only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <button
        disabled={loading}
        onClick={fetchUsers}
      >
        FETCH
      </button>
      <ul>
        {
       error ?
         'Error!'
         :
         loading ?
           'Loading'
           :
             !Array.isArray(value) ?
               'No data'
               :
               value.map((user) => {
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
