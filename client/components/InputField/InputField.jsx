import { StyleSheet, TextInput } from 'react-native'
import { useTheme } from '@react-navigation/native'

const InputField = ({
  value,
  onChange,
  placeholder = '',
  secureTextEntry = false,
}) => {
  const { colors, sizing } = useTheme()
  const styles = StyleSheet.create({
    input: {
      height: 50,
      borderWidth: 1,
      padding: 10,
      width: '100%',
      borderRadius: 8,
      fontSize: sizing.text,
      borderColor: colors.primary,
      borderWidth: 3,
      color: colors.text,
      backgroundColor: colors.secondary,
    },
  })
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={colors.text}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  )
}

export default InputField
