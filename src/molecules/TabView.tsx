import { useState } from 'react'
import {
  Route,
  SceneMap,
  TabBar as RNTabBar,
  TabView as RNTabView,
} from 'react-native-tab-view'
import { useTheme } from 'native-base'

export type TabViewProps<T extends Route> = {
  sceneMap: { [key: string]: React.ComponentType<any> }
  routes: T[]
  initialTabIndex?: number
}

export const TabView = <T extends Route>({
  sceneMap,
  routes,
  initialTabIndex = 0,
}: TabViewProps<T>) => {
  const { colors } = useTheme()
  const [tabIndex, setTabIndex] = useState(initialTabIndex)

  const handleIndexChange = (index: number) => {
    setTabIndex(index)
  }

  return (
    <RNTabView
      navigationState={{ index: tabIndex, routes }}
      renderScene={SceneMap(sceneMap)}
      onIndexChange={handleIndexChange}
      renderTabBar={props => (
        <RNTabBar
          {...props}
          indicatorStyle={{ backgroundColor: colors.tertiary[400] }}
          style={{ backgroundColor: 'white' }}
          labelStyle={{
            color: colors.darkText,
            fontFamily: 'Raleway_600SemiBold',
          }}
          activeColor={colors.tertiary[400]}
        />
      )}
    />
  )
}
