import { Heading, VStack } from 'native-base'

import { ViewContainer } from '../atoms/ViewContainer'
import { InputSlider } from '../molecules/InputSlider'
import { InputSwitch } from '../molecules/InputSwitch'

import { setSearchFilterSetting } from '../redux/slices/user'
import { useAppDispatch, useAppSelector } from '../hooks'

import { categoryNamesArr, SearchFilterSettingsField } from '../types'

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
          <InputSwitch
            key={index}
            label={categoryName}
            value={searchFilterSettings[categoryName]}
            onToggle={value => handleSubmit({ fieldKey: categoryName, value })}
          />
        ))}

        <InputSlider
          onValuesChangeFinish={values =>
            handleSubmit({ fieldKey: 'radiusDistance', value: values[0] })
          }
          value={searchFilterSettings.radiusDistance}
          label="Distance in miles"
        />
      </VStack>
    </ViewContainer>
  )
}
