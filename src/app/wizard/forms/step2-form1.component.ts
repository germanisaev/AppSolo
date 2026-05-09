/* import { Component, Input } from '@angular/core';
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
} */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { Step2Form1 } from '../models/step.types';
import { FormBaseComponent } from '../../shared/base/form-base.component';

@Component({
  selector: 'app-step2-form1',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, SliderModule],
  template: `
    <div class="final-card">
      <div class="loan-details-form" [formGroup]="form">
        <div class="amount-block">
          <label [class.required-mark]="isControlRequired('loanAmount')">
            סכום ההלוואה
          </label>

          <div class="amount-input-wrap">
            <span class="currency">₪</span>

            <input
              class="amount-input"
              type="text"
              formControlName="loanAmount"
              (input)="onLoanAmountInput($event)"
            />
          </div>
        </div>

        <div class="payments-block">
          <label [class.required-mark]="isControlRequired('numberOfPayments')">
            כמות תשלומים
          </label>

          <p-slider
            formControlName="numberOfPayments"
            [min]="2"
            [max]="20"
            [step]="1"
          />
          <!-- (onChange)="calculateMonthlyPayment()" -->

          <div class="slider-labels">
            <span>20</span>
            <span>{{ form.controls.numberOfPayments.value }}</span>
            <span>2</span>
          </div>
        </div>

        <div class="linkage-field">
          <label [class.required-mark]="isControlRequired('linkageType')">
            סוג הצמדה
          </label>

          <p-dropdown
            formControlName="linkageType"
            [options]="linkageTypeOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="בחר"
          />
        </div>

        <div class="monthly-payment-card">
          <span>החזר חודשי משוער:</span>
          <strong>{{ form.controls.monthlyPayment.value || '0' }} ₪</strong>
        </div>

        <div class="rate-info">
          <i class="pi pi-info-circle"></i>
          <span>ריבית משתנה על בסיס הפריים [%]</span>
        </div>
      </div>

      <div class="service-note">נתקלת בבעיה? מוקד השירות שלנו: 03-0000000</div>
    </div>
  `,
  styles: [
    `
      .slider-labels {
        direction: ltr;
      }
    `,
  ],
})
export class Step2Form1Component extends FormBaseComponent implements OnInit {
  @Input({ required: true }) override form!: Step2Form1;
  // @Output() titleChange = new EventEmitter<string>();

  linkageTypeOptions = [
    { label: 'ללא הצמדה', value: 'none' },
    { label: 'פריים', value: 'prime' },
    { label: 'צמוד למדד', value: 'indexLinked' },
  ];

  get paymentsValue(): number {
    const value = Number(this.form.controls.numberOfPayments.value);

    if (!Number.isFinite(value)) {
      return 2;
    }

    return Math.min(20, Math.max(2, value));
  }

  /* ngOnInit(): void {
    // this.titleChange.emit('');
    this.calculateMonthlyPayment();

    this.form.controls.loanAmount.valueChanges.subscribe(() => {
      this.calculateMonthlyPayment();
    });

    this.form.controls.numberOfPayments.valueChanges.subscribe(() => {
      this.calculateMonthlyPayment();
    });
  } */

  ngOnInit(): void {
    this.normalizePaymentsControl();

    this.calculateMonthlyPayment();

    this.form.controls.loanAmount.valueChanges.subscribe(() => {
      this.calculateMonthlyPayment();
    });

    this.form.controls.numberOfPayments.valueChanges.subscribe(() => {
      this.normalizePaymentsControl();
      this.calculateMonthlyPayment();
    });
  }

  private normalizePaymentsControl(): void {
    const value = Number(this.form.controls.numberOfPayments.value);

    if (!Number.isFinite(value) || value < 2 || value > 20) {
      this.form.controls.numberOfPayments.setValue(2, {
        emitEvent: false,
      });
    }
  }

  onLoanAmountInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    const rawValue = input.value.replace(/\D/g, '');
    const formattedValue = rawValue
      ? Number(rawValue).toLocaleString('en-US')
      : '';

    this.form.controls.loanAmount.setValue(formattedValue, {
      emitEvent: true,
    });
  }

  /* calculateMonthlyPayment(): void {
    const amount = Number(
      String(this.form.controls.loanAmount.value).replace(/,/g, ''),
    );

    const payments = Number(this.form.controls.numberOfPayments.value);

    if (!amount || !payments) {
      this.form.controls.monthlyPayment.setValue('');
      return;
    }

    const monthlyPayment = Math.round(amount / payments);

    this.form.controls.monthlyPayment.setValue(
      monthlyPayment.toLocaleString('en-US'),
      { emitEvent: false },
    );
  } */
  /* calculateMonthlyPayment(): void {
    const rawAmount = this.form.controls.loanAmount.value ?? '';
    const rawPayments = this.form.controls.numberOfPayments.value;

    const amount = Number(String(rawAmount).replace(/[^\d]/g, ''));
    const payments = Number(rawPayments);

    if (
      !Number.isFinite(amount) ||
      !Number.isFinite(payments) ||
      amount <= 0 ||
      payments <= 0
    ) {
      this.form.controls.monthlyPayment.setValue('', { emitEvent: false });
      return;
    }

    const monthlyPayment = Math.round(amount / payments);

    this.form.controls.monthlyPayment.setValue(
      monthlyPayment.toLocaleString('en-US'),
      { emitEvent: false },
    );
  } */
  calculateMonthlyPayment(): void {
    const amount = Number(
      String(this.form.controls.loanAmount.value ?? '').replace(/[^\d]/g, ''),
    );

    const payments = this.paymentsValue;

    if (!Number.isFinite(amount) || amount <= 0) {
      this.form.controls.monthlyPayment.setValue('', { emitEvent: false });
      return;
    }

    const monthlyPayment = Math.round(amount / payments);

    this.form.controls.monthlyPayment.setValue(
      monthlyPayment.toLocaleString('en-US'),
      { emitEvent: false },
    );
  }
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
