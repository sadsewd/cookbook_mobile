import { useTheme } from '@react-navigation/core'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

const initVal = { name: '', count: '' }

const Ingredient = ({
  item,
  onNameChange,
  onAmountChange,
  disabled,
  onDelete,
  newItem,
  onAdd,
}) => {
  const { colors } = useTheme()
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
    textName: {
      flex: 2,
    },
    textAmount: {
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
      {disabled ? (
        <>
          <Text style={[styles.text, styles.textName]}>{item?.name}</Text>
          <Text style={[styles.text, styles.textAmount]}>{item?.count}</Text>
        </>
      ) : (
        <>
          <TextInput
            style={[styles.text, styles.textName]}
            value={newItem ? values.name : item?.name}
            onChangeText={
              newItem
                ? (text) => setValues({ ...values, name: text })
                : onNameChange
            }
            // editable={disabled}
            // pointerEvents={disabled ? 'auto' : 'none'}
            placeholder='Name...'
          />

          <TextInput
            style={[styles.text, styles.textAmount]}
            value={newItem ? values.count : item?.count}
            onChangeText={
              newItem
                ? (text) => setValues({ ...values, count: text })
                : onAmountChange
            }
            // editable={disabled}
            // pointerEvents={disabled ? 'auto' : 'none'}
            placeholder='Amount...'
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

export default Ingredient
