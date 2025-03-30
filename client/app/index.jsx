import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'

export default function App() {
  const { colors, sizing } = useTheme()
  const { height } = Dimensions.get('window')

  const styles = StyleSheet.create({
    heading: {
      textAlign: 'center',
      fontSize: sizing.heading,
      color: colors.text,
    },

    container: {
      height: height,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentCon: {
      width: '80%',
      height: '50%',
      justifyContent: 'center',
      backgroundColor: colors.secondary,
      paddingHorizontal: '5%',
      borderRadius: 8,
      gap: sizing.label * 2,
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
            color={colors.tertiary}
            title='login'
          />
          <Button
            onPress={() => router.push('register')}
            color={colors.tertiary}
            title='register'
          />
        </View>
      </View>
    </>
  )
}
