import React from 'react'

const URL = 'https://randomuser.me/api?results=10'

export const App = () => {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    fetch(URL)
      .then((r) => r.json())
      .then((responseData) => setData(responseData.results))
  }, [])

  return (
    <ul>
      {
        data === null ?
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
  )
}

export default App
