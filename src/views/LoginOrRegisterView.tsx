import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
} from 'native-base'
import { Errors } from '../hooks/useValidations'
import { FontAwesome } from '@expo/vector-icons'
import { ViewContainer } from '../atoms/ViewContainer'

interface ILoginOrRegisterViewProps {
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

export const LoginOrRegisterView = ({
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
}: ILoginOrRegisterViewProps) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <ViewContainer flex={0} alignItems="stretch">
      <Heading alignSelf="center" size="h1" mb={12}>
        {variant === 'register' ? 'Register' : 'Login'}
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
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChangeText={onPasswordChange}
            onBlur={onPasswordBlur}
            InputRightElement={
              <IconButton
                onPress={() => setShowPassword(!showPassword)}
                _icon={{
                  as: FontAwesome,
                  name: showPassword ? 'eye-slash' : 'eye',
                }}
              />
            }
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
        mt={2}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Text>
          {variant === 'register'
            ? 'Already have an account? '
            : "Don't have an account yet? "}
        </Text>
        <Button onPress={onChangeFormType} variant="link" p={0}>
          {variant === 'register' ? 'Log in' : 'Register'}
        </Button>
      </Box>
      <Box mt={12} flexDirection="row" justifyContent="space-between">
        <Button variant="link" alignSelf="flex-start" p={0}>
          Privacy
        </Button>
        <Button variant="link" alignSelf="flex-start" p={0}>
          Terms & Conditions
        </Button>
      </Box>
    </ViewContainer>
  )
}
