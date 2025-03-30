import { Redirect, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import isUser from '../hooks/isUser'

export default function App() {
  const { colors } = useTheme()

  if (isUser()) return <Redirect href='/recipes' />

  const styles = StyleSheet.create({
    heading: {
      textAlign: 'center',
      fontSize: 36,
      color: colors.text,
    },

    container: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentCon: {
      width: '80%',
      height: '50%',
      justifyContent: 'center',
      backgroundColor: colors.container,
      paddingHorizontal: '5%',
      borderRadius: '8px',
      gap: '20%',
    },
  })

  return (
    <>
      <StatusBar style='auto' />
      <View style={styles.container}>
        <View style={styles.contentCon}>
          <Text style={styles.heading}>Cookbook</Text>
          <Button
            onPress={() => router.push('login')}
            color={colors.button}
            title='login'
          />
          <Button
            onPress={() => router.push('register')}
            color={colors.button}
            title='register'
          />
        </View>
      </View>
    </>
  )
}
