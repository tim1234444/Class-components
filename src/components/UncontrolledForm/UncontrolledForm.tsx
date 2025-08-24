import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ValidationError } from 'yup';
import type { RootState } from '../../store';
import { checkPasswordStrength } from '../../utils/password';
import { fileToBase64 } from '../../utils/file';
import { useCountrySchema } from '../../utils/schemas';
import { ModalContext } from '../Modal/Modal';
import { addForm } from '../../Reducer/FormsSlice';
export default function UncontrolledForm() {
  const close = useContext(ModalContext);
  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );
  const schema = useCountrySchema();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState('—');

  type DataType = {
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

  async function Validate(formData: DataType) {
    try {
      await schema.validate(formData, { abortEarly: false });
      return true;
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors = err.inner.reduce(
          (acc, curr) => {
            if (curr.path) {
              acc[curr.path] = curr.message;
            }
            return acc;
          },
          {} as Record<string, string>,
        );
        setErrors(errors);
      }
      return false;
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const values = Object.fromEntries(
      formData.entries(),
    ) as unknown as DataType;
    values.terms = values.terms ? 'true' : 'false';
    const isValidate = await Validate(values);

    if (isValidate) {
      const base64 = await fileToBase64(values.avatar);
      const FinalData = {
        ...values,
        avatar: base64,
        id: Math.random(),
      };

      dispatch(addForm(FinalData));
      setErrors({});
      close();
    }
  };

  return (
    <section className="forms">
      <h2>Uncontrolled Form</h2>
      <form id="form-a" className="form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Personal Info</legend>

          <div className="form-group">
            <label htmlFor="a-name">Name</label>
            <input
              id="a-name"
              name="name"
              type="text"
              placeholder="Тимоха"
              autoComplete="given-name"
            />
            <div className="error">{errors.name || '\u00A0'}</div>
          </div>

          <div className="form-group">
            <label htmlFor="a-age">Age</label>
            <input
              id="a-age"
              name="age"
              type="number"
              min="0"
              step="1"
              placeholder="18"
              autoComplete="off"
            />
            <div className="error">{errors.age || '\u00A0'}</div>
          </div>

          <div className="form-group">
            <label htmlFor="a-email">Email</label>
            <input
              id="a-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
            <div className="error">{errors.email || '\u00A0'}</div>
          </div>

          <div className="form-group">
            <label htmlFor="a-email-confirm">Confirm Email</label>
            <input
              id="a-email-confirm"
              name="emailConfirm"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />{' '}
            <div className="error">{errors.emailConfirm || '\u00A0'}</div>
          </div>

          <div className="form-group">
            <label htmlFor="a-password">Password</label>
            <input
              id="a-password"
              name="password"
              type="password"
              autoComplete="new-password"
              onChange={(e) =>
                setPasswordStrength(checkPasswordStrength(e.target.value))
              }
            />
            <div className="password-strength">
              Password strength: {passwordStrength}
            </div>
            <div className="error">{errors.password || '\u00A0'}</div>{' '}
          </div>

          <div className="form-group">
            <label htmlFor="a-password2">Repeat Password</label>
            <input
              id="a-password2"
              name="passwordRepeat"
              type="password"
              autoComplete="new-password"
            />
            <div className="error">{errors.passwordRepeat || '\u00A0'}</div>
          </div>

          <fieldset className="form-group">
            <legend>Gender</legend>
            <label>
              <input id="a-gender-m" name="gender" type="radio" value="male" />{' '}
              Male
            </label>
            <label>
              <input
                id="a-gender-f"
                name="gender"
                type="radio"
                value="female"
              />{' '}
              Female
            </label>
            <label>
              <input id="a-gender-o" name="gender" type="radio" value="other" />{' '}
              Other
            </label>
            <div className="error">{errors.gender || '\u00A0'}</div>
          </fieldset>

          <div className="form-group checkbox">
            <input id="a-terms" name="terms" type="checkbox" />
            <label htmlFor="a-terms">I accept Terms & Conditions</label>
            <div className="error">{errors.terms || '\u00A0'}</div>
          </div>

          <div className="form-group">
            <label htmlFor="a-avatar">Upload Image</label>
            <input
              id="a-avatar"
              name="avatar"
              type="file"
              accept="image/png,image/jpeg"
            />
            <div className="error">{errors.avatar || '\u00A0'}</div>
          </div>

          <div className="form-group">
            <label htmlFor="a-country">Country</label>
            <input
              id="a-country"
              name="country"
              type="text"
              list="a-country-list"
              placeholder="Select a country"
            />
            <datalist id="a-country-list">
              {countries.map((country) => (
                <option key={country} value={country}></option>
              ))}
            </datalist>

            <div className="error">{errors.country || '\u00A0'}</div>
          </div>
        </fieldset>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </section>
  );
}
