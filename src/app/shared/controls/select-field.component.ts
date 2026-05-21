import { Component, Input, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ValidationService } from '../services';

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, DropdownModule],
  template: `
    <div class="field" [formGroup]="form">
      <label [class.required-mark]="isRequired">
        {{ label }}
      </label>

      <!-- 
      <p-dropdown
        [formControlName]="controlName"
        [options]="options"
        optionLabel="label"
        optionValue="value"
        [filter]="true"
        filterBy="label"
        [filterPlaceholder]="'חפש...'"
        [showClear]="true"
        [appendTo]="'body'"
        [autoDisplayFirst]="false"
        [placeholder]="placeholder"
      />
      -->

      <p-dropdown
        [formControlName]="controlName"
        [options]="options"
        optionLabel="label"
        optionValue="value"
        [placeholder]="placeholder"
        [filterPlaceholder]="'חפש...'"
        [filter]="filter"
        filterBy="label"
        [showClear]="false"
        [autoDisplayFirst]="false"
        [class.input-error]="isInvalid"
        (onChange)="onChange()"
        (onBlur)="onBlur()"
      />

      <div class="error" *ngIf="isInvalid">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep {
        .p-dropdown {
          width: 100%;
        }

        .p-dropdown-label {
          padding-right: 42px !important; // место под стрелку справа
          padding-left: 42px !important; // место под крестик слева
          text-align: right;
          direction: rtl;
        }

        .p-dropdown-trigger {
          right: 0 !important;
          left: auto !important;
        }

        .p-dropdown-clear-icon,
        .p-dropdown-clearable .p-dropdown-clear-icon,
        .p-dropdown-clearable .p-icon-wrapper {
          right: auto !important;
          left: 12px !important;
        }
      }

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

  onChange(): void {
    const control = this.control;

    if (!control) return;

    control.markAsTouched();
    control.markAsDirty();
  }

  onBlur(): void {
    this.control?.markAsTouched();
  }
}
