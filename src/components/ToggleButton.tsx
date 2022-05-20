import { Button } from 'native-base'
import { FC } from 'react'
import { ToggleButtonOnPress, DealCategories } from '../types'

interface IToggleButton {
  value: DealCategories
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
