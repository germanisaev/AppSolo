import { Component, Input, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from '../services';

export interface RadioOption<T = string | number | boolean> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-radio-group-field',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  template: `
    <div class="field" [formGroup]="form">
      <label *ngIf="label" [class.required-mark]="isRequired">
        {{ label }}
      </label>

      <div class="radio-group">
        <button
          type="button"
          class="radio-option"
          *ngFor="let option of options"
          [class.active]="control?.value === option.value"
          (click)="setValue(option.value)"
        >
          <span class="radio-circle">
            <span class="radio-dot"></span>
          </span>

          <span class="radio-label">
            {{ option.label }}
          </span>
        </button>
      </div>

      <div class="error" *ngIf="isInvalid">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .radio-group {
        display: grid;
        gap: 12px;
      }

      :host ::ng-deep .radio-option {
        width: 100%;
        min-height: 46px;

        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;

        direction: rtl;
        padding: 0 14px;

        border: 1px solid transparent;
        border-radius: 12px;

        background: #f8fafc;
        color: #64748b;

        font: inherit;
        font-weight: 600;
        cursor: pointer;

        transition:
          background 0.2s ease,
          border-color 0.2s ease,
          color 0.2s ease,
          box-shadow 0.2s ease;
      }

      :host ::ng-deep .radio-option:hover {
        background: #f8f8fa;
        border-color: #f8f8fa;
      }

      :host ::ng-deep .radio-option.active {
        background: #f8f8fa;
        border-color: #f8f8fa;
        color: #711aaa;
        box-shadow: 0 0 0 2px rgba(255, 102, 0, 0.12);
      }

      :host ::ng-deep .radio-circle {
        width: 18px;
        height: 18px;

        display: inline-flex;
        align-items: center;
        justify-content: center;

        border: 1.5px solid #cbd5e1;
        border-radius: 50%;
        background: #ffffff;
        flex: 0 0 auto;
      }

      :host ::ng-deep .radio-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: transparent;
      }

      :host ::ng-deep .radio-option.active .radio-circle {
        border-color: #711aaa;
      }

      :host ::ng-deep .radio-option.active .radio-dot {
        background: #711aaa;
      }
    `,
  ],
})
export class RadioGroupFieldComponent<T = string | number | boolean> {
  private readonly validation = inject(ValidationService);

  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) options: RadioOption<T>[] = [];

  @Input() label = '';

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

  setValue(value: T): void {
    this.control?.setValue(value);
    this.control?.markAsTouched();
    this.control?.updateValueAndValidity();
  }
}
