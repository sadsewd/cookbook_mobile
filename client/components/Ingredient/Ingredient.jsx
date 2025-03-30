import { useTheme } from '@react-navigation/core'
import { StyleSheet, Text, View } from 'react-native'

const Ingredient = ({ item }) => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      padding: 5,
      gap: 5,
      flexDirection: 'row',
      borderRadius: 10,
      backgroundColor: colors.primary,
    },
    text: {
      textAlign: 'center',
      backgroundColor: colors.secondary,
      padding: 20,
      borderRadius: 10,
      color: colors.textInvert,
      fontSize: 15,
    },
    textName: {
      flex: 2,
    },
    textAmount: {
      flex: 1,
    },
  })

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.textName]}>{item?.name}</Text>
      <Text style={[styles.text, styles.textAmount]}>{item?.count}</Text>
    </View>
  )
}

export default Ingredient
