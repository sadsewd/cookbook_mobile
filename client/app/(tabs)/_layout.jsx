import { View, Text } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import isUser from '../../hooks/isUser'

const TabsLayout = () => {
  if (!isUser()) return <Redirect href='/login' />

  const TabIcon = ({ color, name, focused }) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontWeight: focused == true ? 'bold' : 'regular',
            fontSize: 12,
            textAlign: 'center',
            color: color,
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
          tabBarActiveTintColor: '#68016D',
          tabBarInactiveTintColor: '#39003C',
        }}
      >
        <Tabs.Screen
          name='recipes'
          options={{
            title: 'Recipes',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name='Home' focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name='Profile' focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout
