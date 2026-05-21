import { Component, Input, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ValidationService } from '../services';

@Component({
  selector: 'app-checkbox-field',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CheckboxModule],
  template: `
    <div class="checkbox-row" [formGroup]="form">
      <p-checkbox
        [formControlName]="controlName"
        [binary]="true"
        [inputId]="controlName"
        (onChange)="onChange()"
      ></p-checkbox>

      <label [for]="controlName" [class.required-mark]="isRequired">
        {{ label }}
      </label>
    </div>

    <div class="error" *ngIf="isInvalid">
      {{ errorMessage }}
    </div>
  `,
  styles: [
    `
      .checkbox-row {
        grid-column: 1 / -1;
        width: 100%;
        display: flex;
        direction: rtl;
        align-items: center;
        gap: 8px;
        justify-content: flex-start;
        margin-top: 12px;
      }

      .checkbox-row label {
        cursor: pointer;
        font-size: 16px;
        font-weight: 400;
      }

      :host(.full-width) {
        grid-column: 1 / -1;
        width: 100%;
      }

      .checkbox-row {
        width: fit-content;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      :host(.full-width) .checkbox-row {
        width: 100%;
      }

      :host ::ng-deep {
        /* базовый чекбокс */
        .p-checkbox .p-checkbox-box {
          border: 1px solid #d1d5db;
          border-radius: 6px;
          width: 18px;
          height: 18px;
          transition: all 0.2s ease;
        }

        /* hover */
        .p-checkbox:not(.p-disabled):hover .p-checkbox-box {
          border-color: #711aaa;
        }

        /* 🔥 ВАЖНО: checked */
        .p-checkbox.p-highlight .p-checkbox-box {
          background: #711aaa !important;
          border-color: #711aaa !important;
        }

        /* галочка */
        .p-checkbox.p-highlight .p-checkbox-icon {
          color: #fff !important;
        }

        /* 🔥 focus (PrimeNG использует p-focus) */
        .p-checkbox.p-focus .p-checkbox-box {
          box-shadow: 0 0 0 3px rgba(113, 26, 170, 0.15) !important;
          border-color: #711aaa !important;
        }
      }

      .error {
        margin-top: 4px;
        font-size: 13px;
        color: #d32f2f;
        text-align: right;
      }
    `,
  ],
})
export class CheckboxFieldComponent {
  private readonly validation = inject(ValidationService);

  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) label!: string;
  @Input() fullWidth = false;

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

    if (!errors) return '';

    if (errors['required']) {
      return 'יש לאשר את התנאים';
    }

    return this.validation.getError(this.controlName, errors);
  }

  onChange(): void {
    this.control?.markAsTouched();
    this.control?.markAsDirty();
  }
}
