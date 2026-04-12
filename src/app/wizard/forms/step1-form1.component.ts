import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';

@Component({
  selector: 'app-step1-form1',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="form-grid" [formGroup]="form">
      <div class="field">
        <label [class.required-mark]="isControlRequired('firstName')">
          First name
        </label>
        <input id="firstName" type="text" formControlName="firstName" />
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('lastName')">
          Last name
        </label>
        <input id="lastName" type="text" formControlName="lastName" />
      </div>
    </div>
  `,
})
export class Step1Form1Component extends FormBaseComponent {
  @Input({ required: true }) override form!: FormGroup;
}