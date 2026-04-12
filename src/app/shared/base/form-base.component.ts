import { FormGroup, Validators } from '@angular/forms';

export abstract class FormBaseComponent {
  abstract form: FormGroup;

  protected isControlRequired(controlName: string): boolean {
    const control = this.form.get(controlName);

    return !!control?.hasValidator(Validators.required) ||
           !!control?.hasValidator(Validators.requiredTrue);
  }
  
}