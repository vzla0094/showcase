import { Center, NativeBaseProvider } from 'native-base'
import { LandingScreen } from './src/screens/LandingScreen'
import { QuestionnaireScreen } from './src/screens/QuestionnaireScreen'

export default function App() {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <QuestionnaireScreen />
      </Center>
    </NativeBaseProvider>
  )
}
