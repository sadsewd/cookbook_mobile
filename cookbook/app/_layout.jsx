import { Stack } from 'expo-router'
import React from 'react'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='Landing' options={{}} />
      <Stack.Screen name='Login' options={{}} />
      <Stack.Screen name='Register' options={{}} />
      <Stack.Screen name='Recipes' options={{}} />
      <Stack.Screen name='Profile' options={{}} />
    </Stack>
  )
}

export default RootLayout
