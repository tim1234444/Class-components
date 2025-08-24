import { useSelector } from 'react-redux';
import { mixed, number, object, ref, string } from 'yup';
import type { RootState } from '../store';

export function useCountrySchema() {
  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );
  return object({
    name: string()
      .matches(/^[A-ZА-Я][a-zA-Zа-яА-Я]*$/, 'First letter must be uppercase')
      .required('Name is required'),

    age: number()
      .transform((value, originalValue) =>
        originalValue === '' ? undefined : value,
      )
      .typeError('Age must be a number')
      .min(0, 'Age cannot be negative')

      .required('Age is required'),

    email: string().required('Email is required').email('Invalid email'),

    emailConfirm: string()
      .required('Confirm email is required')
      .oneOf([ref('email')], 'Emails must match'),

    password: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),

    passwordRepeat: string()
      .required('Please repeat the password')
      .oneOf([ref('password')], 'Passwords must match'),

    gender: string()
      .required('Gender is required')
      .oneOf(['male', 'female', 'other'], 'Invalid gender'),

    terms: string()
      .required('You must accept')
      .oneOf(['true'], 'You must accept'),

      avatar: mixed<File>()
      .required('Avatar is required')
      .test('file-size', 'File is empty', (value) => {
        return value && 'size' in value && value.size > 0;
      }),
    
    country: string()
      .required('Country is required')
      .oneOf(countries, 'Please select a valid country'),
  });
}
