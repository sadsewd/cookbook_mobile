import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import axios from 'axios'
import { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    axios
      .post('http://localhost:3001/auth/login', {
        email: 'tt',
        password: 'Parole123',
      })
      .then((res) => console.log(res))
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Link href='/recipes'>Open up App.js to start working on your app!</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
