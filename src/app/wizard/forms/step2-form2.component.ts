/* import { Component, Input } from '@angular/core';
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
*/

import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step2Form2 } from '../models/step.types';
import { FormFieldComponent } from '../controls/form-field.component';
import { NgFor, NgIf } from '@angular/common';
import { WizardCardComponent } from '../components/wizard-card.component';

@Component({
  selector: 'app-step2-form2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    FormFieldComponent,
    NgFor,
    NgIf,
    WizardCardComponent,
  ],
  template: `
    <div class="card">
      <app-wizard-card>
        <div class="loan-account-form" [formGroup]="form">
          <h3 class="question-title">מה מועד החיוב החודשי שתרצה?</h3>

          <div class="payment-options">
            <button
              type="button"
              class="payment-option"
              *ngFor="let option of monthlyChargeOptions"
              [class.active]="
                form.controls.monthlyChargeDate.value === option.value
              "
              (click)="selectMonthlyChargeDate(option.value)"
            >
              {{ option.label }}
            </button>
          </div>

          <div class="beneficiary-field">
            <label
              class="question-title"
              [class.required-mark]="isControlRequired('loanBeneficiary')"
            >
              עבור מי ההלוואה?
            </label>

            <p-dropdown
              formControlName="loanBeneficiary"
              [options]="loanBeneficiaryOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="בחר"
              [class.input-error]="isControlInvalid('loanBeneficiary')"
            />

            <div class="error" *ngIf="isControlInvalid('loanBeneficiary')">
              {{ getControlErrorMessage('loanBeneficiary') }}
            </div>
          </div>

          <h3 class="section-title">פרטי חשבון בנק לחיוב</h3>

          <div class="bank-grid">
            <app-form-field [form]="form" controlName="bank" label="בנק" />

            <app-form-field
              [form]="form"
              controlName="branchNumber"
              label="מספר סניף"
            />

            <app-form-field
              [form]="form"
              controlName="accountNumber"
              label="מספר חשבון"
            />
          </div>
        </div>
      </app-wizard-card>
    </div>
  `,
})
export class Step2Form2Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step2Form2;

  monthlyChargeOptions = [
    { label: '2 לחודש', value: '2' },
    { label: '10 לחודש', value: '10' },
    { label: '15 לחודש', value: '15' },
    { label: '17 לחודש', value: '17' },
  ];

  loanBeneficiaryOptions = [
    { label: 'מגיש הבקשה', value: 'applicant' },
    { label: 'בן/בת זוג', value: 'spouse' },
    { label: 'אחר', value: 'other' },
  ];

  selectMonthlyChargeDate(value: string): void {
    this.form.controls.monthlyChargeDate.setValue(value);
    this.form.controls.monthlyChargeDate.markAsTouched();
    this.form.controls.monthlyChargeDate.updateValueAndValidity();
  }
}

// <div class="field">
//         <label [class.required-mark]="isControlRequired('monthlyChargeDate')">
//           מועד חיוב חודשי
//         </label>
//         <input
//           type="text"
//           placeholder="dd/mm/yyyy"
//           formControlName="monthlyChargeDate"
//           appDateMask
//           [class.input-error]="isControlInvalid('monthlyChargeDate')"
//         />
//         <div class="error" *ngIf="isControlInvalid('monthlyChargeDate')">
//           {{ getControlErrorMessage('monthlyChargeDate') }}
//         </div>
//       </div>
