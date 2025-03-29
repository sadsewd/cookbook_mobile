import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import Card from '../../components/Card'
import { useTheme } from '@react-navigation/core'
import { useEffect, useState } from 'react'
import useAxios from '../../hooks/useAxios'

const recipes = () => {
  const { colors } = useTheme()
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState('')
  const [recipesBackup, setRecipesBackup] = useState()

  const {
    data: recipes,
    setData: setRecipes,
    isPending: isPendingRecipes,
    error: errorRecipes,
    initialLoad,
  } = useAxios({ url: 'custom/userRecipes' })

  useEffect(() => {
    if (!initialLoad && recipes) setRecipesBackup(recipes)
  }, [initialLoad])

  const styles = StyleSheet.create({
    container: {
      marginTop: 0,
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
      fontSize: 36,
      color: colors.text,
      fontWeight: 'bold',
      padding: '2rem',
    },
    search: {
      color: colors.textInvert,
      padding: 'calc(1.5rem - 10px)',
      backgroundColor: colors.secondary,
      fontSize: 20,
      textAlign: 'center',
      boxShadow: '0 0 0 5px ' + colors.primary,
      margin: 5,
      borderRadius: 5,
      outlineColor: 'transparent',
    },
    searchFocus: {
      backgroundColor: colors.primary,
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
      fontSize: 20,
      textAlign: 'center',
      color: colors.textInvert,
      // textTransform: 'uppercase',
      fontWeight: 'bolder',
    },
    cardBox: {
      gap: 20,
      flex: 1,
    },
    recipes: {
      // alignContent: 'center',
      flex: 1,
      justifyContent: 'center',
    },
  })

  useEffect(() => {
    if (search.trim()) {
      if (recipesBackup)
        setRecipes(
          recipesBackup.filter((el) =>
            el.name.toLowerCase().includes(search.toLowerCase())
          )
        )
    } else setRecipes(recipesBackup)
  }, [search])

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.heading}>Your recipes</Text>

        <View style={styles.cardBox}>
          <View style={styles.optionBox}>
            <Pressable
              onPress={() => {}}
              style={({ pressed }) => [
                styles.addBtn,
                pressed && styles.pressedAddBtn,
              ]}
            >
              {({ pressed }) => (
                <Text style={styles.addText}>
                  Add recipe
                  {/* {pressed ? 'Pressed!' : 'Add recipe'} */}
                </Text>
              )}
            </Pressable>
            <TextInput
              style={[styles.search, isFocused && styles.searchFocus]}
              placeholder='Search recipe...'
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={search}
              onChangeText={(value) => setSearch(value)}
            />
          </View>

          {isPendingRecipes ? (
            <ActivityIndicator size='large' color={colors.primary} />
          ) : (
            recipes && recipes.map((el, i) => <Card key={i} item={el} />)
          )}
        </View>
      </View>
    </ScrollView>
  )
}

export default recipes
