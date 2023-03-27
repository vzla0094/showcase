import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    primary: {
      900: '#28536B',
    },
    tertiary: {
      400: '#1ABF8F',
    },
    trueGray: {
      300: '#CECECE',
    },
    red: {
      500: '#FF331F',
    },
    lightText: '#CDD4F4',
    darkText: '#1C0221',
  },
  fontConfig: {
    Raleway: {
      400: {
        normal: 'Raleway_400Regular',
      },
      500: {
        normal: 'Raleway_500Medium',
      },
      600: {
        normal: 'Raleway_600SemiBold',
      },
    },
    Inter: {
      400: {
        normal: 'Inter_400Regular',
      },
      500: {
        normal: 'Inter_500Medium',
      },
      600: {
        normal: 'Inter_600SemiBold',
      },
    },
  },
  fonts: {
    heading: 'Raleway',
    body: 'Inter',
  },
  components: {
    Badge: {
      defaultProps: {
        variant: 'solid',
      },
      baseStyle: {
        _text: {
          textTransform: 'uppercase',
          lineHeight: 'sm',
        },
      },
      variants: {
        solid: {
          _text: {
            color: 'text.100',
          },
          _icon: {
            color: 'text.100',
          },
        },
      },
    },
    Button: {
      defaultProps: {
        colorScheme: 'tertiary',
      },
      baseStyle: ({ theme }) => ({
        rounded: 'md',
        _text: {
          fontFamily: 'heading',
          textTransform: 'uppercase',
          fontWeight: theme.fontWeights.semibold,
        },
      }),
      variants: {
        solid: ({ colorScheme }: Record<string, any>) => ({
          bg: `${colorScheme}.400`,
          _text: {
            color: 'white',
          },
        }),
        outline: ({ colorScheme }: Record<string, any>) => ({
          borderWidth: 2,
          borderColor: `${colorScheme}.400`,
          _text: {
            color: `${colorScheme}.400`,
          },
        }),
        link: () => ({
          _text: {
            color: 'primary.900',
            fontFamily: 'body',
            textTransform: 'none',
            underline: true,
          },
        }),
      },
      sizes: {
        md: {
          py: 4,
        },
      },
    },
    FormControlLabel: {
      baseStyle: {
        _text: {
          fontSize: 'xs',
          lineHeight: 'xs',
          color: 'trueGray.300',
        },
        my: '1.5',
      },
    },
    Heading: {
      defaultProps: {
        size: 'h1',
      },
      baseStyle: {
        color: 'darkText',
        fontWeight: 'normal',
        fontFamily: 'heading',
      },
      sizes: {
        h1: {
          fontSize: {
            base: '2xl',
            md: '3xl',
          },
        },
        h2: {
          fontSize: 'xl',
        },
        h3: {
          fontSize: 'md',
        },
        h4: {
          fontSize: 'sm',
        },
      },
    },
    Input: {
      defaultProps: {
        size: 'md',
      },
      baseStyle: {
        py: 4,
        borderRadius: 0,
        placeholderTextColor: 'trueGray.300',
        color: 'black',
        _hover: {
          borderColor: 'tertiary.600',
        },
        _focus: {
          borderColor: 'tertiary.600',
        },
      },
      variants: {
        outline: {
          _focus: {
            bg: 'tertiary.600:alpha.10',
          },
        },
      },
    },
    Select: {
      baseStyle: {
        _customDropdownIconProps: {
          size: 4,
        },
      },
    },
    Text: {
      baseStyle: {
        color: 'darkText',
      },
      variants: {
        description: {
          fontSize: 'xs',
          lineHeight: 'xs',
        },
        button: {
          fontSize: 'sm',
          fontFamily: 'heading',
          fontWeight: 'semibold',
          color: 'black',
          textTransform: 'uppercase',
        },
      },
    },
    Switch: {
      defaultProps: {
        colorScheme: 'tertiary',
      },
      baseStyle: {
        onTrackColor: `tertiary.400`,
      },
    },
  },
})
