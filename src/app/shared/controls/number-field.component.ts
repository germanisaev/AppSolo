import { Component, inject, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService, NumberFormatDirective } from '../services';

@Component({
  selector: 'app-number-field',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NumberFormatDirective],
  template: `
    <div class="field" [formGroup]="form">
      <label [class.required-mark]="isRequired">
        {{ label }}
      </label>

      <div class="input-with-currency">
        <img class="currency-icon" src="/nis.svg" alt="₪" />

        <input
          [type]="type"
          [formControlName]="controlName"
          [class.input-error]="isInvalid"
          numberFormat
        />
      </div>

      <div class="error" *ngIf="isInvalid">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .input-with-currency {
        position: relative;
        width: 100%;
      }

      :host ::ng-deep .input-with-currency input {
        width: 100%;
        padding-inline-start: 1rem;
      }

      :host ::ng-deep .currency-icon {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);

        width: 1.25rem;
        height: 1.25rem;

        opacity: 0.75;
        pointer-events: none;
        transition: all 0.2s ease;
      }

      :host ::ng-deep .input-with-currency input:focus ~ .currency-icon {
        opacity: 1;
        transform: translateY(-50%) scale(1.05);
      }

      :host ::ng-deep .input-with-currency input.input-error ~ .currency-icon {
        filter: brightness(0) saturate(100%) invert(32%) sepia(84%)
          saturate(2447%) hue-rotate(338deg) brightness(96%) contrast(97%);
      }
    `,
  ],
})
export class NumberFieldComponent {
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
