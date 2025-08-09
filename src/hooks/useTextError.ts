import { useState, useEffect } from 'react';
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from '../utils/errorGuards';

export function useTextError(error: unknown) {
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    if (!error) {
      setErrorText(null);
      return;
    }

    if (isFetchBaseQueryError(error)) {
      const status = error.status;
      if (typeof status === 'string') {
        setErrorText(`Ошибка: ${status}`);
      } else {
        if (status === 404) {
          setErrorText(`Nothing found`);
        } else {
          setErrorText(`Ошибка: HTTP ${status}`);
        }
      }
    } else if (isErrorWithMessage(error)) {
      setErrorText(`Ошибка: ${error.message}`);
    } else {
      setErrorText('Произошла неизвестная ошибка');
    }
  }, [error]);
  return errorText;
}
