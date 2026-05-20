import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step4Form2 } from '../../shared/models/step.types';
import { SelectFieldComponent } from '../../shared/controls/select-field.component';
import { SwitchFieldComponent } from '../../shared/controls/switch-field.component';
import { RadioGroupFieldComponent } from '../../shared/controls/radio-group-field.component';
import { WizardCardComponent } from '../components/wizard-card.component';

@Component({
  selector: 'app-step4-form2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    SelectFieldComponent,
    SwitchFieldComponent,
    RadioGroupFieldComponent,
    WizardCardComponent,
  ],
  template: `
    <div class="declarations-layout" [formGroup]="form">
      <section class="declaration-card">
        <app-wizard-card>
          <h3 class="card-title">הצהרות אישיות</h3>

          <app-switch-field
            [form]="form.controls.publicPersonnel"
            controlName="checked"
            label="אני משמש בתפקיד ציבורי"
            detailsControlName="value"
            detailsLabel="תיאור התפקיד"
            [detailsType]="'input'"
            [isDetails]="true"
          >
          </app-switch-field>

          <app-switch-field
            [form]="form.controls.familyMemberPublicPersonnel"
            controlName="checked"
            label="בן משפחה משמש בתפקיד ציבורי"
            detailsControlName="value"
            detailsLabel="תיאור תפקיד בן משפחה"
            [detailsType]="'input'"
            [isDetails]="true"
          >
          </app-switch-field>

          <app-switch-field
            [form]="form.controls.additionalBeneficiaries"
            controlName="checked"
            label="אין עוד נהנים בחשבון מלבדי"
            sublabel="לא ניתן להמשיך בתהליך במידה ויש נהנים נוספים בחשבון"
            detailsControlName="value"
            detailsLabel="תיאור נהנים בחשבון"
            yesLabel="יש"
            noLabel="אין"
            [isDetails]="false"
          >
          </app-switch-field>

          <app-switch-field
            [form]="form.controls.nonIsraeliTaxResidency"
            controlName="checked"
            label="יש לי תושבות מס שאינה ישראל"
            detailsLabel="באיזו מדינה/ות תושבות המס?"
            detailsType="checkboxes"
            [isDetails]="true"
            [yesValue]="true"
            [noValue]="false"
            [showDetailsOnValue]="true"
            [checkboxOptions]="taxResidencyOptions"
          >
          </app-switch-field>

          <div class="declarations-content">
            <app-select-field
              [form]="form"
              controlName="businessArea"
              label="האם אתה עוסק בתחומים הבאים?"
              [options]="businessAreaOptions"
              [filter]="true"
              placeholder=""
            >
            </app-select-field>
          </div>
        </app-wizard-card>
      </section>

      <section class="declaration-card">
        <app-wizard-card>
          <h3 class="card-title">קבלת הודעות מהבנק</h3>

          <label class="checkbox-row">
            <input type="checkbox" formControlName="marketingConsent" />
            אישור לקבלת מידע שיווקי במסרון / דואר אלקטרוני
          </label>

          <label class="checkbox-row">
            <input type="checkbox" formControlName="bankNotifications" />
            אני רוצה לקבל הודעות מהבנק
          </label>

          <div class="declarations-content">
            <app-radio-group-field
              [form]="form"
              controlName="notificationMethod"
              [options]="notificationMethodOptions"
            >
            </app-radio-group-field>
          </div>
        </app-wizard-card>
      </section>
    </div>

    <!-- <app-loan-blocked-popup
      *ngIf="showLoanBlockedPopup"
      (close)="showLoanBlockedPopup = false"
    ></app-loan-blocked-popup> -->
  `,
  styles: [``],
})
export class Step4Form2Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step4Form2;

  showLoanBlockedPopup = false;

  taxResidencyOptions = [
    { controlName: 'isUsCitizen', label: 'ארה״ב' },
    {
      controlName: 'isOtherCountryTaxResident',
      label: 'מדינה שאינה ישראל ואינה ארה״ב',
    },
  ];

  notificationMethodOptions = [
    { label: 'בתיבת הודעות ובמייל', value: 1 },
    { label: 'תיבת הודעות בלבד', value: 2 },
    { label: 'במייל בלבד', value: 3 },
  ];

  businessAreaOptions = [
    { label: 'נדל״ן', value: 'realEstate' },
    { label: 'יהלומים', value: 'diamonds' },
    { label: 'מטבעות דיגיטליים', value: 'crypto' },
    { label: 'שירותים פיננסיים', value: 'financialServices' },
    { label: 'אחר', value: 'other' },
    { label: 'לא', value: 'none' },
  ];

  shouldBlockLoan(): boolean {
    const taxResidency = this.form.controls.nonIsraeliTaxResidency;

    return taxResidency.controls.isOtherCountryTaxResident.value === true;
  }
}
