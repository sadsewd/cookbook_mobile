import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
  Pressable,
} from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import { validEmail, validPassword } from '../../regex/regex'
import { useTheme } from '@react-navigation/native'
import axios from 'axios'
import ErrorMessage from '../../components/Error'
import AsyncStorage from '@react-native-async-storage/async-storage'

const register = () => {
  const { colors, sizing } = useTheme()
  const [email, onChangeEmail] = useState('')
  const [password, onChangePassword] = useState('')
  const [repPassword, onChangeRepPassword] = useState('')
  const [Error, setError] = useState()
  const { height } = Dimensions.get('window')

  const setUser = async (id) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async () => {
    if (email && password && repPassword) {
      if (validEmail.test(email)) {
        if (validPassword.test(password)) {
          if (password == repPassword) {
            try {
              const res = await axios.post('users', {
                email: email,
                password: password,
              })
              if (res.status == 200) {
                setUser({ id: res.data.id })
                router.replace('recipes')
              }
            } catch (error) {
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
      fontSize: sizing.text,
      borderColor: colors.primary,
      color: colors.text,
      backgroundColor: colors.secondary,
      borderWidth: 3,
    },
    container: {
      height: height,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      height: '70%',
      width: '90%',
      justifyContent: 'center',
      paddingHorizontal: '5%',
      backgroundColor: colors.secondary,
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
            style={{
              fontWeight: 'bold',
              fontSize: sizing.heading,
              color: colors.text,
            }}
          >
            Register
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder='E-mail'
            placeholderTextColor={colors.text}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder='Password'
            secureTextEntry={true}
            placeholderTextColor={colors.text}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeRepPassword}
            value={repPassword}
            placeholder='Repeat password'
            secureTextEntry={true}
            placeholderTextColor={colors.text}
          />
        </View>
        <Button
          onPress={handleLogin}
          title='Register'
          color={colors.tertiary}
        />
        <Pressable onPress={() => router.replace('login')}>
          <Text
            style={{
              fontSize: sizing.text,
              color: colors.tertiary,
              textAlign: 'center',
            }}
          >
            Already have an account
          </Text>
        </Pressable>
        {Error ? <ErrorMessage msg={Error} success={false} /> : <></>}
      </View>
    </View>
  )
}

export default register
