import * as yup from 'yup';
import {
  VALIDATION_MESSAGES,
  VALIDATION_RULES,
  EMAIL_VALIDATION,
  PASSWORD_SCHEMA,
} from '../../utils/validation';

export const schema = yup.object().shape({
  name: yup
    .string()
    // .required(VALIDATION_MESSAGES.message_required)
    .min(1, VALIDATION_MESSAGES.message_min)
    .matches(VALIDATION_RULES.nameRules, VALIDATION_MESSAGES.message_latin),
  email: yup
    .string()
    // .required(VALIDATION_MESSAGES.message_required)
    .email(EMAIL_VALIDATION.message)
    .matches(EMAIL_VALIDATION.rules, EMAIL_VALIDATION.message),
  password: PASSWORD_SCHEMA,
  confirmPassword: yup
    .string()
    // .required('Retype your password!')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  age: yup.string(),
  gender: yup.string(),
  file: yup.string(),
  country: yup.string(),
  terms: yup.boolean(),
});

export type SchemaType = yup.InferType<typeof schema>;
