import { FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../wizard/services/validation.service';
import { inject } from '@angular/core';

export abstract class FormBaseComponent {
  abstract form: FormGroup;

  private validation = inject(ValidationService);

  protected isControlRequired(controlName: string): boolean {
    const control = this.form.get(controlName);

    return (
      !!control?.hasValidator(Validators.required) ||
      !!control?.hasValidator(Validators.requiredTrue)
    );
  }

  protected isControlInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);

    return !!control && control.touched && control.invalid;
  }

  // private errorMessages: Record<string, string> = {
  //   required: 'שדה חובה',
  //   requiredTrue: 'יש לאשר את השדה',

  //   // 👇 более понятный текст
  //   pattern: 'יש להזין אותיות בעברית או באנגלית בלבד',

  //   email: 'אימייל לא תקין',
  //   israeliId: 'תעודת זהות לא תקינה',
  //   mobilePhone: 'מספר טלפון לא תקין',
  // };

  // private getPatternMessage(controlName: string): string {
  //   const map: Record<string, string> = {
  //     firstName: 'יש להזין אותיות בעברית או באנגלית בלבד',
  //     lastName: 'יש להזין אותיות בעברית או באנגלית בלבד',

  //     childreNumUnder18: 'יש להזין מספרים בלבד',

  //     // можно расширять
  //     branchNumber: 'יש להזין מספרים בלבד',
  //     accountNumber: 'יש להזין מספרים בלבד',
  //   };

  //   return map[controlName] || 'פורמט לא תקין';
  // }

  // protected getControlErrorMessage(controlName: string): string | null {
  //   const control = this.form.get(controlName);

  //   if (!control || !control.errors || !control.touched) {
  //     return null;
  //   }

  //   const firstErrorKey = Object.keys(control.errors)[0];

  //   // 👇 специальная обработка pattern
  //   if (firstErrorKey === 'pattern') {
  //     return this.getPatternMessage(controlName);
  //   }

  //   return this.errorMessages[firstErrorKey] || 'ערך לא תקין';
  // }
  protected getControlErrorMessage(controlName: string): string | null {
    const control = this.form.get(controlName);

    if (!control || !control.errors || !control.touched) {
      return null;
    }

    return this.validation.getError(controlName, control.errors);
  }

  protected isNestedControlRequired(
    groupName: string,
    controlName: string,
  ): boolean {
    const control = this.form.get(`${groupName}.${controlName}`);

    return (
      !!control?.hasValidator(Validators.required) ||
      !!control?.hasValidator(Validators.requiredTrue)
    );
  }

  protected isNestedControlInvalid(
    groupName: string,
    controlName: string,
  ): boolean {
    const control = this.form.get(`${groupName}.${controlName}`);

    return !!control && control.touched && control.invalid;
  }

  protected getNestedControlErrorMessage(
    groupName: string,
    controlName: string,
  ): string | null {
    return this.getControlErrorMessage(`${groupName}.${controlName}`);
  }
}
