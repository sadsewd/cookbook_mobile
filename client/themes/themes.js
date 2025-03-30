import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { PixelRatio } from 'react-native'
let scale = PixelRatio.getFontScale()

const Sizing = {
  sizing: {
    heading: 36 * scale,
    label: 24 * scale,
    text: 16 * scale,
    small: 12,
  },
}

export const Dark = {
  ...DarkTheme,
  colors: {
    primary: 'rgb(50, 83, 68)',
    secondary: 'rgb(28, 40, 38)',
    tertiary: 'rgb(140, 168, 121)',
    warning: 'rgb(255, 217, 61)',
    success: 'rgb(76, 175, 80)',
    error: 'rgb(230, 57, 70)',
    background: 'rgb(18, 18, 18)',
    text: 'rgb(255, 255, 255)',
    textInvert: 'rgb(230, 230, 230)',
    textStaticBlack: 'rgb(36, 36, 36)',
  },
  ...Sizing,
}

export const Light = {
  ...DefaultTheme,
  colors: {
    primary: 'rgb(43, 179, 72)',
    secondary: 'rgb(23, 119, 39)',
    tertiary: 'rgb(140, 168, 121)',
    warning: 'rgb(255, 217, 61)',
    success: 'rgb(76, 175, 80)',
    error: 'rgb(230, 57, 70)',
    background: 'rgb(239, 255, 230)',
    text: 'rgb(255, 255, 255)',
    textInvert: 'rgb(36, 36, 36)',
    textStaticBlack: 'rgb(36, 36, 36)',
  },
  ...Sizing,
}

export default { Dark, Light }
