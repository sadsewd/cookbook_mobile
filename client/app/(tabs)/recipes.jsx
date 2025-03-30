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
  const { colors, sizing } = useTheme()
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState('')
  const [recipesBackup, setRecipesBackup] = useState()

  const { data, setData, isPending, error, initialLoad } = useAxios({
    url: 'custom/userRecipes',
  })

  useEffect(() => {
    if (!initialLoad && data) setRecipesBackup(data)
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
      fontSize: sizing.heading,
      color: colors.funnyHeading,
      fontWeight: 'bold',
      padding: 32,
    },
    search: {
      color: colors.text,
      padding: 14,
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
      padding: 24,
      borderRadius: 10,
    },
    pressedAddBtn: {
      opacity: 0.5,
    },
    addText: {
      fontSize: sizing.label,
      textAlign: 'center',
      color: colors.text,
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
    },
    loaderBox: {
      flex: 1,
      justifyContent: 'center',
    },
  })

  useEffect(() => {
    if (search.trim()) {
      if (recipesBackup)
        setData(
          recipesBackup.filter((el) =>
            el.name.toLowerCase().includes(search.toLowerCase())
          )
        )
    } else setData(recipesBackup)
  }, [search])

  return (
    <ScrollView contentContainerStyle={isPending && styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.heading}>Your recipes</Text>

        <View style={styles.mainBox}>
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
              placeholderTextColor={colors.text}
              style={[styles.search, isFocused && styles.searchFocus]}
              placeholder='Search recipe...'
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={search}
              onChangeText={(value) => setSearch(value)}
            />
          </View>

          {isPending ? (
            <View style={styles.loaderBox}>
              <ActivityIndicator size='large' color={colors.primary} />
            </View>
          ) : (
            data && data.map((el, i) => <Card key={i} item={el} />)
          )}
        </View>
      </View>
    </ScrollView>
  )
}

export default recipes
