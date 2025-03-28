import { useTheme } from '@react-navigation/core'
import { Button, Pressable, StyleSheet, Text, View } from 'react-native'

const Card = ({ item }) => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      padding: '1rem',
      backgroundColor: colors.secondary,
      gap: 15,
      borderRadius: 20,
    },
    title: {
      //   padding: '1rem',
      textAlign: 'center',
      fontSize: 26,
      color: colors.textInvert,
      fontWeight: 'bold',
    },
    btn: {
      backgroundColor: colors.primary,
      padding: '1rem',
      borderRadius: 10,
    },
    pressedBtn: {
      backgroundColor: colors.primary,
    },
    btnText: {
      fontSize: 20,
      textAlign: 'center',
      color: colors.textInvert,
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>

      {/* <View> */}
      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [styles.btn, pressed && styles.pressedBtn]}
      >
        {({ pressed }) => (
          <Text style={styles.btnText}>
            View recipe
            {/* {pressed ? 'Pressed!' : 'Add recipe'} */}
          </Text>
        )}
      </Pressable>
      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [styles.btn, pressed && styles.pressedBtn]}
      >
        {({ pressed }) => (
          <Text style={styles.btnText}>
            Edit recipe
            {/* {pressed ? 'Pressed!' : 'Add recipe'} */}
          </Text>
        )}
      </Pressable>
      {/* </View> */}
    </View>
  )
}

export default Card
