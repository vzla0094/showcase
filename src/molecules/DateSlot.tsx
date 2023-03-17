import { Box, IBoxProps, Text } from 'native-base'

import { formatDate } from '../helpers/formatDate'

interface IDateSlotProps extends IBoxProps {
  dateStamp: string // TODO: refactor when DateSlot schema is implemented
}

export const DateSlot = ({ dateStamp, ...props }: IDateSlotProps) => {
  const { month, day, year } = formatDate(dateStamp)
  return (
    <Box flexDirection="row" justifyContent="space-between" {...props}>
      <Box>
        <Text variant="button">
          {month}, {day}
        </Text>
        <Text variant="button" color="trueGray.300">
          {year}
        </Text>
      </Box>
      <Box>
        <Box flexDirection="row" alignItems="center" justifyContent="flex-end">
          <Text mr={2} variant="description" color="trueGray.300">
            Starts
          </Text>
          <Text variant="button">06:00 PM</Text>
        </Box>
        <Box flexDirection="row" alignItems="center" justifyContent="flex-end">
          <Text mr={2} variant="description" color="trueGray.300">
            Ends
          </Text>
          <Text variant="button">06:00 PM</Text>
        </Box>
      </Box>
    </Box>
  )
}
