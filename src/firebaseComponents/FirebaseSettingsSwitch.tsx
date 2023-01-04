import { Switch, ISwitchProps, Box, VStack, Text } from 'native-base'

import { IFirebaseSettingsSwitchField } from '../types'

interface IFirebaseSettingsSwitch<FieldKey> {
  fieldKey: FieldKey
  label: string
  description?: string
  variant?: ISwitchProps['colorScheme']
  value: boolean
  onSubmit: (field: IFirebaseSettingsSwitchField<FieldKey>) => void
}

export const FirebaseSettingsSwitch = <FieldKey,>({
  fieldKey,
  label,
  variant = 'primary',
  value,
  description,
  onSubmit,
}: IFirebaseSettingsSwitch<FieldKey>) => {
  const onToggle: ISwitchProps['onValueChange'] = async value => {
    if (value === undefined) return

    onSubmit({ fieldKey, value })
  }

  return (
    <Box
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      bgColor="white"
      paddingX={15}
      paddingY={3}
    >
      <VStack maxWidth="3/4">
        <Text fontSize={16}>{label}</Text>
        {description && <Text color="dark.400">{description}</Text>}
      </VStack>
      <Switch colorScheme={variant} value={value} onToggle={onToggle} />
    </Box>
  )
}
