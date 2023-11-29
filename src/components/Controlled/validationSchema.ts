import * as yup from 'yup';
import {
  VALIDATION_MESSAGES,
  VALIDATION_RULES,
  EMAIL_VALIDATION,
  PASSWORD_SCHEMA,
  SUPPORTED_FORMATS,
} from '../../utils/validation';

export const schema = yup.object().shape({
  name: yup.string().matches(VALIDATION_RULES.nameRules, VALIDATION_MESSAGES.message_uppercase),
  email: yup
    .string()
    // .required(VALIDATION_MESSAGES.message_required)
    .email(EMAIL_VALIDATION.message)
    .matches(EMAIL_VALIDATION.rules, EMAIL_VALIDATION.message),
  password: PASSWORD_SCHEMA,
  confirmPassword: yup
    .string()
    .required('Retype your password!')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  age: yup
    .number()
    .typeError(VALIDATION_MESSAGES.message_number)
    .min(0, VALIDATION_MESSAGES.message_positive),
  gender: yup.string(),
  file: yup
    .mixed<FileList>()
    .required()
    .test(
      'fileSize',
      'Only documents up to 2MB are permitted.',
      (files) =>
        !files || files.length === 0 || Array.from(files).every((file) => file.size <= 2_000_000)
    )
    .test(
      'format',
      'Only .png and .jpg are allowed!',
      (files) =>
        !files ||
        files.length === 0 ||
        Array.from(files).every((file) => file && SUPPORTED_FORMATS.includes(file.type))
    ),
  country: yup.string(),
  terms: yup.boolean().required(),
});

export type SchemaType = yup.InferType<typeof schema>;
