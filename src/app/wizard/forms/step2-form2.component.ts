/* import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step2Form2 } from '../models/step.types';
import { InputFieldComponent } from './form-field.component';
import { NgIf } from '@angular/common';
import { DateMaskDirective } from '../services/date-mask.directive';

@Component({
  selector: 'app-step2-form2',
  standalone: true,
  imports: [ReactiveFormsModule, InputFieldComponent],
  template: `
    <div class="form-grid" [formGroup]="form">
      <app-input-field
        [form]="form"
        controlName="monthlyChargeDate"
        label="מועד חיוב חודשי">
      </app-input-field>

      <app-input-field
        [form]="form"
        controlName="loanBeneficiary"
        label="עבור מי ההלוואה">
      </app-input-field>

      <app-input-field
        [form]="form"
        controlName="bank"
        label="בנק">
      </app-input-field>

      <app-input-field
        [form]="form"
        controlName="branchNumber"
        label="מספר סניף">
      </app-input-field>

      <app-input-field
        [form]="form"
        controlName="accountNumber"
        label="מספר חשבון">
      </app-input-field>
    </div>
  `,
})
export class Step2Form2Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step2Form2;
}
*/

import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step2Form2 } from '../../shared/models/step.types';
import { InputFieldComponent } from '../../shared/controls/input-field.component';
import { NgFor, NgIf } from '@angular/common';
import { WizardCardComponent } from '../components/wizard-card.component';
import { SelectFieldComponent } from '../../shared/controls/select-field.component';

@Component({
  selector: 'app-step2-form2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    InputFieldComponent,
    SelectFieldComponent,
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
            <app-select-field
              [form]="form"
              controlName="bank"
              label="בנק"
              [options]="bankOptions"
              placeholder="בחר"
            />

            <app-select-field
              [form]="form"
              controlName="branchNumber"
              label="מספר סניף"
              [options]="branchOptions"
              placeholder="בחר"
            />

            <app-input-field
              [form]="form"
              [maxLength]="7"
              controlName="accountNumber"
              label="מספר חשבון"
            />
          </div>
        </div>
      </app-wizard-card>
    </div>
  `,
})
export class Step2Form2Component extends FormBaseComponent implements OnInit {
  @Input({ required: true }) override form!: Step2Form2;

  branchOptions: { label: string; value: string }[] = [];

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

  bankOptions = [
    { label: 'בנק יהב', value: '4' },
    { label: 'בנק לאומי', value: '10' },
    { label: 'בנק דיסקונט', value: '11' },
    { label: 'בנק הפועלים', value: '12' },
    { label: 'בנק איגוד', value: '13' },
    { label: 'בנק אוצר החייל', value: '14' },
    { label: 'בנק מרכנתיל דיסקונט', value: '17' },
    { label: 'וואן זירו', value: '18' },
    { label: 'בנק מזרחי טפחות', value: '20' },
    { label: 'הבנק הבינלאומי', value: '31' },
    { label: 'בנק מסד', value: '46' },
    { label: 'בנק ירושלים', value: '54' },
  ];

  branchesByBank: Record<string, { label: string; value: string }[]> = {
    '4': [
      { label: '001 ירושלים', value: '001' },
      { label: '183 תל אביב', value: '183' },
      { label: '285 חיפה', value: '285' },
      { label: '402 באר שבע', value: '402' },
      { label: '501 נתניה', value: '501' },
    ],

    '10': [
      { label: '800 תל אביב ראשי', value: '800' },
      { label: '811 ירושלים', value: '811' },
      { label: '841 חיפה', value: '841' },
      { label: '867 נתניה', value: '867' },
      { label: '941 ראשון לציון', value: '941' },
      { label: '905 באר שבע', value: '905' },
      { label: '968 אשדוד', value: '968' },
    ],

    '11': [
      { label: '001 תל אביב', value: '001' },
      { label: '068 רמת גן', value: '068' },
      { label: '090 ירושלים', value: '090' },
      { label: '150 חיפה', value: '150' },
      { label: '178 נתניה', value: '178' },
      { label: '210 אשקלון', value: '210' },
    ],

    '12': [
      { label: '600 תל אביב ראשי', value: '600' },
      { label: '610 ירושלים', value: '610' },
      { label: '620 חיפה', value: '620' },
      { label: '635 פתח תקווה', value: '635' },
      { label: '678 נתניה', value: '678' },
      { label: '700 ראשון לציון', value: '700' },
      { label: '778 אשדוד', value: '778' },
    ],

    '13': [
      { label: '101 תל אביב', value: '101' },
      { label: '120 ירושלים', value: '120' },
      { label: '130 חיפה', value: '130' },
    ],

    '14': [
      { label: '301 תל אביב', value: '301' },
      { label: '321 ירושלים', value: '321' },
      { label: '345 באר שבע', value: '345' },
    ],

    '17': [
      { label: '601 תל אביב', value: '601' },
      { label: '632 ירושלים', value: '632' },
      { label: '645 בני ברק', value: '645' },
      { label: '660 אשדוד', value: '660' },
    ],

    '18': [
      { label: '001 תל אביב', value: '001' },
      { label: '002 דיגיטל', value: '002' },
    ],

    '20': [
      { label: '400 תל אביב', value: '400' },
      { label: '401 ירושלים', value: '401' },
      { label: '420 חיפה', value: '420' },
      { label: '440 נתניה', value: '440' },
      { label: '450 אשדוד', value: '450' },
      { label: '460 ראשון לציון', value: '460' },
    ],

    '31': [
      { label: '001 תל אביב', value: '001' },
      { label: '012 ירושלים', value: '012' },
      { label: '028 חיפה', value: '028' },
      { label: '045 נתניה', value: '045' },
    ],

    '46': [
      { label: '154 תל אביב', value: '154' },
      { label: '178 ירושלים', value: '178' },
      { label: '201 חיפה', value: '201' },
    ],

    '54': [
      { label: '001 ירושלים', value: '001' },
      { label: '002 תל אביב', value: '002' },
      { label: '003 חיפה', value: '003' },
      { label: '004 באר שבע', value: '004' },
    ],
  };

  ngOnInit(): void {
    const bankControl = this.form.controls.bank;
    const branchControl = this.form.controls.branchNumber;

    this.updateBranchOptions(bankControl.value);

    bankControl.valueChanges.subscribe((bankCode) => {
      branchControl.setValue('', { emitEvent: false });
      this.updateBranchOptions(bankCode);
    });
  }

  private updateBranchOptions(bankCode: string): void {
    const branchControl = this.form.controls.branchNumber;

    this.branchOptions = this.branchesByBank[bankCode] ?? [];

    if (this.branchOptions.length > 0) {
      branchControl.enable({ emitEvent: false });
    } else {
      branchControl.disable({ emitEvent: false });
    }

    branchControl.updateValueAndValidity({ emitEvent: false });
  }

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
