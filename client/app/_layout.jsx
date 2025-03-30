import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { ThemeProvider } from '@react-navigation/native'
import { Dark, Light } from '../themes/themes'
import GlobalProvider from '../context/GlobalProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appearance } from 'react-native'

const RootLayout = () => {
  const [darkModeBG, setDarkModeBG] = useState(true)
  const colorScheme = Appearance.getColorScheme()

  useEffect(() => {
    colorSchemeCheck()
  }, [])

  const colorSchemeCheck = async () => {
    try {
      const system = await AsyncStorage.getItem('system')
      const value = await AsyncStorage.getItem('darkMode')
      if (system == null && value == null) {
        //Runs on init or when storage has been cleared
        setSystemColorScheme()
      } else if (JSON.parse(system)) {
        //System color scheme prefered
        setSystemColorScheme()
      } else if (!JSON.parse(system) && value != null) {
        //Specific color scheme prefered
        await AsyncStorage.setItem('system', 'false')
        setDarkModeBG(JSON.parse(value))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const setSystemColorScheme = async () => {
    await AsyncStorage.setItem('system', 'true')
    if (colorScheme === 'dark') {
      await AsyncStorage.setItem('darkMode', 'true')
      setDarkModeBG(true)
    } else {
      await AsyncStorage.setItem('darkMode', 'false')
      setDarkModeBG(false)
    }
  }

  return (
    <GlobalProvider>
      <ThemeProvider value={darkModeBG ? Dark : Light}>
        <Stack>
          <Stack.Screen options={{ headerShown: false }} name='(tabs)' />
          <Stack.Screen options={{ headerShown: false }} name='(auth)' />
          <Stack.Screen options={{ headerShown: false }} name='index' />
          <Stack.Screen
            name='singleRecipe/[id]/[mode]'
            options={{ headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </GlobalProvider>
  )
}

export default RootLayout
