import { Center, NativeBaseProvider } from 'native-base'
import { LandingScreen } from './src/screens/LandingScreen'

export default function App() {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <LandingScreen />
      </Center>
    </NativeBaseProvider>
  )
}
