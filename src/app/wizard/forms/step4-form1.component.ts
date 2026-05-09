import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step4Form1 } from '../models/step.types';
import { NumberFormatDirective } from '../services/number-format.directive';
import { SwitchFieldComponent } from '../controls/switch-field.component';
import { SelectFieldComponent } from '../controls/select-field.component';
import { NumberFieldComponent } from '../controls/number-field.component';
import { FormFieldComponent } from '../controls/form-field.component';
import { WizardCardComponent } from '../components/wizard-card.component';

@Component({
  selector: 'app-step4-form1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    DropdownModule,
    NumberFormatDirective,
    SwitchFieldComponent,
    SelectFieldComponent,
    NumberFieldComponent,
    FormFieldComponent,
    WizardCardComponent,
  ],
  template: `
    <div class="final-card">
      <app-wizard-card>
        <h3 class="card-title">פרטי הכנסות</h3>

        <div class="form-grid two-columns" [formGroup]="form">
          <app-select-field
            [form]="form"
            controlName="businessActivity"
            label="תחום פעילות"
            [options]="businessActivityOptions"
            [filter]="false"
          ></app-select-field>

          <app-select-field
            [form]="form"
            controlName="fieldsOfOccupation"
            label="תחום עסקים"
            [options]="occupationOptions"
            [filter]="false"
          ></app-select-field>

          <app-select-field
            [form]="form"
            controlName="employmentStatus"
            label="מצב תעסוקתי"
            [options]="employmentStatusOptions"
            [filter]="false"
          ></app-select-field>

          <app-form-field [form]="form" controlName="tenureValue" label="ותק">
          </app-form-field>

          <app-select-field
            [form]="form"
            controlName="tenureUnit"
            label="יחידת ותק"
            [options]="tenureUnitOptions"
            [filter]="false"
          ></app-select-field>

          <app-select-field
            [form]="form"
            controlName="workplaceType"
            label="סוג מקום עבודה"
            [options]="workplaceTypeOptions"
            [filter]="false"
          ></app-select-field>

          <app-select-field
            [form]="form"
            controlName="education"
            label="השכלה"
            [options]="educationOptions"
            [filter]="false"
          ></app-select-field>

          <app-select-field
            [form]="form"
            controlName="salaryPaymentDay"
            label="יום תשלום משכורת"
            [options]="salaryPaymentDayOptions"
            [filter]="false"
          ></app-select-field>

          <app-number-field
            [form]="form"
            controlName="monthlyIncome"
            label="הכנסה חודשית"
          />

          <div class="field">
            <label
              [class.required-mark]="
                isControlRequired('additionalHouseholdIncome')
              "
            >
              הכנסה נוספת במשק הבית
            </label>
            <input
              type="text"
              numberFormat
              formControlName="additionalHouseholdIncome"
              [class.input-error]="
                isControlInvalid('additionalHouseholdIncome')
              "
            />
            <div
              class="error"
              *ngIf="isControlInvalid('additionalHouseholdIncome')"
            >
              {{ getControlErrorMessage('additionalHouseholdIncome') }}
            </div>
          </div>

          <app-form-field
            [form]="form"
            controlName="monthlyAlimonyExpense"
            label="תשלומי מזונות חודשיים"
          />

          <app-number-field
            [form]="form"
            controlName="monthlyRentExpense"
            label="שכר דירה חודשי"
          />

          <app-switch-field
            [form]="form"
            controlName="hasOwnedApartment"
            label="האם בבעלותך דירה"
          />
        </div>
      </app-wizard-card>
    </div>
  `,
  styles: [
    `
    `,
  ],
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

  setHasOwnedApartment(value: 'yes' | 'no'): void {
    this.form.controls.hasOwnedApartment.setValue(value);
    this.form.controls.hasOwnedApartment.markAsTouched();
    this.form.controls.hasOwnedApartment.updateValueAndValidity();
  }
}
