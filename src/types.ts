export type ToggleButtonValues =
  | 'Food'
  | 'Activities'
  | 'Events'
  | 'Stay'
  | 'Transportation'

export type ToggleButtonOnPress = (buttonValue: ToggleButtonValues) => void
