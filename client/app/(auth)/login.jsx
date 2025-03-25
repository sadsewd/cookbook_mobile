import { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, Text, Button } from 'react-native'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'
import { validEmail } from './regex.js'
import axios from 'axios'

const login = () => {
  const [email, onChangeEmail] = useState('')
  const [password, onChangePassword] = useState('')
  const { isLogged, setIsLogged, setUser } = useGlobalContext()
  const [Error, setError] = useState()

  useEffect(() => {
    if (isLogged) router.replace('recipes')
    console.log(isLogged)
  }, [isLogged])

  const handleSubmit = async () => {
    let postErr = false
    if (email && password) {
      if (validEmail.test(email)) {
        try {
          const res = await axios.post('auth/login', {
            email: email,
            password: password,
          })
          if (!postErr && res.status == 200) {
            setUser({ id: res.data.id })
            setIsLogged(true)
            router.replace('recipes')
          }
        } catch (error) {
          console.log(error)
          postErr = true
          if (error.response.status == 403) {
            setError('Incorrect email and/or password!')
          } else {
            setError('Servera kļūda!')
          }
        }
      } else {
        setError('Bad email address!')
      }
    } else {
      setError('Unfilled form fields!')
    }
  }

  const errorMessage = () => {
    return (
      <View>
        <Text>{Error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Login</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder='E-mail'
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder='Password'
          secureTextEntry={true}
        />
        <Button onPress={handleSubmit} title='Log in' color='#841584' />
        {Error ? errorMessage() : <></>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    borderRadius: 8,
  },
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    height: '50%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'wheat',
    borderRadius: 8,
    gap: '10%',
  },
})

export default login
