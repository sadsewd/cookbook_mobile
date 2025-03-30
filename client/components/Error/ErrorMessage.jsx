import { useTheme } from '@react-navigation/native'
import { Text, View } from 'react-native'

const ErrorMessage = ({ msg, success }) => {
  const { colors, sizing } = useTheme()

  return (
    <View
      style={{
        backgroundColor: success ? colors.success : colors.error,
        borderRadius: 2,
      }}
    >
      <Text
        style={{
          color: colors.text,
          textAlign: 'center',
          paddingVertical: 1,
          fontSize: sizing.text,
        }}
      >
        {msg}
      </Text>
    </View>
  )
}

export default ErrorMessage
