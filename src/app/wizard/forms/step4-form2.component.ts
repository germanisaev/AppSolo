import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step4Form2 } from '../models/step.types';
import { SelectFieldComponent } from '../controls/select-field.component';
import { SwitchFieldComponent } from '../controls/switch-field.component';
import { RadioGroupFieldComponent } from '../controls/radio-group-field.component';
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
            [isDetails]="true"
          >
          </app-switch-field>

          <app-switch-field
            [form]="form.controls.familyMemberPublicPersonnel"
            controlName="checked"
            label="בן משפחה משמש בתפקיד ציבורי"
            detailsControlName="value"
            detailsLabel="תיאור תפקיד בן משפחה"
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
            [isDetails]="true"
          >
          </app-switch-field>

          <app-switch-field
            [form]="form.controls.nonIsraeliTaxResidency"
            controlName="checked"
            label="יש לי תושבות מס שאינה ישראל"
            detailsControlName="value"
            detailsLabel="תיאור תושבות מס"
            [isDetails]="true"
          >
          </app-switch-field>

          <app-select-field
            [form]="form"
            controlName="workplaceType"
            label="האם אתה עוסק בתחומים הבאים?"
            [options]="businessAreaOptions"
            [filter]="true"
            placeholder=""
          >
          </app-select-field>
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

          <app-radio-group-field
            [form]="form"
            controlName="notificationMethod"
            [options]="notificationMethodOptions"
          >
          </app-radio-group-field>
        </app-wizard-card>
      </section>
    </div>

    <!-- </div> -->
  `,
  styles: [
    `
      .declarations-layout {
        display: grid;
        gap: 1.25rem;
        direction: rtl;
      }

      .declaration-card {
        width: min(46rem, 100%);
        margin: 0 auto;
        padding: 2rem 3rem;

        background: #fff;
        border-radius: 1.25rem;
        box-shadow: 0 1rem 2.5rem rgba(15, 23, 42, 0.08);
      }

      .declaration-card h3 {
        margin: 0 0 1.5rem;
        font-size: 1.25rem;
        font-weight: 800;
        color: #2f2f2f;
      }
    `,
  ],
})
export class Step4Form2Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step4Form2;

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
}
