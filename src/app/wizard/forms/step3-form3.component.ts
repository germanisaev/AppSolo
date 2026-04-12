import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';

@Component({
  selector: 'app-step3-form3',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="form-grid" [formGroup]="form">
      <div class="field">
        <label [class.required-mark]="isControlRequired('borrower3')">
        Borrower 3</label>
        <input type="text" formControlName="borrower3" />
      </div>
    </div>
  `,
})
export class Step3Form3Component extends FormBaseComponent {
  @Input({ required: true }) override form!: FormGroup;
}