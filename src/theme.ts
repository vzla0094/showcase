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
      600: {
        normal: 'Raleway_600SemiBold',
      },
    },
  },
  fonts: {
    heading: 'Raleway',
    body: 'Raleway',
  },
  components: {
    Button: {
      baseStyle: ({ theme }) => ({
        rounded: 'md',
        _text: {
          textTransform: 'uppercase',
          fontWeight: theme.fontWeights.semibold,
        },
      }),
      defaultProps: {
        variant: 'primary',
      },
      variants: {
        primary: {
          bgColor: 'tertiary.400',
          _text: {
            color: 'white',
          },
        },
        secondary: {
          bgColor: 'white',
          borderWidth: 2,
          borderColor: 'tertiary.400',
          _text: {
            color: 'tertiary.400',
          },
        },
      },
    },
  },
})
