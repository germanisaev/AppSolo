import { Component, inject, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="field" [formGroup]="form">
      <label [class.required-mark]="isRequired">
        {{ label }}
      </label>

      <input
        [type]="type"
        [formControlName]="controlName"
        [class.input-error]="isInvalid"
      />

      <div class="error" *ngIf="isInvalid">
        {{ errorMessage }}
      </div>
    </div>
  `,
})
export class FormFieldComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) label!: string;
  @Input() type = 'text';

  private validation = inject(ValidationService);

  get control() {
    return this.form.get(this.controlName);
  }

  get isRequired(): boolean {
    return (
      !!this.control?.hasValidator(Validators.required) ||
      !!this.control?.hasValidator(Validators.requiredTrue)
    );
  }

  get isInvalid(): boolean {
    return !!this.control && this.control.touched && this.control.invalid;
  }

  get errorMessage(): string {
    const errors = this.control?.errors;

    if (!errors) {
      return '';
    }

    return this.validation.getError(this.controlName, errors);
  }
}
