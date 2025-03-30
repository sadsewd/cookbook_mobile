import { useState } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Dimensions,
  Pressable,
} from 'react-native'
import { router } from 'expo-router'
import { validEmail } from '../../regex/regex'
import { useTheme } from '@react-navigation/native'
import ErrorMessage from '../../components/Error'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGlobalContext } from '../../context/GlobalProvider'

const login = () => {
  const { colors, sizing } = useTheme()
  const [email, onChangeEmail] = useState('')
  const [password, onChangePassword] = useState('')
  const [Error, setError] = useState()
  const { refreshPooling } = useGlobalContext()
  const { height } = Dimensions.get('window')

  const setUser = async (id) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    if (email && password) {
      if (validEmail.test(email)) {
        try {
          const res = await axios.post('auth/login', {
            email: email,
            password: password,
          })
          if (res.status == 200) {
            refreshPooling.current = setInterval(
              () =>
                axios.post('auth/refresh').catch(async () => {
                  clearInterval(refreshPooling.current)
                  await AsyncStorage.removeItem('user')
                  router.replace('login')
                }),
              600000
            )

            setUser({ id: res.data.id })
            router.replace('recipes')
          }
        } catch (error) {
          console.log(error)
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
      height: '50%',
      width: '90%',
      justifyContent: 'center',
      backgroundColor: colors.secondary,
      paddingHorizontal: '5%',
      borderRadius: 8,
      gap: 12,
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
            Login
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
        </View>
        <Button onPress={handleSubmit} title='Log in' color={colors.tertiary} />
        <Pressable onPress={() => router.replace('register')}>
          <Text
            style={{
              fontSize: sizing.text,
              color: colors.tertiary,
              textAlign: 'center',
            }}
          >
            Don't have an account
          </Text>
        </Pressable>
        {Error ? <ErrorMessage msg={Error} success={false} /> : <></>}
      </View>
    </View>
  )
}

export default login
