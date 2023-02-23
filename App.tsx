import 'react-native-gesture-handler'
import { Provider as ReduxProvider } from 'react-redux'
import { NativeBaseProvider } from 'native-base'
import { Raleway_400Regular, useFonts } from '@expo-google-fonts/raleway'

import RootNavigator from './src/navigators'
import { store } from './src/redux/store'
import { theme } from './src/theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider theme={theme}>
        <RootNavigator />
      </NativeBaseProvider>
    </ReduxProvider>
  )
}
