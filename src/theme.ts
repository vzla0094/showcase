import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    primary: {
      900: '#28536B',
    },
    tertiary: {
      400: '#1ABF8F',
    },
    lightText: '#CDD4F4',
    darkText: '#1C0221',
  },
  fontConfig: {
    Raleway: {
      400: {
        normal: 'Raleway_400Regular',
      },
    },
  },
  fonts: {
    heading: 'Raleway',
    body: 'Raleway',
  },
})
