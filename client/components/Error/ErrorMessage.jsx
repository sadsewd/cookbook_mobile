import { useTheme } from '@react-navigation/native'
import { Text, View } from 'react-native'

const ErrorMessage = ({ msg, success }) => {
  const { colors } = useTheme()

  return (
    <View
      style={{
        backgroundColor: success ? colors.successBG : colors.errorBG,
        borderRadius: 2,
      }}
    >
      <Text
        style={{
          color: colors.text,
          textAlign: 'center',
          paddingVertical: 1,
        }}
      >
        {msg}
      </Text>
    </View>
  )
}

export default ErrorMessage
