import { useState } from 'react'
import { Box, Text } from 'native-base'
import MultiSlider, {
  MultiSliderProps,
} from '@ptomasroos/react-native-multi-slider'

interface IInputSliderProps extends MultiSliderProps {
  value: number
  label?: string
}

export const InputSlider = ({ value, label, ...props }: IInputSliderProps) => {
  const [labelValue, setLabelValue] = useState<number>(value)

  return (
    <Box>
      {Boolean(label) && (
        <Box flexDirection="row" justifyContent="space-between">
          <Text>{label}</Text>
          <Text>{labelValue}</Text>
        </Box>
      )}
      <MultiSlider
        values={[value]}
        containerStyle={{ alignSelf: 'center' }}
        min={1}
        max={100}
        onValuesChange={values => setLabelValue(values[0])}
        {...props}
      />
    </Box>
  )
}
