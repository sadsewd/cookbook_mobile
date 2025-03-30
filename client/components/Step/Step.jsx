import { useTheme } from '@react-navigation/core'
import { StyleSheet, Text, View } from 'react-native'

const Step = ({ item }) => {
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
    textAmount: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 12,
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
