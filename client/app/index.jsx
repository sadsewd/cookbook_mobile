import { Link, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useGlobalContext } from '../context/GlobalProvider'
import axios from 'axios'
import { useEffect } from 'react'

export default function App() {
  const { isLogged, setIsLogged } = useGlobalContext()

  useEffect(() => {
    if (isLogged) router.replace('recipes')
  }, [isLogged])

  const login = () => {
    console.log('login')
    try {
      axios
        .post('auth/login', {
          email: 'test@test.com',
          password: 'Test123$%',
        })
        .then((res) => {
          console.log(res)
          setIsLogged(true)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const logout = () => {
    console.log('logout')
    axios
      .post('auth/logout')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const refresh = () => {
    console.log('refresh')
    axios
      .post('auth/refresh')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getResource = () => {
    console.log('getResource')
    axios
      .get('users')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <StatusBar style='auto' />
      <View style={styles.container}>
        <View style={styles.buttonsCon}>
          <Button onPress={login} title='login' />
          <Button onPress={logout} title='logout' />
          <Button onPress={refresh} title='refresh' />
          <Button onPress={getResource} title='getResource' />
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
