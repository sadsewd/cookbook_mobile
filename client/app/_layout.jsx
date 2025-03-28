import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { ThemeProvider } from '@react-navigation/native'
import { Dark, Light } from '../themes/themes'
import GlobalProvider from '../context/GlobalProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RootLayout = () => {
  const [darkModeBG, setDarkModeBG] = useState(true)

  useEffect(() => {
    retrieveData()
  }, [])

  const retrieveData = async () => {
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
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
          <Stack.Screen name='index' options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </GlobalProvider>
  )
}

export default RootLayout
