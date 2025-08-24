export const checkPasswordStrength = (password: string) => {
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