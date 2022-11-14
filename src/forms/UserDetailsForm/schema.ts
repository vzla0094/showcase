import * as yup from 'yup'

import { IUser } from '../../types'

type UserDetailsSchemaType = {
  [key in keyof IUser['details']]: yup.AnySchema
}

export const UserDetailsSchema: UserDetailsSchemaType = {
  username: yup.string(),
  birthDay: yup
    .number()
    .typeError('Must be a number')
    .min(1, 'Must be between 1 and 31')
    .max(31, 'Must be between 1 and 31'),
  birthMonth: yup
    .number()
    .typeError('Must be a number')
    .min(1, 'Must be between 1 and 12')
    .max(12, 'Must be between 1 and 12'),
  birthYear: yup
    .number()
    .typeError('Must be a number')
    .test(
      'length',
      'Must be exactly 4 digits',
      value =>
        Boolean(!value) || Boolean(value && value.toString().length === 4)
    ),
  phoneNumber: yup.number().typeError('Must be a number'),
}
