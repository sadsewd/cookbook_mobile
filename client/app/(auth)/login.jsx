import { useState } from 'react'
import { View, StyleSheet, TextInput, Text, Button } from 'react-native'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'

const login = () => {
  const [text, onChangeText] = useState('')
  const [number, onChangeNumber] = useState('')
  const { setIsLogged } = useGlobalContext()

  const handleSubmit = () => {
    setIsLogged(true)
    router.replace('recipes')
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Login</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder='E-mail'
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder='Password'
        />
        <Button onPress={handleSubmit} title='Log in' color='#841584' />
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
