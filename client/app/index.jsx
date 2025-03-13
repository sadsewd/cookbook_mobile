import { Link, Redirect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useGlobalContext } from '../context/GlobalProvider'
import axios from 'axios'
import { useEffect } from 'react'

export default function App() {
  const { isLogged } = useGlobalContext()

  if (isLogged) return <Redirect href='/recipes' />

  useEffect(() => {
    axios
      .post('http://localhost:3001/auth/login', {
        email: 'tt',
        password: 'Parole123',
      })
      .then((res) => console.log(res))
  }, [])

  return (
    <>
      <StatusBar style='auto' />
      <View style={styles.container}>
        <View style={styles.buttonsCon}>
          <Link href='/login' style={styles.buttonCon}>
            <Text>Login</Text>
          </Link>
          <Link href='/register' style={styles.buttonCon}>
            <Text>Register</Text>
          </Link>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsCon: {
    width: '70%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    gap: '5%',
  },
  buttonCon: {
    width: '90%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
})
