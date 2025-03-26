import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

const isUser = () => {
  const [Data, setData] = useState(false)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user')
        if (user) {
          setData(true)
        }
      } catch (error) {
        setData(false)
      }
    }
    fetchUser()
  }, [])
  return Data
}

export default isUser
