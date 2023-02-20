// https://reactnavigation.org/docs/testing/
import 'react-native-gesture-handler/jestSetup'

// This mock will prevent the test accessing async storage which is not available in the test environment
// https://react-native-async-storage.github.io/async-storage/docs/advanced/jest
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

// This mock will prevent the test accessing the real firebase database
jest.mock('firebase/auth/react-native', () => ({
  ...jest.requireActual('firebase/auth/react-native'),
  ...['getReactNativePersistence', 'initializeAuth'].reduce(
    (preview, elem) => ({ ...preview, [elem]: jest.fn(b => b) }),
    {}
  ),
}))

jest.mock('@react-navigation/native', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useEffect } = require('react')
  const actualModule = jest.requireActual('@react-navigation/native')

  return {
    ...actualModule,
    useFocusEffect: useEffect,
  }
})
