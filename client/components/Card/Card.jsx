import { useTheme } from '@react-navigation/core'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'

const Card = ({ item }) => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: colors.secondary,
      gap: 15,
      borderRadius: 20,
    },
    title: {
      textAlign: 'center',
      fontSize: 26,
      color: colors.textInvert,
      fontWeight: 'bold',
    },
    btn: {
      backgroundColor: colors.primary,
      padding: 16,
      borderRadius: 10,
    },
    pressedBtn: {
      opacity: 0.5,
    },
    btnText: {
      fontSize: 20,
      textAlign: 'center',
      color: colors.textInvert,
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item?.name}</Text>

      <Pressable
        onPress={() => router.push(`/singleRecipe/${item?.recipes_id}/false`)}
        style={({ pressed }) => [styles.btn, pressed && styles.pressedBtn]}
      >
        <Text style={styles.btnText}>View recipe</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push(`/singleRecipe/${item?.recipes_id}/true`)}
        style={({ pressed }) => [styles.btn, pressed && styles.pressedBtn]}
      >
        <Text style={styles.btnText}>Edit recipe</Text>
      </Pressable>
    </View>
  )
}

export default Card
