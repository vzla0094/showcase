import { IconButton } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'

export interface ICountSelector {
  isDisabled: boolean
  iconName: string
  onPress: () => void
}

export const CountSelector = ({
  onPress,
  isDisabled,
  iconName,
}: ICountSelector) => (
  <IconButton
    onPress={onPress}
    isDisabled={isDisabled}
    variant="solid"
    colorScheme="blue"
    testID="iconButton"
    _icon={{
      as: FontAwesome,
      marginLeft: 0.5,
      size: 'xs',
      name: iconName,
    }}
  />
)
