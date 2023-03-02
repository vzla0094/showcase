import { PropsWithChildren } from 'react'

import { Provider as ReduxProvider } from 'react-redux'
import { NativeBaseProvider } from 'native-base'
import { IconContext } from 'phosphor-react-native'

import { render, RenderOptions } from '@testing-library/react-native'
import { PreloadedState } from '@reduxjs/toolkit'

import { AppStore, RootState, setupStore } from './src/redux/store'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Providers = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
    // NativeBaseProvider uses SafeAreaContext which needs initialWindowMetrics to be passed to the Provider while testing.
    // Not doing this may lead to an error related to SafeAreaProvider while running yarn test.
    // https://docs.nativebase.io/testing#h3-adding-initialwindowmetrics-in-nativebaseprovider
    const inset = {
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    }

    return (
      // Interactions with the page being tested should use real Redux logic, with API calls mocked out so app code doesn't have to change, and assert that the UI is updated appropriately.
      // Do not try to mock selector functions or the React-Redux hooks! Mocking imports from libraries is fragile, and doesn't give you confidence that your actual app code is working.
      // https://redux.js.org/usage/writing-tests#guiding-principles
      <ReduxProvider store={store}>
        <IconContext.Provider value={{ weight: 'thin' }}>
          <NativeBaseProvider initialWindowMetrics={inset}>
            {children}
          </NativeBaseProvider>
        </IconContext.Provider>
      </ReduxProvider>
    )
  }
  return { store, ...render(ui, { wrapper: Providers, ...renderOptions }) }
}
