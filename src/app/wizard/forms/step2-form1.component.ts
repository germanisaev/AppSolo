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
        <label [class.required-mark]="isControlRequired('carBrand')">
        Car brand</label>
        <input type="text" formControlName="carBrand" />
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('carModel')">
        Car model</label>
        <input type="text" formControlName="carModel" />
        <div class="error" *ngIf="form.get('carModel')?.touched && form.get('carModel')?.invalid">
          Required field
        </div>
      </div>
    </div>
  `,
})
export class Step2Form1Component extends FormBaseComponent {
  @Input({ required: true }) override form!: FormGroup;
}