import { Component, Input, inject } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ValidationService } from '../services/validation.service';

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, DropdownModule, JsonPipe],
  template: `
    <div class="field" [formGroup]="form">
      <label [class.required-mark]="isRequired">
        {{ label }}
      </label>

      <p-dropdown
        [formControlName]="controlName"
        [options]="options"
        optionLabel="label"
        optionValue="value"
        [placeholder]="placeholder"
        [filter]="filter"
        filterBy="label"
        [class.input-error]="isInvalid"
      />

      <div class="error" *ngIf="isInvalid">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [
    `
      .error {
        display: block;
        margin-top: 4px;

        color: #d32f2f;
        font-size: 13px;
        font-weight: 500;
        line-height: 1.3;

        text-align: right;
      }
    `,
  ],
})
export class SelectFieldComponent<T = string> {
  private readonly validation = inject(ValidationService);

  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) options: SelectOption<T>[] = [];

  @Input() placeholder = 'בחר';
  @Input() filter = false;

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
    const control = this.control;

    return !!control && control.invalid && (control.touched || control.dirty);
  }

  get errorMessage(): string {
    const errors = this.control?.errors;

    if (!errors) {
      return '';
    }

    if (errors['required']) {
      return 'שדה חובה';
    }

    return this.validation.getError(this.controlName, errors);
  }
}
