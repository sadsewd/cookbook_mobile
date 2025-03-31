import { useTheme } from '@react-navigation/core'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import InputField from '../../components/InputField/InputField'
import Checkbox from 'expo-checkbox'
import { Appearance } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { validEmail, validPassword } from '../../regex/regex'
import ErrorMessage from '../../components/Error'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket'
import { Dimensions } from 'react-native'
import { router } from 'expo-router'

const profile = () => {
  const { height } = Dimensions.get('window')
  const { colors, sizing } = useTheme()
  const colorScheme = Appearance.getColorScheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repPassword, setRepPassword] = useState('')
  const [error, setError] = useState({
    email: { msg: '', success: false },
    password: { msg: '', success: false },
  })
  const [checkboxState, setCheckboxState] = useState({
    dark: false,
    ligth: false,
    system: false,
  })

  useEffect(() => {
    getCurrentScheme()
    getUserData()
  }, [])

  useEffect(() => {
    if (checkboxState.dark) {
      setData('true')
    } else if (checkboxState.ligth) {
      setData('false')
    } else {
      setData(colorScheme === 'dark' ? 'true' : 'false', 'true')
    }
  }, [checkboxState])

  const handleEmailChange = async () => {
    if (validEmail) {
      if (validEmail.test(email)) {
        try {
          const res = await AsyncStorage.getItem('user').then((res) =>
            axios.patch(`/users/single/${JSON.parse(res).id}`, { email: email })
          )
          if (res.status == 200) {
            setError({
              ...error,
              email: { msg: 'Email changed succesfully!', success: true },
            })
          }
        } catch (err) {
          if (err.status == 500) {
            setError({
              ...error,
              email: {
                msg: 'Account with this email already exists!',
                success: false,
              },
            })
          }
        }
      } else {
        setError({
          ...error,
          email: { msg: 'Email is invalid!', success: false },
        })
      }
    } else {
      setError({
        ...error,
        email: { msg: 'Input field is empty!', success: false },
      })
    }
  }

  const handlePasswordChange = async () => {
    if (password && repPassword) {
      if (password == repPassword) {
        if (validPassword.test(password)) {
          try {
            const res = await AsyncStorage.getItem('user').then((res) =>
              axios.patch(`/users/single/${JSON.parse(res).id}`, {
                password: password,
              })
            )
            if (res.status == 200) {
              setError({
                ...error,
                password: {
                  msg: 'Password changed succesfully!',
                  success: true,
                },
              })
            }
          } catch (err) {
            setError({
              ...error,
              password: { msg: 'Server error!', success: false },
            })
          }
        } else
          setError({
            ...error,
            password: { msg: 'Password is invalid!', success: false },
          })
      } else {
        setError({
          ...error,
          password: { msg: 'Password doesnt match!', success: false },
        })
      }
    } else {
      setError({
        ...error,
        password: { msg: 'Input fields are empty!', success: false },
      })
    }
  }

  const getUserData = async () => {
    try {
      const res = await AsyncStorage.getItem('user').then((res) =>
        axios.get(`/users/${JSON.parse(res).id}`)
      )
      setEmail(res.data[0].email)
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrentScheme = async () => {
    try {
      const theme = await AsyncStorage.getItem('darkMode')
      const system = await AsyncStorage.getItem('system')
      if (JSON.parse(system)) {
        setCheckboxState({ dark: false, ligth: false, system: true })
      } else {
        if (JSON.parse(theme)) {
          setCheckboxState({ dark: true, ligth: false, system: false })
        } else {
          setCheckboxState({ dark: false, ligth: true, system: false })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const setData = async (dark, system = 'false') => {
    try {
      await AsyncStorage.setItem('darkMode', dark)
      await AsyncStorage.setItem('system', system)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogOut = async () => {
    await AsyncStorage.removeItem('user').finally((res) =>
      axios.post(`/auth/logout`).finally(() => router.replace('login'))
    )
  }

  const styles = StyleSheet.create({
    main: {
      height: height,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      width: '90%',
      height: '90%',
      justifyContent: 'space-around',
      padding: '5%',
      backgroundColor: colors.secondary,
      borderRadius: 8,
    },
    inputCon: {
      paddingBottom: 8,
      gap: 8,
    },
    label: {
      color: colors.text,
      fontSize: sizing.label,
      paddingBottom: 8,
    },
    checboxCon: { flexDirection: 'row', justifyContent: 'space-between' },
    Heading: {
      fontSize: sizing.heading,
      textAlign: 'center',
      color: colors.text,
      fontWeight: 'bold',
    },
    indCheckbox: {
      alignItems: 'center',
      textAlign: 'center',
      gap: 8,
    },
    button: {
      backgroundColor: colors.tertiary,
      borderRadius: 4,
    },
    buttonContent: {
      textAlign: 'center',
      fontSize: sizing.text,
      paddingVertical: 8,
      color: colors.text,
    },
    checkboxLabel: {
      color: colors.text,
      textAlign: 'center',
      fontSize: sizing.text,
    },
  })

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={styles.container}>
        <Text style={styles.Heading}>
          Settings
          <Pressable onPress={handleLogOut} style={{ paddingLeft: 16 }}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              color={colors.tertiary}
              size={sizing.label}
            />
          </Pressable>
        </Text>
        <View style={styles.inputCon}>
          <Text style={styles.label}>Email</Text>
          <InputField value={email} placeholder='email' onChange={setEmail} />
          <Pressable style={styles.button} onPress={handleEmailChange}>
            <Text style={styles.buttonContent}>Change email</Text>
          </Pressable>
          {error.email.msg ? (
            <ErrorMessage msg={error.email.msg} success={error.email.success} />
          ) : (
            <></>
          )}
        </View>
        <View style={styles.inputCon}>
          <Text style={styles.label}>New password</Text>
          <InputField
            value={password}
            placeholder='New Password'
            secureTextEntry={true}
            onChange={setPassword}
          />
          <InputField
            value={repPassword}
            placeholder='Repeat password'
            secureTextEntry={true}
            onChange={setRepPassword}
          />
          <Pressable style={styles.button} onPress={handlePasswordChange}>
            <Text style={styles.buttonContent}>Change password</Text>
          </Pressable>
          {error.password.msg ? (
            <ErrorMessage
              msg={error.password.msg}
              success={error.password.success}
            />
          ) : (
            <></>
          )}
        </View>
        <View>
          <Text style={styles.label}>
            Color scheme{' '}
            <Text style={{ ...styles.label, fontSize: sizing.small }}>
              (requires restart)
            </Text>
          </Text>
          <View style={styles.checboxCon}>
            <View style={styles.indCheckbox}>
              <Text style={styles.checkboxLabel}>Dark</Text>
              <Checkbox
                color={colors.tertiary}
                value={checkboxState.dark}
                onValueChange={() => {
                  setCheckboxState({ dark: true, ligth: false, system: false })
                }}
              />
            </View>
            <View style={styles.indCheckbox}>
              <Text style={styles.checkboxLabel}>Light</Text>
              <Checkbox
                color={colors.tertiary}
                value={checkboxState.ligth}
                onValueChange={() => {
                  setCheckboxState({ dark: false, ligth: true, system: false })
                }}
              />
            </View>
            <View style={styles.indCheckbox}>
              <Text style={styles.checkboxLabel}>System</Text>
              <Checkbox
                color={colors.tertiary}
                value={checkboxState.system}
                onValueChange={() => {
                  setCheckboxState({ dark: false, ligth: false, system: true })
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default profile
