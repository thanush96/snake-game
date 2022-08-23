import { Dimensions } from 'react-native'

export enum ColorThemes {
  yellow = 'yellow',
}

export enum BoardSizes {
  '15x20' = '15x20',
}

export enum Difficulties {
  low = 'low',
}

type Theme = {
  [key in ColorThemes]: {
    primaryColor: string
    darkerPrimaryColor: string
    secondaryColor: string
    lightColor: string
  }
}

const THEMES: Theme = {
  yellow: {
    primaryColor: '#FCDE89',
    darkerPrimaryColor: '#C9AB56',
    secondaryColor: '#424646',
    lightColor: 'white',
  },
}

export default {
  MAX_WIDTH: Dimensions.get('screen').width,
  MAX_HEIGHT: Dimensions.get('screen').height,
  SETTINGS: {
    BOARD_SIZES: [BoardSizes['15x20']],
    DIFFICULTIES: [Difficulties.low],
    THEMES: [ColorThemes.yellow],
    TELEPORT: [true],
  },
  LOADING_DURATION: 1500,
  THEMES,
}
