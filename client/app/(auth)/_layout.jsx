import { Redirect, Stack } from 'expo-router'
import isUser from '../../hooks/isUser'

const AuthLayout = () => {
  if (isUser()) return <Redirect href='/recipes' />

  return (
    <Stack>
      <Stack.Screen name='login' options={{ headerShown: false }} />
      <Stack.Screen name='register' options={{ headerShown: false }} />
    </Stack>
  )
}

export default AuthLayout
