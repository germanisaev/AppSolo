import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';

@Component({
  selector: 'app-step4-form1',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="form-grid" [formGroup]="form">
      <div class="field">
        <label [class.required-mark]="isControlRequired('bank')">
        Bank</label>
        <input type="text" formControlName="bank" />
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('branch')">
        Branch</label>
        <input type="text" formControlName="branch" />
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('account')">
        Account</label>
        <input type="text" formControlName="account" />
      </div>
    </div>
  `,
})
export class Step4Form1Component extends FormBaseComponent {
  @Input({ required: true }) override form!: FormGroup;
}