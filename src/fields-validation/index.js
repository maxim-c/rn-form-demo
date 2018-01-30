import { isValidNumber } from 'libphonenumber-js';

const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const validations = {
  required: str => {
    if (str.trim().length) return;
    return 'This field is required';
  },
  acceptTerms: value => {
    if (value) return;
    return 'You should accept terms of service first';
  },
  letters: str => {
    if (/^[a-zA-Z]+$/.test(str)) return;
    return 'This field can contain only letters';
  },
  email: str => {
    if (emailReg.test(str)) return;
    return 'Email adress is invalid';
  },
  phone: str => {
    if (isValidNumber(str)) return;
    return 'Invalid phone number';
  },
  countryPhone: (str, { countryCode }) => {
    if (isValidNumber(str, countryCode)) return;
    return 'Phone number must be in your country';
  },
  code: str => {
    if (str.replace(' ', '').length === 6) return;
    return 'Verification code is required';
  }
};

export const validate = (items, str = '', other) => {
  let error;
  for (let i = 0; i < items.length; i++) {
    error = validations[items[i]] && validations[items[i]](str, other);
    if (error) return error;
  }
};