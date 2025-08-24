import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { checkPasswordStrength } from '../../utils/password';
import { fileToBase64 } from '../../utils/file';
import { useCountrySchema } from '../../utils/schemas';
import { ModalContext } from '../Modal/Modal';
import { addForm } from '../../Reducer/FormsSlice';

export default function ControlledForm() {
  const close = useContext(ModalContext);
  const schema = useCountrySchema();
  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );
  const [passwordStrength, setPasswordStrength] = useState('—');
  const dispatch = useDispatch();
  type FormData = {
    id?: number;
    name: string;
    age: number;
    email: string;
    emailConfirm: string;
    password: string;
    passwordRepeat: string;
    gender: string;
    terms: string;
    avatar: File;
    country: string;
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      country: '',
      name: '',
      age: 18,
      email: '',
      emailConfirm: '',
      password: '',
      passwordRepeat: '',
      gender: '',
      terms: '',
      avatar: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (isValid) {
      const base64 = await fileToBase64(data.avatar);
      const FinalData = {
        ...data,
        avatar: base64,
        id: Math.random(),
      };

      dispatch(addForm(FinalData));
      close();
    }
  };

  return (
    <section className="forms">
      <h2>Similar form</h2>
      <form onSubmit={handleSubmit(onSubmit)} id="form-b" className="form">
        <fieldset>
          <legend>Personal Info</legend>

          <div className="form-group">
            <label htmlFor="b-name">Name</label>
            <input
              {...register('name')}
              id="b-name"
              type="text"
              placeholder="Тимоха"
              autoComplete="given-name"
            />
            <div className="error">{errors.name?.message || '\u00A0'}</div>
          </div>

          <div className="form-group">
            <label htmlFor="b-bge">Age</label>
            <input
              {...register('age')}
              id="b-bge"
              type="number"
              min="0"
              step="1"
              placeholder="18"
              autoComplete="off"
            />
            <div className="error">{errors.age?.message || '\u00A0'}</div>
          </div>

          <div className="form-group">
            <label htmlFor="b-email">Email</label>
            <input
              id="b-email"
              {...register('email')}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
            <div className="error">{errors.email?.message || '\u00A0'}</div>
          </div>

          <div className="form-group">
            <label htmlFor="b-email-confirm">Confirm Email</label>
            <input
              {...register('emailConfirm')}
              id="b-email-confirm"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />{' '}
            <div className="error">
              {errors.emailConfirm?.message || '\u00A0'}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="b-password">Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    id="b-password"
                    type="password"
                    onChange={(e) => {
                      field.onChange(e);
                      setPasswordStrength(
                        checkPasswordStrength(e.target.value),
                      );
                    }}
                  />
                  <div className="password-strength">
                    Password strength: {passwordStrength}
                  </div>
                  <div className="error">
                    {errors.password?.message || '\u00A0'}
                  </div>
                </>
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor="b-password2">Repeat Password</label>
            <input
              {...register('passwordRepeat')}
              id="b-password2"
              type="password"
              autoComplete="new-password"
            />
            <div className="error">
              {errors.passwordRepeat?.message || '\u00A0'}
            </div>
          </div>

          <fieldset className="form-group">
            <legend>Gender</legend>
            <label>
              <input
                {...register('gender')}
                id="b-gender-m"
                type="radio"
                value="male"
              />{' '}
              Male
            </label>
            <label>
              <input
                {...register('gender')}
                id="b-gender-f"
                type="radio"
                value="female"
              />{' '}
              Female
            </label>
            <label>
              <input
                {...register('gender')}
                id="b-gender-o"
                type="radio"
                value="other"
              />{' '}
              Other
            </label>
            <div className="error">{errors.gender?.message || '\u00A0'}</div>
          </fieldset>

          <div className="form-group checkbox">
            <input {...register('terms')} id="b-terms" type="checkbox" />
            <label htmlFor="b-terms">I accept Terms & Conditions</label>
            <div className="error">{errors.terms?.message || '\u00A0'}</div>
          </div>

          <div className="form-group">
            <label htmlFor="b-bvatar">Upload Image</label>
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    id="b-bvatar"
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
                  />
                  <div className="error">
                    {errors.avatar?.message || '\u00A0'}
                  </div>
                </>
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor="b-country">Country</label>

            <input
              {...register('country')}
              id="b-country"
              type="text"
              list="b-country-list"
              placeholder="Select a country"
            />
            <datalist id="b-country-list">
              {countries.map((country) => (
                <option key={country} value={country}></option>
              ))}
            </datalist>

            <div className="error">{errors.country?.message || '\u00A0'}</div>
          </div>
        </fieldset>
        <button type="submit" disabled={!isValid} className="btn">
          Submit
        </button>
      </form>
    </section>
  );
}
