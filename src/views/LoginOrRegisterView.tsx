import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
} from 'native-base'
import { Errors } from '../helpers/useValidations'
import { FC } from 'react'

interface ILoginOrRegisterView {
  errors: Errors
  email: string
  onEmailChange: (text: string) => void
  onEmailBlur: () => void
  password: string
  onPasswordChange: (text: string) => void
  onPasswordBlur: () => void
  onSubmit: () => Promise<void>
  variant: 'login' | 'register'
  onChangeFormType: () => void
}

export const LoginOrRegisterView: FC<ILoginOrRegisterView> = ({
  errors,
  email,
  onEmailChange,
  onEmailBlur,
  password,
  onPasswordChange,
  onPasswordBlur,
  onSubmit,
  variant,
  onChangeFormType,
}) => (
  <Center flex={1}>
    <Container centerContent safeArea w="100%" flex={1} justifyContent="center">
      <Heading mb={12}>
        {variant === 'register' ? 'Register' : 'Login'} to Taisho
      </Heading>
      <Stack w="100%" mb={12} space={5}>
        <FormControl isInvalid={'requireEmail' in errors}>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            type="text"
            value={email}
            autoCapitalize="none"
            onChangeText={onEmailChange}
            onBlur={onEmailBlur}
          />
          {'requireEmail' in errors ? (
            <FormControl.ErrorMessage>
              {errors.requireEmail}
            </FormControl.ErrorMessage>
          ) : null}
        </FormControl>
        <FormControl isInvalid={'passwordLength' in errors}>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            type="password"
            value={password}
            onChangeText={onPasswordChange}
            onBlur={onPasswordBlur}
          />
          {'passwordLength' in errors ? (
            <FormControl.ErrorMessage>
              {errors.passwordLength}
            </FormControl.ErrorMessage>
          ) : null}
        </FormControl>
      </Stack>
      <Button w="full" onPress={onSubmit}>
        {variant === 'register' ? 'Register' : 'Login'}
      </Button>
      <Box
        mt={5}
        flexDirection="row"
        alignItems="center"
        alignSelf="flex-start"
      >
        <Text>
          {variant === 'register'
            ? 'Already have an account? '
            : "Don't have an account yet? "}
        </Text>
        <Button
          onPress={onChangeFormType}
          variant="link"
          p={0}
          _text={{ underline: true }}
        >
          {variant === 'register' ? 'Log in' : 'Register'}
        </Button>
      </Box>
      <Button variant="link" alignSelf="flex-start" p={0}>
        Privacy
      </Button>
    </Container>
  </Center>
)
