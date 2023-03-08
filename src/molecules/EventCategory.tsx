import { ReactNode } from 'react'
import {
  Bed,
  Bus,
  MicrophoneStage,
  PersonSimpleRun,
  Pizza,
} from 'phosphor-react-native'
import { Box, Text, useTheme } from 'native-base'

import { EVENT_CATEGORY_NAMES } from '../types'

interface IEventCategory {
  category: EVENT_CATEGORY_NAMES
  variant?: 'badge' | 'chip'
}

export const EventCategory = ({
  category,
  variant = 'badge',
}: IEventCategory) => {
  const { colors } = useTheme()

  const variants = {
    badge: {
      color: colors.trueGray['300'],
      _container: {},
    },
    chip: {
      color: colors.darkText,
      _container: {
        p: 3,
        bg: 'white',
        rounded: 'full',
        alignSelf: 'start',
      },
    },
  }

  const color = variants[variant].color

  const categoryIconMap: Record<EVENT_CATEGORY_NAMES, ReactNode> = {
    [EVENT_CATEGORY_NAMES.Accommodation]: <Bed size={24} color={color} />,
    [EVENT_CATEGORY_NAMES.Activities]: (
      <PersonSimpleRun size={24} color={color} />
    ),
    [EVENT_CATEGORY_NAMES.Food]: <Pizza size={24} color={color} />,
    [EVENT_CATEGORY_NAMES.Transportation]: <Bus size={24} color={color} />,
    [EVENT_CATEGORY_NAMES.Venues]: <MicrophoneStage size={24} color={color} />,
  }

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      {...variants[variant]._container}
    >
      {categoryIconMap[category]}
      <Text
        ml={2}
        variant="description"
        color={color}
        textTransform="capitalize"
      >
        {category}
      </Text>
    </Box>
  )
}
