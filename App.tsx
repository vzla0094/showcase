import { NativeBaseProvider } from 'native-base'
import RootNavigator from './src/navigators'
import { Provider as ReduxProvider } from 'react-redux'
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
