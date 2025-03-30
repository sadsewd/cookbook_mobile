import { View, Text, Dimensions } from 'react-native'
import { Tabs } from 'expo-router'
import { useTheme } from '@react-navigation/core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
const TabsLayout = () => {
  const { colors, sizing } = useTheme()
  const { width } = Dimensions.get('window')

  const TabIcon = ({ icon, name, focused }) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: width / 2,
          height: '100%',
          paddingTop: 12, //stupid but i legit dont know how to center this (insert center a div meme)
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
            textAlign: 'center',
            textAlignVertical: 'center',
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
          headerShown: false,
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
