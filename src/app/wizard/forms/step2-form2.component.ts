import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';

@Component({
  selector: 'app-step2-form2',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="form-grid" [formGroup]="form">
      <div class="field">
        <label [class.required-mark]="isControlRequired('year')">
        Year</label>
        <input type="text" formControlName="year" />
      </div>

      <div class="field">
        <label [class.required-mark]="isControlRequired('color')">
        Color</label>
        <input type="text" formControlName="color" />
      </div>
    </div>
  `,
})
export class Step2Form2Component extends FormBaseComponent {
  @Input({ required: true }) override form!: FormGroup;
}