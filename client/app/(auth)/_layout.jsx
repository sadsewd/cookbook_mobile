import AsyncStorage from '@react-native-async-storage/async-storage'
import { router, Stack } from 'expo-router'
import { useEffect } from 'react'

const AuthLayout = () => {
  useEffect(() => {
    if (fetchUser()?.id) router.replace('recipes')
  }, [])

  const fetchUser = async () => {
    try {
      return await AsyncStorage.getItem('user')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name='login' />
      <Stack.Screen options={{ headerShown: false }} name='register' />
    </Stack>
  )
}

export default AuthLayout
