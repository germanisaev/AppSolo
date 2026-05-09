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
    mobilePhone: 'מספר טלפון לא תקין',

    invalidDate: 'תאריך לא תקין',
  };

  private patternMessages: Record<string, string> = {
    firstName: 'יש להזין אותיות בעיברית בלבד',
    lastName: 'יש להזין אותיות בעיברית בלבד',

    governmentId: 'יש להזין 9 ספרות',

    childreNumUnder18: 'יש להזין מספרים בלבד',
    branchNumber: 'יש להזין מספרים בלבד',
    accountNumber: 'יש להזין מספרים בלבד',
  };

  getError(controlName: string, errors: any): string {
    const firstKey = Object.keys(errors)[0];

    if (firstKey === 'pattern') {
      return this.patternMessages[controlName] || 'פורמט לא תקין';
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
