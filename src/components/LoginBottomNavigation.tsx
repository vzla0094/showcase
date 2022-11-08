import { FC } from 'react'
import { Button, Box } from 'native-base'
import { RootStackScreenProps } from '../types'

interface ILoginBottomNavigationProps {
  navigation: RootStackScreenProps<'Discovery'>['navigation']
}

export const LoginBottomNavigation: FC<ILoginBottomNavigationProps> = ({
  navigation,
}) => {
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
        Login
      </Button>
    </Box>
  )
}
