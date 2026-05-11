import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { Step2Form1 } from '../models/step.types';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { WizardCardComponent } from '../components/wizard-card.component';

@Component({
  selector: 'app-step2-form1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    SliderModule,
    WizardCardComponent,
  ],
  template: `
    <div class="final-card">
      <app-wizard-card>
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
                inputmode="numeric"
                autocomplete="off"
                formControlName="loanAmount"
                (input)="onLoanAmountInput()"
              />
            </div>
          </div>

          <div class="payments-block">
            <label
              [class.required-mark]="isControlRequired('numberOfPayments')"
            >
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
      </app-wizard-card>
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

  /* onLoanAmountInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    const rawValue = input.value.replace(/\D/g, '');
    const formattedValue = rawValue
      ? Number(rawValue).toLocaleString('en-US')
      : '';

    this.form.controls.loanAmount.setValue(formattedValue, {
      emitEvent: true,
    });
  } */
  onLoanAmountInput(): void {
    const control = this.form.controls.loanAmount;

    const digitsOnly = control.value?.toString().replace(/\D/g, '') || '';

    if (!digitsOnly) {
      control.setValue('', { emitEvent: false });
      return;
    }

    const formattedValue = Number(digitsOnly).toLocaleString('en-US');

    control.setValue(formattedValue, { emitEvent: false });
  }

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
