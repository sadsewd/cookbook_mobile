import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Redirect, router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'

const register = () => {
  const [email, onChangeEmail] = useState('')
  const [password, onChangePassword] = useState('')
  const [repPassword, onChangeRepPassword] = useState('')
  //garbo but since there arent events this is works for now

  const [Error, setError] = useState()
  const { isLogged, setIsLogged, setUser } = useGlobalContext()

  const validEmail = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
  const validPassword = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
  )

  useEffect(() => {
    if (isLogged) return <Redirect href='recipes' />
  }, [])

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
            } catch (error) {
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
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Register</Text>
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
        <Button
          onPress={() => handleLogin()} //why the damn parentheses
          title='Register'
          color='#841584'
        />
        {Error ? errorMessage() : ''}
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
    height: '70%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'wheat',
    borderRadius: 8,
    gap: '10%',
  },
})

export default register
