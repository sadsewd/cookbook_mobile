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
import useAxios from '../../../hooks/useAxios'
import { Redirect, useLocalSearchParams } from 'expo-router'
import isUser from '../../../hooks/isUser'
import Ingredient from '../../../components/Ingredient'
import Step from '../../../components/Step'

const singleRecipe = () => {
  // if (!isUser()) return <Redirect href='/login' />
  const { id, mode } = useLocalSearchParams()
  const { colors } = useTheme()
  const [editMode, setEditMode] = useState(mode == 'true')
  const [values, setValues] = useState()
  const [valuesBackup, setValuesBackup] = useState()

  const { data, setData, isPending } = useAxios({
    url: 'custom/recipe/' + id,
  })

  const { isPending: isPendingRecipePatch, request: patchRecipe } = useAxios({
    method: 'patch',
    url: 'recipes/single/' + id,
    ignoreUE: true,
  })

  const { isPending: isPendingIngPost, request: postIng } = useAxios({
    method: 'post',
    url: 'ingredients/multiple',
    ignoreUE: true,
  })
  const { isPending: isPendingDelIng, request: deleteIng } = useAxios({
    method: 'delete',
    url: 'ingredients/multiple',
    ignoreUE: true,
  })
  const { isPending: isPendingPatchIng, request: patchIng } = useAxios({
    method: 'patch',
    url: 'ingredients/multiple',
    ignoreUE: true,
  })

  const { isPending: isPendingStepPost, request: postStep } = useAxios({
    method: 'post',
    url: 'steps/multiple',
    ignoreUE: true,
  })
  const { isPending: isPendingDelStep, request: deleteStep } = useAxios({
    method: 'delete',
    url: 'steps/multiple',
    ignoreUE: true,
  })
  const { isPending: isPendingPatchStep, request: patchStep } = useAxios({
    method: 'patch',
    url: 'steps/multiple',
    ignoreUE: true,
  })

  useEffect(() => {
    if (data) {
      setValues(data)
      setValuesBackup(data)
    }
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
      fontSize: 20,
      color: colors.text,
      fontWeight: 'bold',
      backgroundColor: colors.primary,
      padding: 24,
      borderRadius: 10,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 40,
      outlineColor: 'transparent',
    },
    addBtn: {
      backgroundColor: colors.primary,
      padding: 24,
      borderRadius: 10,
    },
    pressedAddBtn: {
      opacity: 0.5,
    },
    addText: {
      fontSize: 20,
      textAlign: 'center',
      color: colors.textInvert,
      fontWeight: 'bolder',
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
      padding: 16,
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
      backgroundColor: colors.warning,
      padding: 20,
      borderRadius: '100%',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    editText: {
      color: colors.textStaticBlack,
      fontWeight: 'bolder',
      fontSize: 16,
    },
    pressedAddBtn: {
      backgroundColor: colors.secondary,
    },
    container2: {
      flex: 1,
    },
  })

  const updateRecipe = () => {
    if (values?.recipe.name != valuesBackup?.recipe.name) {
      patchRecipe({ body: { name: values.recipe.name } }).then((err) => {
        console.log(err)
      })
    }
  }

  const updateIngredients = () => {
    if (values?.ingredients == valuesBackup?.ingredients) {
      console.log('No changes made to ingredients.')
      return
    }

    let newIng = values.ingredients.filter((el) => !el.ingredients_id)

    let delIng = valuesBackup.ingredients.filter(
      (el) => !values.ingredients.includes(el)
    )

    const changedIng = values.ingredients
      .filter((el) => !newIng.includes(el))
      .filter((el) => !delIng.includes(el))
      .filter((el) => !valuesBackup.ingredients.includes(el))

    newIng = newIng.map((el) => ({ ...el, recipes_id: id }))
    delIng = delIng.map((el) => el.ingredients_id)

    if (newIng.length > 0)
      postIng({ body: newIng }).catch((err) => {
        console.log(err)
      })

    if (delIng.length > 0)
      deleteIng({ body: delIng }).catch((err) => {
        console.log(err)
      })

    if (changedIng.length > 0)
      patchIng({ body: changedIng }).catch((err) => {
        console.log(err)
      })
  }

  const updateSteps = () => {
    if (values?.steps == valuesBackup?.steps) {
      console.log('No changes made to steps.')
      return
    }

    let newStep = values.steps.filter((el) => !el.steps_id)

    let delStep = valuesBackup.steps.filter((el) => !values.steps.includes(el))

    const changedStep = values.steps
      .filter((el) => !newStep.includes(el))
      .filter((el) => !delStep.includes(el))
      .filter((el) => !valuesBackup.steps.includes(el))

    const finalNewStep = newStep.map((el) => ({ ...el, recipes_id: id }))
    delStep = delStep.map((el) => el.steps_id)

    if (finalNewStep.length > 0) postStep({ body: finalNewStep })
    // .then((response) => {
    //   console.log(response.data.insertIds)

    //   setValues({
    //     ...values,
    //     steps: [
    //       ...values.steps.map((step) =>
    //         step == newStep
    //           ? {
    //               ...step,
    //               steps_id: response.data.insertIds.shift(),
    //               recipes_id: id,
    //             }
    //           : step
    //       ),
    //     ],
    //   })
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
    // axios.post('steps/multiple', newStep).then((response) => {
    //   console.log('awefnafw')
    // })

    if (delStep.length > 0)
      deleteStep({ body: delStep }).catch((err) => {
        console.log(err)
      })

    if (changedStep.length > 0)
      patchStep({ body: changedStep }).catch((err) => {
        console.log(err)
      })
  }

  const viewOrSave = () => {
    if (editMode) {
      setEditMode(false)

      if (JSON.stringify(values) !== JSON.stringify(valuesBackup)) {
        updateRecipe()
        updateIngredients()
        updateSteps()

        setValuesBackup(values)
      } else {
        console.log('No changes made.')
      }
    } else {
      setEditMode(true)
    }
  }

  useEffect(() => {
    console.log(values)
  }, [values])

  return (
    <View style={styles.container2}>
      <ScrollView contentContainerStyle={isPending && styles.scrollView}>
        {isPending ? (
          <ActivityIndicator size='large' color={colors.primary} />
        ) : (
          <View style={styles.container}>
            {editMode ? (
              <TextInput
                style={styles.heading}
                value={values?.recipe.name || ''}
                onChangeText={(text) =>
                  setValues({
                    ...values,
                    recipe: { ...values.recipe, name: text },
                  })
                }
                // editable={editMode}
                // pointerEvents={editMode ? 'auto' : 'none'}
                placeholder='Recipe name...'
              />
            ) : (
              <Text style={styles.heading}>{values?.recipe.name}</Text>
            )}

            <View style={styles.mainBox}>
              <View style={styles.sectionBox}>
                <Text style={styles.addText}>Ingredients</Text>

                <View style={styles.ingredients}>
                  {editMode && (
                    <Ingredient
                      newItem={true}
                      onAdd={(newIng) =>
                        setValues({
                          ...values,
                          ingredients: [...values.ingredients, newIng],
                        })
                      }
                    />
                  )}
                  {values &&
                    values.ingredients.map((el, i) => (
                      <Ingredient
                        key={i}
                        item={el}
                        disabled={!editMode}
                        onNameChange={(text) =>
                          setValues({
                            ...values,
                            ingredients: [
                              ...values.ingredients.map((ing) =>
                                ing == el ? { ...el, name: text } : ing
                              ),
                            ],
                          })
                        }
                        onAmountChange={(text) =>
                          setValues({
                            ...values,
                            ingredients: [
                              ...values.ingredients.map((ing) =>
                                ing == el ? { ...el, count: text } : ing
                              ),
                            ],
                          })
                        }
                        onDelete={() =>
                          setValues({
                            ...values,
                            ingredients: [
                              ...values.ingredients.filter((ing) => ing != el),
                            ],
                          })
                        }
                      />
                    ))}
                </View>
              </View>

              <View style={styles.sectionBox}>
                <Text style={styles.addText}>Steps</Text>

                <View style={styles.ingredients}>
                  {editMode && (
                    <Step
                      newItem={true}
                      onAdd={(newStep) =>
                        setValues({
                          ...values,
                          steps: [
                            ...values.steps,
                            { ...newStep, sequence: values.steps.length + 1 },
                          ],
                        })
                      }
                    />
                  )}
                  {values &&
                    values.steps.map((el, i) => (
                      <Step
                        key={i}
                        item={el}
                        disabled={!editMode}
                        onDescChange={(text) =>
                          setValues({
                            ...values,
                            steps: [
                              ...values.steps.map((step) =>
                                step == el ? { ...el, description: text } : step
                              ),
                            ],
                          })
                        }
                        onDelete={() =>
                          setValues({
                            ...values,
                            steps: [
                              ...values.steps.filter((step) => step != el),
                            ],
                          })
                        }
                      />
                    ))}
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
        onPress={viewOrSave}
      >
        <Text style={styles.editText}>{editMode ? 'Save' : 'Edit'}</Text>
      </Pressable>
    </View>
  )
}

export default singleRecipe
