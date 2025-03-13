import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'

const register = () => {
  const [email, onChangeEmail] = useState('')
  const [password, onChangePassword] = useState('')
  const [repPassword, onChangeRepPassword] = useState('')

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
          onPress={() => console.log('sup')}
          title='Register'
          color='#841584'
        />
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
