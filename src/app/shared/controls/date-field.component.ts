import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import { NgIf } from '@angular/common';
import { DateMaskDirective } from '../services/date-mask.directive';

@Component({
  selector: 'app-date-field',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, DateMaskDirective],
  template: `
    <div class="field">
      <label [class.required-mark]="isRequired">
        {{ label }}
      </label>

      <div class="input-with-icon">
        <input
          type="text"
          [value]="displayValue"
          appDateMask
          placeholder="00/00/0000"
          [class.input-error]="isInvalid"
          (input)="onInput($event)"
          (blur)="onBlur()"
        />

        <i class="pi pi-calendar calendar-icon"></i>
      </div>

      <div class="error" *ngIf="isInvalid">
        {{ errorMessage }}
      </div>
    </div>
  `,
})
export class DateFieldComponent implements OnInit {
  private readonly validation = inject(ValidationService);

  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) label!: string;

  @Output() fieldBlur = new EventEmitter<void>();

  displayValue = '';

  ngOnInit(): void {
    const value = this.control?.value;

    if (value) {
      this.displayValue = this.fromISOToDisplay(value);
    }
  }

  get control() {
    return this.form.get(this.controlName);
  }

  get isRequired(): boolean {
    const validator = this.control?.validator?.({} as AbstractControl);
    return !!validator?.['required'];
  }

  get isInvalid(): boolean {
    return !!this.control && this.control.touched && this.control.invalid;
  }

  get errorMessage(): string {
    const errors = this.control?.errors;
    return errors ? this.validation.getError(this.controlName, errors) : '';
  }

  onInput(event: Event): void {
    this.displayValue = (event.target as HTMLInputElement).value;
  }

  onBlur(): void {
    const control = this.control;

    if (!control) {
      return;
    }

    const iso = this.toISODate(this.displayValue);

    if (iso) {
      control.setValue(iso);
    } else {
      control.setValue(this.displayValue || null);
    }

    control.markAsTouched();
    control.updateValueAndValidity();

    this.fieldBlur.emit();
  }

  private toISODate(value: string): string | null {
    const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);

    if (!match) return null;

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);

    const date = new Date(Date.UTC(year, month - 1, day));

    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day
    ) {
      return null;
    }

    return date.toISOString();
  }

  private fromISOToDisplay(value: string): string {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }
}

// import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
// import { NgIf } from '@angular/common';
// import {
//   AbstractControl,
//   FormGroup,
//   ReactiveFormsModule,
// } from '@angular/forms';
// import { ValidationService } from '../services/validation.service';
// import { DateMaskDirective } from '../services/date-mask.directive';

// @Component({
//   selector: 'app-date-field',
//   standalone: true,
//   imports: [ReactiveFormsModule, NgIf, DateMaskDirective],
//   template: `
//     <div class="field" [formGroup]="form">
//       <label [class.required-mark]="isRequired">
//         {{ label }}
//       </label>

//       <div class="input-with-icon">
//         <input
//           type="text"
//           [formControlName]="controlName"
//           appDateMask
//           placeholder="00/00/0000"
//           [class.input-error]="isInvalid"
//           (blur)="onBlur()"
//         />

//         <i class="pi pi-calendar calendar-icon"></i>
//       </div>

//       <div class="error" *ngIf="isInvalid">
//         {{ errorMessage }}
//       </div>
//     </div>
//   `,
// })
// export class DateFieldComponent implements OnInit {
//   private readonly validation = inject(ValidationService);

//   @Input({ required: true }) form!: FormGroup;
//   @Input({ required: true }) controlName!: string;
//   @Input({ required: true }) label!: string;

//   @Output() fieldBlur = new EventEmitter<void>();

//   ngOnInit(): void {
//     const control = this.control;

//     if (!control) return;

//     const value = control.value;

//     if (value && value.includes('T')) {
//       control.setValue(this.fromISOToDisplay(value), { emitEvent: false });
//     }
//   }

//   onBlur(): void {
//     const control = this.control;

//     if (!control) return;

//     const value = control.value;

//     // если уже ISO — не трогаем
//     if (value?.includes('T')) {
//       this.fieldBlur.emit();
//       return;
//     }

//     const iso = this.toISODate(value);

//     if (iso) {
//       control.setValue(iso, { emitEvent: false });
//     }

//     this.fieldBlur.emit();
//   }

//   private toISODate(value: string): string | null {
//     if (!value) return null;

//     const [day, month, year] = value.split('/').map(Number);

//     if (!day || !month || !year) return null;

//     const date = new Date(Date.UTC(year, month - 1, day));

//     return date.toISOString(); // 👉 2000-04-07T00:00:00.000Z
//   }

//   private fromISOToDisplay(value: string): string {
//     const date = new Date(value);

//     const day = String(date.getUTCDate()).padStart(2, '0');
//     const month = String(date.getUTCMonth() + 1).padStart(2, '0');
//     const year = date.getUTCFullYear();

//     return `${day}/${month}/${year}`;
//   }

//   get control() {
//     return this.form.get(this.controlName);
//   }

//   get isRequired(): boolean {
//     const control = this.control;

//     if (!control) {
//       return false;
//     }

//     const validator = control.validator?.({} as AbstractControl);

//     return !!validator?.['required'];
//   }

//   get isInvalid(): boolean {
//     return !!this.control && this.control.touched && this.control.invalid;
//   }

//   get errorMessage(): string {
//     const errors = this.control?.errors;

//     if (!errors) {
//       return '';
//     }

//     return this.validation.getError(this.controlName, errors);
//   }
// }
