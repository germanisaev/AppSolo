import { Component, Input, OnInit } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step3Form1 } from '../models/step.types';
import { DateFieldComponent } from '../controls/date-field.component';
import { SelectFieldComponent } from '../controls/select-field.component';
import { FormFieldComponent } from '../controls/form-field.component';
import { SwitchFieldComponent } from '../controls/switch-field.component';
import { dateValidator } from '../models/validators';
import { WizardCardComponent } from '../components/wizard-card.component';
import { LoanBlockedPopupComponent } from '../components/loan-blocked-popup.component';

@Component({
  selector: 'app-step3-form1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    DateFieldComponent,
    SelectFieldComponent,
    FormFieldComponent,
    SwitchFieldComponent,
    NgIf,
    WizardCardComponent,
    LoanBlockedPopupComponent,
  ],
  template: `
    <!-- <pre>{{ form.getRawValue() | json }}</pre> -->
    <div class="additional-details-page" [formGroup]="form">
      <div class="additional-card card">
        <app-wizard-card>
          <h3 class="card-title">פרטים נוספים</h3>

          <div class="additional-grid">
            <app-date-field
              [form]="form"
              controlName="idIssueDate"
              label="תאריך הנפקת ת״ז"
              (fieldBlur)="onLimitedDateBlur('idIssueDate')"
            ></app-date-field>

            <app-date-field
              [form]="form"
              controlName="idExpiryDate"
              label="תוקף ת״ז"
            ></app-date-field>

            <app-switch-field
              [form]="form"
              controlName="biometricId"
              label="האם תעודת הזהות ביומטרית?"
              [yesValue]="true"
              [noValue]="false"
              [showDetailsOnValue]="true"
            />

            <app-date-field
              [form]="form"
              controlName="birthDate"
              label="תאריך לידה"
              (fieldBlur)="onLimitedDateBlur('birthDate')"
            ></app-date-field>

            <app-select-field
              [form]="form"
              controlName="birthCountry"
              label="ארץ לידה"
              [options]="birthCountryOptions"
              [filter]="true"
            ></app-select-field>

            <app-select-field
              [form]="form"
              controlName="gender"
              label="מין"
              [options]="genderOptions"
              [filter]="false"
            ></app-select-field>

            <app-form-field
              [form]="form"
              controlName="email"
              label="כתובת דוא״ל"
            >
            </app-form-field>

            <app-select-field
              [form]="form"
              controlName="familyStatus"
              label="מצב משפחתי"
              [options]="familyStatusOptions"
              [filter]="false"
            ></app-select-field>

            <app-form-field
              [form]="form"
              controlName="childreNumUnder18"
              label="18 מספר ילדים עד גיל"
            >
            </app-form-field>
          </div>
        </app-wizard-card>
      </div>

      <div
        class="credit-card card"
        formGroupName="creditReportConsentExpiryDate"
      >
        <app-wizard-card>
          <h3 class="card-title text-center">תוקף הסכמה לקבלת דוח אשראי</h3>

          <p class="credit-text">
            שים לב, ההסכמה שלא נמצאה במאגר תהיה בתוקף 60 ימים מיום הגשת הבקשה.
            עבור הסכמה שיצאה לפועל, התוקף יהיה עד סוף תקופת ההלוואה.
          </p>

          <div class="consent-switch">
            <button
              type="button"
              class="consent-switch-btn"
              [class.active]="creditConsentChecked === true"
              (click)="setCreditConsent(true)"
            >
              אני מאשר את תוקף ההסכמה
            </button>

            <button
              type="button"
              class="consent-switch-btn"
              [class.active]="creditConsentChecked === false"
              (click)="setCreditConsent(false)"
            >
              שינוי תוקף ההסכמה
            </button>
          </div>

          <ng-container
            *ngIf="
              form.controls.creditReportConsentExpiryDate.controls.checked
                .value === false
            "
          >
            <div class="credit-dates">
              <app-date-field
                [form]="form.controls.creditReportConsentExpiryDate"
                controlName="executedTransactionConsentExpiryDate"
                label="תוקף ההסכמה לעסקה שיצאה לפועל"
              ></app-date-field>

              <app-date-field
                [form]="form.controls.creditReportConsentExpiryDate"
                controlName="nonExecutedTransactionConsentExpiryDate"
                label="תוקף ההסכמה לעסקה שלא יצאה לפועל"
              ></app-date-field>
            </div>
          </ng-container>
        </app-wizard-card>
      </div>
    </div>

    <app-loan-blocked-popup
      *ngIf="showLoanBlockedPopup"
      (close)="showLoanBlockedPopup = false"
    ></app-loan-blocked-popup>
  `,
  styles: [
    `
    `,
  ],
})
export class Step3Form1Component extends FormBaseComponent implements OnInit {
  @Input({ required: true }) override form!: Step3Form1;

