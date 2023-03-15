import { FormControl, Input } from 'native-base'

export const ReadOnlyField = ({
  label,
  value,
}: {
  label: string
  value: string
}) => (
  <FormControl>
    <FormControl.Label>{label}</FormControl.Label>
    <Input
      isDisabled
      _disabled={{
        opacity: 1,
      }}
      variant="underlined"
      value={value}
    />
  </FormControl>
)
