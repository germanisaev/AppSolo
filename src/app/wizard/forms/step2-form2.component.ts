import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step2Form2 } from '../models/step.types';
import { FormFieldComponent } from './form-field.component';
import { NgIf } from '@angular/common';
import { DateMaskDirective } from '../services/date-mask.directive';

@Component({
  selector: 'app-step2-form2',
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldComponent],
  template: `
    <div class="form-grid" [formGroup]="form">
      <app-form-field
        [form]="form"
        controlName="monthlyChargeDate"
        label="מועד חיוב חודשי">
      </app-form-field>

      <!-- <div class="field">
        <label [class.required-mark]="isControlRequired('monthlyChargeDate')">
          מועד חיוב חודשי
        </label>
        <input
          type="text"
          placeholder="dd/mm/yyyy"
          formControlName="monthlyChargeDate"
          appDateMask
          [class.input-error]="isControlInvalid('monthlyChargeDate')"
        />
        <div class="error" *ngIf="isControlInvalid('monthlyChargeDate')">
          {{ getControlErrorMessage('monthlyChargeDate') }}
        </div>
      </div> -->

      <app-form-field
        [form]="form"
        controlName="loanBeneficiary"
        label="עבור מי ההלוואה">
      </app-form-field>

      <app-form-field
        [form]="form"
        controlName="bank"
        label="בנק">
      </app-form-field>

      <app-form-field
        [form]="form"
        controlName="branchNumber"
        label="מספר סניף">
      </app-form-field>

      <app-form-field
        [form]="form"
        controlName="accountNumber"
        label="מספר חשבון">
      </app-form-field>
    </div>
  `,
})
export class Step2Form2Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step2Form2;
}