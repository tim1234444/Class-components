import { useEffect, useState } from 'react';

type FormDataType = {
  name: string;
  age: number;
  email: string;
  emailConfirm: string;
  password: string;
  passwordRepeat: string;
  gender: string;
  terms: string;
  avatar: string;
  country: string;
};

type Props = {
  Info: FormDataType;
  isNew?: boolean;
};

export default function FormInfo({ Info, isNew }: Props) {
  const [Countdown, setCountdown] = useState(false);
 
  useEffect(() => {
   
    if (isNew) {

      setCountdown(true);
      const timer = setTimeout(() => setCountdown(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isNew]);
  return (
    <>
      <div className="form-info">
        <div className={`form-info__card ${Countdown ? 'effect' : ''}`}>
          <p className="form-info__name">{Info.name}</p>
          <p className="form-info__age">{Info.age}</p>
          <p className="form-info__country">{Info.country}</p>
          <p className="form-info__email">{Info.email}</p>
          <p className="form-info__gender">{Info.gender}</p>
          <p className="form-info__password">{Info.password}</p>
          <p className="form-info__terms">
            {Info.terms ? 'accept' : 'No accept'}
          </p>
          <img src={Info.avatar} alt="preview" />
        </div>
      </div>
    </>
  );
}
