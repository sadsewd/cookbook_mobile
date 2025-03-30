import { useTheme } from '@react-navigation/core'
import { StyleSheet, Text, View } from 'react-native'

const Step = ({ item }) => {
  const { colors, sizing } = useTheme()

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
      color: colors.text,
      fontSize: sizing.text,
      textAlignVertical: 'center',
    },
    textAmount: {
      display: 'flex',
      alignItems: 'center',
      textAlignVertical: 'center',
      fontSize: sizing.small,
      padding: 15,
      fontWeight: 'bold',
    },
    textDesc: {
      flex: 1,
    },
  })

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.textAmount]}>
        {item?.sequence + '.'}
      </Text>
      <Text style={[styles.text, styles.textDesc]}>{item?.description}</Text>
    </View>
  )
}

export default Step
