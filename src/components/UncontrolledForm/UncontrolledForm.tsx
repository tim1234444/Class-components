import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { InferType } from 'yup';
import { object, string, number, ValidationError, ref, mixed } from 'yup';
import { SaveUncontrolledForm } from '../../Reducer/FormsSlice';
import type { RootState } from '../../store';
export default function UncontrolledForm() {
  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );
  const [filtered, setFiltered] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = () => {
    const val = inputRef.current?.value ?? '';
    const countriesFilter = countries.filter((c) =>
      c.toLowerCase().includes(val.toLowerCase()),
    );
    setFiltered(countriesFilter);
  };

  const handleSelect = (country: string) => {
    if (inputRef.current) {
      inputRef.current.value = country;
    }
    setFiltered([]);
  };
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState('—');
  const checkPasswordStrength = (password: string) => {
    let score = 0;
    if (/(?=.*\d)/.test(password)) score++;
    if (/(?=.*[a-z])/.test(password)) score++;
    if (/(?=.*[A-Z])/.test(password)) score++;
    if (/(?=.*[@$!%*?&])/.test(password)) score++;

    switch (score) {
      case 4:
        return 'Strong';
      case 3:
        return 'Medium';
      case 2:
        return 'Weak';
      default:
        return 'Very Weak';
    }
  };

  const schema = object({
    name: string()
      .required('Name is required')
      .matches(/^[A-ZА-Я][a-zA-Zа-яА-Я]*$/, 'First letter must be uppercase'),

    age: number()
      .required('Age is required')
      .min(0, 'Age cannot be negative')
      .typeError('Age must be a number'),

    email: string().required('Email is required').email('Invalid email'),

    emailConfirm: string()
      .required('Confirm email is required')
      .oneOf([ref('email')], 'Emails must match'),

    password: string()
      .required('Password is required')
      .matches(/(?=.*\d)/, 'Must contain at least one digit')
      .matches(/(?=.*[a-z])/, 'Must contain at least one lowercase letter')
      .matches(/(?=.*[A-Z])/, 'Must contain at least one uppercase letter')
      .matches(
        /(?=.*[@$!%*?&])/,
        'Must contain at least one special character',
      ),

    passwordRepeat: string()
      .required('Please repeat the password')
      .oneOf([ref('password')], 'Passwords must match'),

    gender: string()
      .required('Gender is required')
      .oneOf(['male', 'female', 'other'], 'Invalid gender'),

    terms: string().required('You must accept'),

    avatar: mixed<File>().required('Avatar is required'),
    country: string().required('Country is required'),
  });

  type FormDataType = InferType<typeof schema>;
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function Validate(formData: FormDataType) {
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
    ) as unknown as FormDataType;
    const isValidate = await Validate(values);

    if (isValidate) {
      const base64 = await fileToBase64(values.avatar);
      const FinalData = {
        ...values,
        avatar: base64,
      };

      dispatch(SaveUncontrolledForm(FinalData));
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
              placeholder="John"
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
              ref={inputRef}
              onChange={handleInput}
            />
            {filtered.length > 0 && (
              <ul className="suggestions">
                {filtered.map((c) => (
                  <li key={c} onClick={() => handleSelect(c)}>
                    {c}
                  </li>
                ))}
              </ul>
            )}

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
