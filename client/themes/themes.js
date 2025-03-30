import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { PixelRatio } from 'react-native'
let scale = PixelRatio.get()

const Sizing = {
  sizing: {
    heading: 36 * scale,
    label: 24 * scale,
    text: 16 * scale,
  },
}

export const Dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(50, 83, 68)',
    secondary: 'rgb(28, 40, 38)', //'#1C2826',
    tertiary: '#8CA879',
    warning: '#FFD93D',
    success: '#4CAF50',
    // error: '#E63946',
    background: '#121212',
    text: 'rgb(255, 255, 255)',
    textInvert: 'rgb(230, 230, 230)',

    container: 'rgb(82, 0, 68)',
    // text: 'rgb(255, 255, 255)',
    button: 'rgb(160, 1, 139)',
    inputBG: 'rgb(150, 17, 121)',
    inputBorder: 'rgb(54, 0, 38)',
    errorBG: 'red',
    successBG: 'green',
  },
  ...Sizing,
}

export const Light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(43, 179, 72)',
    secondary: 'rgb(23, 119, 39)', //'#1C2826',
    tertiary: '#8CA879',
    warning: '#FFD93D',
    success: '#4CAF50',
    // error: '#E63946',
    background: 'rgb(239, 255, 230)',
    text: 'rgb(36, 36, 36)',
    textInvert: 'rgb(255, 255, 255)',

    container: 'rgb(82, 0, 68)',
    // text: 'rgb(255, 255, 255)',
    button: 'rgb(160, 1, 139)',
    inputBG: 'rgb(255, 83, 83)',
    inputBorder: 'rgb(0, 0, 0)',
    errorBG: 'red',
    successBG: 'green',
  },
  ...Sizing,
}

export default { Dark, Light }
