import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import { IEvent } from './events'

export type UnAuthStackParamList = {
  Discovery: undefined
  LoginOrRegister: undefined
}

export type AuthBottomTabParamList = {
  DiscoveryStack: NavigatorScreenParams<DiscoveryStackParamList>
  Search: undefined
  Profile: undefined
  CompanyStack: NavigatorScreenParams<CompanyStackParamList>
}

export type DiscoveryStackParamList = {
  Discovery: undefined
  EventCategory: { eventCategoryName: IEvent['category'] }
}

export type CompanyStackParamList = {
  CompanyDashboard: undefined
  CompanyDetails: undefined
  Event: {
    id: IEvent['id']
    category: IEvent['category']
    activeView: 'EventDetails' | 'EventEditDetails'
  }
}

export type UnAuthStackScreenProps<Screen extends keyof UnAuthStackParamList> =
  NativeStackScreenProps<UnAuthStackParamList, Screen>

export type AuthBottomTabScreenProps<
  Screen extends keyof AuthBottomTabParamList
> = BottomTabScreenProps<AuthBottomTabParamList, Screen>

export type DiscoveryStackScreenProps<
  Screen extends keyof DiscoveryStackParamList
> = NativeStackScreenProps<DiscoveryStackParamList, Screen>

export type CompanyStackScreenProps<
  Screen extends keyof CompanyStackParamList
> = NativeStackScreenProps<CompanyStackParamList, Screen>
