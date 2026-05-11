import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step4Form1 } from '../models/step.types';
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
    DropdownModule,
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

        <div class="form-grid three-columns" [formGroup]="form">
          <app-select-field
            [form]="form"
            controlName="businessActivity"
            label="תחום עיסוק"
            [options]="businessActivityOptions"
            [filter]="false"
          ></app-select-field>

          <app-select-field
            [form]="form"
            controlName="employmentStatus"
            label="סטטוס תעסוקה"
            [options]="employmentStatusOptions"
            [filter]="false"
          />
          <br />

          <app-form-field
            [form]="form"
            controlName="tenureValue"
            label="וותק במקום העבודה הנוכחי (בשנים)"
          >
          </app-form-field>

          <app-form-field
            [form]="form"
            controlName="workplaceType"
            label="מה מקום העבודה שלך?"
          />

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
            label="יום קבלת משכרות"
            [options]="salaryPaymentDayOptions"
            [filter]="false"
          ></app-select-field>

          <app-number-field
            [form]="form"
            controlName="monthlyIncome"
            label="גובה שכר חודשי נטו (ב-ש״ח)"
          />

          <app-number-field
            [form]="form"
            controlName="additionalHouseholdIncome"
            label="בכנסה נוספת למשק בית"
          />
        </div>
        <br />
        <h3 class="card-title">פרטי הוצאות</h3>
        <div class="form-grid three-columns" [formGroup]="form">
          <app-number-field
            [form]="form"
            controlName="monthlyAlimonyExpense"
            label="סך הוצאה חודשית של תשלום מזונות"
          />

          <app-number-field
            [form]="form"
            controlName="monthlyRentExpense"
            label="סך הוצאה חודשית שכר דירה"
          />
        </div>
        <br />
        <h3 class="card-title">פרטים נוספים</h3>
        <div class="form-grid three-columns" [formGroup]="form">
          <app-switch-field
            [form]="form"
            controlName="hasOwnedApartment"
            label="האם קיימת דירה בבעלותך?"
          />
        </div>
      </app-wizard-card>
    </div>
  `,
  styles: [``],
})
export class Step4Form1Component extends FormBaseComponent implements OnInit {
  @Input({ required: true }) override form!: Step4Form1;

  private readonly employmentStatusesWithoutWork = [
    'unemployed',
    'homemaker',
    'notWorking',
  ];

  employmentStatusOptions = [
    { label: 'שכיר', value: 'employee' },
    { label: 'עצמאי', value: 'selfEmployed' },
    { label: 'מובטל', value: 'unemployed' },
    { label: 'עקרת בית', value: 'homemaker' },
    { label: 'לא עובד', value: 'notWorking' },
  ];

  businessActivityOptions = [
    { label: 'הייטק', value: 'highTech' },
    { label: 'פיננסים', value: 'finance' },
    { label: 'חינוך', value: 'education' },
    { label: 'בריאות', value: 'healthcare' },
    { label: 'שירותים', value: 'services' },
    { label: 'מסחר', value: 'commerce' },
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

  ngOnInit(): void {
    this.applyEmploymentStatusValidators();

    this.form.controls.employmentStatus.valueChanges.subscribe(() => {
      this.applyEmploymentStatusValidators();
    });
  }

  // -------------------------- getters -----------------------
  private applyEmploymentStatusValidators(): void {
    const employmentStatus = this.form.controls.employmentStatus.value;

    const shouldRequireWorkFields =
      !!employmentStatus &&
      !this.employmentStatusesWithoutWork.includes(employmentStatus);

    const workControls = [
      this.form.controls.tenureValue,
      this.form.controls.workplaceType,
      this.form.controls.salaryPaymentDay,
      this.form.controls.monthlyIncome,
    ];

    workControls.forEach((control) => {
      if (shouldRequireWorkFields) {
        control.addValidators(Validators.required);
      } else {
        control.removeValidators(Validators.required);

        if (this.employmentStatusesWithoutWork.includes(employmentStatus)) {
          control.setValue('', { emitEvent: false });
        }

        control.markAsUntouched();
        control.markAsPristine();
      }

      control.updateValueAndValidity({ emitEvent: false });
    });

    this.form.updateValueAndValidity({ emitEvent: false });
  }
}

/* employmentStatusOptions = [
    { label: 'מועסק', value: 'employed' },
    { label: 'עצמאי', value: 'selfEmployed' },
    { label: 'לא מועסק', value: 'unemployed' },
    { label: 'סטודנט', value: 'student' },
    { label: 'פנסיונר', value: 'pensioner' },
  ]; */

/* tenureUnitOptions = [
    { label: 'שנים', value: 'שנים' },
    { label: 'חודשים', value: 'חודשים' },
  ]; */

/* workplaceTypeOptions = [
    { label: 'חברה פרטית', value: 'privateCompany' },
    { label: 'חברה ציבורית', value: 'publicCompany' },
    { label: 'מגזר ציבורי', value: 'publicSector' },
    { label: 'עסק עצמאי', value: 'selfBusiness' },
    { label: 'אחר', value: 'other' },
  ]; */

/* occupationOptions = [
    { label: 'שכיר', value: 'employee' },
    { label: 'עצמאי', value: 'selfEmployed' },
    { label: 'בעל חברה', value: 'companyOwner' },
    { label: 'פנסיונר', value: 'pensioner' },
    { label: 'מובטל', value: 'unemployed' },
    { label: 'הכרת בית', value: 'homemaker' },
    { label: 'לא עובד', value: 'notWorking' },
  ]; */
