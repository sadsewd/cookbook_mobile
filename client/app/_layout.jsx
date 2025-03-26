import { Stack } from 'expo-router'
import GlobalProvider from '../context/GlobalProvider'
import { StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeProvider } from '@react-navigation/native'
import { Dark, Light } from '../themes/themes'
const RootLayout = () => {
  const [darkModeBG, setDarkModeBG] = useState(true)

  useEffect(() => {
    retrieveData()
  }, [])

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('darkMode')
      if (value !== null) {
        setDarkModeBG(JSON.parse(value))
      } else {
        await AsyncStorage.setItem('darkMode', 'true')
        setDarkMode(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <GlobalProvider>
      <ThemeProvider value={darkModeBG ? Dark : Light}>
        <Stack>
          <Stack.Screen name='(tabs)' />
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
          <Stack.Screen name='index' options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </GlobalProvider>
  )
}

export default RootLayout
