import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Landing: undefined
  Questionnaire: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type Deals = 'Food' | 'Activities' | 'Events' | 'Stay' | 'Transportation'

export type ToggleButtonOnPress = (buttonValue: Deals) => void
