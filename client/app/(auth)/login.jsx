import { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, Text, Button } from 'react-native'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'
import { validEmail } from './regex.js'
import axios from 'axios'
import { useTheme } from '@react-navigation/native'
import ErrorMessage from '../../components/Error'

const login = () => {
  const { colors } = useTheme()

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

  const styles = StyleSheet.create({
    input: {
      height: 50,
      borderWidth: 1,
      padding: 10,
      width: '100%',
      borderRadius: 8,
      borderColor: colors.inputBorder,
      color: colors.text,
      backgroundColor: colors.inputBG,
    },
    container: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      height: '50%',
      width: '90%',
      justifyContent: 'center',
      backgroundColor: colors.container,
      paddingHorizontal: '5%',
      borderRadius: 8,
      gap: '10%',
    },
    form: {
      height: '50%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.form}>
          <Text
            style={{ fontWeight: 'bold', fontSize: 36, color: colors.text }}
          >
            Login
          </Text>
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
        </View>
        <Button onPress={handleSubmit} title='Log in' color={colors.button} />
        {Error ? <ErrorMessage msg={Error} /> : <></>}
      </View>
    </View>
  )
}

export default login
