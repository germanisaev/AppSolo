import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step3Form2 } from '../models/step.types';
import { FormFieldComponent } from './form-field.component';
import { NumberFormatDirective } from '../services/number-format.directive';

@Component({
  selector: 'app-step3-form2',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, FormFieldComponent, NumberFormatDirective],
  template: `
    <div class="form-grid" [formGroup]="form">
      <app-form-field [form]="form" controlName="firstName" label="שם פרטי" />
      <app-form-field [form]="form" controlName="lastName" label="שם משפחה" />
      <app-form-field [form]="form" controlName="governmentId" label="מספר זהות" />

      <div class="field">
        <label [class.required-mark]="isControlRequired('monthlyIncome')">
          הכנסה חודשית
        </label>

        <input
          type="text"
          formControlName="monthlyIncome"
          numberFormat
          [class.input-error]="isControlInvalid('monthlyIncome')"
        />

        <div class="error" *ngIf="isControlInvalid('monthlyIncome')">
          {{ getControlErrorMessage('monthlyIncome') }}
        </div>
      </div>
    </div>
  `,
})
export class Step3Form2Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step3Form2;
}