import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Landing: undefined
  Questionnaire: undefined
  Dashboard: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type DealCategories =
  | 'Food'
  | 'Activities'
  | 'Events'
  | 'Stay'
  | 'Transportation'

export type ToggleButtonOnPress = (buttonValue: DealCategories) => void

export interface IDealProps {
  title: string
  description: string
}