  showLoanBlockedPopup = false;

  biometricIdOptions = [
    { label: 'כן', value: 'yes' },
    { label: 'לא', value: 'no' },
  ];

  genderOptions = [
    { label: 'זכר', value: 'male' },
    { label: 'נקבה', value: 'female' },
  ];

  familyStatusOptions = [
    { label: 'רווק/ה', value: 'single' },
    { label: 'נשוי/אה', value: 'married' },
    { label: 'גרוש/ה', value: 'divorced' },
    { label: 'אלמן/ה', value: 'widowed' },
  ];

  birthCountryOptions = [
    { label: 'ישראל', value: 'IL' },
    { label: 'ארצות הברית', value: 'US' },
    { label: 'רוסיה', value: 'RU' },
    { label: 'אוקראינה', value: 'UA' },
    { label: 'צרפת', value: 'FR' },
    { label: 'בריטניה', value: 'GB' },
    { label: 'אחר', value: 'OTHER' },
  ];

  // ------------------- getters ----------------------
  get creditConsentChecked(): boolean {
    const value =
      this.form.controls.creditReportConsentExpiryDate.controls.checked.value;

    return value === true;
  }
  // -------------------------------------------------
  ngOnInit(): void {
    const checkedControl =
      this.form.controls.creditReportConsentExpiryDate.controls.checked;

    if (typeof checkedControl.value !== 'boolean') {
      checkedControl.setValue(false, { emitEvent: false });
    }

    this.applyCreditConsentValidators(checkedControl.value);
  }

  onLimitedDateBlur(controlName: 'idIssueDate' | 'birthDate'): void {
    const control = this.form.controls[controlName];

    control.markAsTouched();
    control.updateValueAndValidity();

    if (!control.invalid) {
      this.dateAttempts[controlName] = 0;
      return;
    }

    this.dateAttempts[controlName]++;

    const limit = this.dateAttemptLimits[controlName];

    if (this.dateAttempts[controlName] >= limit) {
      this.showLoanBlockedPopup = true;
      control.disable({ emitEvent: false });
    }
  }

  setBiometricId(value: boolean): void {
    this.form.controls.biometricId.setValue(value);
    this.form.controls.biometricId.markAsTouched();
    this.form.controls.biometricId.updateValueAndValidity();
  }

  setCreditConsent(value: boolean): void {
    const checked =
      this.form.controls.creditReportConsentExpiryDate.controls.checked;

    checked.setValue(value);
    checked.markAsTouched();

    this.applyCreditConsentValidators(value);
  }

  dateAttempts: Record<string, number> = {
    idIssueDate: 0,
    birthDate: 0,
  };

  // ----------------------- helper ----------------
  private readonly dateAttemptLimits: Record<string, number> = {
    idIssueDate: 3,
    birthDate: 2,
  };

  private applyCreditConsentValidators(value: boolean): void {
    const group = this.form.controls.creditReportConsentExpiryDate;

    const executed = group.controls.executedTransactionConsentExpiryDate;
    const nonExecuted = group.controls.nonExecutedTransactionConsentExpiryDate;

    if (value === false) {
      executed.setValidators([Validators.required, dateValidator]);
      nonExecuted.setValidators([Validators.required, dateValidator]);
    } else {
      executed.clearValidators();
      nonExecuted.clearValidators();

      executed.setValue('', { emitEvent: false });
      nonExecuted.setValue('', { emitEvent: false });
    }

    executed.updateValueAndValidity({ emitEvent: false });
    nonExecuted.updateValueAndValidity({ emitEvent: false });

    group.updateValueAndValidity({ emitEvent: false });
    this.form.updateValueAndValidity({ emitEvent: false });
  }
}
