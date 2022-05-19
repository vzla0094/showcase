import { NativeBaseProvider } from 'native-base'
import RootNavigator from './src/navigators'

export default function App() {
  return (
    <NativeBaseProvider>
      <RootNavigator />
    </NativeBaseProvider>
  )
}
