import { Redirect, Stack } from 'expo-router'
import isUser from '../../hooks/isUser'

const AuthLayout = () => {
  if (isUser()) return <Redirect href='/recipes' />

  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name='login' />
      <Stack.Screen options={{ headerShown: false }} name='register' />
    </Stack>
  )
}

export default AuthLayout
