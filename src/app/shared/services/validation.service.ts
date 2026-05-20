import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  private errorMessages: Record<string, string> = {
    required: 'שדה חובה',
    requiredTrue: 'יש לאשר את השדה',

    pattern: 'פורמט לא תקין',
    email: 'אימייל לא תקין',

    minlength: 'אורך קצר מדי',
    maxlength: 'אורך ארוך מדי',
    min: 'ערך קטן מדי',
    max: 'ערך גדול מדי',

    israeliId: 'תעודת זהות לא תקינה',
    mobilePhone: 'מספר טלפון נייד לא תקין',

    invalidDate: 'תאריך לא תקין',
    pastDate: 'יש להזין תאריך שאינו בעבר',

    digitsOnly: 'יש להזין ספרות בלבד',
    positiveNumber: 'יש להזין מספר גדול מ־0',
    zipCode: 'מיקוד לא תקין',

    invalidName: 'יש להזין אותיות בלבד',
    bankNumber: 'מספר בנק לא תקין',
    branchNumber: 'מספר סניף לא תקין',
    accountNumber: 'מספר חשבון לא תקין',
  };

  private patternMessages: Record<string, string> = {
    firstName: 'יש להזין אותיות בעברית בלבד',
    lastName: 'יש להזין אותיות בעברית בלבד',

    governmentId: 'יש להזין 9 ספרות',

    childreNumUnder18: 'יש להזין מספרים בלבד',
    branchNumber: 'יש להזין מספרים בלבד',
    accountNumber: 'יש להזין מספרים בלבד',

    city: 'יש להזין אותיות בעברית בלבד',
    street: 'יש להזין אותיות בעברית בלבד',

    houseNumber: 'יש להזין ספרות בלבד',
    entranceNumber: 'יש להזין ספרות בלבד',
    apartmentNumber: 'יש להזין ספרות בלבד',
    zipCode: 'יש להזין מיקוד תקין',
    poBoxNumber: 'יש להזין ספרות בלבד',
  };

  private controlMessages: Record<string, Record<string, string>> = {
    mobilePhone: {
      mobilePhone: 'יש להזין מספר נייד תקין בפורמט 05XXXXXXXX',
    },

    governmentId: {
      israeliId: 'תעודת זהות לא תקינה',
    },

    idIssueDate: {
      invalidDate: 'תאריך הנפקת תעודת זהות לא תקין',
      pastDate: 'תאריך הנפקה לא יכול להיות עתידי',
    },

    idExpiryDate: {
      invalidDate: 'תוקף תעודת זהות לא תקין',
      pastDate: 'תוקף תעודת הזהות לא יכול להיות בעבר',
    },

    birthDate: {
      invalidDate: 'תאריך לידה לא תקין',
      pastDate: 'תאריך לידה לא תקין',
    },

    executedTransactionConsentExpiryDate: {
      invalidDate: 'תוקף ההסכמה לעסקה שיצאה לפועל לא תקין',
      pastDate: 'תוקף ההסכמה לא יכול להיות בעבר',
    },

    nonExecutedTransactionConsentExpiryDate: {
      invalidDate: 'תוקף ההסכמה לעסקה שלא יצאה לפועל לא תקין',
      pastDate: 'תוקף ההסכמה לא יכול להיות בעבר',
    },

    email: {
      email: 'כתובת דוא"ל לא תקינה',
    },

    firstName: {
      invalidName: 'יש להזין שם פרטי באותיות בלבד',
    },

    lastName: {
      invalidName: 'יש להזין שם משפחה באותיות בלבד',
    },

    bank: {
      bankNumber: 'יש לבחור בנק תקין',
    },

    branchNumber: {
      branchNumber: 'יש לבחור מספר סניף תקין',
      digitsOnly: 'יש להזין ספרות בלבד',
    },

    accountNumber: {
      accountNumber: 'מספר חשבון לא תקין',
      digitsOnly: 'יש להזין ספרות בלבד',
    },

    loanAmount: {
      positiveNumber: 'יש להזין סכום הלוואה גדול מ־0',
      digitsOnly: 'יש להזין ספרות בלבד',
    },

    monthlyPayment: {
      positiveNumber: 'החזר חודשי חייב להיות גדול מ־0',
    },

    childreNumUnder18: {
      digitsOnly: 'יש להזין מספר ילדים בספרות בלבד',
    },
  };

  getError(controlName: string, errors: any): string {
    const firstKey = Object.keys(errors)[0];

    const controlMessage = this.controlMessages[controlName]?.[firstKey];

    if (controlMessage) {
      return controlMessage;
    }

    if (firstKey === 'pattern') {
      return this.patternMessages[controlName] || this.errorMessages['pattern'];
    }

    if (firstKey === 'minlength') {
      return `מינימום ${errors['minlength'].requiredLength} תווים`;
    }

    if (firstKey === 'maxlength') {
      return `מקסימום ${errors['maxlength'].requiredLength} תווים`;
    }

    if (firstKey === 'min') {
      return `ערך מינימלי ${errors['min'].min}`;
    }

    if (firstKey === 'max') {
      return `ערך מקסימלי ${errors['max'].max}`;
    }

    return this.errorMessages[firstKey] || 'ערך לא תקין';
  }
}
