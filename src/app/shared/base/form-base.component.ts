import { FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../wizard/services/validation.service';
import { inject } from '@angular/core';

export abstract class FormBaseComponent {
  abstract form: FormGroup;

  // private validation = inject(ValidationService);
  protected readonly validation = inject(ValidationService);

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

  protected isRequiredByPath(path: string): boolean {
    const control = this.form.get(path);

    return (
      !!control?.hasValidator(Validators.required) ||
      !!control?.hasValidator(Validators.requiredTrue)
    );
  }

  protected isInvalidByPath(path: string): boolean {
    const control = this.form.get(path);

    return !!control && control.touched && control.invalid;
  }

  protected getErrorByPath(path: string): string | null {
    const control = this.form.get(path);

    if (!control || !control.errors || !control.touched) {
      return null;
    }

    return this.validation.getError(path.split('.').pop()!, control.errors);
  }
}
