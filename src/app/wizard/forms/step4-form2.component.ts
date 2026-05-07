import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step4Form2 } from '../models/step.types';

@Component({
  selector: 'app-step4-form2',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, DropdownModule],
  template: `
    <div class="form-grid" [formGroup]="form">
      <div class="field" formGroupName="publicPersonnel">
        <label
          [class.required-mark]="
            isNestedControlRequired('publicPersonnel', 'checked')
          "
        >
          האם אתה אדם בעל תפקיד ציבורי?
        </label>

        <input type="checkbox" formControlName="checked" />

        <div
          class="error"
          *ngIf="isNestedControlInvalid('publicPersonnel', 'checked')"
        >
          {{ getNestedControlErrorMessage('publicPersonnel', 'checked') }}
        </div>
      </div>

      <div class="field" formGroupName="familyMemberPublicPersonnel">
        <label
          [class.required-mark]="
            isNestedControlRequired('familyMemberPublicPersonnel', 'checked')
          "
        >
          האם בן משפחה שלך הוא בעל תפקיד ציבורי?
        </label>

        <input type="checkbox" formControlName="checked" />

        <div
          class="error"
          *ngIf="
            isNestedControlInvalid('familyMemberPublicPersonnel', 'checked')
          "
        >
          {{
            getNestedControlErrorMessage(
              'familyMemberPublicPersonnel',
              'checked'
            )
          }}
        </div>
      </div>

      <div class="field" formGroupName="additionalBeneficiaries">
        <label
          [class.required-mark]="
            isNestedControlRequired('additionalBeneficiaries', 'checked')
          "
        >
          האם קיימים נהנים נוספים בחשבון?
        </label>

        <input type="checkbox" formControlName="checked" />

        <div
          class="error"
          *ngIf="isNestedControlInvalid('additionalBeneficiaries', 'checked')"
        >
          {{
            getNestedControlErrorMessage('additionalBeneficiaries', 'checked')
          }}
        </div>
      </div>

      <div class="field" formGroupName="nonIsraeliTaxResidency">
        <label
          [class.required-mark]="
            isNestedControlRequired('nonIsraeliTaxResidency', 'checked')
          "
        >
          האם אתה תושב מס מחוץ לישראל?
        </label>

        <input type="checkbox" formControlName="checked" />

        <div
          class="error"
          *ngIf="isNestedControlInvalid('nonIsraeliTaxResidency', 'checked')"
        >
          {{
            getNestedControlErrorMessage('nonIsraeliTaxResidency', 'checked')
          }}
        </div>
      </div>

      <div class="field" formGroupName="usTaxResidency">
        <label
          [class.required-mark]="
            isNestedControlRequired('usTaxResidency', 'checked')
          "
        >
          האם אתה תושב מס בארה״ב?
        </label>

        <input type="checkbox" formControlName="checked" />
      </div>

      <div class="field" formGroupName="notIsraeliTaxResidencyCountry">
        <label
          [class.required-mark]="
            isNestedControlRequired('notIsraeliTaxResidencyCountry', 'checked')
          "
        >
          האם יש לך מדינת תושבות מס נוספת?
        </label>

        <input type="checkbox" formControlName="checked" />
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('marketingConsent')">
          הסכמה לקבלת חומר שיווקי
        </label>

        <input type="checkbox" formControlName="marketingConsent" />
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('bankNotifications')">
          קבלת התראות מהבנק
        </label>

        <input type="checkbox" formControlName="bankNotifications" />
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('notificationMethod')">
          אופן קבלת ההתראות
        </label>

        <p-dropdown
          formControlName="notificationMethod"
          [options]="notificationMethodOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="בחר אופן קבלת התראות"
          [class.input-error]="isControlInvalid('notificationMethod')"
        >
        </p-dropdown>
      </div>
    </div>
  `,
})
export class Step4Form2Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step4Form2;

  notificationMethodOptions = [
    { label: 'SMS', value: 1 },
    { label: 'דואר אלקטרוני', value: 2 },
    { label: 'התראה באפליקציה', value: 3 },
  ];
}
