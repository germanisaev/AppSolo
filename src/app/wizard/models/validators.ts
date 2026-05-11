import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/*************************************************
 * Validates Israeli mobile phone numbers.
 *
 * Accepts only numbers in the format:
 * 05XXXXXXXX
 *
 * Spaces and hyphens are ignored.
 *
 * Examples:
 * 0501234567 V
 * 052-123-4567 V
 * 123456 X
 *************************************************/
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

/*************************************************
 * Validates Israeli ID numbers.
 *
 * Uses the official checksum algorithm.
 * Automatically pads IDs shorter than 9 digits with leading zeros.
 *
 * Examples:
 * 123456782 V
 * 123456789 X
 *************************************************/
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

/************************************************
 * Validates dates in DD/MM/YYYY format.
 *
 * Ensures:
 * - Correct format
 * - Real calendar date
 *
 * Examples:
 * 10/03/2026 V
 * 31/02/2026 X
 * 99/99/9999 X
 ***********************************************/
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

/********************************************
 * Validates that the value contains digits only.
 *
 * Examples:
 * 12345 V
 * 12a45 X
 ********************************************/
export const digitsOnlyValidator: ValidatorFn = (control) => {
  const value = control.value;

  if (!value) return null;

  return /^\d+$/.test(String(value)) ? null : { digitsOnly: true };
};

/*******************************************
 * Validates positive numeric values greater than zero.
 *
 * Supports formatted numbers with commas.
 *
 * Examples:
 * 100 V
 * 1,000 V
 * -5 X
 * 0 X
 ******************************************/
export const positiveNumberValidator: ValidatorFn = (control) => {
  const value = Number(String(control.value).replace(/,/g, ''));

  if (!control.value) return null;

  return Number.isFinite(value) && value > 0 ? null : { positiveNumber: true };
};

/*****************************************
 * Validates that the selected date is not in the past.
 *
 * Today's date is allowed.
 *
 * Examples:
 * Tomorrow V
 * Today V
 * Yesterday X
 ****************************************/
export const notPastDateValidator: ValidatorFn = (control) => {
  const value = control.value;

  if (!value) return null;

  const [day, month, year] = String(value).split('/').map(Number);
  const date = new Date(year, month - 1, day);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date >= today ? null : { pastDate: true };
};

/***************************************
 * Validates email addresses.
 *
 * Examples:
 * test@gmail.com V
 * invalid-email X
 ***************************************/
export const emailValidator: ValidatorFn = (control) => {
  const value = control.value;

  if (!value) return null;

  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ? null
    : { email: true };
};

/************************************************
 * Validates Hebrew and English names.
 *
 * Allows:
 * - Hebrew letters
 * - English letters
 * - Spaces
 * - Apostrophes
 * - Hyphens
 *
 * Examples:
 * גרמן כהן V
 * John Doe V
 * John123 X
 ************************************************/
export const nameValidator: ValidatorFn = (control) => {
  const value = control.value;

  if (!value) return null;

  return /^[\u0590-\u05FFa-zA-Z\s'-]+$/.test(String(value))
    ? null
    : { invalidName: true };
};

/****************************************************
 * Validates Israeli bank numbers.
 *
 * Allows 1–3 digits.
 *
 * Examples:
 * 10 V
 * 123 V
 * 1234 X
 ****************************************************/
export const bankNumberValidator: ValidatorFn = (control) => {
  const value = control.value;

  if (!value) return null;

  return /^\d{1,3}$/.test(String(value)) ? null : { bankNumber: true };
};

/**************************************************
 * Validates Israeli branch numbers.
 *
 * Allows 1–3 digits.
 *
 * Examples:
 * 1 V
 * 999 V
 * 9999 X
 **************************************************/
export const branchNumberValidator: ValidatorFn = (control) => {
  const value = control.value;

  if (!value) return null;

  return /^\d{1,3}$/.test(String(value)) ? null : { branchNumber: true };
};

/*************************************************
 * Validates Israeli bank account numbers.
 *
 * Allows 4–10 digits.
 *
 * Examples:
 * 12345678 V
 * 123 X
 ************************************************/
export const accountNumberValidator: ValidatorFn = (control) => {
  const value = control.value;

  if (!value) return null;

  return /^\d{4,10}$/.test(String(value)) ? null : { accountNumber: true };
};

/* =========================================
  ZipCode
============================================ */
export const zipCodeValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const value = control.value;

  if (!value) {
    return null;
  }

  const zip = String(value).trim();

  const isValid = /^\d{5,7}$/.test(zip);

  return isValid ? null : { zipCode: true };
};
