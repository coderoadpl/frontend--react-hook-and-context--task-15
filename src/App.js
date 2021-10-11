import React from 'react'
import { useAsyncFn } from 'react-use'

const URL = 'https://randomuser.me/api?results=10'

export const App = () => {
  const [searchPhrase, setSearchPhrase] = React.useState('')

  const [{ value: users, loading, error }, fetchUsers] = useAsyncFn(async () => {
    const r = await fetch(URL)
    const responseData = await r.json()
    return responseData.results
  }, [])

  React.useEffect(() => {
    fetchUsers()
  // mount only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredUsers = Array.isArray(users) && users.filter((user) => {
    return user.email.includes(searchPhrase)
  })

  return (
    <>
      <button
        disabled={loading}
        onClick={fetchUsers}
      >
        FETCH
      </button>
      <input
        value={searchPhrase}
        onChange={(e) => setSearchPhrase(e.target.value)}
      />
      <ul>
        {
       error ?
         'Error!'
         :
         loading ?
           'Loading'
           :
             !Array.isArray(users) ?
               'No data'
               :
               filteredUsers.map((user) => {
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
