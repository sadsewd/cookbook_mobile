import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import { validEmail, validPassword } from '../../regex/regex'
import { useTheme } from '@react-navigation/native'
import axios from 'axios'
import ErrorMessage from '../../components/Error'
import AsyncStorage from '@react-native-async-storage/async-storage'

const register = () => {
  const { colors } = useTheme()
  const [email, onChangeEmail] = useState('')
  const [password, onChangePassword] = useState('')
  const [repPassword, onChangeRepPassword] = useState('')
  const [Error, setError] = useState()

  const setUser = async (id) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async () => {
    let postErr = false
    if (email && password && repPassword) {
      if (validEmail.test(email)) {
        if (validPassword.test(password)) {
          if (password == repPassword) {
            try {
              const res = await axios.post('users', {
                email: email,
                password: password,
              })
              if (!postErr && res.status == 200) {
                setUser({ id: res.data.id })
                setIsLogged(true)
                router.replace('recipes')
              }
            } catch (err) {
              postErr = true
              setError('Servera kļūda!')
            }
          } else {
            setError('Passwords dont match!')
          }
        } else {
          setError(
            'Bad password! Password should contain 8 simbols of which atleast one is upper case letter, atleast one lowercase letter, atleast one number and atleast one symbol'
          )
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
      backgroundColor: colors.inputBG,
      color: colors.text,
    },
    container: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      height: '70%',
      width: '90%',
      justifyContent: 'center',
      paddingHorizontal: '5%',
      backgroundColor: colors.container,
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
            Register
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
          <TextInput
            style={styles.input}
            onChangeText={onChangeRepPassword}
            value={repPassword}
            placeholder='Repeat password'
            secureTextEntry={true}
          />
        </View>
        <Button onPress={handleLogin} title='Register' color={colors.button} />
        {Error ? <ErrorMessage msg={Error} /> : <></>}
      </View>
    </View>
  )
}

export default register
