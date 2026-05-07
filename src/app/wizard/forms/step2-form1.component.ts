import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step2Form1 } from '../models/step.types';
import { FormFieldComponent } from './form-field.component';
import { NgIf } from '@angular/common';
import { NumberFormatDirective } from '../services/number-format.directive';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-step2-form1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    DropdownModule,
    NgIf,
    NumberFormatDirective,
  ],
  template: `
    <div class="form-grid" [formGroup]="form">
      <div class="field">
        <label [class.required-mark]="isControlRequired('loanAmount')">
          סכום הלווה
        </label>

        <input
          type="text"
          formControlName="loanAmount"
          numberFormat
          [class.input-error]="isControlInvalid('loanAmount')"
        />

        <div class="error" *ngIf="isControlInvalid('loanAmount')">
          {{ getControlErrorMessage('loanAmount') }}
        </div>
      </div>

      <app-form-field
        [form]="form"
        controlName="numberOfPayments"
        label="כמות התשלומים"
      >
      </app-form-field>

      <!-- <app-form-field [form]="form" controlName="linkageType" label="סוג הצמדה">
      </app-form-field> -->

      <div class="field">
        <label [class.required-mark]="isControlRequired('linkageType')">
           סוג הצמדה
        </label>
        <p-dropdown
          formControlName="linkageType"
          [options]="linkageTypeOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="בחר"
          [class.input-error]="isControlInvalid('linkageType')"
        />
        <div class="error" *ngIf="isControlInvalid('linkageType')">
          {{ getControlErrorMessage('linkageType') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('monthlyPayment')">
          החזר חודשי
        </label>

        <input
          type="text"
          formControlName="monthlyPayment"
          numberFormat
          [class.input-error]="isControlInvalid('monthlyPayment')"
        />

        <div class="error" *ngIf="isControlInvalid('monthlyPayment')">
          {{ getControlErrorMessage('monthlyPayment') }}
        </div>
      </div>
    </div>
  `,
})
export class Step2Form1Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step2Form1;

  linkageTypeOptions = [
    { label: 'ללא הצמדה', value: 'none' },
    { label: 'צמוד למדד', value: 'indexLinked' },
    { label: 'צמוד לפריים', value: 'primeLinked' },
  ];
}























/* import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { NgIf } from '@angular/common';
import { Step2Form1 } from '../models/step.types';

@Component({
  selector: 'app-step2-form1',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="form-grid" [formGroup]="form">
      <div class="field">
        <label [class.required-mark]="isControlRequired('loanAmount')">
          סכום הלווה</label
        >
        <input type="text" formControlName="loanAmount" />
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('numberOfPayments')">
          כמות תשלומים</label
        >
        <input type="text" formControlName="numberOfPayments" />
        <div class="error" *ngIf="isControlInvalid('numberOfPayments')">
          {{ getControlErrorMessage('numberOfPayments') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('linkageType')">
          סוג הצמדה</label
        >
        <input type="text" formControlName="linkageType" />
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('monthlyPayment')">
          החזר חודשי</label
        >
        <input type="text" formControlName="monthlyPayment" />
      </div>
    </div>
  `,
})
export class Step2Form1Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step2Form1;
}
 */
/* 
loanAmount: [''],
                numberOfPayments: ['', Validators.required],
                linkageType: [{ value: '', disabled: true }],
                monthlyPayment: [{ value: '', disabled: true }],
*/
