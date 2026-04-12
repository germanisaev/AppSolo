import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';

@Component({
  selector: 'app-step1-form3',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="form-grid" [formGroup]="form">
      <div class="field">
        <label [class.required-mark]="isControlRequired('city')">
          City
        </label>
        <input type="text" formControlName="city" />
      </div>
      <div class="field">
        <label [class.required-mark]="isControlRequired('street')">
          Street
        </label>
        <input type="text" formControlName="street" />
      </div>
    </div>
  `,
})
export class Step1Form3Component extends FormBaseComponent {
  @Input({ required: true }) override form!: FormGroup;
}