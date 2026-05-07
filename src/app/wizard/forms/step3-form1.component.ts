import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step3Form1 } from '../models/step.types';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-step3-form1',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="form-grid" [formGroup]="form">
      <div class="field">
        <label
          class="checkbox-row"
          [class.required-mark]="isControlRequired('borrower1')"
        >
          <input type="checkbox" formControlName="borrower1" />
          אני מאשר/ת את פרטי הקמת החשבון
        </label>

        <div class="error" *ngIf="isControlInvalid('borrower1')">
          {{ getControlErrorMessage('borrower1') }}
        </div>
      </div>
    </div>
  `,
})
export class Step3Form1Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step3Form1;
}
