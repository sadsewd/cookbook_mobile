import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { useTheme } from '@react-navigation/core'
import { useEffect, useState } from 'react'
import useAxios from '../../hooks/useAxios'
import { useLocalSearchParams } from 'expo-router'
import Ingredient from '../../components/Ingredient'
import Step from '../../components/Step'

const singleRecipe = (initMode = false) => {
  const [editMode, setEditMode] = useState(initMode)
  const [values, setValues] = useState()

  const { id } = useLocalSearchParams()
  const { colors, sizing } = useTheme()

  const { data, setData, isPending } = useAxios({
    url: 'custom/recipe/' + id,
  })

  useEffect(() => {
    if (data) setValues(data)
  }, [data])

  const styles = StyleSheet.create({
    container: {
      margin: 40,
      flex: 1,
    },
    optionBox: {
      marginLeft: 20,
      marginRight: 20,
      gap: 10,
    },
    heading: {
      textAlign: 'center',
      fontSize: sizing.label,
      color: colors.text,
      fontWeight: 'bold',
      backgroundColor: colors.primary,
      padding: '1.5rem',
      borderRadius: 10,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 40,
    },
    addBtn: {
      backgroundColor: colors.primary,
      padding: '1.5rem',
      borderRadius: 10,
    },
    pressedAddBtn: {
      opacity: 0.5,
    },
    addText: {
      fontSize: sizing.label,
      textAlign: 'center',
      fontWeight: 'bold',
      color: colors.text,
    },
    mainBox: {
      gap: 20,
      flex: 1,
    },
    recipes: {
      flex: 1,
      justifyContent: 'center',
    },
    scrollView: {
      flex: 1,
      justifyContent: 'center',
    },
    sectionBox: {
      padding: '1rem',
      backgroundColor: colors.secondary,
      borderRadius: 10,
      gap: 16,
    },
    ingredients: {
      gap: 10,
    },
    fixedButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: colors.primary,
      padding: 20,
      borderRadius: '100%',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    editText: {
      color: colors.text,
      fontWeight: 'bolder',
      fontSize: sizing.heading,
    },
    pressedAddBtn: {
      backgroundColor: colors.secondary,
    },
    container2: {
      flex: 1,
    },
  })

  return (
    <View style={styles.container2}>
      <ScrollView contentContainerStyle={isPending && styles.scrollView}>
        {isPending ? (
          <ActivityIndicator size='large' color={colors.primary} />
        ) : (
          <View style={styles.container}>
            <TextInput
              style={styles.heading}
              value={values?.recipe.name}
              editable={false}
              pointerEvents='none'
              placeholder='Recipe name...'
            />

            <View style={styles.mainBox}>
              <View style={styles.sectionBox}>
                <Text style={styles.addText}>Ingredients</Text>

                <View style={styles.ingredients}>
                  {/* <Ingredient key={i} item={el} /> */}
                  {values &&
                    values.ingredients.map((el, i) => (
                      <Ingredient key={i} item={el} />
                    ))}
                </View>
              </View>

              <View style={styles.sectionBox}>
                <Text style={styles.addText}>Steps</Text>

                <View style={styles.ingredients}>
                  {values &&
                    values.steps.map((el, i) => <Step key={i} item={el} />)}
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <Pressable
        style={({ pressed }) => [
          styles.fixedButton,
          pressed && styles.pressedAddBtn,
        ]}
        onPress={() => console.log('Button Pressed')}
      >
        <Text style={styles.editText}>+</Text>
      </Pressable>
    </View>
  )
}

export default singleRecipe
