import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native'
import Card from '../../components/Card'
import { useTheme } from '@react-navigation/core'

const recipes = () => {
  const { colors } = useTheme()
  const recipes = [
    { title: 'title1', id: 1 },
    { title: 'title1', id: 1 },
    { title: 'title1', id: 1 },
    { title: 'title1', id: 1 },
  ]

  const styles = StyleSheet.create({
    container: {
      marginTop: 0,
      margin: 40,
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
    },
    addBtn: {
      backgroundColor: colors.primary,
      padding: '1.5rem',
      borderRadius: 10,
    },
    pressedAddBtn: {
      backgroundColor: colors.primary,
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
    },
  })

  return (
    <ScrollView>
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
            <TextInput style={styles.search} placeholder='Search recipe...' />
          </View>

          {recipes.map((el, i) => (
            <Card key={i} item={el} />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default recipes
