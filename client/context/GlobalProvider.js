import React, { createContext, useContext, useRef } from 'react'
import axios from 'axios'
import isUser from '../hooks/isUser'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
  // const [isLogged, setIsLogged] = useState(false)
  // const [user, setUser] = useState(null)
  // const [loading, setLoading] = useState(true)
  // const [darkMode, setDarkMode] = useState(true)
  const refreshPooling = useRef()

  if (isUser())
    refreshPooling.current = setInterval(
      () =>
        axios.post('auth/refresh').catch(async () => {
          clearInterval(refreshPooling.current)
          await AsyncStorage.removeItem('user')
          router.replace('login')
        }),
      600000
    )

  axios.defaults.baseURL = 'http://localhost:3001'
  axios.defaults.withCredentials = true

  return (
    <GlobalContext.Provider
      value={{
        refreshPooling,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
