import { Switch, ISwitchProps, Box, VStack, Text } from 'native-base'

interface IInputSwitchProps extends ISwitchProps {
  label: string
  description?: string
  variant?: ISwitchProps['colorScheme']
  value: boolean
}

export const InputSwitch = ({
  label,
  variant = 'primary',
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
    <Switch colorScheme={variant} value={value} onToggle={onToggle} />
  </Box>
)
