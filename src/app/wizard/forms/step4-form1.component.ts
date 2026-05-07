import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step4Form1 } from '../models/step.types';
import { NumberFormatDirective } from '../services/number-format.directive';

@Component({
  selector: 'app-step4-form1',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, DropdownModule, NumberFormatDirective],
  template: `
    <div class="form-grid" [formGroup]="form">
      <div class="field">
        <label [class.required-mark]="isControlRequired('businessActivity')">
          תחום פעילות
        </label>
        <p-dropdown
          formControlName="businessActivity"
          [options]="businessActivityOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="בחר תחום פעילות"
          [class.input-error]="isControlInvalid('businessActivity')">
        </p-dropdown>
        <div class="error" *ngIf="isControlInvalid('businessActivity')">
          {{ getControlErrorMessage('businessActivity') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('fieldsOfOccupation')">
          תחום עיסוק
        </label>
        <p-dropdown
          formControlName="fieldsOfOccupation"
          [options]="occupationOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="בחר תחום עיסוק"
          [class.input-error]="isControlInvalid('fieldsOfOccupation')">
        </p-dropdown>
        <div class="error" *ngIf="isControlInvalid('fieldsOfOccupation')">
          {{ getControlErrorMessage('fieldsOfOccupation') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('employmentStatus')">
          מצב תעסוקתי
        </label>
        <p-dropdown
          formControlName="employmentStatus"
          [options]="employmentStatusOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="בחר מצב תעסוקתי"
          [class.input-error]="isControlInvalid('employmentStatus')">
        </p-dropdown>
        <div class="error" *ngIf="isControlInvalid('employmentStatus')">
          {{ getControlErrorMessage('employmentStatus') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('tenureValue')">
          ותק
        </label>
        <input
          type="text"
          formControlName="tenureValue"
          [class.input-error]="isControlInvalid('tenureValue')"
        />
        <div class="error" *ngIf="isControlInvalid('tenureValue')">
          {{ getControlErrorMessage('tenureValue') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('tenureUnit')">
          יחידת ותק
        </label>
        <p-dropdown
          formControlName="tenureUnit"
          [options]="tenureUnitOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="בחר יחידה"
          [class.input-error]="isControlInvalid('tenureUnit')">
        </p-dropdown>
        <div class="error" *ngIf="isControlInvalid('tenureUnit')">
          {{ getControlErrorMessage('tenureUnit') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('workplaceType')">
          סוג מקום עבודה
        </label>
        <p-dropdown
          formControlName="workplaceType"
          [options]="workplaceTypeOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="בחר סוג מקום עבודה"
          [class.input-error]="isControlInvalid('workplaceType')">
        </p-dropdown>
        <div class="error" *ngIf="isControlInvalid('workplaceType')">
          {{ getControlErrorMessage('workplaceType') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('education')">
          השכלה
        </label>
        <p-dropdown
          formControlName="education"
          [options]="educationOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="בחר השכלה"
          [class.input-error]="isControlInvalid('education')">
        </p-dropdown>
        <div class="error" *ngIf="isControlInvalid('education')">
          {{ getControlErrorMessage('education') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('salaryPaymentDay')">
          יום תשלום משכורת
        </label>
        <p-dropdown
          formControlName="salaryPaymentDay"
          [options]="salaryPaymentDayOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="בחר יום"
          [class.input-error]="isControlInvalid('salaryPaymentDay')">
        </p-dropdown>
        <div class="error" *ngIf="isControlInvalid('salaryPaymentDay')">
          {{ getControlErrorMessage('salaryPaymentDay') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('monthlyIncome')">
          הכנסה חודשית
        </label>
        <input
          type="text"
          numberFormat
          formControlName="monthlyIncome"
          [class.input-error]="isControlInvalid('monthlyIncome')"
        />
        <div class="error" *ngIf="isControlInvalid('monthlyIncome')">
          {{ getControlErrorMessage('monthlyIncome') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('additionalHouseholdIncome')">
          הכנסה נוספת במשק הבית
        </label>
        <input
          type="text"
          numberFormat
          formControlName="additionalHouseholdIncome"
          [class.input-error]="isControlInvalid('additionalHouseholdIncome')"
        />
        <div class="error" *ngIf="isControlInvalid('additionalHouseholdIncome')">
          {{ getControlErrorMessage('additionalHouseholdIncome') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('monthlyAlimonyExpense')">
          תשלומי מזונות חודשיים
        </label>
        <input type="text" formControlName="monthlyAlimonyExpense" />
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('monthlyRentExpense')">
          שכר דירה חודשי
        </label>
        <input
          type="text"
          numberFormat
          formControlName="monthlyRentExpense"
          [class.input-error]="isControlInvalid('monthlyRentExpense')"
        />
        <div class="error" *ngIf="isControlInvalid('monthlyRentExpense')">
          {{ getControlErrorMessage('monthlyRentExpense') }}
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('hasOwnedApartment')">
          האם בבעלותך דירה
        </label>
        <p-dropdown
          formControlName="hasOwnedApartment"
          [options]="yesNoOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="בחר"
          [class.input-error]="isControlInvalid('hasOwnedApartment')">
        </p-dropdown>
        <div class="error" *ngIf="isControlInvalid('hasOwnedApartment')">
          {{ getControlErrorMessage('hasOwnedApartment') }}
        </div>
      </div>
    </div>
  `,
})
export class Step4Form1Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step4Form1;

  businessActivityOptions = [
    { label: 'שכיר', value: 'employee' },
    { label: 'עצמאי', value: 'selfEmployed' },
    { label: 'בעל חברה', value: 'companyOwner' },
    { label: 'פנסיונר', value: 'pensioner' },
    { label: 'אחר', value: 'other' },
  ];

  occupationOptions = [
    { label: 'הייטק', value: 'highTech' },
    { label: 'פיננסים', value: 'finance' },
    { label: 'חינוך', value: 'education' },
    { label: 'בריאות', value: 'healthcare' },
    { label: 'שירותים', value: 'services' },
    { label: 'מסחר', value: 'commerce' },
    { label: 'אחר', value: 'other' },
  ];

  employmentStatusOptions = [
    { label: 'מועסק', value: 'employed' },
    { label: 'עצמאי', value: 'selfEmployed' },
    { label: 'לא מועסק', value: 'unemployed' },
    { label: 'סטודנט', value: 'student' },
    { label: 'פנסיונר', value: 'pensioner' },
  ];

  tenureUnitOptions = [
    { label: 'שנים', value: 'שנים' },
    { label: 'חודשים', value: 'חודשים' },
  ];

  workplaceTypeOptions = [
    { label: 'חברה פרטית', value: 'privateCompany' },
    { label: 'חברה ציבורית', value: 'publicCompany' },
    { label: 'מגזר ציבורי', value: 'publicSector' },
    { label: 'עסק עצמאי', value: 'selfBusiness' },
    { label: 'אחר', value: 'other' },
  ];

  educationOptions = [
    { label: 'תיכונית', value: 'highSchool' },
    { label: 'על-תיכונית', value: 'postSecondary' },
    { label: 'תואר ראשון', value: 'bachelor' },
    { label: 'תואר שני ומעלה', value: 'masterPlus' },
    { label: 'אחר', value: 'other' },
  ];

  salaryPaymentDayOptions = Array.from({ length: 31 }, (_, index) => {
    const day = index + 1;
    return {
      label: String(day),
      value: String(day),
    };
  });

  yesNoOptions = [
    { label: 'כן', value: 'yes' },
    { label: 'לא', value: 'no' },
  ];
}