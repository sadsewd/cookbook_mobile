import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

const getUser = async () => {
  const [user, setUser] = useState()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user')
        if (user) {
          setUser(user)
        }
      } catch (error) {
        setUser(null)
      }
    }
    fetchUser()
  }, [])
  return user
}

export default getUser
