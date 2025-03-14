import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  axios.defaults.baseURL = 'http://localhost:3001'
  axios.defaults.withCredentials = true
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  useEffect(() => {
    // axios
    //   .post('auth/login', {
    //     email: 'tt',
    //     password: 'Parole1',
    //   })
    //   .then((res) => {
    //     console.log(res)
    //     setInterval(() => {
    //       axios.post('auth/refresh').then((res) => {
    //         console.log(res)
    //       })
    //     }, 1000 * 10)
    //   })
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        setLoading,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
