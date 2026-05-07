import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const mobilePhoneValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const value = control.value;

  if (!value) {
    return null;
  }

  const mobile = String(value).replace(/[\s-]/g, '');

  const isValid = /^05\d{8}$/.test(mobile);

  return isValid ? null : { mobilePhone: true };
};

export const israeliIdValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const value = control.value;

  if (!value) {
    return null;
  }

  const id = String(value).replace(/\D/g, '').padStart(9, '0');

  if (!/^\d{9}$/.test(id)) {
    return { israeliId: true };
  }

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    let digit = Number(id[i]) * ((i % 2) + 1);

    if (digit > 9) {
      digit -= 9;
    }

    sum += digit;
  }

  return sum % 10 === 0 ? null : { israeliId: true };
};

export const dateValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const value = control.value;

  if (!value) {
    return null;
  }

  const date = String(value);

  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    return { invalidDate: true };
  }

  const [day, month, year] = date.split('/').map(Number);

  const parsedDate = new Date(year, month - 1, day);

  const isValid =
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day;

  return isValid ? null : { invalidDate: true };
};
