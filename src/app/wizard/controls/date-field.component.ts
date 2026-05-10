import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { AbstractControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import { DateMaskDirective } from '../services/date-mask.directive';

@Component({
  selector: 'app-date-field',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, DateMaskDirective],
  template: `
    <div class="field" [formGroup]="form">
      <label [class.required-mark]="isRequired">
        {{ label }}
      </label>

      <div class="input-with-icon">
        <input
          type="text"
          [formControlName]="controlName"
          appDateMask
          placeholder="00/00/0000"
          [class.input-error]="isInvalid"
          (blur)="fieldBlur.emit()"
        />

        <i class="pi pi-calendar calendar-icon"></i>
      </div>

      <div class="error" *ngIf="isInvalid">
        {{ errorMessage }}
      </div>
    </div>
  `,
})
export class DateFieldComponent {
  private readonly validation = inject(ValidationService);

  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) label!: string;

  @Output() fieldBlur = new EventEmitter<void>();

  get control() {
    return this.form.get(this.controlName);
  }

  /* get isRequired(): boolean {
    return (
      !!this.control?.hasValidator(Validators.required) ||
      !!this.control?.hasValidator(Validators.requiredTrue)
    );
  } */

  get isRequired(): boolean {
    const control = this.control;

    if (!control) {
      return false;
    }

    const validator = control.validator?.({} as AbstractControl);

    return !!validator?.['required'];
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
