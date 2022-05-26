import { Button } from 'native-base'
import { FC } from 'react'
import { ToggleButtonOnPress, DealCategoryNames } from '../types'

interface IToggleButton {
  value: DealCategoryNames
  onPress: ToggleButtonOnPress
  active: boolean
}

export const ToggleButton: FC<IToggleButton> = ({ value, active, onPress }) => (
  <Button
    variant={active ? 'solid' : 'outline'}
    onPress={() => onPress(value)}
    flex={1}
  >
    {value}
  </Button>
)
