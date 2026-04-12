import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';

@Component({
  selector: 'app-step5-form1',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="form-grid" [formGroup]="form">
      <div class="field">
        <label class="checkbox-row" [class.required-mark]="isControlRequired('documentUploaded')">
          <input type="checkbox" formControlName="documentUploaded" />
          Document uploaded
        </label>
      </div>
    </div>
  `,
})
export class Step5Form1Component extends FormBaseComponent {
  @Input({ required: true }) override form!: FormGroup;
}