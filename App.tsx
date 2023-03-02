import 'react-native-gesture-handler'

import { Provider as ReduxProvider } from 'react-redux'
import { NativeBaseProvider } from 'native-base'
import { IconContext } from 'phosphor-react-native'

import {
  Raleway_400Regular,
  Raleway_600SemiBold,
  useFonts,
} from '@expo-google-fonts/raleway'

import RootNavigator from './src/navigators'
import { store } from './src/redux/store'
import { theme } from './src/theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <ReduxProvider store={store}>
      <IconContext.Provider value={{ weight: 'thin' }}>
        <NativeBaseProvider theme={theme}>
          <RootNavigator />
        </NativeBaseProvider>
      </IconContext.Provider>
    </ReduxProvider>
  )
}
