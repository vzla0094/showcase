import { Button } from 'native-base'
import { FC } from 'react'
import { ToggleButtonValues } from '../types'

interface IToggleButton {
  value: ToggleButtonValues
  onPress: (buttonValue: ToggleButtonValues) => void
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
