import { useTheme } from '@react-navigation/core'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'

const Card = ({ item }) => {
  const { colors, sizing } = useTheme()

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: colors.secondary,
      gap: 15,
      borderRadius: 20,
    },
    title: {
      textAlign: 'center',
      fontSize: sizing.label,
      color: colors.text,
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
      fontSize: sizing.label - 2,
      textAlign: 'center',
      color: colors.text,
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item?.name}</Text>

      <Pressable
        onPress={() => router.push(`/singleRecipe/${item?.recipes_id}/view`)}
        style={({ pressed }) => [styles.btn, pressed && styles.pressedBtn]}
      >
        <Text style={styles.btnText}>View recipe</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push(`/singleRecipe/${item?.recipes_id}/edit`)}
        style={({ pressed }) => [styles.btn, pressed && styles.pressedBtn]}
      >
        <Text style={styles.btnText}>Edit recipe</Text>
      </Pressable>
    </View>
  )
}

export default Card
