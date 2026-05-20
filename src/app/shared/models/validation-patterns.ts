export const VALIDATION_PATTERNS = {
  hebrewText: /^[א-ת\s-]+$/,
  digitsOnly: /^\d+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  moneyWithCommas: /^\d{1,3}(,\d{3})*$/,
};
