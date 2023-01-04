import { Heading, VStack } from 'native-base'

import { ViewContainer } from '../atoms/ViewContainer'
import { FirebaseSettingsSwitch } from '../firebaseComponents/FirebaseSettingsSwitch'

import { categoryNamesArr, SearchFilterSettingsField } from '../types'
import { setSearchFilterSetting } from '../redux/slices/user'
import { useAppDispatch, useAppSelector } from '../hooks'

export const SearchFilterScreen = () => {
  const dispatch = useAppDispatch()

  const searchFilterSettings = useAppSelector(
    ({ user }) => user.searchFilterSettings
  )

  const handleSubmit = (
    searchFilterSettingsField: SearchFilterSettingsField
  ) => {
    dispatch(setSearchFilterSetting(searchFilterSettingsField))
  }

  return (
    <ViewContainer alignItems="stretch">
      <VStack space={4}>
        <Heading>Select event categories</Heading>
        {categoryNamesArr.map((categoryName, index) => (
          <FirebaseSettingsSwitch<typeof categoryName>
            key={index}
            fieldKey={categoryName}
            label={categoryName}
            value={searchFilterSettings[categoryName]}
            onSubmit={handleSubmit}
          />
        ))}
      </VStack>
    </ViewContainer>
  )
}
