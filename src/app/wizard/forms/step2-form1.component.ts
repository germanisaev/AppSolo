import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-step2-form1',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="form-grid" [formGroup]="form">
      <div class="field">
        <label [class.required-mark]="isControlRequired('loanAmount')">
        loanAmount</label>
        <input type="text" formControlName="loanAmount" />
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('numberOfPayments')">
        numberOfPayments</label>
        <input type="text" formControlName="numberOfPayments" />
        <div class="error" *ngIf="form.get('numberOfPayments')?.touched && form.get('numberOfPayments')?.invalid">
          Required field
        </div>
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('linkageType')">
        linkageType</label>
        <input type="text" formControlName="linkageType" />
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('monthlyPayment')">
        monthlyPayment</label>
        <input type="text" formControlName="monthlyPayment" />
        <div class="error" *ngIf="form.get('monthlyPayment')?.touched && form.get('monthlyPayment')?.invalid">
          Required field
        </div>
      </div>
    </div>
  `,
})
export class Step2Form1Component extends FormBaseComponent {
  @Input({ required: true }) override form!: FormGroup;
}

/* 
loanAmount: [''],
                numberOfPayments: ['', Validators.required],
                linkageType: [{ value: '', disabled: true }],
                monthlyPayment: [{ value: '', disabled: true }],
*/