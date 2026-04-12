import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';

@Component({
  selector: 'app-step1-form2',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="form-grid" [formGroup]="form">
      <div class="field">
        <label [class.required-mark]="isControlRequired('phone')">
          Phone
        </label>
        <input type="text" formControlName="phone" />
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('email')">
          Email
        </label>
        <input type="text" formControlName="email" />
      </div>
    </div>
  `,
})
export class Step1Form2Component extends FormBaseComponent {
  @Input({ required: true }) override form!: FormGroup;
}