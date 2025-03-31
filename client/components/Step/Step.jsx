import { useTheme } from '@react-navigation/core'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

const initVal = { description: '' }

const Step = ({
  item,
  disabled,
  onDescChange,
  onDelete,
  newItem,
  onAdd,
  sequence,
}) => {
  const { colors, sizing } = useTheme()
  const [values, setValues] = useState(initVal)

  const styles = StyleSheet.create({
    container: {
      padding: 5,
      gap: 5,
      flexDirection: 'row',
      borderRadius: 10,
      backgroundColor: colors.primary,
      marginBottom: newItem ? 6 : 0,
    },
    text: {
      textAlign: 'center',
      backgroundColor: colors.secondary,
      padding: disabled ? 20 : 0,
      borderRadius: 10,
      color: colors.text,
      fontSize: sizing.text,
      textAlignVertical: 'center',
      minWidth: 0,
      outlineColor: 'transparent',
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
    delBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      padding: 15,
      fontWeight: 'bold',
      backgroundColor: newItem ? colors.success : colors.error,
    },
    pDelBtn: {
      opacity: 0.5,
    },
    delBtnText: {
      color: colors.textInvert,
    },
  })

  return (
    <View style={styles.container}>
      {!newItem && (
        <Text style={[styles.text, styles.textAmount]}>{sequence + '.'}</Text>
      )}

      {disabled ? (
        <Text style={[styles.text, styles.textDesc]}>{item?.description}</Text>
      ) : (
        <>
          <TextInput
            style={[styles.text, styles.textDesc]}
            value={newItem ? values.description : item?.description}
            onChangeText={
              newItem
                ? (text) => setValues({ ...values, description: text })
                : onDescChange
            }
            // editable={disabled}
            // pointerEvents={disabled ? 'auto' : 'none'}
            placeholder='Description...'
          />

          <Pressable
            style={({ pressed }) => [
              styles.text,
              styles.delBtn,
              pressed && styles.pDelBtn,
            ]}
            onPress={
              newItem
                ? () => {
                    onAdd(values)
                    setValues(initVal)
                  }
                : onDelete
            }
          >
            <Text style={styles.delBtnText}>{newItem ? 'Add' : 'Delete'}</Text>
          </Pressable>
        </>
      )}
    </View>
  )
}

export default Step
