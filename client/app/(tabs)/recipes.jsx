import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router, useRootNavigationState } from 'expo-router'

const recipes = () => {
  const { user, setIsLogged } = useGlobalContext()
  const rootNavigationState = useRootNavigationState()

  if (user?.id) {
    console.log(user)
  } else {
    if (!rootNavigationState?.key) return null
    router.replace('/')
  }

  useEffect(() => {}, [])

  return (
    <View>
      <Text>recipes</Text>
    </View>
  )
}

export default recipes
