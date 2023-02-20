import 'react-native-gesture-handler'
import { Provider as ReduxProvider } from 'react-redux'
import { NativeBaseProvider } from 'native-base'

import RootNavigator from './src/navigators'
import { store } from './src/redux/store'

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider>
        <RootNavigator />
      </NativeBaseProvider>
    </ReduxProvider>
  )
}
