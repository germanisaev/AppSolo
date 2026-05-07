import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step3Form3 } from '../models/step.types';
import { NgIf } from '@angular/common';
import { FormFieldComponent } from './form-field.component';

@Component({
  selector: 'app-step3-form3',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, FormFieldComponent],
  template: `
    <div class="form-grid" [formGroup]="form">
      <app-form-field [form]="form" controlName="city" label="עיר">
      </app-form-field>
      <!-- <div class="field">
        <label [class.required-mark]="isControlRequired('city')"> עיר </label>
        <input type="text" formControlName="city" />
      </div> -->

      <!-- <div class="field">
        <label [class.required-mark]="isControlRequired('street')">
          רחוב
        </label>
        <input type="text" formControlName="street" />
      </div> -->

      <app-form-field [form]="form" controlName="street" label="רחוב">
      </app-form-field>

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

      <div class="field">
        <label
          [class.required-mark]="isControlRequired('isMailingAddressDifferent')"
        >
          כתובת למשלוח דואר שונה
        </label>
        <input type="checkbox" formControlName="isMailingAddressDifferent" />
      </div>

      <ng-container *ngIf="form.controls.isMailingAddressDifferent.value">
        <div
          class="form-grid full-width"
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
    </div>
  `,
})
export class Step3Form3Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step3Form3;
}
