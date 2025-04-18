import { View, Text } from 'react-native'
import { router, Tabs } from 'expo-router'
import { useTheme } from '@react-navigation/core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
const TabsLayout = () => {
  const { colors, sizing } = useTheme()

  useEffect(() => {
    if (fetchUser()?.id) router.replace('recipes')
  }, [])

  const fetchUser = async () => {
    try {
      return await AsyncStorage.getItem('user')
    } catch (error) {
      console.log(error)
    }
  }
  const TabIcon = ({ icon, name, focused }) => {
    return (
      <View
        style={{
          alignItems: 'center',
          height: '100%',
        }}
      >
        <FontAwesomeIcon
          icon={icon}
          color={colors.tertiary}
          size={sizing.label}
        />
        <Text
          style={{
            fontWeight: focused == true ? 'bold' : 'regular',
            fontSize: sizing.small,
            width: '100%',
            color: colors.tertiary,
          }}
        >
          {name}
        </Text>
      </View>
    )
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name='recipes'
          options={{
            headerShown: false,
            title: 'Recipes',
            tabBarIcon: ({ focused }) => (
              <TabIcon name='Recipes' focused={focused} icon={faList} />
            ),
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            headerShown: false,
            title: 'Profile',
            tabBarIcon: ({ focused }) => (
              <TabIcon name='Profile' focused={focused} icon={faUser} />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout
