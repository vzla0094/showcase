import { Button, Box } from 'native-base'

import { UnAuthStackScreenProps } from '../types'

interface ILoginBottomNavigationProps {
  navigation: UnAuthStackScreenProps<'Discovery'>['navigation']
}

export const LoginBottomNavigation = ({
  navigation,
}: ILoginBottomNavigationProps) => {
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
