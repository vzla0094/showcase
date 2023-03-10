import {
  Bed,
  Bus,
  MicrophoneStage,
  PersonSimpleRun,
  Pizza,
} from 'phosphor-react-native'
import { Box, Text, useTheme } from 'native-base'

import { EVENT_CATEGORY_NAMES } from '../types'
import { ChipIcon, IChipIcon } from '../atoms/ChipIcon'

interface IEventCategory {
  category: EVENT_CATEGORY_NAMES
  variant?: 'badge' | 'chip'
  active?: boolean
  onPress?: (category: EVENT_CATEGORY_NAMES) => void
}

export const EventCategory = ({
  category,
  variant = 'badge',
  active,
  onPress,
}: IEventCategory) => {
  const { colors } = useTheme()

  const categoryIconMap: Record<
    EVENT_CATEGORY_NAMES,
    IChipIcon<EVENT_CATEGORY_NAMES>['icon']
  > = {
    [EVENT_CATEGORY_NAMES.Accommodation]: props => <Bed {...props} />,
    [EVENT_CATEGORY_NAMES.Activities]: props => <PersonSimpleRun {...props} />,
    [EVENT_CATEGORY_NAMES.Food]: props => <Pizza {...props} />,
    [EVENT_CATEGORY_NAMES.Transportation]: props => <Bus {...props} />,
    [EVENT_CATEGORY_NAMES.Venues]: props => <MicrophoneStage {...props} />,
  }

  if (variant === 'chip')
    return (
      <ChipIcon
        onPress={onPress}
        active={active}
        icon={categoryIconMap[category]}
      >
        {category}
      </ChipIcon>
    )

  return (
    <Box flexDirection="row" alignItems="center">
      {categoryIconMap[category]({ size: 24, color: colors.trueGray['300'] })}
      <Text
        ml={2}
        variant="description"
        color="trueGray.300"
        textTransform="capitalize"
      >
        {category}
      </Text>
    </Box>
  )
}
