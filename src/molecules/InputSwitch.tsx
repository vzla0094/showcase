import { Box, ISwitchProps, Switch, Text, VStack } from 'native-base'

interface IInputSwitchProps extends ISwitchProps {
  label: string
  description?: string
  value: boolean
}

export const InputSwitch = ({
  label,
  value,
  description,
  onToggle,
}: IInputSwitchProps) => (
  <Box
    alignItems="center"
    flexDirection="row"
    justifyContent="space-between"
    paddingY={3}
  >
    <VStack maxWidth="3/4">
      <Text fontSize={16}>{label}</Text>
      {description && <Text color="dark.400">{description}</Text>}
    </VStack>
    <Switch value={value} onToggle={onToggle} />
  </Box>
)
