import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step2Form3 } from '../models/step.types';
import { DateMaskDirective } from '../services/date-mask.directive';

@Component({
  selector: 'app-step2-form3',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, DropdownModule, DateMaskDirective],
  template: `
    <div class="form-grid" [formGroup]="form">
      <div class="field">
        <label [class.required-mark]="isControlRequired('idIssueDate')">
          תאריך הנפקת תעודת זהות
        </label>
        <input
          type="text"
          placeholder="dd/mm/yyyy"
          formControlName="idIssueDate"
          appDateMask
          [class.input-error]="isControlInvalid('idIssueDate')"
        />
        <div class="error" *ngIf="isControlInvalid('idIssueDate')">
          {{ getControlErrorMessage('idIssueDate') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('idExpiryDate')">
          תאריך תוקף תעודת זהות
        </label>
        <input
          type="text"
          placeholder="dd/mm/yyyy"
          formControlName="idExpiryDate"
          appDateMask
          [class.input-error]="isControlInvalid('idExpiryDate')"
        />
        <div class="error" *ngIf="isControlInvalid('idExpiryDate')">
          {{ getControlErrorMessage('idExpiryDate') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('biometricId')">
          תעודה ביומטרית
        </label>
        <p-dropdown
          formControlName="biometricId"
          [options]="biometricIdOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="בחר"
          [class.input-error]="isControlInvalid('biometricId')"
        />
        <div class="error" *ngIf="isControlInvalid('biometricId')">
          {{ getControlErrorMessage('biometricId') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('birthDate')">
          תאריך לידה
        </label>
        <input
          type="text"
          placeholder="dd/mm/yyyy"
          formControlName="birthDate"
          appDateMask
          [class.input-error]="isControlInvalid('birthDate')"
        />
        <div class="error" *ngIf="isControlInvalid('birthDate')">
          {{ getControlErrorMessage('birthDate') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('birthCountry')">
          ארץ לידה
        </label>
        <p-dropdown
          formControlName="birthCountry"
          [options]="birthCountryOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="בחר ארץ לידה"
          [filter]="true"
          filterBy="label"
          [class.input-error]="isControlInvalid('birthCountry')"
        />
        <div class="error" *ngIf="isControlInvalid('birthCountry')">
          {{ getControlErrorMessage('birthCountry') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('gender')"> מין </label>
        <p-dropdown
          formControlName="gender"
          [options]="genderOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="בחר מין"
          [class.input-error]="isControlInvalid('gender')"
        />
        <div class="error" *ngIf="isControlInvalid('gender')">
          {{ getControlErrorMessage('gender') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('email')">
          דואר אלקטרוני
        </label>
        <input
          type="email"
          formControlName="email"
          [class.input-error]="isControlInvalid('email')"
        />
        <div class="error" *ngIf="isControlInvalid('email')">
          {{ getControlErrorMessage('email') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('familyStatus')">
          מצב משפחתי
        </label>
        <p-dropdown
          formControlName="familyStatus"
          [options]="familyStatusOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="בחר מצב משפחתי"
          [class.input-error]="isControlInvalid('familyStatus')"
        />
        <div class="error" *ngIf="isControlInvalid('familyStatus')">
          {{ getControlErrorMessage('familyStatus') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('childreNumUnder18')">
          מספר ילדים מתחת לגיל 18
        </label>
        <input
          type="text"
          formControlName="childreNumUnder18"
          [class.input-error]="isControlInvalid('childreNumUnder18')"
        />
        <div class="error" *ngIf="isControlInvalid('childreNumUnder18')">
          {{ getControlErrorMessage('childreNumUnder18') }}
        </div>
      </div>

      <div class="field" formGroupName="creditReportConsentExpiryDate">
        <label class="checkbox-row" [class.required-mark]="isNestedControlRequired('creditReportConsentExpiryDate', 'checked')">
          <input type="checkbox" formControlName="checked" />
          אני מאשר קבלת דוח אשראי
        </label>

        <div class="error" *ngIf="isNestedControlInvalid('creditReportConsentExpiryDate', 'checked')">
          {{ getNestedControlErrorMessage('creditReportConsentExpiryDate', 'checked') }}
        </div>
      </div>
    </div>
  `,
})
export class Step2Form3Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step2Form3;

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
}
