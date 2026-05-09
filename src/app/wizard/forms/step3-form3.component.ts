import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step3Form3 } from '../models/step.types';
import { NgIf } from '@angular/common';
import { FormFieldComponent } from '../controls/form-field.component';
import { WizardCardComponent } from '../components/wizard-card.component';

@Component({
  selector: 'app-step3-form3',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, FormFieldComponent, WizardCardComponent],
  template: `
    <div class="final-card">
      <app-wizard-card>
        <h3 class="card-title">כתובת מגורים</h3>

        <div class="form-grid two-columns" [formGroup]="form">
          <app-form-field
            [form]="form"
            controlName="city"
            label="עיר"
          ></app-form-field>
          <app-form-field
            [form]="form"
            controlName="street"
            label="רחוב"
          ></app-form-field>

          <div class="field">
            <label [class.required-mark]="isControlRequired('houseNumber')">
              מספר בית
            </label>
            <input type="text" formControlName="houseNumber" />
          </div>

          <div class="field">
            <label [class.required-mark]="isControlRequired('entranceNumber')">
              כניסה
            </label>
            <input type="text" formControlName="entranceNumber" />
          </div>

          <div class="field">
            <label [class.required-mark]="isControlRequired('apartmentNumber')">
              דירה
            </label>
            <input type="text" formControlName="apartmentNumber" />
          </div>

          <div class="field">
            <label [class.required-mark]="isControlRequired('zipCode')">
              מיקוד
            </label>
            <input type="text" formControlName="zipCode" />
          </div>

          <div class="field" style="margin-bottom: 1rem;">
            <label
              class="checkbox-row"
              [class.required-mark]="
                isControlRequired('isMailingAddressDifferent')
              "
            >
              <input
                type="checkbox"
                formControlName="isMailingAddressDifferent"
              />
              כתובת למשלוח דואר אינה זהה לכתובת המגורים שלי
            </label>
          </div>

          <!-- 
        <label class="checkbox-row" [class.disabled]="!agreementRead">
        <input
          type="checkbox"
          formControlName="borrower1"
          [disabled]="!agreementRead"
        />
        אני מאשר/ת שקראתי והבנתי את פרטי הקמת החשבון
      </label>
        -->
        </div>

        <ng-container *ngIf="form.controls.isMailingAddressDifferent.value">
          <h3 class="card-title">כתובת למשלוח דואר</h3>

          <div
            class="form-grid full-width two-columns"
            formGroupName="differentMailingAddress"
          >
            <div class="field">
              <label>עיר למשלוח דואר</label>
              <input type="text" formControlName="city" />
            </div>

            <div class="field">
              <label>רחוב למשלוח דואר</label>
              <input type="text" formControlName="street" />
            </div>

            <div class="field">
              <label>מספר בית למשלוח דואר</label>
              <input type="text" formControlName="houseNumber" />
            </div>

            <div class="field">
              <label>כניסה למשלוח דואר</label>
              <input type="text" formControlName="entranceNumber" />
            </div>

            <div class="field">
              <label>דירה למשלוח דואר</label>
              <input type="text" formControlName="apartmentNumber" />
            </div>

            <div class="field">
              <label>מיקוד למשלוח דואר</label>
              <input type="text" formControlName="zipCode" />
            </div>

            <div class="field">
              <label>תיבת דואר</label>
              <input type="text" formControlName="poBoxNumber" />
            </div>
          </div>
        </ng-container>
      </app-wizard-card>
    </div>
  `,
})
export class Step3Form3Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step3Form3;
}
