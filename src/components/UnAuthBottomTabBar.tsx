import { Button, Box } from 'native-base'

import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

export const UnAuthBottomTabBar = ({
  navigation,
  descriptors,
  state,
}: BottomTabBarProps) => {
  // hides the tab bar when passing tabBarStyle: { display: 'none' }
  // on any screen https://stackoverflow.com/a/73605723/13722854
  const focusedOptions = descriptors[state.routes[state.index].key].options
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore typescript's not yet smart enough to infer type here
  if (focusedOptions?.tabBarStyle?.display === 'none') {
    return null
  }

  return (
    <Box
      height={20}
      style={{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button onPress={() => navigation.navigate('LoginOrRegister')}>
        Login / Register
      </Button>
    </Box>
  )
}
