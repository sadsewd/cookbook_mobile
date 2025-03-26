import { DarkTheme, DefaultTheme } from '@react-navigation/native'

export const Dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'rgb(17, 17, 17)',
    container: 'rgb(82, 0, 68)',
    text: 'rgb(255, 255, 255)',
    button: 'rgb(160, 1, 139)',
    inputBG: 'rgb(150, 17, 121)',
    inputBorder: 'rgb(54, 0, 38)',
    error: 'white',
    errorBG: 'red',
  },
}

export const Light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)',
    container: 'rgb(82, 0, 68)',
    text: 'rgb(255, 255, 255)',
    button: 'rgb(160, 1, 139)',
    inputBG: 'rgb(255, 83, 83)',
    inputBorder: 'rgb(0, 0, 0)',
  },
}

export default { Dark, Light }
