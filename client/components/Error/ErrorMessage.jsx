import { useTheme } from '@react-navigation/native'
import { Text, View } from 'react-native'

const ErrorMessage = ({ msg }) => {
  const { colors } = useTheme()

  return (
    <View style={{ backgroundColor: colors.errorBG, borderRadius: 2 }}>
      <Text
        style={{
          color: colors.error,
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
